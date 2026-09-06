import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import {
  DEFAULT_PRODUCT_BOARD_SORT,
  toProductBoardSortType,
} from './product-board-sort.constants'
import type {
  GetProductBoardsResult,
  ProductBoardFilters,
  ProductBoardListResponse,
} from './product-board.type'
import { EMPTY_TAB_COUNTS } from './product-board.type'

function unwrap<T>(data: ApiResponse<T>, fallback: string): T {
  if (!data.success || data.result == null) {
    throw new Error(data.message ?? fallback)
  }
  return data.result
}

/** 빈 문자열 / undefined / null 쿼리 파라미터 제거 */
function toCleanParams(
  filters: ProductBoardFilters,
): Record<string, string | number> {
  const sortBy = filters.sortBy
    ? toProductBoardSortType(filters.sortBy)
    : DEFAULT_PRODUCT_BOARD_SORT

  const params: Record<string, string | number | undefined> = {
    saleStatus:
      filters.saleStatus === '전체' ? undefined : filters.saleStatus,
    mainCategory: filters.mainCategory,
    category: filters.category,
    keyword: filters.keyword,
    page: filters.page,
    size: filters.size,
    sortBy,
  }

  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Record<string, string | number>
}

export async function getProductBoards(
  filters: ProductBoardFilters,
): Promise<ProductBoardListResponse> {
  const { data } = await client.get<ApiResponse<GetProductBoardsResult>>(
    '/api/v1/seller/boards',
    { params: toCleanParams(filters) },
  )

  const result = unwrap(data, '상품 목록 조회에 실패했습니다.')
  const boardsPage = result.boards

  return {
    boards: boardsPage?.content ?? [],
    page: boardsPage?.page ?? filters.page ?? 0,
    size: boardsPage?.size ?? filters.size ?? 20,
    totalElements: boardsPage?.totalElements ?? 0,
    totalPages: Math.max(1, boardsPage?.totalPages ?? 1),
    tabCounts: result.tabCounts ?? EMPTY_TAB_COUNTS,
  }
}
