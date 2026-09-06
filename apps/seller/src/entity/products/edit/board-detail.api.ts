import { client } from '@/shared/utils/axios'

import {
  getMockSellerBoardDetail,
  USE_PRODUCT_EDIT_MOCK,
} from './board-detail.mock'
import type {
  GetSellerBoardDetailResponse,
  ProvisionalSellerBoardDetail,
} from './board-detail.type'

/**
 * TODO(seller-board-detail-api):
 * 경로·응답 envelope이 확정되면 이 함수만 교체하세요.
 * mock 제거 시: USE_PRODUCT_EDIT_MOCK 분기와 board-detail.mock.ts 삭제.
 *
 * 가정: GET /api/v1/seller/boards/{boardId}
 */
export async function getSellerBoardDetail(
  boardId: number,
): Promise<ProvisionalSellerBoardDetail> {
  // 단건 조회 API 미구현 구간 — mock일 때 네트워크 요청을 보내지 않음
  if (USE_PRODUCT_EDIT_MOCK) {
    return getMockSellerBoardDetail(boardId)
  }

  const response = await client.get<GetSellerBoardDetailResponse>(
    `/api/v1/seller/boards/${boardId}`,
  )

  if (!response.data.success || response.data.result == null) {
    throw new Error(
      response.data.message ?? '상품 정보를 불러오지 못했어요.',
    )
  }

  return response.data.result
}
