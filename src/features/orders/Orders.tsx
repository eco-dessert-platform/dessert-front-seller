import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format, sub } from 'date-fns'

import {
    BgrTabs,
    BgrTabsList,
    BgrTabsTrigger,
} from 'src/shared/components/tab/BGRtab.tsx'
import { SSdataTable } from 'src/shared/components/table/SSdataTable'
import { Dialog } from 'src/shared/components/dialog/Dialog'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import OrderStatusLabel from './components/OrderStatusLabel'
import OrderFilter from './components/OrderFilter'
import TrackingNumberModal from './components/TrackingNumberModal'
import RejectModal from './components/RejectModal'
import OrderDetailModal from './components/OrderDetailModal'
import { MOCK_ORDERS } from './data/ordersMockData'
import type {
    TabCategory,
    OrderTableRow,
    OrderSearchFilter,
    DeliveryStatus,
} from './type'
import OrderControlButtons from './components/OrderControlButtons'

const DELIVERY_STATUS_MAP: Record<DeliveryStatus, string> = {
    PREPARING_PRODUCT: '-',
    SHIPPING: '상품배송',
    COLLECTING: '수거중',
    COLLECTED: '수거완료',
    DELIVERED: '배송완료',
}

// TODO :: unknown key 확정 시 할당 및 주석 제거
const TABS: Array<{ key: TabCategory; title: string }> = [
    { key: 'ALL', title: '전체' },
    { key: 'PAID', title: '결제완료' }, // unknown key
    { key: 'CHECKED', title: '발주확인' }, // unknown key
    { key: 'SHIPPED', title: '상품발송' },
    { key: 'DELIVERED', title: '배송완료' },
    { key: 'PAYMENT_COMPLETED', title: '취소' },
    { key: 'REFUND', title: '반품' }, //  unknown key
    { key: 'CHANGE', title: '교환' }, // unknown key
]

const columnHelper = createColumnHelper<OrderTableRow>()

