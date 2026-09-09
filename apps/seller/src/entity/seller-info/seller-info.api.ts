import { isAxiosError } from 'axios'

import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type {
  AccountVerificationDetail,
  MyStoreSummary,
  SellerAccountUpdateRequest,
  StoreNameCheckResult,
  UpdateStoreDetailInput,
  UpdateStoreDetailResult,
  UpdateStoreNameRequest,
  UpdateStoreNameResult,
} from './seller-info.type'

export async function getStore(): Promise<MyStoreSummary> {
  const { data } = await client.get<ApiResponse<MyStoreSummary>>(
    '/api/v1/seller/stores',
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 정보 조회에 실패했습니다.')
  }

  return data.result
}

export async function checkStoreName(
  storeName: string,
): Promise<StoreNameCheckResult> {
  const { data } = await client.get<ApiResponse<StoreNameCheckResult>>(
    '/api/v1/seller/stores/check-name',
    {
      params: { storeName: storeName.trim() },
    },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 중복 확인에 실패했습니다.')
  }

  return data.result
}

export async function requestStoreNameChange(
  payload: UpdateStoreNameRequest,
): Promise<UpdateStoreNameResult> {
  const { data } = await client.post<ApiResponse<UpdateStoreNameResult>>(
    '/api/v1/seller/stores/store-names',
    { newName: payload.newName.trim() },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어명 변경 신청에 실패했습니다.')
  }

  return data.result
}

export async function updateStore({
  request,
  profileImage,
}: UpdateStoreDetailInput): Promise<UpdateStoreDetailResult> {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  )
  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  const { data } = await client.put<
    ApiResponse<{ store: UpdateStoreDetailResult }>
  >('/api/v1/seller/stores', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  if (!data.result) {
    throw new Error(data.message ?? '스토어 정보 수정에 실패했습니다.')
  }

  return data.result.store
}

export async function getAccountVerification(): Promise<AccountVerificationDetail | null> {
  try {
    const { data } = await client.get<ApiResponse<AccountVerificationDetail>>(
      '/api/v1/seller/sellers/account-verifications',
    )

    return data.result ?? null
  } catch (err) {
    // 인증 이력 없음: 스펙은 404, 실제 디플로이는 400 — 둘 다 "아직 인증 안 함"으로 흡수.
    if (isAxiosError(err)) {
      const status = err.response?.status
      if (status === 400 || status === 404) return null
    }
    throw err
  }
}

export async function updateSellerAccount(
  payload: SellerAccountUpdateRequest,
): Promise<void> {
  const sanitized: SellerAccountUpdateRequest = {
    ...payload,
    accountNumber: payload.accountNumber.replace(/\D/g, ''),
  }

  const { data } = await client.patch<ApiResponse<unknown>>(
    '/api/v1/seller/sellers/account',
    sanitized,
  )

  if (!data.success) {
    throw new Error(data.message ?? '계좌 정보 변경에 실패했습니다.')
  }
}
