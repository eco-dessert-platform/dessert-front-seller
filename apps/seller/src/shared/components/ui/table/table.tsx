import { useEffect, useRef } from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { Cell, Row } from '@tanstack/react-table'

import TableEmpty from './table-empty'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    getRowSpan?: (cell: Cell<TData, TValue>) => number
    getColSpan?: (cell: Cell<TData, TValue>) => number
    getCellClassName?: (cell: Cell<TData, TValue>) => string
    flexible?: boolean
  }
}

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  topArea?: React.ReactNode
  bottomArea?: React.ReactNode
  emptyDesc?: string
  scrollHeight?: number // 스크롤 영역 설정
  getRowClassName?: (row: Row<T>) => string
  fillWidth?: boolean
}

function Table<T>({
  data,
  columns,
  topArea,
  bottomArea,
  emptyDesc,
  scrollHeight,
  getRowClassName,
  fillWidth = false,
}: TableProps<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange', // 드래그 중 실시간 반영
  })
  const { getHeaderGroups, getRowModel } = table
  const rows = getRowModel().rows
  const columnCount = table.getAllLeafColumns().length
  const isEmpty = rows.length === 0 && !!emptyDesc
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [data])

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      {topArea && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-24 pt-16 pb-3">
          {topArea}
        </div>
      )}
      <div
        className="relative overflow-auto"
        ref={scrollRef}
        style={scrollHeight ? { height: scrollHeight } : undefined}
      >
        <table
          className={`table-fixed border-collapse${isEmpty ? ' h-full' : ''}`}
          style={
            fillWidth
              ? { width: '100%', minWidth: table.getTotalSize() }
              : { width: table.getTotalSize() }
          }
        >
          <thead className="sticky top-0 z-10">
            {getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="h-40 border-b border-gray-400 bg-gray-200"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-center align-middle typo-body-12-m text-gray-800"
                    style={
                      header.column.columnDef.meta?.flexible
                        ? undefined
                        : { width: header.getSize() }
                    }
                  >
                    <div className="relative flex h-full items-center justify-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={[
                            'absolute right-0 top-0 h-full w-4',
                            'cursor-col-resize select-none touch-none',
                            header.column.getIsResizing()
                              ? 'bg-gray-600 opacity-100'
                              : 'opacity-0 hover:opacity-100 hover:bg-gray-400',
                          ].join(' ')}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={isEmpty ? 'h-full' : undefined}>
            {rows.length > 0
              ? rows.map((row) => (
                  <tr
                    key={row.id}
                    className={[
                      'border-b border-gray-300',
                      getRowClassName?.(row) ?? '',
                    ].join(' ')}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const rowSpan =
                        cell.column.columnDef.meta?.getRowSpan?.(cell) ?? 1
                      const colSpan =
                        cell.column.columnDef.meta?.getColSpan?.(cell) ?? 1

                      if (rowSpan === 0 || colSpan === 0) {
                        return null
                      }

                      return (
                        <td
                          key={cell.id}
                          rowSpan={rowSpan}
                          colSpan={colSpan}
                          className={[
                            'border-r border-l border-gray-200 text-center align-middle last:border-r-0',
                            cell.column.columnDef.meta?.getCellClassName?.(
                              cell,
                            ) ?? '',
                          ].join(' ')}
                          style={
                            cell.column.columnDef.meta?.flexible
                              ? undefined
                              : { width: cell.column.getSize() }
                          }
                        >
                          <div className="p-10">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))
              : emptyDesc && (
                  <tr className="h-full">
                    <td colSpan={columnCount} className="h-full border-0 p-0">
                      <TableEmpty description={emptyDesc} />
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
      {bottomArea && (
        <div className="border-t border-gray-200 bg-white px-24 py-12">
          {bottomArea}
        </div>
      )}
    </div>
  )
}

export default Table
