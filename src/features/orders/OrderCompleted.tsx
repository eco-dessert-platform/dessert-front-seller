import { useCallback, useMemo, useState } from 'react'
import { sub } from 'date-fns'

import {
    BgrTabs,
    BgrTabsList,
    BgrTabsTrigger,
} from 'src/shared/components/tab/BGRtab'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import { MOCK_ORDER_COMPLETED } from './data/ordersMockData'
import OrderFilter from './components/OrderFilter'
import OrderTable from './components/OrderTable'
import OrderDetailModal from './components/OrderDetailModal'
import { useOrderSelection } from './hooks/useOrderSelection'
import {
    extractAllOrderNumbers,
    transformOrderToTableRows,
} from './utils/orderUtils'
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

type TabCategory = 'PURCHASED' | 'CANCELED' | 'RETURNED' | 'EXCHANGED'

const TABS: Array<{ key: TabCategory; title: string }> = [
    { key: TAB_CATEGORY.PURCHASED, title: '완료' },
    { key: TAB_CATEGORY.CANCELED, title: '취소' },
    { key: TAB_CATEGORY.RETURNED, title: '반품' },
    { key: TAB_CATEGORY.EXCHANGED, title: '교환' },
]

const ORDER_STATUS_OPTIONS: SelectOption[] = [
    { value: FILTER_DEFAULTS.ORDER_STATUS, label: '전체' },
    { value: 'PURCHASE_CONFIRMED', label: '구매확정' },
    { value: 'CANCEL_COMPLETED', label: '취소 완료' },
    { value: 'CANCEL_REJECTED', label: '취소 거절' },
    { value: 'RETURN_REJECTED', label: '반품 거절' },
    { value: 'RETURN_COMPLETED', label: '반품 완료' },
    { value: 'RETURN_RETURNED', label: '반품 반려' },
    { value: 'EXCHANGE_REJECTED', label: '교환 거절' },
    { value: 'EXCHANGE_COMPLETED', label: '교환 완료' },
    { value: 'EXCHANGE_RETURNED', label: '교환 반려' },
]

const SEARCH_OPTIONS: SelectOption[] = [
    { value: SearchType.ORDER_NUMBER, label: '주문번호' },
    { value: SearchType.BUYER_NAME, label: '수취인명' },
    { value: SearchType.PRODUCT_NAME, label: '상품명' },
    { value: SearchType.TRACKING_NUMBER, label: '송장번호' },
]

const getInitialFilterValue = (): OrderSearchFilter => ({
    orderStatus: FILTER_DEFAULTS.ORDER_STATUS,
    startDate: sub(new Date(), { months: DATE_RANGE.DEFAULT_MONTHS }),
    endDate: new Date(),
    searchType: SearchType.ORDER_NUMBER,
    keyword: '',
})

const OrderCompleted = () => {
    const [activeTab, setActiveTab] = useState<TabCategory>(
        TAB_CATEGORY.PURCHASED,
    )
    const [orderContent] = useState(MOCK_ORDER_COMPLETED)
    const [modalType, setModalType] = useState<string | null>(null)

    const tableData = useMemo(
        () => transformOrderToTableRows(orderContent.content),
        [orderContent.content],
    )

    const allOrderNumbers = useMemo(
        () => extractAllOrderNumbers(orderContent.content),
        [orderContent.content],
    )

    const {
        selections,
        handleSelectOrder,
        handleSelectItem,
        handleSelectAll: handleSelectAllOrders,
        isAllSelected,
        isSomeSelected,
    } = useOrderSelection(tableData)

    const handleSearch = useCallback(() => {
        // TODO :: API 요청 함수 할당 필요
    }, [])

    const handleSelectAll = useCallback(() => {
        handleSelectAllOrders(allOrderNumbers, tableData)
    }, [handleSelectAllOrders, allOrderNumbers, tableData])

    const isAllSelectedValue = isAllSelected(allOrderNumbers)
    const isSomeSelectedValue = isSomeSelected(allOrderNumbers)

    const handleClickDetail = () => {
        if (selections.orders.size === 0) {
            setModalType(MODAL_TYPE.NO_SELECT)
            return
        }

        setModalType(MODAL_TYPE.ORDER_DETAIL)
    }

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
                                        {orderContent.content.length ?? 0}개
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
                    />
                </div>
            </div>
            {modalType === MODAL_TYPE.ORDER_DETAIL && (
                <OrderDetailModal
                    orderList={Array.from(selections.orders)}
                    onClose={() => {
                        setModalType(null)
                    }}
                />
            )}
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
        </>
    )
}

export default OrderCompleted
