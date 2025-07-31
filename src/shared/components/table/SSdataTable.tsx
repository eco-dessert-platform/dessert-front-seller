import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
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

export function SSdataTable<TData, TValue>({ columns, data, pagination = {}, virtualization = {} }: DataTableProps<TData, TValue>) {
    const {
        enabled: paginationEnabled = false,
        pageSize = 10,
        position = 'bottom',
        align = 'right',
        showPageNumbers = true,
        maxVisiblePages = 5,
    } = pagination

    const { enabled: virtualEnabled = false } = virtualization

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
    })

    const paginationComponent = paginationEnabled ? renderPagination(table, showPageNumbers, maxVisiblePages, align) : null

    if (virtualEnabled) {
        return (
            <div>
                {(position === 'top' || position === 'both') && paginationComponent}
                <VirtualizedTable table={table} virtualization={virtualization} />
                {(position === 'bottom' || position === 'both') && paginationComponent}
            </div>
        )
    }

    return (
        <div>
            {(position === 'top' || position === 'both') && paginationComponent}
            <div className="overflow-hidden rounded-md border">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="truncate"
                                        style={{
                                            width: header.getSize() !== 150 ? `${header.getSize()}px` : `${100 / headerGroup.headers.length}%`
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="truncate"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {(position === 'bottom' || position === 'both') && paginationComponent}
        </div>
    )
}
