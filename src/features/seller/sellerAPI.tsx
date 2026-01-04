import { client } from 'src/global/api/client.tsx'

// 판매자 정보 조회 API
export const getSellerProfile = () => {
    return client.get('/seller/profile')
}

// 판매자 정보 수정 API
export const updateSellerProfile = (data: {
    storeName?: string
    businessNumber?: string
    representativeName?: string
    phone?: string
    email?: string
    address?: string
    bankAccount?: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }
}) => {
    return client.put('/seller/profile', data)
}

// 판매자 비밀번호 변경 API
export const changePassword = (data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}) => {
    return client.put('/seller/password', data)
}

