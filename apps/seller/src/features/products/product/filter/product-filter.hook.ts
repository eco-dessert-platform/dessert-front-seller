import { useState } from 'react'

import { DEFAULT_PRODUCT_BOARD_SORT } from '@/entity/products/product/product-board-sort.constants'
import type {
  ProductBoardFilters,
  ProductBoardStatus,
} from '@/entity/products/product/product-board.type'

const DEFAULT_SIZE = 20

export const createInitialProductBoardFilters = (
  saleStatus: ProductBoardStatus = '전체',
): ProductBoardFilters => ({
  saleStatus,
  page: 0,
  size: DEFAULT_SIZE,
  sortBy: DEFAULT_PRODUCT_BOARD_SORT,
})

export function useProductBoardFilter(
  initialStatus: ProductBoardStatus = '전체',
) {
  const initialState = createInitialProductBoardFilters(initialStatus)

  const [draftFilters, setDraftFilters] =
    useState<ProductBoardFilters>(initialState)
  const [appliedFilters, setAppliedFilters] =
    useState<ProductBoardFilters>(initialState)

  const apply = () => {
    const trimmedKeyword = draftFilters.keyword?.trim()

    setAppliedFilters({
      ...draftFilters,
      page: 0,
      keyword: trimmedKeyword || undefined,
    })
  }

  const reset = (saleStatus?: ProductBoardStatus) => {
    const next = createInitialProductBoardFilters(
      saleStatus ?? initialStatus,
    )
    setDraftFilters(next)
    setAppliedFilters(next)
  }

  return {
    draftFilters,
    setDraftFilters,
    appliedFilters,
    setAppliedFilters,
    apply,
    reset,
  }
}
