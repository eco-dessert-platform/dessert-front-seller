import { JwtPayload, UserInfo } from 'src/features/auth/type/auth'

/**
 * JWT에서 사용자 정보 파싱
 */
export const parseUserFromToken = (token: string): UserInfo | null => {
    try {
        const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]))
        return {
            id: payload.id || payload.sub || '',
            email: payload.email,
            name: payload.name,
            nickname: payload.nickname,
            profileImage: payload.profileImage,
            role: payload.role,
        }
    } catch {
        console.error('JWT 파싱 실패')
        return null
    }
}

/**
 * JWT 토큰 만료 여부 확인
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]))
        return payload.exp * 1000 < Date.now()
    } catch {
        return true
    }
}

/**
 * JWT에서 만료 시간 추출
 */
export const getExpFromToken = (token: string): Date => {
    try {
        const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]))
        return new Date(payload.exp * 1000)
    } catch {
        return new Date(Date.now() + 3600 * 1000)
    }
}
