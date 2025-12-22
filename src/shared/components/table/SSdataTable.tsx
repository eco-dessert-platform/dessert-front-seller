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
        /**
         * 같은 값의 행들을 병합할지 여부를 결정합니다.
         * true로 설정하면 동일한 값의 연속된 행들이 rowspan으로 병합됩니다.
         */
        merge?: boolean
        /**
         * 컬럼의 너비를 픽셀(px) 단위로 지정합니다.
         * 설정하면 colgroup의 col 요소에 해당 너비가 적용됩니다.
         * table-fixed 레이아웃에서 일부 컬럼만 width를 설정하면,
         * 나머지 컬럼은 남은 공간을 균등 분할합니다.
         * 예: meta: { width: 50 } → <col style={{ width: '50px' }} />
         */
        width?: number
    }
}

export function SSdataTable<TData, TValue>({
    columns,
    data,
    pagination = {},
    virtualization = {},
    search = {},
    styles = {},
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

    const table = useReactTable({
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
                    placeholder={placeholder}
                    value={globalFilter ?? ''}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>
        ) : null

    const paginationComponent = paginationEnabled
        ? renderPagination(table, showPageNumbers, maxVisiblePages, align)
        : null

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

    function getRowSpans(
        rows: Row<TData>[],
        columnId: string,
    ): Record<string, number> {
        const spans: Record<string, number> = {}
        let prevValue: unknown = null
        let startRowId: string | null = null
        let count = 0

        rows.forEach((row) => {
            const value = row.getValue(columnId)

            if (value === prevValue) {
                count++
                spans[startRowId!] = count // 첫 행에 누적 rowSpan
                spans[row.id] = 0 // 병합된 나머지는 숨김
            } else {
                prevValue = value
                startRowId = row.id
                count = 1
                spans[row.id] = 1
            }
        })

        return spans
    }

    return (
        <div>
            {(searchPosition === 'top' || searchPosition === 'both') &&
                searchComponent}
            {(position === 'top' || position === 'both') && paginationComponent}
            <div
                className={`overflow-hidden rounded-md border ${styles?.containerClassName ?? ''}`}
            >
                <Table className="w-full table-fixed border-collapse">
                    {table.getHeaderGroups().map((headerGroup) => {
                        const hasWidth = headerGroup.headers.some(
                            (header) =>
                                header.column.columnDef.meta?.width !==
                                undefined,
                        )

                        return (
                            <React.Fragment key={headerGroup.id}>
                                {hasWidth && (
                                    <colgroup>
                                        {headerGroup.headers.map((header) => {
                                            const metaWidth =
                                                header.column.columnDef.meta
                                                    ?.width
                                            const size = header.getSize()
                                            const width = metaWidth
                                                ? `${metaWidth}px`
                                                : size !== 150
                                                  ? `${size}px`
                                                  : undefined

                                            return (
                                                <col
                                                    key={header.id}
                                                    style={
                                                        width
                                                            ? { width }
                                                            : undefined
                                                    }
                                                />
                                            )
                                        })}
                                    </colgroup>
                                )}
                                <TableHeader>
                                    <TableRow>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className={`truncate border-r border-gray-200 text-center last:border-r-0 ${styles?.headerClassName ?? ''}`}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                            </React.Fragment>
                        )
                    })}
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    const colDef = cell.column.columnDef
                                    const mergeEnabled = colDef.meta?.merge

                                    if (mergeEnabled) {
                                        const spans = getRowSpans(
                                            table.getRowModel().rows,
                                            cell.column.id,
                                        )
                                        const span = spans[row.id]
                                        if (span === 0) return null
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                rowSpan={span}
                                                className="truncate border-r border-b border-gray-200"
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
                                            className="truncate border-r border-b border-gray-200 last:border-r-0"
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
