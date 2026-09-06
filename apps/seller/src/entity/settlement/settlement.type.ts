export interface DeductibleRefundDetail {
  deliveryFeeChange: number // 배송비 금액 변동
  balanceOffset: number // 충전금 상계
}

export interface DailySettlementSummary {
  settlementNumber: string // 정산ID
  scheduledDate: string // 정산예정일
  completedDate: string // 정산완료일
  totalSettlementAmount: number // 정산금액 (a+b+c+d)
  amount: number // 결제금액(a)
  fee: number // 수수료(b)
  deductibleRefund: number // 공제/환급(c)
  deductibleRefundDetail?: DeductibleRefundDetail | null
  withHoldingPayment: number // 지급보류(d)
  settlementMethod: string // 정산방식
}

export interface SettlementSummaryInfo {
  scheduledDateMin: string
  scheduledDateMax: string
  totalSettlementAmount: number
}

export interface DailySettlementPageResponse {
  settlements: {
    content: DailySettlementSummary[]
    page: number
    size: number
    totalPages: number
    totalElements: number
  }
  summary: SettlementSummaryInfo
}

export interface DailySettlementFilters {
  page: number
  size: number
  startDate: string | null
  endDate: string | null
}

// 건별 정산내역 (GET /api/v1/seller/settlements/items) 응답 shape
export interface SettlementItemSummary {
  orderNumber: string // 주문번호
  orderItemId: number // 상품주문번호(OrderItem ID)
  sellerId: number // 판매자 ID (건별엔 정산ID가 없어 임시로 정산ID 컬럼에 사용)
  buyerName: string // 구매자명
  productTitle: string // 상품명
  scheduledAmount: number // 정산 예정 금액
  quantity: number // 수량
  settlementStartDate: string // 정산 시작일
  settlementEndDate: string // 정산 종료일
  scheduledDate: string // 정산 예정일
  status: string // 정산 상태
}

export interface SettlementItemSummaryInfo {
  totalCount: number // 총 정산 건수
  totalScheduledAmount: number // 총 정산 예정 금액
}

export interface SettlementItemPageResponse {
  settlements: {
    content: SettlementItemSummary[]
    page: number
    size: number
    totalPages: number
    totalElements: number
  }
  summary: SettlementItemSummaryInfo
}
