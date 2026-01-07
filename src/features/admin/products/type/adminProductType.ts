export interface AdminProductOption {
    optionId: number
    optionName: string
    price: number
    stock: number
    tags?: string[]
}

export interface AdminProductItem {
    productId: number
    storeName: string
    productName: string
    productPrice: number
    productOptions?: AdminProductOption[]
}

export interface AdminProductListResult {
    contents: AdminProductItem[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export interface AdminAPIResponse<T> {
    success: boolean
    code: number
    message: string
    result: T
}

export type AdminProductListResponse = AdminAPIResponse<AdminProductListResult>

export interface AdminDeleteOptionsRequest {
    removeAll: boolean
    optionIds: number[]
}
