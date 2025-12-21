import { type DateRange } from "react-day-picker"

export interface OrderSearchFilter {
    orderStatus: string // TODO :: enum type 할당 후, 주석 제거
    startDate: Date
    endDate: Date
    searchType: string // TODO :: enum type 할당 후, 주석 제거
    keyword: string
}

export type FilterValueHandler = {
    (type: 'date', value: Required<DateRange>): void
    (
        type: Exclude<keyof OrderSearchFilter, 'startDate' | 'endDate'>,
        value: string,
    ): void
}