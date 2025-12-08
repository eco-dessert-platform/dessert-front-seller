export interface OrderSearchFilter {
    orderStatus: string // TODO :: enum type 할당 후, 주석 제거
    startDate: Date
    endDate: Date
    searchType: string // TODO :: enum type 할당 후, 주석 제거
    keyword: string
}
