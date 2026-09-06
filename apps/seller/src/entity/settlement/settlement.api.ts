import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import { SettlementFilters } from './types'

import {
  DailySettlementFilters,
  DailySettlementPageResponse,
  SettlementItemPageResponse,
} from './settlement.type'

function unwrap<T>(data: ApiResponse<T>, fallback: string): T {
  if (!data.success || data.result == null) {
    throw new Error(data.message ?? fallback)
  }
  return data.result
}

export async function getDailySettlements(
  filters: DailySettlementFilters,
): Promise<DailySettlementPageResponse> {
  const { page, size, startDate, endDate } = filters

  const { data } = await client.get<ApiResponse<DailySettlementPageResponse>>(
    '/api/v1/seller/settlements/daily',
    {
      params: {
        page,
        size,
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      },
    },
  )

  return unwrap(data, '일별 정산내역 조회에 실패했습니다.')
}

export async function getSettlementItems(
  filters: SettlementFilters,
): Promise<SettlementItemPageResponse> {
  const { page, size, startDate, endDate } = filters

  const { data } = await client.get<ApiResponse<SettlementItemPageResponse>>(
    '/api/v1/seller/settlements/items',
    {
      params: {
        page: Math.max(0, page - 1), // 필터는 1-based, API는 0-based
        size,
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      },
    },
  )

  return unwrap(data, '건별 정산내역 조회에 실패했습니다.')
}

export async function getSettlementItemsExcel(
  filters: Pick<SettlementFilters, 'startDate' | 'endDate'>,
): Promise<Blob | null> {
  const { startDate, endDate } = filters

  const { data } = await client.get<Blob>(
    '/api/v1/seller/settlements/items/excel',
    {
      params: {
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      },
      responseType: 'blob',
    },
  )

  return data
}

export async function getDailySettlementsExcel(
  filters: Pick<DailySettlementFilters, 'startDate' | 'endDate'>,
): Promise<Blob | null> {
  const { startDate, endDate } = filters

  const { data } = await client.get<Blob>(
    '/api/v1/seller/settlements/daily/excel',
    {
      params: {
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      },
      responseType: 'blob',
    },
  )

  return data
}
