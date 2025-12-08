import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays, ChevronDown, RotateCw, Search } from 'lucide-react'
import { ko } from 'date-fns/locale'
import * as SelectPrimitive from '@radix-ui/react-select'

import { Calendar } from 'src/shared/lib/shadcn/components/ui/calendar'
import type { OrderFilterProps } from '../type/orderModalType'

const OrderFilter = ({
    filterValue,
    onChangeDate,
    onChangeOrderStatus,
    onChangeSearchType,
    onChangeKeyword,
    onReset,
    onSearch,
}: OrderFilterProps) => {
    const [isOpenDayPicker, setIsOpenDayPicker] = useState(false)

    return (
        <div className="flex w-full flex-col gap-2.5 rounded-lg border border-gray-300 bg-white px-6 py-4">
            <button
                className="ml-auto flex cursor-pointer items-center gap-0.5"
                onClick={onReset}
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
                        <CalendarDays size={20} className="shrink-0" />
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
                                        onChangeDate({
                                            startDate: range.from,
                                            endDate: range.to,
                                        })
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
                                        'w-[30px] h-[30px] border border-gray-200 rounded-md',
                                    button_previous:
                                        'w-[30px] h-[30px] border border-gray-200 rounded-md',
                                    caption_label:
                                        'text-18 font-bold text-gray-800',
                                    range_start:
                                        'text-white bg-primary-500 rounded-l-md',
                                    range_end:
                                        'text-white bg-primary-500 rounded-r-md',
                                    range_middle: 'bg-gray-50',
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="flex w-[150px] flex-col items-stretch gap-1.5">
                    <p className="text-12 font-normal">배송상태</p>
                    <SelectPrimitive.Root
                        value={filterValue.orderStatus}
                        onValueChange={onChangeOrderStatus}
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
                                <SelectPrimitive.Item
                                    value="ALL"
                                    className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                >
                                    <SelectPrimitive.ItemText>
                                        전체
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                                <SelectPrimitive.Item
                                    value="PAID"
                                    className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                >
                                    <SelectPrimitive.ItemText>
                                        결제완료
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                                {/* TODO :: Value Unknown */}
                                <SelectPrimitive.Item
                                    value="nnnnn"
                                    className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                >
                                    <SelectPrimitive.ItemText>
                                        상품준비
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                                <SelectPrimitive.Item
                                    value="SHIPPED"
                                    className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                >
                                    <SelectPrimitive.ItemText>
                                        상품발송
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                                <SelectPrimitive.Item
                                    value="DELIVERED"
                                    className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                >
                                    <SelectPrimitive.ItemText>
                                        배송완료
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                            </SelectPrimitive.Viewport>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Root>
                </div>
                <div className="flex grow flex-col items-stretch gap-1.5">
                    <p className="text-12 font-normal">상세조건</p>
                    <div className="flex grow items-center gap-2">
                        <SelectPrimitive.Root
                            value={filterValue.searchType}
                            onValueChange={onChangeSearchType}
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
                                    <SelectPrimitive.Item
                                        value="ORDER_NUMBER"
                                        className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                    >
                                        <SelectPrimitive.ItemText>
                                            주문번호
                                        </SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                    <SelectPrimitive.Item
                                        value="RECEIVER_NAME"
                                        className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                    >
                                        <SelectPrimitive.ItemText>
                                            수취인명
                                        </SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                    <SelectPrimitive.Item
                                        value="PRODUCT_NAME"
                                        className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                    >
                                        <SelectPrimitive.ItemText>
                                            상품명
                                        </SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                    <SelectPrimitive.Item
                                        value="TRACKING_NUMBER"
                                        className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                    >
                                        <SelectPrimitive.ItemText>
                                            송장번호
                                        </SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                </SelectPrimitive.Viewport>
                            </SelectPrimitive.Content>
                        </SelectPrimitive.Root>
                        <div className="flex grow items-center gap-1.5 rounded-lg border border-gray-300 py-2 pr-2 pl-3">
                            <input
                                type="text"
                                placeholder="1~50자로 입력해주세요."
                                className="grow"
                                value={filterValue.keyword}
                                onChange={(event) => {
                                    onChangeKeyword(event.target.value)
                                }}
                            />
                            <button
                                className="cursor-pointer"
                                onClick={onSearch}
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderFilter
