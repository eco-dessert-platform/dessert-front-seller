import { AxiosResponse } from 'axios'
import { client } from 'src/global/api/client.tsx'
import { createMockResponse } from 'src/shared/utils/mockResponse'
import { MOCK_PRODUCT_LIST } from './data/productsMockData'
import type { ProductSearchFilter } from './type/productFilterType'

// 상품 목록 조회 API
export const getProductList = (
    payload: ProductSearchFilter,
): Promise<AxiosResponse<typeof MOCK_PRODUCT_LIST>> => {
    // TODO: 실제 API 연동 시 아래 주석 해제
    // return client.get('/admin/products', { params: payload })

    // 더미데이터 반환 (실제 API 연동 전까지 사용)
    return createMockResponse(MOCK_PRODUCT_LIST)
}

