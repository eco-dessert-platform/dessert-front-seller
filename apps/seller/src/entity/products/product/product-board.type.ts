import type { ProductBoardSortType } from './product-board-sort.constants'

export type ProductBoardInventoryStatus = 'IN_STOCK' | 'OUT_OF_STOCK'

export type ProductBoardSaleStatus =
  | 'ON_SALE'
  | 'OUT_OF_STOCK'
  | 'STOPPED'
  | 'PENDING'
  | 'BANNED'

export interface ProductBoardItem {
  boardId: number
  thumbnailUrl: string
  title: string
  inventoryStatus: ProductBoardInventoryStatus
  price: number
  discountPrice: number
  discountValue: number
  deliveryFee: number
  freeShippingConditions: number
  deliveryType: string
  saleStatus: ProductBoardSaleStatus
}

export interface TabCounts {
  ON_SALE: number
  OUT_OF_STOCK: number
  STOPPED: number
  PENDING: number
  BANNED: number
}

export interface ProductBoardsPage {
  content: ProductBoardItem[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export interface GetProductBoardsResult {
  tabCounts: TabCounts
  boards: ProductBoardsPage
}

export interface GetProductBoardsResponse {
  success: boolean
  code: number
  message: string
  result: GetProductBoardsResult
}

/** UI/필터 탭용 한글 상태 (쿼리 파라미터) */
export type ProductBoardStatus =
  | '전체'
  | '판매중'
  | '품절'
  | '판매중지'
  | '판매대기'
  | '판매금지'

export type { ProductBoardSortType }

/** @deprecated ProductBoardSortType 사용 */
export type ProductBoardSortBy = ProductBoardSortType
/** @deprecated ProductBoardSortType 사용 */
export type ProductBoardSort = ProductBoardSortType

export interface ProductBoardFilters {
  saleStatus: ProductBoardStatus
  mainCategory?: string
  category?: string
  keyword?: string
  page: number
  size: number
  /** 백엔드 SortType Enum: LATEST | OLDEST | NAME */
  sortBy?: ProductBoardSortType
}

/** useQuery에 노출하는 정규화 응답 */
export interface ProductBoardListResponse {
  boards: ProductBoardItem[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  tabCounts: TabCounts
}

export const EMPTY_TAB_COUNTS: TabCounts = {
  ON_SALE: 0,
  OUT_OF_STOCK: 0,
  STOPPED: 0,
  PENDING: 0,
  BANNED: 0,
}
