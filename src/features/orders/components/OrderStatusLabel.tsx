import clsx from 'clsx'
import type { OrderStatus } from '../type/orderStatusType'
import { ORDER_STATUS_LABEL_MAP } from '../data/orderStatusMap'

const STYLE_BY_TYPE: Partial<Record<OrderStatus, string>> = {
    PAYMENT_COMPLETED: 'text-gray-600 border-gray-600 text-gray-200',
    EXCHANGE_ITEM_COLLECTED: 'bg-green-50 border-green-800 text-green-800',
    EXCHANGE_ITEM_INSPECTING: 'bg-green-50 border-green-800 text-green-800',
    PURCHASE_CONFIRMED: 'text-gray-800 bg-gray-300 border-gray-600',
    CANCEL_REQUESTED: 'text-[#DE4525] bg-red-50 border-[#DE4525]',
    RETURN_REQUESTED: 'text-gray-600 bg-gray-600 text-white',
}

const OrderStatusLabel = ({ type }: { type: OrderStatus }) => {
    return (
        <div
            className={clsx(
                'inline-block rounded-[4px] border px-1 py-0.5 text-center text-[10px]',
                type in STYLE_BY_TYPE && STYLE_BY_TYPE[type],
            )}
        >
            {ORDER_STATUS_LABEL_MAP[type] ?? type}
        </div>
    )
}

export default OrderStatusLabel
