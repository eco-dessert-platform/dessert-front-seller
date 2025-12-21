import type { OrderTableRow } from '../type/orderTableType'
import { DATE_FORMAT } from '../constants/orderConstants'
import { format } from 'date-fns'

/**
 * 주문 데이터를 테이블 행 데이터로 변환
 */
export const transformOrderToTableRows = (
    orders: Array<{
        orderNumber: string
        recipientName: string
        paymentAt: string | Date
        totalPaid: number | string
        deliveryStatus: string
        courierCompany: string | null
        trackingNumber: string | null
        orderItems: Array<{
            boardTitle: string
            itemName: string
            quantity: number
            totalPrice: number
            orderStatus: string
        }>
    }>,
): OrderTableRow[] => {
    return orders.flatMap((order) =>
        order.orderItems.map((item) => ({
            recipientName: order.recipientName,
            productName: item.boardTitle,
            itemName: item.itemName,
            itemQuantity: item.quantity,
            itemPrice: item.totalPrice,
            orderStatus: item.orderStatus,
            orderNumber: order.orderNumber,
            paymentAt:
                typeof order.paymentAt === 'string'
                    ? order.paymentAt
                    : format(order.paymentAt, DATE_FORMAT.STANDARD),
            totalPaid:
                typeof order.totalPaid === 'string'
                    ? order.totalPaid
                    : order.totalPaid.toString(),
            deliveryStatus: order.deliveryStatus,
            courierCompany: order.courierCompany,
            trackingNumber: order.trackingNumber,
        })),
    )
}

/**
 * 모든 주문 번호 추출
 */
export const extractAllOrderNumbers = (
    orders: Array<{ orderNumber: string }>,
): string[] => {
    return Array.from(new Set(orders.map((order) => order.orderNumber)))
}

/**
 * 주문 번호로 그룹화된 행 인덱스 추출
 */
export const getOrderItemIndices = (
    tableData: OrderTableRow[],
    targetOrderNumber: string,
): string[] => {
    return tableData
        .map((item, index) =>
            item.orderNumber === targetOrderNumber ? index.toString() : null,
        )
        .filter((idx): idx is string => idx !== null)
}

/**
 * 모든 아이템이 선택되었는지 확인
 */
export const isAllItemsSelected = (
    indices: string[],
    selectedItems: Set<string>,
): boolean => {
    return indices.length > 0 && indices.every((idx) => selectedItems.has(idx))
}

/**
 * 금액 포맷팅
 */
export const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? Number(price) : price
    return `${numPrice.toLocaleString()}원`
}
