import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from 'src/shared/lib/shadcn/components/ui/pagination.tsx'
import { Table } from '@tanstack/react-table'
import clsx from 'clsx'

export const renderPagination = <TData,>(
    table: Table<TData>,
    showPageNumbers: boolean,
    maxVisiblePages: number,
    align: 'left' | 'center' | 'right',
) => {
    const generatePageNumbers = () => {
        if (!showPageNumbers) return []

        const currentPage = table.getState().pagination.pageIndex + 1
        const totalPages = table.getPageCount()

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const sidePages = Math.floor(maxVisiblePages / 2)
        let startPage = Math.max(1, currentPage - sidePages)
        let endPage = Math.min(totalPages, currentPage + sidePages)

        if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1)
            }
        }

        const pages = []
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }
        return pages
    }

    const justifyClass =
        align === 'center'
            ? 'justify-center'
            : align === 'left'
              ? 'justify-start'
              : 'justify-end'

    const paginationJustifyClass =
        align === 'center'
            ? 'justify-center'
            : align === 'left'
              ? 'justify-start'
              : 'justify-end'

    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()
    const pageNumbers = generatePageNumbers()

    return (
        <div className={`flex w-full items-center py-4 ${justifyClass}`}>
            <Pagination
                className={`mx-auto flex w-full ${paginationJustifyClass}`}
            >
                <PaginationContent>
                    <PaginationItem>
                        <PaginationFirst
                            onClick={() => table.firstPage()}
                            className={
                                !table.getCanPreviousPage()
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => table.previousPage()}
                            className={
                                !table.getCanPreviousPage()
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>

                    {showPageNumbers && (
                        <>
                            {pageNumbers[0] > 1 && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() =>
                                                table.setPageIndex(0)
                                            }
                                            isActive={currentPage === 1}
                                            className="cursor-pointer"
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    {pageNumbers[0] > 2 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                </>
                            )}

                            {pageNumbers.map((pageNum) => (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() =>
                                            table.setPageIndex(pageNum - 1)
                                        }
                                        isActive={currentPage === pageNum}
                                        className={`cursor-pointer ${clsx(currentPage === pageNum ? 'bg-primary-50 text-primary-500 border-0' : 'text-gray-800')}`}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {pageNumbers[pageNumbers.length - 1] <
                                totalPages && (
                                <>
                                    {pageNumbers[pageNumbers.length - 1] <
                                        totalPages - 1 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() =>
                                                table.setPageIndex(
                                                    totalPages - 1,
                                                )
                                            }
                                            isActive={
                                                currentPage === totalPages
                                            }
                                            className="cursor-pointer"
                                        >
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}
                        </>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => table.nextPage()}
                            className={
                                !table.getCanNextPage()
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLast
                            onClick={() => table.lastPage()}
                            className={
                                !table.getCanNextPage()
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
