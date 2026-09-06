import { DailySettlementSummary, SettlementItemSummary } from './settlement.type'
import { Settlement, TransactionSettlement } from './types'

export function toSettlement(summary: DailySettlementSummary): Settlement {
  return {
    id: summary.settlementNumber,
    expectedDate: summary.scheduledDate,
    completedDate: summary.completedDate,
    totalAmount: summary.totalSettlementAmount,
    paymentAmount: summary.amount,
    commission: summary.fee,
    deduction: summary.deductibleRefund,
    deductionDetails: {
      shippingFeeChange: summary.deductibleRefundDetail?.deliveryFeeChange ?? 0,
      chargeOffset: summary.deductibleRefundDetail?.balanceOffset ?? 0,
    },
    withheld: summary.withHoldingPayment,
    method: summary.settlementMethod,
  }
}

export function toTransactionSettlement(
  summary: SettlementItemSummary,
): TransactionSettlement {
  return {
    orderNumber: summary.orderNumber,
    productOrderNumber: String(summary.orderItemId),
    // 건별 API엔 정산ID 필드가 없어 임시로 sellerId 사용 (별도 정산ID 추가 시 교체)
    settlementId: String(summary.sellerId),
    category: '', // API 미제공 — 구분 컬럼은 응답 추가 시 채워짐
    productName: summary.productTitle,
    expectedSettlementAmount: summary.scheduledAmount,
    settlementBaseDate: summary.settlementStartDate,
    expectedDate: summary.scheduledDate,
    completedDate: summary.settlementEndDate,
    status: summary.status,
    // paymentMethod, commissionRate, paymentAmount: 상세 API 추가 시 연결
  }
}
