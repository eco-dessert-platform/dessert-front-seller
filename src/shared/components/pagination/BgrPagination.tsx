import clsx from 'clsx'
import { ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'

interface BgrPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange?: (page: number) => void
    className?: string
}

const BgrPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
}: BgrPaginationProps) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange?.(page)
        }
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('ellipsis')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('ellipsis')
                pages.push(totalPages)
            }
        }

        return pages
    }

    return (
        <nav
            className={clsx(
                'flex items-center justify-end gap-1',
                className,
            )}
            aria-label="페이지네이션"
        >
            <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-2.5 rounded-[8px]',
                    'hover:bg-gray-50 transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
                aria-label="첫 페이지"
            >
                <ChevronsLeft className="w-5 h-5 text-gray-900" />
            </button>

            <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-2.5 rounded-[8px]',
                    'hover:bg-gray-50 transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
                aria-label="이전 페이지"
            >
                <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>

            {getPageNumbers().map((page, index) => {
                if (page === 'ellipsis') {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="flex items-center justify-center w-[30px] h-[30px] text-title-14-r text-gray-400"
                        >
                            ...
                        </span>
                    )
                }

                const pageNumber = page as number
                const isActive = pageNumber === currentPage

                return (
                    <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        className={clsx(
                            'flex items-center justify-center w-[30px] h-[30px] p-2.5 rounded-[8px]',
                            'transition-colors',
                            isActive
                                ? 'bg-primary-50 text-primary-500 text-title-14-m'
                                : 'text-title-14-r text-gray-800 hover:bg-gray-50',
                        )}
                        aria-label={`${pageNumber}페이지`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-2.5 rounded-[8px]',
                    'hover:bg-gray-50 transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
                aria-label="다음 페이지"
            >
                <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>

            <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-2.5 rounded-[8px]',
                    'hover:bg-gray-50 transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
                aria-label="마지막 페이지"
            >
                <ChevronsRight className="w-5 h-5 text-gray-900" />
            </button>
        </nav>
    )
}

export default BgrPagination

