import { useState } from 'react'
import { format, sub } from 'date-fns'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import {
    BgrTabs,
    BgrTabsList,
    BgrTabsTrigger,
} from 'src/shared/components/tab/BGRtab'
import { SSdataTable } from 'src/shared/components/table/SSdataTable'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import { MOCK_ORDER_COMPLETED } from './data/ordersMockData'
import OrderFilter from './components/OrderFilter'
import type { OrderTableRow } from './type/orderTableType'
import OrderStatusLabel from './components/OrderStatusLabel'
import type { DeliveryStatus } from './type/orderStatusType'

const DELIVERY_STATUS_MAP: Record<DeliveryStatus, string> = {
    NONE: '-',
    PREPARING: '-',
    DELIVERING: '상품배송',
    PICKING_UP: '수거중',
    PICKED_UP: '수거완료',
    DELIVERED: '배송완료',
}

type TabCategory = 'PURCHASED' | 'CANCELED' | 'RETURNED' | 'EXCHANGED'

const TABS: Array<{ key: TabCategory; title: string }> = [
    { key: 'PURCHASED', title: '완료' },
    { key: 'CANCELED', title: '취소' },
    { key: 'RETURNED', title: '반품' },
    { key: 'EXCHANGED', title: '교환' },
]

type FilterOrderStatusType =
    | 'ALL'
    | 'PURCHASE_CONFIRMED'
    | 'CANCEL_COMPLETED'
    | 'CANCEL_REJECTED'
    | 'RETURN_REJECTED'
    | 'RETURN_COMPLETED'
    | 'RETURN_RETURNED'
    | 'EXCHANGE_REJECTED'
    | 'EXCHANGE_COMPLETED'
    | 'EXCHANGE_RETURNED'

const ORDER_STATUS_OPTIONS: Array<{
    value: FilterOrderStatusType
    label: string
}> = [
    { value: 'ALL', label: '전체' },
    { value: 'PURCHASE_CONFIRMED', label: '구매확정' },
    // TODO :: 취소 완료라는 상태가 없어, 확인 필요
    { value: 'CANCEL_COMPLETED', label: '취소 완료' },
    { value: 'CANCEL_REJECTED', label: '취소 거절' },
    { value: 'RETURN_REJECTED', label: '반품 거절' },
    { value: 'RETURN_COMPLETED', label: '반품 완료' },
    { value: 'RETURN_RETURNED', label: '반품 반려' },
    { value: 'EXCHANGE_REJECTED', label: '교환 거절' },
    { value: 'EXCHANGE_COMPLETED', label: '교환 완료' },
    { value: 'EXCHANGE_RETURNED', label: '교환 반려' },
]

/**
 * 상세조건 select 종류
 *
 * 주문번호(Default) - ORDER_NUMBER
 * 수취인명 - BUYER_NAME
 * 상품명 - PRODUCT_NAME
 * 송장번호 - TRACKING_NUMBER
 */

type FilterSearchType =
    | 'BUYER_NAME'
    | 'ORDER_NUMBER'
    | 'PRODUCT_NAME'
    | 'TRACKING_NUMBER'

interface SearchFilter {
    orderStatus: FilterOrderStatusType
    startDate: Date
    endDate: Date
    searchType: FilterSearchType
    keyword: string
}

const columnHelper = createColumnHelper<OrderTableRow>()

