import type { DeliveryStatus, OrderStatus } from '../type/orderStatusType'

export const DELIVERY_STATUS_LABEL_MAP = {
    NONE: '-',
    PREPARING: '-',
    DELIVERING: '배송중',
    PICKING_UP: '수거중',
    PICKED_UP: '수거완료',
    DELIVERED: '배송완료',
} as const satisfies Record<DeliveryStatus, string>

export const ORDER_STATUS_LABEL_MAP = {
    // 일반 주문 상태
    PAYMENT_COMPLETED: '결제완료',
    ORDER_CONFIRMED: '발주확인',
    IN_PRODUCTION: '상품제작중',
    SHIPPED: '상품발송',
    PURCHASE_CONFIRMED: '구매확정',
    // 취소
    CANCEL_REQUESTED: '취소요청',
    CANCEL_APPROVED: '취소승인',
    CANCEL_REJECTED: '취소반려',
    // 반품
    RETURN_REQUESTED: '반품 요청',
    RETURN_APPROVED: '반품 승인',
    RETURN_REJECTED: '반품 거절',
    RETURN_PICKUP_IN_PROGRESS: '상품 회수 중',
    RETURN_INSPECTION: '상품 확인중',
    RETURN_PROCESSING: '반품 진행',
    RETURN_RETURNED: '반품 반려',
    RETURN_ON_HOLD: '반품 보류',
    RETURN_COMPLETED: '반품 완료',
    // 교환
    EXCHANGE_REQUEST: '교환요청',
    EXCHANGE_APPROVED: '교환 승인',
    EXCHANGE_REJECTED: '교환 거절',
    EXCHANGE_ITEM_COLLECTED: '상품 회수',
    EXCHANGE_ITEM_INSPECTING: '상품 확인중',
    EXCHANGE_IN_PROGRESS: '교환 진행',
    EXCHANGE_RETURNED: '교환 반려',
    EXCHANGE_ON_HOLD: '교환 보류',
    EXCHANGE_ITEM_SHIPPED: '상품 발송',
    EXCHANGE_COMPLETED: '교환 완료',
} as const satisfies Record<OrderStatus, string>
