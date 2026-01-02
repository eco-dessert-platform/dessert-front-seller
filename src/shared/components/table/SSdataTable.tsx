import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    RowData,
    SortingState,
    useReactTable,
    FilterFn,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/shared/lib/shadcn/components/ui/table.tsx'
import { DataTableProps } from './options/types.ts'
import { renderPagination } from './options/pagination.tsx'
import { VirtualizedTable } from './options/virtualized.tsx'
import React from 'react'
import { Input } from 'src/shared/lib/shadcn/components/ui/input.tsx'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        merge?: boolean
    }
}

export function SSdataTable<TData, TValue = unknown>({
    columns,
    data,
    pagination = {},
    virtualization = {},
    search = {},
}: DataTableProps<TData, TValue>) {
    const {
        enabled: paginationEnabled = false,
        pageSize = 10,
        position = 'bottom',
        align = 'right',
        showPageNumbers = true,
        maxVisiblePages = 5,
    } = pagination

    const {
        columns: searchColumns = [],
        position: searchPosition = 'top',
        align: searchAlign = 'left',
        placeholder = '',
    } = search

    const { enabled: virtualEnabled = false } = virtualization

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState('')

    // 특정 컬럼만 검색하는 경우를 위한 커스텀 필터 함수
    const globalFilterFn: FilterFn<TData> = React.useCallback(
        (row, _columnId, filterValue) => {
            // 빈 문자열이면 모든 행 표시
            if (!filterValue || String(filterValue).trim() === '') {
                return true
            }

            const searchValue = String(filterValue).toLowerCase().trim()

            // searchColumns가 지정된 경우 해당 컬럼만 검색
            if (searchColumns.length > 0) {
                return searchColumns.some((columnId) => {
                    const value = row.getValue(columnId)
                    if (value == null) return false
                    const cellValue = String(value).toLowerCase()
                    return cellValue.includes(searchValue)
                })
            }

            // searchColumns가 없으면 모든 컬럼 검색 (기본 동작)
            return Object.values(row.original as Record<string, unknown>).some(
                (value) => {
                    if (value == null) return false
                    return String(value).toLowerCase().includes(searchValue)
                },
            )
        },
        [searchColumns],
    )

    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: paginationEnabled ? pageSize : data.length,
                pageIndex: 0,
            },
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn,
        state: {
            sorting,
            globalFilter,
        },
    })

    const searchComponent =
        searchColumns.length > 0 ? (
            <div
                className={`flex items-center py-4 ${
                    {
                        left: 'justify-start',
                        center: 'justify-center',
                        right: 'justify-end',
                    }[searchAlign]
                }`}
            >
                <Input
                    placeholder={
                        placeholder ||
                        `${searchColumns.join(', ')}로 검색...`
                    }
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>
        ) : null

    const paginationComponent = paginationEnabled
        ? renderPagination(table, showPageNumbers, maxVisiblePages, align)
        : null

    /**
     * 셀 병합을 위한 rowSpan 계산 함수
     * useMemo로 최적화하여 불필요한 재계산 방지
     */
    const getRowSpans = React.useCallback(
        (
            rows: Row<TData>[],
            columnId: string,
        ): Record<string, number> => {
            const spans: Record<string, number> = {}
            let prevValue: unknown | null = null
            let startRowId: string | null = null
            let count = 0

            rows.forEach((row) => {
                const value = row.getValue(columnId)

                // Object.is를 사용하여 NaN과 같은 엣지 케이스 처리
                if (Object.is(value, prevValue) || value === prevValue) {
                    count++
                    if (startRowId) {
                        spans[startRowId] = count // 첫 행에 누적 rowSpan
                    }
                    spans[row.id] = 0 // 병합된 나머지는 숨김
                } else {
                    prevValue = value
                    startRowId = row.id
                    count = 1
                    spans[row.id] = 1
                }
            })

            return spans
        },
        [],
    )

    /**
     * 각 컬럼별 rowSpan 정보를 메모이제이션
     * 병합이 활성화된 컬럼에 대해서만 계산
     */
    const rows = table.getRowModel().rows
    const allColumns = table.getAllColumns()
    const rowSpansCache = React.useMemo(() => {
        const cache: Record<string, Record<string, number>> = {}

        // 병합이 활성화된 컬럼만 찾아서 계산
        allColumns.forEach((column) => {
            const mergeEnabled = column.columnDef.meta?.merge
            if (mergeEnabled && column.id) {
                cache[column.id] = getRowSpans(rows, column.id)
            }
        })

        return cache
    }, [rows, getRowSpans, allColumns])

    if (virtualEnabled) {
        return (
            <div>
                {(searchPosition === 'top' || searchPosition === 'both') &&
                    searchComponent}
                {(position === 'top' || position === 'both') &&
                    paginationComponent}
                <VirtualizedTable
                    table={table}
                    virtualization={virtualization}
                />
                {(position === 'bottom' || position === 'both') &&
                    paginationComponent}
                {(searchPosition === 'bottom' || searchPosition === 'both') &&
                    searchComponent}
            </div>
        )
    }

    return (
        <div>
            {(searchPosition === 'top' || searchPosition === 'both') &&
                searchComponent}
            {(position === 'top' || position === 'both') && paginationComponent}
            <div className="overflow-hidden rounded-md border">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="truncate"
                                        style={{
                                            width:
                                                header.getSize() !== 150
                                                    ? `${header.getSize()}px`
                                                    : `${100 / headerGroup.headers.length}%`,
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    const colDef = cell.column.columnDef
                                    const mergeEnabled = colDef.meta?.merge

                                    if (mergeEnabled && cell.column.id) {
                                        const spans = rowSpansCache[cell.column.id]
                                        const span = spans?.[row.id]
                                        
                                        // span이 0이면 병합된 셀이므로 렌더링하지 않음
                                        if (span === 0) return null
                                        
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                rowSpan={span ?? 1}
                                                className="truncate"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        )
                                    }

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className="truncate"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {(position === 'bottom' || position === 'both') &&
                paginationComponent}
            {(searchPosition === 'bottom' || searchPosition === 'both') &&
                searchComponent}
        </div>
    )
}
