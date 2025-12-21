import clsx from 'clsx'
import type { OrderStatus } from '../type/orderStatusType'
import { ORDER_STATUS_LABEL_MAP } from '../data/orderStatusMap'

/** TODO :: 아래 주석은 디자인 파일에서의 명칭이 백엔드의 enum에서 확인되지 않아, 확인 필요 */
const STYLE_BY_TYPE: Partial<Record<OrderStatus, string>> = {
    PAYMENT_COMPLETED: 'text-gray-600 border-gray-600 text-gray-200',
    // CHECKED: 'text-yellow-800 bg-yellow-50 border-yello-800',
    // READY_PRODUCT: 'text-yellow-800 bg-yellow-50 border-yello-800',
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
