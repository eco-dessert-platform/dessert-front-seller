import clsx from 'clsx'
import { ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'

export interface BgrPaginationProps {
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
    const GROUP_SIZE = 5

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange?.(page)
        }
    }

    // 현재 그룹 계산
    const currentGroup = Math.ceil(currentPage / GROUP_SIZE)
    const totalGroups = Math.ceil(totalPages / GROUP_SIZE)

    // 현재 그룹의 시작 페이지와 끝 페이지
    const groupStartPage = (currentGroup - 1) * GROUP_SIZE + 1
    const groupEndPage = Math.min(currentGroup * GROUP_SIZE, totalPages)

    // 현재 그룹의 페이지 번호들
    const getCurrentGroupPages = () => {
        const pages: number[] = []
        for (let i = groupStartPage; i <= groupEndPage; i++) {
            pages.push(i)
        }
        return pages
    }

    // 첫 번째 그룹인지 확인
    const isFirstGroup = currentGroup === 1

    // 마지막 그룹인지 확인
    const isLastGroup = currentGroup === totalGroups

    // 다음 그룹의 첫 페이지 계산
    const getNextGroupFirstPage = () => {
        if (isLastGroup) return totalPages
        return currentGroup * GROUP_SIZE + 1
    }

    const currentGroupPages = getCurrentGroupPages()

    return (
        <nav
            className={clsx('flex items-center', className)}
            aria-label="페이지네이션"
            style={{ gap: '4px' }}
        >
            {/* << 버튼: 첫 페이지로 이동 */}
            <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={isFirstGroup}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-[10px] rounded-[8px]',
                    'transition-colors',
                    isFirstGroup
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-50 cursor-pointer',
                )}
                aria-label="첫 페이지 그룹"
            >
                <ChevronsLeft
                    className={clsx(
                        'w-5 h-5',
                        isFirstGroup ? 'text-gray-300' : 'text-gray-900',
                    )}
                />
            </button>

            {/* < 버튼: 이전 페이지로 이동 */}
            <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-[10px] rounded-[8px]',
                    'transition-colors',
                    currentPage === 1
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-50 cursor-pointer',
                )}
                aria-label="이전 페이지"
            >
                <ChevronLeft
                    className={clsx(
                        'w-5 h-5',
                        currentPage === 1 ? 'text-gray-300' : 'text-gray-900',
                    )}
                />
            </button>

            {/* 페이지 번호 버튼들 */}
            {currentGroupPages.map((pageNumber) => {
                const isActive = pageNumber === currentPage

                return (
                    <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={isActive}
                        className={clsx(
                            'flex items-center justify-center w-[30px] h-[30px] p-[10px] rounded-[8px]',
                            'transition-colors',
                            isActive
                                ? 'bg-primary-50 text-primary-500 text-title-14-m cursor-default'
                                : 'text-title-14-r text-gray-800 hover:bg-gray-50 cursor-pointer',
                        )}
                        aria-label={`${pageNumber}페이지`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            {/* > 버튼: 다음 그룹의 첫 페이지로 이동 */}
            <button
                type="button"
                onClick={() => handlePageChange(getNextGroupFirstPage())}
                disabled={isLastGroup}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-[10px] rounded-[8px]',
                    'transition-colors',
                    isLastGroup
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-50 cursor-pointer',
                )}
                aria-label="다음 페이지 그룹"
            >
                <ChevronRight
                    className={clsx(
                        'w-5 h-5',
                        isLastGroup ? 'text-gray-300' : 'text-gray-900',
                    )}
                />
            </button>

            {/* >> 버튼: 마지막 그룹의 첫 페이지로 이동 */}
            <button
                type="button"
                onClick={() => {
                    const lastGroupFirstPage =
                        (totalGroups - 1) * GROUP_SIZE + 1
                    handlePageChange(lastGroupFirstPage)
                }}
                disabled={isLastGroup}
                className={clsx(
                    'flex items-center justify-center w-[30px] h-[30px] p-[10px] rounded-[8px]',
                    'transition-colors',
                    isLastGroup
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-50 cursor-pointer',
                )}
                aria-label="마지막 페이지 그룹"
            >
                <ChevronsRight
                    className={clsx(
                        'w-5 h-5',
                        isLastGroup ? 'text-gray-300' : 'text-gray-900',
                    )}
                />
            </button>
        </nav>
    )
}

export default BgrPagination

