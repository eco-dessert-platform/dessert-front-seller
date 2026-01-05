export interface ProductOption {
    optionId: number
    optionName: string
    price: number
    stock: number
    tags?: string[]
}

export interface ProductItem {
    productId: number
    storeName: string
    productName: string
    productPrice: number
    productOptions?: ProductOption[]
}

export interface ProductListResult {
    contents: ProductItem[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export interface APIResponse<T> {
    success: boolean
    code: number
    message: string
    result: T
}

export type ProductListResponse = APIResponse<ProductListResult>
