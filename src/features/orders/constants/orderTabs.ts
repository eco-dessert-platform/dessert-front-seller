import type { TabCategory } from '../type/orderStatusType'
import { TAB_CATEGORY } from './orderConstants'

// Orders 페이지 탭 목록
export const ORDER_TABS: Array<{ key: TabCategory; title: string }> = [
    { key: TAB_CATEGORY.ALL, title: '전체' },
    { key: TAB_CATEGORY.PAID, title: '결제완료' },
    { key: TAB_CATEGORY.CHECKED, title: '발주확인' },
    { key: TAB_CATEGORY.SHIPPED, title: '상품발송' },
    { key: TAB_CATEGORY.DELIVERED, title: '배송완료' },
    { key: TAB_CATEGORY.PAYMENT_COMPLETED, title: '취소' },
    { key: TAB_CATEGORY.REFUND, title: '반품' },
    { key: TAB_CATEGORY.CHANGE, title: '교환' },
] as const

// OrderCompleted 페이지 탭 목록
type CompletedTabCategory = 'PURCHASED' | 'CANCELED' | 'RETURNED' | 'EXCHANGED'

export const ORDER_COMPLETED_TABS: Array<{
    key: CompletedTabCategory
    title: string
}> = [
    { key: TAB_CATEGORY.PURCHASED, title: '완료' },
    { key: TAB_CATEGORY.CANCELED, title: '취소' },
    { key: TAB_CATEGORY.RETURNED, title: '반품' },
    { key: TAB_CATEGORY.EXCHANGED, title: '교환' },
] as const
