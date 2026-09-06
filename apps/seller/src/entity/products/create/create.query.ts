import { queryOptions } from '@tanstack/react-query'

import { getProductBoards } from '../product/product-board.api'
import type { ProductBoardFilters } from '../product/product-board.type'

import { getMyStore } from './create.api'

export const productQueries = {
  all: () => ['seller-product-boards'] as const,
  lists: () => [...productQueries.all(), 'list'] as const,
  list: (filters: ProductBoardFilters) =>
    queryOptions({
      queryKey: [...productQueries.lists(), filters],
      queryFn: () => getProductBoards(filters),
    }),
  myStore: () =>
    queryOptions({
      queryKey: [...productQueries.all(), 'myStore'],
      queryFn: getMyStore,
    }),
}