const Orders = () => {
    const [activeTab, setActiveTab] = useState<TabCategory>('ALL')
    const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
    const [orderFilter, setOrderFilter] = useState<OrderSearchFilter>({
        orderStatus: 'ALL',
        startDate: sub(new Date(), { weeks: 1 }),
        endDate: new Date(),
        searchType: 'ORDER_NUMBER',
        keyword: '',
    })
    const [response] = useState({
        content: MOCK_ORDERS,
        page: 0,
        size: 10,
        totalPages: 48,
        totalElements: 480,
    })

    const [modalType, setModalType] = useState<string | null>(null)

    // 데이터를 Table 타입에 맞게 변환
    const tableData: OrderTableRow[] = response.content.flatMap((order) =>
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

    const handleOrderCheckboxChange = (
        orderNumber: string,
        tableData: OrderTableRow[],
    ) => {
        setSelectedOrders((prev) => {
            const newSet = new Set(prev)
            const isRemoving = newSet.has(orderNumber)

            if (isRemoving) {
                newSet.delete(orderNumber)
            } else {
                newSet.add(orderNumber)
            }

            setSelectedItems((prevItems) => {
                const newItemSet = new Set(prevItems)
                tableData.forEach((row, index) => {
                    if (row.orderNumber === orderNumber) {
                        if (isRemoving) {
                            newItemSet.delete(index.toString())
                        } else {
                            newItemSet.add(index.toString())
                        }
                    }
                })

                return newItemSet
            })

            return newSet
        })
    }

    const handleAllOrdersToggle = () => {
        if (selectedOrders.size === allOrderNumbers.length) {
            setSelectedOrders(new Set())
            setSelectedItems(new Set())
        } else {
            setSelectedOrders(new Set(allOrderNumbers))
            setSelectedItems(
                new Set(Array.from(tableData, (_, idx) => idx.toString())),
            )
        }
    }

    const handleResetFilter = () => {
        setOrderFilter({
            orderStatus: 'ALL',
            startDate: sub(new Date(), { weeks: 1 }),
            endDate: new Date(),
            searchType: 'ORDER_NUMBER',
            keyword: '',
        })
    }

    const handleClickDetail = () => {
        if (selectedOrders.size === 0) {
            setModalType('noSelect')
            return
        }

        // TODO :: 주문번호 넘겨야 함
        setModalType('orderDetail')
    }

    const handleSearch = () => {
        if (!orderFilter.keyword) {
            setModalType('noKeyword')
            return
        }

        // TODO :: API 요청 함수 할당 필요
    }

    // 전체 주문 목록 추출
    const allOrderNumbers = Array.from(
        new Set(response.content.map((order) => order.orderNumber)),
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: any = [
        {
            id: 'select',
            header: () => {
                const isAllSelected =
                    selectedOrders.size === allOrderNumbers.length &&
                    allOrderNumbers.length > 0
                const isSomeSelected =
                    selectedOrders.size > 0 &&
                    selectedOrders.size < allOrderNumbers.length

                return (
                    <input
                        ref={(el) => {
                            if (el) {
                                el.indeterminate = isSomeSelected
                            }
                        }}
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleAllOrdersToggle}
                        className="cursor-pointer"
                    />
                )
            },
            accessorFn: (row: OrderTableRow) => row.orderNumber,
            cell: ({
                row,
                table,
            }: {
                row: { original: OrderTableRow; id: string }
                table: {
                    getRowModel: () => {
                        rows: { id: string; original: OrderTableRow }[]
                    }
                    toggleAllRowsSelected: (value: boolean) => void
                }
            }) => {
                const orderNumber = row.original.orderNumber
                if (!orderNumber) return null

                const isOrderSelected = selectedOrders.has(orderNumber)

                const handleChange = () => {
                    const isCurrentlySelected = selectedOrders.has(orderNumber)

                    // 주문 선택 상태 토글
                    handleOrderCheckboxChange(orderNumber, tableData)

                    // 해당 주문의 모든 상품 행을 찾아서 선택/해제
                    const allRows = table.getRowModel().rows
                    allRows.forEach((r) => {
                        if (r.original.orderNumber === orderNumber) {
                            const rowId = r.id
                            if (isCurrentlySelected) {
                                setSelectedItems((prev) => {
                                    const newSet = new Set(prev)
                                    newSet.delete(rowId)
                                    return newSet
                                })
                            } else {
                                setSelectedItems((prev) =>
                                    new Set(prev).add(rowId),
                                )
                            }
                        }
                    })
                }

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                        <input
                            type="checkbox"
                            checked={isOrderSelected}
                            onChange={handleChange}
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
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                return (
                    <div
                        className={`flex flex-col ${isOrderSelected ? 'bg-gray-100' : ''}`}
                    >
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
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                const handleItemCheckboxChange = () => {
                    setSelectedItems((prev) => {
                        const newSet = new Set(prev)
                        if (newSet.has(rowId)) {
                            newSet.delete(rowId)
                        } else {
                            newSet.add(rowId)
                        }

                        if (orderNumber) {
                            const orderItemIndices = tableData
                                .map((item, index) =>
                                    item.orderNumber === orderNumber
                                        ? index.toString()
                                        : null,
                                )
                                .filter((idx) => idx !== null) as string[]

                            const allItemsSelected = orderItemIndices.every(
                                (idx) => newSet.has(idx),
                            )

                            setSelectedOrders((prevOrders) => {
                                const newOrderSet = new Set(prevOrders)
                                if (allItemsSelected) {
                                    newOrderSet.add(orderNumber)
                                } else {
                                    newOrderSet.delete(orderNumber)
                                }
                                return newOrderSet
                            })
                        }

                        return newSet
                    })
                }

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                        <input
                            type="checkbox"
                            checked={selectedItems.has(rowId)}
                            onChange={handleItemCheckboxChange}
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
                const isItemSelected = selectedItems.has(rowId)
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                return (
                    <div
                        className={
                            isOrderSelected || isItemSelected
                                ? 'bg-gray-100'
                                : ''
                        }
                    >
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
                const rowId = row.id
                const orderNumber = row.original.orderNumber
                const isItemSelected = selectedItems.has(rowId)
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                return (
                    <div
                        className={
                            isOrderSelected || isItemSelected
                                ? 'bg-gray-100'
                                : ''
                        }
                    >
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
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                        {format(row.original.paymentAt, 'yyyy.MM.dd')}
                    </div>
                )
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('totalPaid', {
            header: '총 주문금액',
            cell: ({ row }) => {
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                        {Number(row.original.totalPaid).toLocaleString()}
                    </div>
                )
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('deliveryStatus', {
            header: '배송상태',
            cell: ({ row }) => {
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false
                const deliveryStatus = row.original.deliveryStatus
                const isValidDeliveryStatus =
                    deliveryStatus in DELIVERY_STATUS_MAP

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
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
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                        {row.original.courierCompany || '-'}
                    </div>
                )
            },
            meta: { merge: true },
        }),
        columnHelper.accessor('trackingNumber', {
            header: '운송장 번호',
            cell: ({ row }) => {
                const orderNumber = row.original.orderNumber
                const isOrderSelected = orderNumber
                    ? selectedOrders.has(orderNumber)
                    : false
                const trackingNumber = row.original.trackingNumber

                return (
                    <div className={isOrderSelected ? 'bg-gray-100' : ''}>
                        {trackingNumber ? (
                            <div className="flex flex-col gap-1">
                                <span>{trackingNumber}</span>
                                <button
                                    className="text-12 h-[30px] w-[56px] rounded-lg border border-gray-200 text-gray-800"
                                    onClick={() =>
                                        setModalType('modifyTrackingNumber')
                                    }
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

    const handleOrderAction = (actionType: string) => {
        // TODO :: 주문 상태 변경 API 작업 완료되면 작업 필요
    }

    useEffect(() => {
        handleResetFilter()
    }, [activeTab])

    return (
        <>
            <BgrTabs
                value={activeTab}
                onValueChange={(changedTab) => {
                    // type 에러
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
                        setOrderFilter((prev) => ({
                            ...prev,
                            searchType: nextSearchType,
                        }))
                    }}
                    onChangeOrderStatus={(nextOrderStatus) => {
                        setOrderFilter((prev) => ({
                            ...prev,
                            orderStatus: nextOrderStatus,
                        }))
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
                                onClick={handleClickDetail}
                            >
                                상세보기
                            </Button>
                            <OrderControlButtons
                                activeTab={activeTab}
                                onClick={handleOrderAction}
                            />
                            <div className="flex items-center gap-1">
                                <p className="text-14 font-normal text-gray-700">
                                    선택
                                    <span className="text-primary-500 font-medium">
                                        {selectedOrders.size}개
                                    </span>
                                </p>
                                <div className="h-3 w-0.5 bg-gray-400" />
                                <p className="text-14 font-normal text-gray-700">
                                    전체
                                    <span className="font-medium">
                                        {response.content.length ?? 0}개
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {selectedOrders.size > 0 && (
                        <div className="px-6 py-2.5">
                            <p className="text-14 rounded-md bg-[#FEF4F2] py-2.5 text-center text-gray-700">
                                이 페이지에 있는 주문{' '}
                                <span className="text-primary-500 font-medium">
                                    {selectedOrders.size}개
                                </span>
                                가 모두 선택되었습니다.
                            </p>
                        </div>
                    )}
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
            {/* TODO :: 협의 후, 전역 모달로 분리 & REFACTORING */}
            {modalType && (
                <Dialog
                    open={modalType === 'noSelect'}
                    type="alert"
                    title="주문을 선택해주세요."
                    description="상세 주문정보를 확인하려면 주문 체크박스를 선택해주세요."
                    onOpenChange={() => {
                        setModalType(null)
                    }}
                />
            )}
            {modalType && (
                <Dialog
                    open={modalType === 'noKeyword'}
                    type="alert"
                    title="상세 검색 내용을 입력해주세요."
                    onOpenChange={() => {
                        setModalType(null)
                    }}
                />
            )}
            {
                // TODO :: onConfirm에 API 추가
                modalType && modalType === 'registTrackingNumber' && (
                    <TrackingNumberModal
                        type="register"
                        onCancel={() => {
                            setModalType(null)
                        }}
                        onConfirm={() => {
                            setModalType(null)
                        }}
                    />
                )
            }
            {
                // TODO :: 모달 open 시, trackingNumber와 courierCompany 넘겨야 함
                modalType && modalType === 'modifyTrackingNumber' && (
                    <TrackingNumberModal
                        type="modify"
                        trackingNumber={'123'}
                        courierCompany={'321312'}
                        onCancel={() => {
                            setModalType(null)
                        }}
                        onConfirm={() => {
                            setModalType(null)
                        }}
                    />
                )
            }
            {modalType && modalType === 'refund' && (
                <RejectModal
                    // TODO :: 임시
                    rejectType="CANCEL"
                    title="주문취소 사유"
                    onConfirm={() => {}}
                />
            )}
            {modalType && modalType === 'cancelRefuse' && (
                <RejectModal
                    // TODO :: 임시
                    rejectType="CANCEL_REFUSE"
                    title="교환 거절 사유"
                    onConfirm={() => {}}
                />
            )}
            {modalType && modalType === 'orderDetail' && (
                <OrderDetailModal
                    orderList={Array.from(selectedOrders)}
                    onClose={() => {
                        setModalType(null)
                    }}
                />
            )}
        </>
    )
}

export default Orders
