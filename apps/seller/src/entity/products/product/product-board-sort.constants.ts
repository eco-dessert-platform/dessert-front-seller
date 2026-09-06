export const PRODUCT_BOARD_SORT_OPTIONS = [
  { value: 'LATEST', label: '최신순' },
  { value: 'OLDEST', label: '오래된 순' },
  { value: 'NAME', label: '상품명 순' },
] as const

export type ProductBoardSortType =
  (typeof PRODUCT_BOARD_SORT_OPTIONS)[number]['value']

export const DEFAULT_PRODUCT_BOARD_SORT: ProductBoardSortType = 'LATEST'

const PRODUCT_BOARD_SORT_SET = new Set<string>(
  PRODUCT_BOARD_SORT_OPTIONS.map((option) => option.value),
)

/** API/상태 값을 SortType Enum으로 보정. 유효하지 않으면 LATEST */
export function toProductBoardSortType(
  value: string | null | undefined,
): ProductBoardSortType {
  if (value && PRODUCT_BOARD_SORT_SET.has(value)) {
    return value as ProductBoardSortType
  }
  return DEFAULT_PRODUCT_BOARD_SORT
}
