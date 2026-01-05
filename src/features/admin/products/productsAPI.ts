import { AxiosResponse } from 'axios'
import { client } from 'src/global/api/client.tsx'
import type { ProductSearchFilter } from './type/productFilterType'
import type { ProductListResponse } from './type/productType'

// 상품 목록 조회 API
export const getProductList = (
    params: ProductSearchFilter,
): Promise<AxiosResponse<ProductListResponse>> => {
    return client.get('/api/v1/admin/products', { params })
}
