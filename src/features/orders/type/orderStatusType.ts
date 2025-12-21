export type TabCategory =
    | 'ALL'
    | 'PAID'
    | 'CHECKED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'PAYMENT_COMPLETED'
    | 'REFUND'
    | 'CHANGE'

export type CancelOrderStatus =
    | 'CANCEL_REQUESTED'
    | 'CANCEL_APPROVED'
    | 'CANCEL_REJECTED'

export type ReturnOrderStatus =
    | 'RETURN_REQUESTED'
    | 'RETURN_APPROVED'
    | 'RETURN_REJECTED'
    | 'RETURN_PICKUP_IN_PROGRESS'
    | 'RETURN_INSPECTION'
    | 'RETURN_PROCESSING'
    | 'RETURN_RETURNED'
    | 'RETURN_ON_HOLD'
    | 'RETURN_COMPLETED'

export type ExchangeOrderStatus =
    | 'EXCHANGE_REQUEST'
    | 'EXCHANGE_APPROVED'
    | 'EXCHANGE_REJECTED'
    | 'EXCHANGE_ITEM_COLLECTED'
    | 'EXCHANGE_ITEM_INSPECTING'
    | 'EXCHANGE_IN_PROGRESS'
    | 'EXCHANGE_RETURNED'
    | 'EXCHANGE_ON_HOLD'
    | 'EXCHANGE_ITEM_SHIPPED'
    | 'EXCHANGE_COMPLETED'

export type OrderStatus =
    | 'PAYMENT_COMPLETED'
    | 'ORDER_CONFIRMED'
    | 'IN_PRODUCTION'
    | 'SHIPPED'
    | 'PURCHASE_CONFIRMED'
    | CancelOrderStatus
    | ReturnOrderStatus
    | ExchangeOrderStatus

export type PaymentStatus =
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELED'
    | 'REFUNDED'

export type DeliveryStatus =
    | 'NONE'
    | 'PREPARING'
    | 'PICKING_UP'
    | 'PICKED_UP'
    | 'DELIVERING'
    | 'DELIVERED'
