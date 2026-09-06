import type { IPaymentHoldFilter, IPaymentHoldRequest } from '../entities'
import { DEFAULT_PAYMENT_HOLD_PAGE_SIZE } from '../constants'

export const buildPaymentHoldRequest = (
  filters: IPaymentHoldFilter,
): IPaymentHoldRequest => {
  const keyword = filters.keyword?.trim()

  // 검색 시에만 해당 파라미터 포함 (미검색이면 optional 파라미터 자체를 생략)
  const isPaymentHoldIdSearch =
    filters.searchType === 'PAYMENT_HOLD_ID' && !!keyword
  const isSettlementIdSearch =
    filters.searchType === 'SETTLEMENT_ID' && !!keyword

  return {
    dateType: filters.dateType,
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status,
    ...(isPaymentHoldIdSearch && { paymentHoldId: Number(keyword) }),
    ...(isSettlementIdSearch && { settlementId: keyword }),
    page: filters.page ?? 0,
    size: filters.size ?? DEFAULT_PAYMENT_HOLD_PAGE_SIZE,
  }
}
