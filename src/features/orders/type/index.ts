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
    orderNumber?: string
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
    | 'PREPARING_PRODUCT'
    | 'SHIPPING'
    | 'COLLECTING'
    | 'COLLECTED'
    | 'DELIVERED'

export type OrderStatus =
    | 'PAID'
    | 'CHECKED'
    | 'READY_PRODUCT'
    | 'WITHDRAW'
    | 'CONFIRMED'
    | 'DECIDE'
