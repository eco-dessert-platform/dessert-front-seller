import { useMemo } from 'react'
import { format } from 'date-fns'
import clsx from 'clsx'

import { createColumnHelper } from '@tanstack/react-table'
import { SSdataTable } from 'src/shared/components/table/SSdataTable'
import type { OrderTableRow } from '../type/orderTableType'
import type { DeliveryStatus, OrderStatus } from '../type/orderStatusType'
import OrderStatusLabel from './OrderStatusLabel'
import { DELIVERY_STATUS_LABEL_MAP } from '../data/orderStatusMap'
import { DATE_FORMAT, PAGINATION } from '../constants/orderConstants'
import { formatPrice } from '../utils/orderUtils'

interface OrderTableProps {
    data: OrderTableRow[]
    selections: {
        orders: Set<string>
        items: Set<string>
    }
    handleSelectOrder: (targetOrderNumber: string) => void
    handleSelectItem: (rowId: string, targetOrderNumber: string) => void
    handleSelectAll: () => void
    isAllSelected: boolean
    isSomeSelected: boolean
    onModifyTrackingNumber?: (orderNumber: string) => void
}

const columnHelper = createColumnHelper<OrderTableRow>()

const OrderTable = ({
    data,
    selections,
    handleSelectOrder,
    handleSelectItem,
    handleSelectAll,
    isAllSelected,
    isSomeSelected,
    onModifyTrackingNumber,
}: OrderTableProps) => {
    const columns = useMemo(() => {
        return [
            {
                id: 'select',
                header: () => {
                    return (
                        <input
                            ref={(el) => {
                                if (el) {
                                    el.indeterminate = isSomeSelected
                                }
                            }}
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            className="accent-primary-500 cursor-pointer"
                        />
                    )
                },
                accessorFn: (row: OrderTableRow) => row.orderNumber,
                cell: ({
                    row,
                }: {
                    row: { original: OrderTableRow; id: string }
                }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`flex items-center justify-center ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            <input
                                type="checkbox"
                                checked={isOrderSelected}
                                onChange={() => handleSelectOrder(orderNumber)}
                                className="accent-primary-500 cursor-pointer"
                            />
                        </div>
                    )
                },
                meta: { merge: true, width: 40 },
            },
            columnHelper.accessor('recipientName', {
                header: '수취인명/주문번호',
                cell: ({ row }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`text-12 flex h-full w-full flex-col justify-center text-center ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            <p>{row.original.recipientName}</p>
                            <p className="font-medium whitespace-normal text-gray-500">
                                {row.original.orderNumber}
                            </p>
                        </div>
                    )
                },
                meta: { merge: true, width: 100 },
            }),
            columnHelper.display({
                id: 'select-item',
                header: () => <div />,
                meta: { width: 40 },
                cell: ({ row }) => {
                    const rowId = row.id
                    const orderNumber = row.original.orderNumber
                    const isItemSelected = selections.items.has(rowId)
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`flex items-center justify-center ${clsx((isItemSelected || isOrderSelected) && 'bg-gray-100')}`}
                        >
                            <input
                                type="checkbox"
                                checked={selections.items.has(rowId)}
                                onChange={() =>
                                    handleSelectItem(rowId, orderNumber)
                                }
                                className="accent-primary-500 cursor-pointer"
                            />
                        </div>
                    )
                },
            }),
            columnHelper.accessor('itemName', {
                header: '상품명',
                cell: ({ row }) => {
                    const rowId = row.id
                    const orderNumber = row.original.orderNumber
                    const isItemSelected = selections.items.has(rowId)
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={clsx(
                                (isOrderSelected || isItemSelected) &&
                                    'bg-gray-100',
                            )}
                        >
                            <p className="text-14 text-gray-900">
                                {row.original.productName}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-12 text-gray-500">
                                    {row.original.itemName} /
                                    {row.original.itemQuantity}개
                                </p>
                                <p className="text-12 font-bold text-gray-800">
                                    {formatPrice(row.original.itemPrice)}
                                </p>
                            </div>
                        </div>
                    )
                },
            }),
            columnHelper.accessor('orderStatus', {
                header: '주문상태',
                meta: { width: 66 },
                cell: ({ row }) => {
                    const rowId = row.id
                    const orderNumber = row.original.orderNumber
                    const isItemSelected = selections.items.has(rowId)
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`flex items-center justify-center ${clsx((isOrderSelected || isItemSelected) && 'bg-gray-100')}`}
                        >
                            <OrderStatusLabel
                                type={row.original.orderStatus as OrderStatus}
                            />
                        </div>
                    )
                },
            }),
            columnHelper.accessor('paymentAt', {
                header: '결제수단/결제일',
                meta: { merge: true, width: 86 },
                cell: ({ row }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`flex flex-col items-center justify-center ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            <p className="text-[10px] text-gray-600">
                                신용카드
                            </p>
                            <p className="text-12 text-gray-800">
                                {format(
                                    new Date(row.original.paymentAt),
                                    DATE_FORMAT.WITH_SPACE,
                                )}
                            </p>
                        </div>
                    )
                },
            }),
            columnHelper.accessor('totalPaid', {
                header: '총 주문금액',
                meta: { merge: true, width: 80 },
                cell: ({ row }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`text-12 flex items-center justify-center ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            {formatPrice(Number(row.original.totalPaid))}
                        </div>
                    )
                },
            }),
            columnHelper.accessor('deliveryStatus', {
                header: '배송상태',
                meta: { merge: true, width: 64 },
                cell: ({ row }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)
                    const deliveryStatus = row.original.deliveryStatus
                    const isValidDeliveryStatus =
                        deliveryStatus in DELIVERY_STATUS_LABEL_MAP

                    return (
                        <div
                            className={`text-12 flex items-center justify-center ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            {isValidDeliveryStatus
                                ? DELIVERY_STATUS_LABEL_MAP[
                                      deliveryStatus as DeliveryStatus
                                  ]
                                : deliveryStatus}
                        </div>
                    )
                },
            }),
            columnHelper.accessor('courierCompany', {
                header: '택배사',
                meta: { merge: true, width: 76 },
                cell: ({ row }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)

                    return (
                        <div
                            className={`text-12 flex items-center justify-center ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            {row.original.courierCompany || '-'}
                        </div>
                    )
                },
            }),
            columnHelper.accessor('trackingNumber', {
                header: '운송장 번호',
                meta: { merge: true, width: 90 },
                cell: ({ row }) => {
                    const orderNumber = row.original.orderNumber
                    const isOrderSelected = selections.orders.has(orderNumber)
                    const trackingNumber = row.original.trackingNumber

                    return (
                        <div
                            className={`text-12 flex flex-col items-center justify-center gap-1 ${clsx(isOrderSelected && 'bg-gray-100')}`}
                        >
                            {trackingNumber ? (
                                <>
                                    <p className="max-w-full break-all whitespace-normal">
                                        {trackingNumber}
                                    </p>
                                    {onModifyTrackingNumber && (
                                        <button
                                            className="h-[30px] w-[56px] rounded-lg border border-gray-200 text-gray-800"
                                            onClick={() =>
                                                onModifyTrackingNumber(
                                                    orderNumber,
                                                )
                                            }
                                        >
                                            수정
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>-</p>
                            )}
                        </div>
                    )
                },
            }),
        ]
    }, [
        selections,
        handleSelectOrder,
        handleSelectItem,
        handleSelectAll,
        isAllSelected,
        isSomeSelected,
        onModifyTrackingNumber,
    ])

    return (
        <SSdataTable
            columns={columns as never}
            data={data}
            styles={{
                headerClassName: 'text-12 tracking-tight px-[5px] bg-gray-200',
            }}
            pagination={{
                enabled: true,
                position: 'top',
                align: 'right',
                pageSize: PAGINATION.PAGE_SIZE,
            }}
        />
    )
}

export default OrderTable
