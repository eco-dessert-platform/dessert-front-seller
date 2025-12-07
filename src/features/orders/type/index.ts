export type TabCategory =
    | 'ALL'
    | 'PAID'
    | 'CHECKED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'PAYMENT_COMPLETED'
    | 'REFUND'
    | 'CHANGE'

// TODO :: enum 확정 시 할당 및 주석 제거
export type OrderTableRow = {
    recipientName: string
    productName: string
    itemQuantity: number
    itemPrice: number
    itemName: string
    orderStatus: string // enum
    orderNumber: string
    paymentAt: string
    totalPaid: string
    deliveryStatus: string // enum
    courierCompany: string | null
    trackingNumber: string | null
}

export interface OrderSearchFilter {
    orderStatus: string // TODO :: enum type 할당 후, 주석 제거
    startDate: Date
    endDate: Date
    searchType: string // TODO :: enum type 할당 후, 주석 제거
    keyword: string
}

export type DeliveryStatus =
    | 'NONE'
    | 'PREPARING'
    | 'PICKING_UP'
    | 'PICKED_UP'
    | 'DELIVERING'
    | 'DELIVERED'

export type OrderStatus =
    | 'PAYMENT_COMPLETED'
    | 'ORDER_CONFIRMED'
    | 'IN_PRODUCTION'
    | 'SHIPPED'
    | 'PURCHASE_CONFIRMED'

export type CancelStatus =
    | 'CANCEL_REQUESTED'
    | 'CANCEL_APPROVED'
    | 'CANCEL_REJECTED'

export type ReturnStatus =
    | 'RETURN_REQUESTED'
    | 'RETURN_APPROVED'
    | 'RETURN_REJECTED'
    | 'RETURN_PICKUP_IN_PROGRESS'
    | 'RETURN_INSPECTION'
    | 'RETURN_PROCESSING'
    | 'RETURN_RETURNED'
    | 'RETURN_ON_HOLD'
    | 'RETURN_COMPLETED'

export type ExchangeStatus =
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

export type PaymentStatus =
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELED'
    | 'REFUNDED'
