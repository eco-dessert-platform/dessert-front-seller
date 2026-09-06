import type { ApiResponse } from '@/entity/auth/types'
import type {
  IAccountVerification,
  IChargeFilter,
  IChargePageResponse,
  IWithdrawalRequest,
} from '@/entity/settlement/charge/entities'
import { client } from '@/shared/utils/axios'
import { AxiosInstance } from 'axios'

interface FieldError {
  field: string
  msg: string
}

export interface ChargeBalanceResult {
  chargeBalance: number
  pageResponse: IChargePageResponse
}

interface ChargeBalanceResponse extends ApiResponse<ChargeBalanceResult> {
  fieldErrors?: FieldError[]
}

interface AccountVerificationResponse
  extends ApiResponse<IAccountVerification> {
  fieldErrors?: FieldError[]
}

class ChargeService {
  constructor(private readonly http: AxiosInstance) {}

  async getChargeBalance(
    filters: IChargeFilter = {},
  ): Promise<ChargeBalanceResult> {
    const { data } = await this.http.get<ChargeBalanceResponse>(
      '/api/v1/seller/charge-balance',
      {
        params: {
          ...filters,
        },
      },
    )

    if (!data.success || !data.result) {
      throw new Error(data.message ?? '충전금 조회에 실패했습니다.')
    }

    return data.result
  }

  async getAccountVerification(): Promise<IAccountVerification> {
    const { data } = await this.http.get<AccountVerificationResponse>(
      '/api/v1/seller/sellers/account-verifications',
    )

    if (!data.success || !data.result) {
      throw new Error(data.message ?? '정산 계좌 정보 조회에 실패했습니다.')
    }

    return data.result
  }

  async postWithdrawal(request: IWithdrawalRequest): Promise<void> {
    const { data } = await this.http.post<ApiResponse>(
      '/api/v1/seller/charge-balance/withdrawal',
      request,
      {
        // 중복 요청 방지용 고유 거래 ID (백엔드 요구 헤더)
        headers: { 'X-Transaction-Id': crypto.randomUUID() },
      },
    )

    if (!data.success) {
      throw new Error(data.message ?? '출금 신청에 실패했습니다.')
    }
  }
}

export const chargeService = new ChargeService(client)
