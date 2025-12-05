export interface KakaoAuthResponse {
    access_token: string
    token_type: string
    refresh_token: string
    expires_in: number
    scope: string
    refresh_token_expires_in: number
}

export interface GoogleAuthResponse {
    access_token: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}

/**
 * JWT에서 파싱한 사용자 정보
 */
export interface UserInfo {
    id: string | number
    email?: string
    name?: string
    nickname?: string
    profileImage?: string
    role?: string
}

/**
 * JWT Payload 구조 (백엔드에서 발급한 토큰 기준)
 */
export interface JwtPayload {
    sub?: string // subject (사용자 ID)
    id?: string | number
    email?: string
    name?: string
    nickname?: string
    profileImage?: string
    role?: string
    exp: number // 만료 시간
    iat: number // 발급 시간
}



/**
 * 팝업에서 부모 창으로 전달되는 로그인 에러 메시지
 */
export interface LoginErrorMessage {
    type: 'LOGIN_ERROR'
    message: string
}
