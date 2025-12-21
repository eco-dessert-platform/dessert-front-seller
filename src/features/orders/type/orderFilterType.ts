import { type DateRange } from 'react-day-picker'
import type { OrderStatusFilter, SearchType } from '../constants/orderEnums'

export interface OrderSearchFilter {
    orderStatus: OrderStatusFilter | string
    startDate: Date
    endDate: Date
    searchType: SearchType | string
    keyword: string
}

export type FilterValueHandler = {
    (type: 'date', value: Required<DateRange>): void
    (
        type: Exclude<keyof OrderSearchFilter, 'startDate' | 'endDate'>,
        value: string,
    ): void
}
