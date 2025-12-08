import type { TabCategory } from '../type/orderStatusType'
import type { ButtonConfig } from '../type/orderActionType'

export const BUTTONS_BY_TAB = {
    ALL: [],
    PAID: [
        { label: '발주확인', action: 'ORDER_CONFIRMED', disabled: false },
        { label: '주문취소', action: 'CANCEL_APPROVED', disabled: false },
    ],
    CHECKED: [
        { label: '주문취소', action: 'CANCEL_APPROVED', disabled: false },
        { label: '반품', action: 'RETURN_APPROVED', disabled: false },
    ],
    SHIPPED: [
        { label: '반품', action: 'RETURN_APPROVED', disabled: false },
        { label: '교환', action: 'EXCHANGE_APPROVED', disabled: false },
    ],
    DELIVERED: [
        { label: '반품', action: 'RETURN_APPROVED', disabled: false },
        { label: '교환', action: 'EXCHANGE_APPROVED', disabled: false },
    ],
    PAYMENT_COMPLETED: [
        { label: '취소승인', action: 'CANCEL_APPROVED', disabled: false },
        { label: '취소거절', action: 'CANCEL_REJECTED', disabled: false },
    ],
    REFUND: [
        [
            { label: '반품승인', action: 'RETURN_APPROVED', disabled: false },
            { label: '반품거절', action: 'RETURN_REJECTED', disabled: false },
        ],
        [
            { label: '반품완료', action: 'RETURN_COMPLETED', disabled: true },
            { label: '반품반려', action: 'RETURN_RETURNED', disabled: true },
            { label: '반품보류', action: 'RETURN_ON_HOLD', disabled: true },
        ],
    ],
    CHANGE: [
        [
            { label: '반품승인', action: 'RETURN_APPROVED', disabled: false },
            { label: '반품거절', action: 'RETURN_REJECTED', disabled: false },
        ],
        [
            { label: '반품완료', action: 'RETURN_COMPLETED', disabled: true },
            { label: '반품반려', action: 'RETURN_RETURNED', disabled: true },
            { label: '반품보류', action: 'RETURN_ON_HOLD', disabled: true },
        ],
    ],
} satisfies Record<TabCategory, ButtonConfig[] | ButtonConfig[][]>
