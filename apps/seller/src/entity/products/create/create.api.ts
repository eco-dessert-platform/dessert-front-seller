import { client } from '@/shared/utils/axios'

import {
  ApiResponse,
  CreateProductBoardResult,
  StoreInfo,
} from './create.type'

function unwrap<T>(data: ApiResponse<T>, fallback: string): T {
  if (!data.success || data.result == null) {
    throw new Error(data.message ?? fallback)
  }
  return data.result
}

// storeId 조회
export const getMyStore = async () => {
  const response = await client.get<ApiResponse<{ store: StoreInfo }>>(
    '/api/v1/seller/stores',
  )
  return unwrap(response.data, '스토어 정보 조회에 실패했습니다.').store
}

/**
 * POST /api/v1/seller/boards
 * FormData + @ModelAttribute. Content-Type은 지정하지 않음(interceptor가 기본 JSON 제거).
 */
export const createProductBoard = async (formData: FormData) => {
  const response = await client.post<ApiResponse<CreateProductBoardResult>>(
    '/api/v1/seller/boards',
    formData,
  )

  if (!response.data.success) {
    throw new Error(response.data.message ?? '상품 등록에 실패했습니다.')
  }

  return response.data
}

/**
 * PUT /api/v1/seller/boards/{boardId}
 * FormData + @ModelAttribute. storeId 미포함. Content-Type 미지정.
 */
export const updateProductBoard = async (
  boardId: number,
  formData: FormData,
) => {
  const response = await client.put<ApiResponse<CreateProductBoardResult>>(
    `/api/v1/seller/boards/${boardId}`,
    formData,
  )

  if (!response.data.success) {
    throw new Error(response.data.message ?? '상품 수정에 실패했습니다.')
  }

  return response.data
}

/**
 * POST /api/v1/seller/boards/delete-boards?storeId={storeId}
 * JSON body: { boardIds: number[] }
 */
export const deleteProductBoards = async (
  storeId: number,
  boardIds: number[],
) => {
  const response = await client.post<ApiResponse<unknown>>(
    '/api/v1/seller/boards/delete-boards',
    { boardIds },
    {
      params: { storeId },
      headers: { 'Content-Type': 'application/json' },
    },
  )

  if (!response.data.success) {
    throw new Error(response.data.message ?? '상품 삭제에 실패했습니다.')
  }

  return response.data
}

/** @deprecated createProductBoard 사용을 권장합니다. */
export const createProduct = createProductBoard
