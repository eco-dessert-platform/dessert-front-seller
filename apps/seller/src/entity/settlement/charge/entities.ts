export interface IChargeFilter {
  startDate?: string
  endDate?: string
  page?: number
  size?: number
  sort?: string
}

export type TChargeCategory = 'ACCUMULATE' | 'DEDUCT'
export type TChargeStatus = 'PENDING' | 'COMPLETED'

export interface IChargeRow {
  baseDate: string
  settlementId: string
  category: TChargeCategory
  amount: number
  status: TChargeStatus
}

export interface IChargePageResponse {
  content: IChargeRow[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export interface IAccountVerification {
  id: number
  sellerId: number
  bankCode: string
  accountNumber: string
  accountHolder: string
  verified: boolean
  createdAt: string
}

export interface IWithdrawalRequest {
  withdrawalAmount: number // 출금 신청 금액 (0 초과 ~ 현재 잔액 이하)
  bankName: string
  accountHolder: string
  accountNumber: string // 숫자만, 최대 20자
}
