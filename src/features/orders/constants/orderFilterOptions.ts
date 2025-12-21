import type { SelectOption } from '../type/orderModalType'
import { FILTER_DEFAULTS, TAB_CATEGORY } from './orderConstants'
import { SearchType } from './orderEnums'

// Orders 페이지 주문 상태 옵션
export const ORDER_STATUS_OPTIONS: SelectOption[] = [
    { value: FILTER_DEFAULTS.ORDER_STATUS, label: '전체' },
    { value: TAB_CATEGORY.PAID, label: '결제완료' },
    { value: 'nnnnn', label: '상품준비' },
    { value: TAB_CATEGORY.SHIPPED, label: '상품발송' },
    { value: TAB_CATEGORY.DELIVERED, label: '배송완료' },
] as const

// OrderCompleted 페이지 주문 상태 옵션
export const ORDER_COMPLETED_STATUS_OPTIONS: SelectOption[] = [
    { value: FILTER_DEFAULTS.ORDER_STATUS, label: '전체' },
    { value: 'PURCHASE_CONFIRMED', label: '구매확정' },
    { value: 'CANCEL_COMPLETED', label: '취소 완료' },
    { value: 'CANCEL_REJECTED', label: '취소 거절' },
    { value: 'RETURN_REJECTED', label: '반품 거절' },
    { value: 'RETURN_COMPLETED', label: '반품 완료' },
    { value: 'RETURN_RETURNED', label: '반품 반려' },
    { value: 'EXCHANGE_REJECTED', label: '교환 거절' },
    { value: 'EXCHANGE_COMPLETED', label: '교환 완료' },
    { value: 'EXCHANGE_RETURNED', label: '교환 반려' },
] as const

// Orders 페이지 검색 옵션
export const SEARCH_OPTIONS: SelectOption[] = [
    { value: SearchType.ORDER_NUMBER, label: '주문번호' },
    { value: SearchType.RECEIVER_NAME, label: '수취인명' },
    { value: SearchType.PRODUCT_NAME, label: '상품명' },
    { value: SearchType.TRACKING_NUMBER, label: '송장번호' },
] as const

// OrderCompleted 페이지 검색 옵션
export const ORDER_COMPLETED_SEARCH_OPTIONS: SelectOption[] = [
    { value: SearchType.ORDER_NUMBER, label: '주문번호' },
    { value: SearchType.BUYER_NAME, label: '수취인명' },
    { value: SearchType.PRODUCT_NAME, label: '상품명' },
    { value: SearchType.TRACKING_NUMBER, label: '송장번호' },
] as const
