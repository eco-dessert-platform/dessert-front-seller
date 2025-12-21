import { useCallback, useEffect, useMemo, useState } from 'react'
import { sub } from 'date-fns'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'

import {
    BgrTabs,
    BgrTabsList,
    BgrTabsTrigger,
} from 'src/shared/components/tab/BGRtab.tsx'
import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import OrderFilter from './components/OrderFilter'
import TrackingNumberModal from './components/TrackingNumberModal'
import RejectModal from './components/RejectModal'
import OrderDetailModal from './components/OrderDetailModal'
import OrderControlButtons from './components/OrderControlButtons'
import OrderTable from './components/OrderTable'
import { ordersAction } from './ordersReducer'
import { useOrderSelection } from './hooks/useOrderSelection'
import {
    extractAllOrderNumbers,
    transformOrderToTableRows,
} from './utils/orderUtils'
import type { TabCategory } from './type/orderStatusType'
import type { OrderSearchFilter } from './type/orderFilterType'
import type { SelectOption } from './type/orderModalType'
import {
    DATE_RANGE,
    FILTER_DEFAULTS,
    MODAL_TYPE,
    TAB_CATEGORY,
    UI_TEXT,
} from './constants/orderConstants'
import { SearchType } from './constants/orderEnums'

const TABS: Array<{ key: TabCategory; title: string }> = [
    { key: TAB_CATEGORY.ALL, title: '전체' },
    { key: TAB_CATEGORY.PAID, title: '결제완료' },
    { key: TAB_CATEGORY.CHECKED, title: '발주확인' },
    { key: TAB_CATEGORY.SHIPPED, title: '상품발송' },
    { key: TAB_CATEGORY.DELIVERED, title: '배송완료' },
    { key: TAB_CATEGORY.PAYMENT_COMPLETED, title: '취소' },
    { key: TAB_CATEGORY.REFUND, title: '반품' },
    { key: TAB_CATEGORY.CHANGE, title: '교환' },
]

const ORDER_STATUS_OPTIONS: SelectOption[] = [
    { value: FILTER_DEFAULTS.ORDER_STATUS, label: '전체' },
    { value: TAB_CATEGORY.PAID, label: '결제완료' },
    { value: 'nnnnn', label: '상품준비' },
    { value: TAB_CATEGORY.SHIPPED, label: '상품발송' },
    { value: TAB_CATEGORY.DELIVERED, label: '배송완료' },
]

const SEARCH_OPTIONS: SelectOption[] = [
    { value: SearchType.ORDER_NUMBER, label: '주문번호' },
    { value: SearchType.RECEIVER_NAME, label: '수취인명' },
    { value: SearchType.PRODUCT_NAME, label: '상품명' },
    { value: SearchType.TRACKING_NUMBER, label: '송장번호' },
]

const getInitialFilterValue = (): OrderSearchFilter => ({
    orderStatus: FILTER_DEFAULTS.ORDER_STATUS,
    startDate: sub(new Date(), { weeks: DATE_RANGE.DEFAULT_WEEKS }),
    endDate: new Date(),
    searchType: SearchType.ORDER_NUMBER,
    keyword: '',
})

