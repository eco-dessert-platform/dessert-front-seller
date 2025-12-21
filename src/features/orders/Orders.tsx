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
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import OrderFilter from './components/OrderFilter'
import OrderControlButtons from './components/OrderControlButtons'
import OrderModals from './components/orderModals/OrderModals.tsx'
import OrderTable from './components/OrderTable'
import { ordersAction } from './ordersReducer'
import { useOrderSelection } from './hooks/useOrderSelection'
import { useOrderModal } from './hooks/useOrderModal'
import {
    extractAllOrderNumbers,
    transformOrderToTableRows,
} from './utils/orderUtils'
import type { TabCategory } from './type/orderStatusType'
import type { OrderSearchFilter } from './type/orderFilterType'
import {
    DATE_RANGE,
    FILTER_DEFAULTS,
    MODAL_TYPE,
    TAB_CATEGORY,
} from './constants/orderConstants'
import { SearchType } from './constants/orderEnums'
import { ORDER_TABS } from './constants/orderTabs'
import {
    ORDER_STATUS_OPTIONS,
    SEARCH_OPTIONS,
} from './constants/orderFilterOptions'

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
    const { modalState, openModal, closeModal } = useOrderModal()

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
            openModal({ type: MODAL_TYPE.NO_SELECT })
            return
        }

        openModal({
            type: MODAL_TYPE.ORDER_DETAIL,
            orderList: Array.from(selections.orders),
        })
    }

    const handleSearch = useCallback(() => {
        const filterValue = getInitialFilterValue()
        dispatch(ordersAction.getOrderList(filterValue))
    }, [dispatch])

    const handleOrderAction = useCallback((actionType: string) => {
        // TODO :: 주문 상태 변경 API 작업 완료되면 작업 필요
    }, [])

    const handleModifyTrackingNumber = useCallback(
        (orderNumber: string) => {
            const order = response?.content.find(
                (o: { orderNumber: string }) => o.orderNumber === orderNumber,
            )
            if (order) {
                openModal({
                    type: MODAL_TYPE.MODIFY_TRACKING_NUMBER,
                    orderNumber,
                    trackingNumber: order.trackingNumber || undefined,
                    courierCompany: order.courierCompany || undefined,
                })
            }
        },
        [response, openModal],
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
                    {ORDER_TABS.map(({ key, title }) => (
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
            {modalState && <OrderModals modalState={modalState} onClose={closeModal} />}
        </>
    )
}

export default Orders
