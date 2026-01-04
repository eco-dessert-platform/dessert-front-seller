import { client } from 'src/global/api/client.tsx'

// 상품 목록 조회 API
export const getProducts = ({
    limit,
    skip,
}: {
    limit: number
    skip: number
}) => {
    return client.get(`/products?limit=${limit}&skip=${skip}`)
}

// 상품 상세 조회 API
export const getProduct = (id: number) => {
    return client.get(`/products/${id}`)
}

// 상품 등록 API
export const createProduct = (data: FormData) => {
    return client.post('/products', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

// 상품 수정 API
export const updateProduct = (id: number, data: FormData) => {
    return client.put(`/products/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

// 상품 삭제 API
export const deleteProduct = (id: number) => {
    return client.delete(`/products/${id}`)
}

