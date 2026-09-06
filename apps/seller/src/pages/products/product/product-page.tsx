import { useMemo, useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { productQueries } from '@/entity/products'
import { mapProductBoardItemToProductType } from '@/entity/products/product/product-board.mapper'
import { DEFAULT_PRODUCT_BOARD_SORT } from '@/entity/products/product/product-board-sort.constants'
import type { ProductBoardSortType } from '@/entity/products/product/product-board-sort.constants'
import type { ProductBoardStatus } from '@/entity/products/product/product-board.type'
import { EMPTY_TAB_COUNTS } from '@/entity/products/product/product-board.type'
import { FilterCategory } from '@/features/products/product/filter/filter-category'
import { FilterTabs } from '@/features/products/product/filter/filter-tabs'
import { useProductBoardFilter } from '@/features/products/product/filter/product-filter.hook'
import { ResultTable } from '@/features/products/product/product-list/product-list-table'
import { cn } from '@/shared/libs/utils'

const ContainerStyle = 'rounded-10 border border-gray-300 bg-white'

function ProductsPage() {
  const {
    draftFilters,
    setDraftFilters,
    appliedFilters,
    setAppliedFilters,
    apply,
    reset,
  } = useProductBoardFilter('전체')

  const [mainCategoryValue, setMainCategoryValue] = useState('')
  const [subCategoryValue, setSubCategoryValue] = useState('')
  const [searchOpt, setSearchOpt] = useState('all')

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    ...productQueries.list(appliedFilters),
    placeholderData: keepPreviousData,
  })

  const tableData = useMemo(
    () => (data?.boards ?? []).map(mapProductBoardItemToProductType),
    [data?.boards],
  )

  const totalElements = data?.totalElements ?? 0
  const totalPages = data?.totalPages ?? 1
  const currentPage = (data?.page ?? appliedFilters.page ?? 0) + 1
  const sortBy = appliedFilters.sortBy ?? DEFAULT_PRODUCT_BOARD_SORT
  const tabCounts = data?.tabCounts ?? EMPTY_TAB_COUNTS
  const showInitialLoading = isLoading && !data

  const handleStatusChange = (saleStatus: ProductBoardStatus) => {
    setMainCategoryValue('')
    setSubCategoryValue('')
    setSearchOpt('all')
    reset(saleStatus)
  }

  const handleSearch = () => {
    apply()
  }

  const handleSortChange = (nextSortBy: ProductBoardSortType) => {
    setDraftFilters((prev) => ({ ...prev, sortBy: nextSortBy }))
    setAppliedFilters((prev) => ({ ...prev, sortBy: nextSortBy, page: 0 }))
  }

  const handlePageChange = (page: number) => {
    setAppliedFilters((prev) => ({ ...prev, page: page - 1 }))
  }

  return (
    <div>
      <FilterTabs
        saleStatus={appliedFilters.saleStatus}
        tabCounts={tabCounts}
        onStatusChange={handleStatusChange}
      />
      <div className={cn('flex gap-10 px-24 py-16', ContainerStyle)}>
        <FilterCategory
          filters={draftFilters}
          mainCategoryValue={mainCategoryValue}
          subCategoryValue={subCategoryValue}
          searchOpt={searchOpt}
          onMainCategoryChange={setMainCategoryValue}
          onSubCategoryChange={setSubCategoryValue}
          onSearchOptChange={setSearchOpt}
          onFiltersChange={setDraftFilters}
          onSearch={handleSearch}
        />
      </div>
      <div className={cn('mt-10 overflow-hidden bg-white')}>
        <ResultTable
          data={tableData}
          totalElements={totalElements}
          currentPage={currentPage}
          totalPages={totalPages}
          sortBy={sortBy}
          isLoading={showInitialLoading || (isFetching && !data)}
          isError={isError && !data}
          onSortChange={handleSortChange}
          onPageChange={handlePageChange}
          onRetry={() => {
            void refetch()
          }}
        />
      </div>
    </div>
  )
}

export default ProductsPage
