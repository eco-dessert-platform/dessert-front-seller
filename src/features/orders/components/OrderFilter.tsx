import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays, ChevronDown, RotateCw, Search } from 'lucide-react'
import { ko } from 'date-fns/locale'
import { type DateRange } from 'react-day-picker'
import * as SelectPrimitive from '@radix-ui/react-select'

import { Calendar } from 'src/shared/lib/shadcn/components/ui/calendar'
import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import type { OrderFilterProps } from '../type/orderModalType'
import type {
    FilterValueHandler,
    OrderSearchFilter,
} from '../type/orderFilterType'

const OrderFilter = ({
    initialFilterValue,
    orderStatusOptions,
    searchOptions,
    onSearch,
}: OrderFilterProps) => {
    const [isOpenDayPicker, setIsOpenDayPicker] = useState(false)
    const [modalType, setModalType] = useState<string | null>(null)
    const [filterValue, setFilterValue] =
        useState<OrderSearchFilter>(initialFilterValue)

    const handleReset = () => {
        setFilterValue(initialFilterValue)
        onSearch(initialFilterValue)
    }

    const handleSearchWithKeyword = (nextFilterValue: OrderSearchFilter) => {
        if (!nextFilterValue.keyword) {
            setModalType('noKeyword')
            return
        }

        onSearch(nextFilterValue)
    }

    const handleChangeFilter: FilterValueHandler = (type, value) => {
        const nextFilterValue = { ...filterValue }

        if (type === 'date') {
            const dateRange = value as { from: Date; to: Date }
            nextFilterValue.startDate = dateRange.from
            nextFilterValue.endDate = dateRange.to
        } else {
            nextFilterValue[type] = value as string
        }

        setFilterValue(nextFilterValue)

        if (type !== 'keyword' && type !== 'searchType') {
            onSearch(nextFilterValue)
        }
    }

    return (
        <>
            <div className="flex w-full flex-col gap-2.5 rounded-lg border border-gray-300 bg-white px-6 py-4">
                <button
                    className="ml-auto flex cursor-pointer items-center gap-0.5"
                    onClick={handleReset}
                >
                    <p className="text-12">초기화</p>
                    {/* padding 간격이 없어 16으로 일단 설정 */}
                    <RotateCw size={16} />
                </button>
                <div className="flex items-center gap-4">
                    <div className="relative flex w-[228px] flex-col items-stretch gap-1.5">
                        <p className="text-12 f1ont-normal">조회기간</p>
                        <div className="flex items-center gap-1.5 rounded-lg border border-gray-300 py-2 pr-2 pl-3">
                            <input
                                type="text"
                                className="min-w-0 grow"
                                value={`${format(filterValue.startDate, 'yyyy.MM.dd')} ~ ${format(filterValue.endDate, 'yyyy.MM.dd')}`}
                                readOnly
                                onClick={() => {
                                    setIsOpenDayPicker(true)
                                }}
                            />
                            <button
                                onClick={() => {
                                    setIsOpenDayPicker(true)
                                }}
                            >
                                <CalendarDays size={20} className="shrink-0" />
                            </button>
                        </div>
                        {isOpenDayPicker && (
                            <div className="absolute top-[calc(100%+4px)] z-50 rounded-lg border border-gray-200 bg-white px-4 py-5 shadow-[0px_3px_10px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.078)]">
                                <Calendar
                                    mode="range"
                                    locale={ko}
                                    selected={{
                                        from: filterValue.startDate,
                                        to: filterValue.endDate,
                                    }}
                                    onSelect={(range) => {
                                        if (range && range.from && range.to) {
                                            handleChangeFilter(
                                                'date',
                                                range as Required<DateRange>,
                                            )

                                            setIsOpenDayPicker(false)
                                        }
                                    }}
                                    classNames={{
                                        month: 'flex flex-wrap justify-between items-center',
                                        month_grid:
                                            'border-separate border-spacing-y-1',
                                        month_caption: 'text-center grow',
                                        day: 'w-[28px] h-[28px] text-gray-800 font-medium',
                                        day_button: 'w-[28px] h-[28px] text-14',
                                        weekday:
                                            'w-[28px] h-[28px] text-12 font-normal text-[#71717A]',
                                        chevron: 'fill-gray-800',
                                        button_next:
                                            'w-[30px] h-[30px] border border-gray-200 rounded-md flex items-center justify-center',
                                        button_previous:
                                            'w-[30px] h-[30px] border border-gray-200 rounded-md flex items-center justify-center',
                                        caption_label:
                                            'text-18 font-bold text-gray-800',
                                        range_start:
                                            'text-white [&>button]:bg-primary-500! rounded-l-md',
                                        range_end:
                                            'text-white [&>button]:bg-primary-500! rounded-r-md',
                                        range_middle: '[&>button]:bg-gray-50!',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex w-[150px] flex-col items-stretch gap-1.5">
                        <p className="text-12 font-normal">배송상태</p>
                        <SelectPrimitive.Root
                            value={filterValue.orderStatus}
                            onValueChange={(value) =>
                                handleChangeFilter('orderStatus', value)
                            }
                        >
                            <SelectPrimitive.Trigger className="flex items-center justify-between gap-2 rounded-lg border border-gray-300 py-2 pr-2 pl-3">
                                <SelectPrimitive.Value />
                                <SelectPrimitive.Icon>
                                    <ChevronDown size={20} />
                                </SelectPrimitive.Icon>
                            </SelectPrimitive.Trigger>
                            <SelectPrimitive.Content
                                position="popper"
                                side="bottom"
                                sideOffset={4}
                                align="start"
                                className="z-50 w-[150px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                            >
                                <SelectPrimitive.Viewport className="p-1">
                                    {orderStatusOptions.map((option) => (
                                        <SelectPrimitive.Item
                                            key={option.value}
                                            value={String(option.value)}
                                            className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                        >
                                            <SelectPrimitive.ItemText>
                                                {option.label}
                                            </SelectPrimitive.ItemText>
                                        </SelectPrimitive.Item>
                                    ))}
                                </SelectPrimitive.Viewport>
                            </SelectPrimitive.Content>
                        </SelectPrimitive.Root>
                    </div>
                    <div className="flex grow flex-col items-stretch gap-1.5">
                        <p className="text-12 font-normal">상세조건</p>
                        <div className="flex grow items-center gap-2">
                            <SelectPrimitive.Root
                                value={filterValue.searchType}
                                onValueChange={(value) =>
                                    handleChangeFilter('searchType', value)
                                }
                            >
                                <SelectPrimitive.Trigger className="flex w-[150px] items-center justify-between gap-2 rounded-lg border border-gray-300 py-2 pr-2 pl-3">
                                    <SelectPrimitive.Value />
                                    <SelectPrimitive.Icon>
                                        <ChevronDown size={20} />
                                    </SelectPrimitive.Icon>
                                </SelectPrimitive.Trigger>
                                <SelectPrimitive.Content
                                    position="popper"
                                    side="bottom"
                                    sideOffset={4}
                                    align="start"
                                    className="z-50 w-[150px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                                >
                                    <SelectPrimitive.Viewport className="p-1">
                                        {searchOptions.map((option) => (
                                            <SelectPrimitive.Item
                                                key={option.value}
                                                value={String(option.value)}
                                                className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                            >
                                                <SelectPrimitive.ItemText>
                                                    {option.label}
                                                </SelectPrimitive.ItemText>
                                            </SelectPrimitive.Item>
                                        ))}
                                    </SelectPrimitive.Viewport>
                                </SelectPrimitive.Content>
                            </SelectPrimitive.Root>
                            <form
                                className="flex grow items-center gap-1.5 rounded-lg border border-gray-300 py-2 pr-2 pl-3"
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    handleSearchWithKeyword(filterValue)
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="1~50자로 입력해주세요."
                                    className="grow"
                                    value={filterValue.keyword}
                                    onChange={(event) => {
                                        handleChangeFilter(
                                            'keyword',
                                            event.target.value,
                                        )
                                    }}
                                />
                                <button className="cursor-pointer">
                                    <Search size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* TODO :: 전역 모달 생성 후, 제거 예정 */}
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

export default OrderFilter
