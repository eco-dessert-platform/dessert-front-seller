import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format, sub } from 'date-fns'

import {
    BgrTabs,
    BgrTabsList,
    BgrTabsTrigger,
} from 'src/shared/components/tab/BGRtab.tsx'
import { Table } from 'src/shared/lib/shadcn/components/ui/table'
import { SSdataTable } from 'src/shared/components/table/SSdataTable'
import { Dialog } from 'src/shared/components/dialog/Dialog'
import OrderStatusLabel from './OrderStatusLabel'
import OrderFilter from './OrderFilter'
import TrackingNumberModal from './TrackingNumberModal'
import RejectModal from './RejectModal'
import OrderDetailModal from './OrderDetailModal'

type TabCategory =
    | 'ALL'
    | 'PAID'
    | 'CHECKED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'PAYMENT_COMPLETED'
    | 'REFUND'
    | 'CHANGE'

type DeliveryStatus =
    | 'PREPARING_PRODUCT'
    | 'SHIPPING'
    | 'COLLECTING'
    | 'COLLECTED'
    | 'DELIVERED'

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

// TODO :: enum 확정 시 할당 및 주석 제거
type Table = {
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

const columnHelper = createColumnHelper<Table>()

// TODO :: API 연동 후, 삭제 처리
const MOCK_ORDERS = [
    {
        deliveryStatus: 'PREPARING_PRODUCT',
        courierCompany: 'CJ 대한통운',
        trackingNumber: '1234567890',
        orderNumber: 'ORDER-20240921-00001',
        paymentAt: '2025-11-08T11:54:18.375192088',
        totalPaid: 200000,
        recipientName: '홍길동',
        orderItems: [
            {
                boardTitle: '예제 1',
                itemName: '예제 2',
                quantity: 2,
                unitPrice: 50000,
                totalPrice: 100000,
                orderStatus: 'PAID',
            },
            {
                boardTitle: '쿠키 1',
                itemName: '쿠키 2',
                quantity: 1,
                unitPrice: 50000,
                totalPrice: 100000,
                orderStatus: 'PAID',
            },
        ],
    },
    {
        deliveryStatus: 'SHIPPING',
        courierCompany: '우체국 택배',
        trackingNumber: '0987654321',
        totalPaid: 100000,
        orderNumber: 'ORDER-20240921-00002',
        paymentAt: '2025-11-08T10:54:18.377200473',
        recipientName: '김철수',
        orderItems: [
            {
                boardTitle: '식빵',
                itemName: '식빵',
                quantity: 2,
                unitPrice: 50000,
                totalPrice: 100000,
                orderStatus: 'PAID',
            },
        ],
    },
    {
        deliveryStatus: 'PREPARING_PRODUCT',
        courierCompany: null,
        trackingNumber: null,
        totalPaid: 150000,
        orderNumber: 'ORDER-20240921-00003',
        paymentAt: '2025-11-09T14:30:22.123456789',
        recipientName: '이영희',
        orderItems: [
            {
                boardTitle: '케이크',
                itemName: '초코케이크',
                quantity: 1,
                unitPrice: 150000,
                totalPrice: 150000,
                orderStatus: 'PAID',
            },
        ],
    },
]

interface OrderSearchFilter {
    orderStatus: string // TODO :: enum type 할당 후, 주석 제거
    startDate: Date
    endDate: Date
    searchType: string // TODO :: enum type 할당 후, 주석 제거
    keyword: string
}

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

    const [modalType, setModalType] = useState<string | null>('orderDetail')

    const buttons: Record<TabCategory, React.ReactNode[]> = {
        ALL: [],
        PAID: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                발주확인
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                주문취소
            </button>,
        ],
        CHECKED: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                주문취소
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품
            </button>,
        ],
        SHIPPED: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                교환
            </button>,
        ],
        DELIVERED: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                교환
            </button>,
        ],
        PAYMENT_COMPLETED: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                취소승인
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                취소거절
            </button>,
        ],
        REFUND: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품승인
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품거절
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품완료
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품반려
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품보류
            </button>,
        ],
        CHANGE: [
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품승인
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품거절
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품완료
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품반려
            </button>,
            <button className="text-12 h-[30px] min-w-[61px] rounded-md border border-gray-200 bg-white font-medium">
                반품보류
            </button>,
        ],
    }

    const handleOrderCheckboxChange = (
        orderNumber: string,
        tableData: Table[],
    ) => {
        setSelectedOrders((prev) => {
            const newSet = new Set(prev)
            const isRemoving = newSet.has(orderNumber)

            if (isRemoving) {
                newSet.delete(orderNumber)
            } else {
                newSet.add(orderNumber)
            }

            // 해당 주문의 모든 상품 row ID를 찾아서 선택/해제
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

    const [response] = useState({
        content: MOCK_ORDERS,
        page: 0,
        size: 10,
        totalPages: 48,
        totalElements: 480,
    })

    // 전체 주문 목록 추출
    const allOrderNumbers = Array.from(
        new Set(response.content.map((order) => order.orderNumber)),
    )

    const handleAllOrdersToggle = () => {
        if (selectedOrders.size === allOrderNumbers.length) {
            setSelectedOrders(new Set())
        } else {
            setSelectedOrders(new Set(allOrderNumbers))
        }
    }

    // 데이터를 Table 타입에 맞게 변환
    const tableData: Table[] = response.content.flatMap((order) =>
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
            accessorFn: (row: Table) => row.orderNumber,
            cell: ({
                row,
                table,
            }: {
                row: { original: Table; id: string }
                table: {
                    getRowModel: () => {
                        rows: { id: string; original: Table }[]
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
            // click된거 체킹해서 없다면 모달
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
                {/* top 20px | input section */}
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
                {/* top 10px | result section */}
                <div className="w-full rounded-lg border border-gray-300 bg-white">
                    <div className="flex items-center justify-between px-6 pt-4 pb-3">
                        <div className="flex items-center gap-4">
                            {/* button 모음 */}
                            <button
                                className="text-primary-500 text-12 border-primary-500 cursor-pointer rounded-md border px-2.5 py-1.5"
                                onClick={handleClickDetail}
                            >
                                상세보기
                            </button>
                            {/* 가변 버튼 영역 */}
                            {buttons[activeTab].map((button) => button)}
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
            {/* MODALS */}
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
