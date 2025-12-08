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
