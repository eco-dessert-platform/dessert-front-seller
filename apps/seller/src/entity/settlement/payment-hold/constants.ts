import type {
  TPaymentHoldDateType,
  TPaymentHoldSearchType,
  TPaymentHoldStatus,
} from './entities'

export const DEFAULT_PAYMENT_HOLD_PAGE_SIZE = 10

export const PAYMENT_HOLD_DATE_TYPE_OPTIONS: {
  label: string
  value: TPaymentHoldDateType
}[] = [
  { label: '정산기준일', value: 'BASE_DATE' },
  { label: '정산완료일', value: 'COMPLETED_DATE' },
]

export const PAYMENT_HOLD_STATUS_OPTIONS: {
  label: string
  value: TPaymentHoldStatus
}[] = [
  { label: '전체', value: 'ALL' },
  { label: '지급보류', value: 'ON_HOLD' },
  { label: '해제', value: 'RELEASED' },
]

export const PAYMENT_HOLD_SEARCH_TYPE_OPTIONS: {
  label: string
  value: TPaymentHoldSearchType
}[] = [
  { label: '지급보류ID', value: 'PAYMENT_HOLD_ID' },
  { label: '정산ID', value: 'SETTLEMENT_ID' },
]

export const PAYMENT_HOLD_STATUS_LABELS: Record<
  Exclude<TPaymentHoldStatus, 'ALL'>,
  string
> = {
  ON_HOLD: '지급보류',
  RELEASED: '해제',
}
