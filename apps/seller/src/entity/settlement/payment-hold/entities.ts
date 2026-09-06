export type TPaymentHoldDateType = 'BASE_DATE' | 'COMPLETED_DATE'
export type TPaymentHoldStatus = 'ALL' | 'ON_HOLD' | 'RELEASED'
export type TPaymentHoldSearchType = 'PAYMENT_HOLD_ID' | 'SETTLEMENT_ID'

export interface IPaymentHoldFilter {
  dateType: TPaymentHoldDateType
  startDate?: string
  endDate?: string
  status: TPaymentHoldStatus
  searchType?: TPaymentHoldSearchType
  keyword: string
  page?: number
  size?: number
}

export type IPaymentHoldSearchFilter = Pick<
  IPaymentHoldFilter,
  'dateType' | 'startDate' | 'endDate' | 'status' | 'searchType' | 'keyword'
>

export interface IPaymentHoldRequest {
  dateType: TPaymentHoldDateType
  startDate?: string
  endDate?: string
  status: TPaymentHoldStatus
  paymentHoldId?: number
  settlementId?: string
  page?: number
  size?: number
}

export interface IPaymentHoldRow {
  paymentHoldId: number
  settlementId: string
  status: Exclude<TPaymentHoldStatus, 'ALL'>
  baseDate: string
  completedDate: string
  amount: number
}

// 실제 API 응답 필드명 (PaymentHoldSummary 스키마 기준)
export interface IPaymentHoldRowResponse {
  paymentHoldId: number
  settlementId: string
  status: Exclude<TPaymentHoldStatus, 'ALL'>
  settlementBaseDate: string
  settlementCompletedDate: string
  settlementAmount: number
}

export interface IPaymentHoldPageResponse {
  content: IPaymentHoldRow[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}