const Orders = () => {
    const dispatch = useAppDispatch()
    const { orderList } = useAppSelector(
        ({ ordersReducer }) => ({
            orderList: ordersReducer.orderList,
        }),
        shallowEqual,
    )

    const [activeTab, setActiveTab] = useState<TabCategory>(TAB_CATEGORY.ALL)
    const [modalType, setModalType] = useState<string | null>(null)
    const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<{
        orderNumber: string
        trackingNumber?: string
        courierCompany?: string
    } | null>(null)

    useEffect(() => {
        const filterValue = getInitialFilterValue()
        dispatch(ordersAction.getOrderList(filterValue))
    }, [dispatch])

    const response = orderList?.data

    const tableData = useMemo(
        () => (response ? transformOrderToTableRows(response.content) : []),
        [response],
    )

    const allOrderNumbers = useMemo(
        () => (response ? extractAllOrderNumbers(response.content) : []),
        [response],
    )

    const {
        selections,
        handleSelectOrder,
        handleSelectItem,
        handleSelectAll: handleSelectAllOrders,
        isAllSelected,
        isSomeSelected,
    } = useOrderSelection(tableData)

    const handleClickDetail = () => {
        if (selections.orders.size === 0) {
            setModalType(MODAL_TYPE.NO_SELECT)
            return
        }

        setModalType(MODAL_TYPE.ORDER_DETAIL)
    }

    const handleSearch = useCallback(() => {
        const filterValue = getInitialFilterValue()
        dispatch(ordersAction.getOrderList(filterValue))
    }, [dispatch])

    const handleOrderAction = useCallback((_actionType: string) => {
        // TODO :: 주문 상태 변경 API 작업 완료되면 작업 필요
    }, [])

    const handleModifyTrackingNumber = useCallback(
        (orderNumber: string) => {
            const order = response?.content.find(
                (o: { orderNumber: string }) => o.orderNumber === orderNumber,
            )
            if (order) {
                setSelectedOrderForTracking({
                    orderNumber,
                    trackingNumber: order.trackingNumber || undefined,
                    courierCompany: order.courierCompany || undefined,
                })
                setModalType(MODAL_TYPE.MODIFY_TRACKING_NUMBER)
            }
        },
        [response],
    )

    const handleSelectAll = useCallback(() => {
        handleSelectAllOrders(allOrderNumbers, tableData)
    }, [handleSelectAllOrders, allOrderNumbers, tableData])

    const isAllSelectedValue = isAllSelected(allOrderNumbers)
    const isSomeSelectedValue = isSomeSelected(allOrderNumbers)

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
                    key={activeTab}
                    initialFilterValue={getInitialFilterValue()}
                    orderStatusOptions={ORDER_STATUS_OPTIONS}
                    searchOptions={SEARCH_OPTIONS}
                    onSearch={handleSearch}
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
                                        {selections.orders.size}개
                                    </span>
                                </p>
                                <div className="h-3 w-0.5 bg-gray-400" />
                                <p className="text-14 font-normal text-gray-700">
                                    전체
                                    <span className="font-medium">
                                        {response?.content.length ?? 0}개
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {selections.orders.size > 0 && (
                        <div className="px-6 py-2.5">
                            <p className="text-14 rounded-md bg-[#FEF4F2] py-2.5 text-center text-gray-700">
                                이 페이지에 있는 주문
                                <span className="text-primary-500 font-medium">
                                    {selections.orders.size}개
                                </span>
                                가 모두 선택되었습니다.
                            </p>
                        </div>
                    )}
                    <OrderTable
                        data={tableData}
                        selections={selections}
                        handleSelectOrder={handleSelectOrder}
                        handleSelectItem={handleSelectItem}
                        handleSelectAll={handleSelectAll}
                        isAllSelected={isAllSelectedValue}
                        isSomeSelected={isSomeSelectedValue}
                        onModifyTrackingNumber={handleModifyTrackingNumber}
                    />
                </div>
            </div>
            {modalType === MODAL_TYPE.NO_SELECT && (
                <BgrDialog
                    open
                    type="alert"
                    title={UI_TEXT.VALIDATION.NO_SELECT}
                    description={UI_TEXT.VALIDATION.NO_SELECT_DESCRIPTION}
                    onOpenChange={() => {
                        setModalType(null)
                    }}
                />
            )}
            {modalType === MODAL_TYPE.ORDER_DETAIL && (
                <OrderDetailModal
                    orderList={Array.from(selections.orders)}
                    onClose={() => {
                        setModalType(null)
                    }}
                />
            )}
            {modalType === MODAL_TYPE.REGIST_TRACKING_NUMBER && (
                <TrackingNumberModal
                    type="register"
                    onCancel={() => {
                        setModalType(null)
                    }}
                    onConfirm={() => {
                        setModalType(null)
                    }}
                />
            )}
            {modalType === MODAL_TYPE.MODIFY_TRACKING_NUMBER &&
                selectedOrderForTracking && (
                    <TrackingNumberModal
                        type="modify"
                        trackingNumber={selectedOrderForTracking.trackingNumber}
                        courierCompany={selectedOrderForTracking.courierCompany}
                        onCancel={() => {
                            setModalType(null)
                            setSelectedOrderForTracking(null)
                        }}
                        onConfirm={() => {
                            setModalType(null)
                            setSelectedOrderForTracking(null)
                        }}
                    />
                )}
            {modalType === MODAL_TYPE.REFUND && (
                <RejectModal
                    rejectType="CANCEL"
                    title="주문취소 사유"
                    onConfirm={() => {
                        setModalType(null)
                    }}
                    onCancel={() => {
                        setModalType(null)
                    }}
                />
            )}
            {modalType === MODAL_TYPE.CANCEL_REFUSE && (
                <RejectModal
                    rejectType="CANCEL_REFUSE"
                    title="교환 거절 사유"
                    onConfirm={() => {
                        setModalType(null)
                    }}
                    onCancel={() => {
                        setModalType(null)
                    }}
                />
            )}
        </>
    )
}

export default Orders