const OrderCompleted = () => {
    const [activeTab, setActiveTab] = useState<TabCategory>('PURCHASED')
    const [orderContent, setOrderContent] = useState(MOCK_ORDER_COMPLETED)
    const [modalType, setModalType] = useState<string | null>(null)
    const [orderFilter, setOrderFilter] = useState<SearchFilter>({
        orderStatus: 'ALL',
        startDate: sub(new Date(), { months: 1 }),
        endDate: new Date(),
        searchType: 'ORDER_NUMBER',
        keyword: '',
    })

    const handleResetFilter = () => {
        setOrderFilter({
            orderStatus: 'ALL',
            startDate: sub(new Date(), { weeks: 1 }),
            endDate: new Date(),
            searchType: 'ORDER_NUMBER',
            keyword: '',
        })
    }

    const handleSearch = () => {
        if (!orderFilter.keyword) {
            setModalType('noKeyword')
            return
        }

        // TODO :: API 요청 함수 할당 필요
    }

    const tableData: OrderTableRow[] = orderContent.content.flatMap((order) =>
        order.orderItems.map((item) => ({
            recipientName: order.recipientName,
            productName: item.boardTitle,
            itemName: item.itemName,
            itemQuantity: item.quantity,
            itemPrice: item.totalPrice,
            orderStatus: item.orderStatus,
            orderNumber: order.orderNumber,
            paymentAt: order.paymentAt,
            totalPaid: order.totalPaid.toString(),
            deliveryStatus: order.deliveryStatus,
            courierCompany: order.courierCompany,
            trackingNumber: order.trackingNumber,
        })),
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnDef<OrderTableRow, any>[] = [
        {
            id: 'select',
            header: () => {
                // const isAllSelected =
                //     selections.orders.size === allOrderNumbers.length &&
                //     allOrderNumbers.length > 0
                // const isSomeSelected =
                //     selections.orders.size > 0 &&
                //     selections.orders.size < allOrderNumbers.length

                return (
                    <input
                        ref={(el) => {
                            // if (el) {
                            //     el.indeterminate = isSomeSelected
                            // }
                        }}
                        type="checkbox"
                        // checked={isAllSelected}
                        disabled
                        // onChange={() => {
                        //     if (
                        //         selections.orders.size ===
                        //         allOrderNumbers.length
                        //     ) {
                        //         setSelections({
                        //             orders: new Set(),
                        //             items: new Set(),
                        //         })
                        //     } else {
                        //         setSelections({
                        //             orders: new Set(allOrderNumbers),
                        //             items: new Set(
                        //                 Array.from(tableData, (_, idx) =>
                        //                     idx.toString(),
                        //                 ),
                        //             ),
                        //         })
                        //     }
                        // }}
                        className="cursor-pointer"
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
                // const isOrderSelected = selections.orders.has(orderNumber)

                return (
                    // <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                    <div>
                        <input
                            type="checkbox"
                            disabled
                            // checked={isOrderSelected}
                            // onChange={() => handleSelectOrder(orderNumber)}
                            className="cursor-pointer"
                        />
                    </div>
                )
            },
            meta: { merge: true },
        },
        columnHelper.accessor('recipientName', {
            header: '수취인명/주문번호',
            cell: ({ row }) => {
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)

                return (
                    <div className="flex flex-col">
                        <span>{row.original.recipientName}</span>
                        <span className="text-12 font-medium text-gray-500">
                            {row.original.orderNumber}
                        </span>
                    </div>
                )
            },
            meta: { merge: true },
        }),
        columnHelper.display({
            id: 'select-item',
            header: () => <div />,
            cell: ({ row }) => {
                const rowId = row.id
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)

                return (
                    <div>
                        <input
                            type="checkbox"
                            disabled
                            // checked={selections.items.has(rowId)}
                            // onChange={() =>
                            //     handleSelectItem(rowId, orderNumber)
                            // }
                            className="cursor-pointer"
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
                // const isItemSelected = selections.items.has(rowId)
                // const isOrderSelected = selections.orders.has(orderNumber)

                return (
                    <div>
                        <p className="text-14 text-gray-900">
                            {row.original.productName}
                        </p>
                        <div className="flex items-center gap-2">
                            <p className="text-12 text-gray-500">
                                {row.original.itemName} /{' '}
                                {row.original.itemQuantity}개
                            </p>
                            <p className="text-12 font-bold text-gray-800">
                                {row.original.itemPrice.toLocaleString()}원
                            </p>
                        </div>
                    </div>
                )
            },
        }),
        columnHelper.accessor('orderStatus', {
            header: '주문상태',
            cell: ({ row }) => {
                // const rowId = row.id
                // const orderNumber = row.original.orderNumber
                // const isItemSelected = selections.items.has(rowId)
                // const isOrderSelected = selections.orders.has(orderNumber)

                return (
                    <div>
                        <OrderStatusLabel
                            type={row.original.orderStatus}
                            text={row.original.orderStatus}
                        />
                    </div>
                )
            },
        }),
        columnHelper.accessor('paymentAt', {
            header: '결제수단/결제일',
            cell: ({ row }) => {
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)

                return <div>{format(row.original.paymentAt, 'yyyy.MM.dd')}</div>
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('totalPaid', {
            header: '총 주문금액',
            cell: ({ row }) => {
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)

                return (
                    <div>{Number(row.original.totalPaid).toLocaleString()}</div>
                )
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('deliveryStatus', {
            header: '배송상태',
            cell: ({ row }) => {
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)
                const deliveryStatus = row.original.deliveryStatus
                const isValidDeliveryStatus =
                    deliveryStatus in DELIVERY_STATUS_MAP

                return (
                    <div>
                        {isValidDeliveryStatus
                            ? DELIVERY_STATUS_MAP[
                                  deliveryStatus as DeliveryStatus
                              ]
                            : deliveryStatus}
                    </div>
                )
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('courierCompany', {
            header: '택배사',
            cell: ({ row }) => {
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)

                return <div>{row.original.courierCompany || '-'}</div>
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('trackingNumber', {
            header: '운송장 번호',
            cell: ({ row }) => {
                // const orderNumber = row.original.orderNumber
                // const isOrderSelected = selections.orders.has(orderNumber)
                const trackingNumber = row.original.trackingNumber

                return (
                    <div>
                        {trackingNumber ? (
                            <div className="flex flex-col gap-1">
                                <span>{trackingNumber}</span>
                                <button
                                    className="text-12 h-[30px] w-[56px] rounded-lg border border-gray-200 text-gray-800"
                                    // onClick={() =>
                                    //     setModalType('modifyTrackingNumber')
                                    // }
                                    // TODO :: 수정이 필요한가?
                                >
                                    수정
                                </button>
                            </div>
                        ) : (
                            <span>-</span>
                        )}
                    </div>
                )
            },
            meta: { merge: true },
        }),
    ]

    return (
        <>
            <BgrTabs
                value={activeTab}
                onValueChange={(changedTab) => {
                    setActiveTab(changedTab as TabCategory)
                }}
            >
                <BgrTabsList>
                    {TABS.map(({ key, title }) => (
                        // TODO :: number value API 응답으로 받아야 함
                        <BgrTabsTrigger key={key} value={key} number={12}>
                            <p>{title}</p>
                        </BgrTabsTrigger>
                    ))}
                </BgrTabsList>
            </BgrTabs>
            <div className="flex flex-col gap-2.5 pt-5">
                <OrderFilter
                    filterValue={orderFilter}
                    onChangeDate={({ startDate, endDate }) => {
                        setOrderFilter((prev) => ({
                            ...prev,
                            startDate,
                            endDate,
                        }))
                    }}
                    onChangeSearchType={(nextSearchType) => {
                        // setOrderFilter((prev) => ({
                        //     ...prev,
                        //     searchType: nextSearchType,
                        // }))
                    }}
                    onChangeOrderStatus={(nextOrderStatus) => {
                        // setOrderFilter((prev) => ({
                        //     ...prev,
                        //     orderStatus: nextOrderStatus,
                        // }))
                    }}
                    onChangeKeyword={(nextKeyword) => {
                        setOrderFilter((prev) => ({
                            ...prev,
                            keyword: nextKeyword,
                        }))
                    }}
                    onSearch={handleSearch}
                    onReset={handleResetFilter}
                />
                <div className="w-full rounded-lg border border-gray-300 bg-white">
                    <div className="flex items-center justify-between px-6 pt-4 pb-3">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="text-primary-500 text-12 border-primary-500 h-[30px] w-[61px] cursor-pointer rounded-md border p-0"
                                onClick={() => {}}
                                // TODO :: 체크박스가 모두 disabled이면 필요 없음
                                // onClick={handleClickDetail}
                            >
                                상세보기
                            </Button>
                            <div className="flex items-center gap-1">
                                <p className="text-14 font-normal text-gray-700">
                                    선택
                                    <span className="text-primary-500 font-medium">
                                        {/* TODO :: 완전 disabled인건지 확실하지 않음 */}
                                        {0}개
                                    </span>
                                </p>
                                <div className="h-3 w-0.5 bg-gray-400" />
                                <p className="text-14 font-normal text-gray-700">
                                    전체
                                    <span className="font-medium">
                                        {orderContent.content.length ?? 0}개
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <SSdataTable
                        columns={columns}
                        data={tableData}
                        pagination={{
                            enabled: true,
                            position: 'top',
                            pageSize: 100,
                        }}
                    />
                    {/* TODO :: empty UI */}

                    {/* TODO :: checkbox에 대한 MESSAGE UI */}
                </div>
            </div>
            {modalType && (
                <BgrDialog
                    open={modalType === 'noKeyword'}
                    type="alert"
                    title="상세 검색 내용을 입력해주세요."
                    onOpenChange={() => {
                        setModalType(null)
                    }}
                />
            )}
        </>
    )
}

export default OrderCompleted
