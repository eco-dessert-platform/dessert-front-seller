import { AxiosResponse } from 'axios'
import { client } from 'src/global/api/client.tsx'
import type { AdminProductSearchFilter } from './type/adminProductFilterType'
import {
    AdminAPIResponse,
    AdminDeleteOptionsRequest,
    AdminProductListResponse,
    AdminUpdateStockRequest,
} from './type/adminProductType'

import { createMockResponse } from 'src/shared/utils/mockResponse'
import { MOCK_PRODUCT_LIST } from './data/adminProductsMockData'

// 상품 목록 조회 API
export const getAdminProductList = (
    params: AdminProductSearchFilter,
): Promise<AxiosResponse<AdminProductListResponse>> => {
    // API 연동
    // return client.get('/api/v1/admin/products', { params })

    // 목데이터 확인 시 주석 해제하여 사용
    return createMockResponse(MOCK_PRODUCT_LIST)
}

// 상품 삭제 API
export const deleteAdminProducts = (
    productIds: number[],
): Promise<AxiosResponse<AdminAPIResponse<null>>> => {
    return client.delete('/api/v1/admin/products', {
        params: {
            productIds: productIds.join(','),
        },
    })
}

// 상품 옵션 삭제 API
export const deleteAdminProductOptions = ({
    productId,
    data,
}: {
    productId: number
    data: AdminDeleteOptionsRequest
}): Promise<AxiosResponse<AdminAPIResponse<null>>> => {
    return client.delete(`/api/v1/admin/products/${productId}`, { data })
}

// 상품 재고 수정 API
export const updateAdminProductStock = ({
    productId,
    data,
}: {
    productId: number
    data: AdminUpdateStockRequest
}): Promise<AxiosResponse<AdminAPIResponse<null>>> => {
    return client.patch(`/api/v1/admin/products/${productId}/stock`, data)
}
