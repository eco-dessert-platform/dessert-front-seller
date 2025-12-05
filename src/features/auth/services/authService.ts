// import { GOOGLE, KAKAO } from '../locales/socialLogin'
// import { SocialType } from '../type/auth'

// interface KakaoAuthResponse {
//     access_token: string
//     token_type: string
//     refresh_token: string
//     expires_in: number
//     scope: string
//     refresh_token_expires_in: number
// }

// interface LoginResponse {
//     accessToken: string
//     refreshToken: string
// }

// interface ResultResponse<T> {
//     result: T
//     success: boolean
//     code: string
//     message: string
// }

// class AuthService {
//     private baseURL: string

//     constructor() {
//         const url = import.meta.env.VITE_PUBLIC_SERVER_URL

//         this.baseURL = url
//     }

//     async getKakaoToken(code: string): Promise<KakaoAuthResponse> {
//         const body = new URLSearchParams({
//             grant_type: 'authorization_code',
//             client_id: KAKAO.client_id as string,
//             redirect_uri: KAKAO.redirect_uri as string,
//             code,
//         })

//         const res = await fetch('https://kauth.kakao.com/oauth/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type':
//                     'application/x-www-form-urlencoded;charset=utf-8',
//             },
//             body: body.toString(),
//         })

//         if (!res.ok) throw new Error('카카오 토큰 발급 실패')

//         const data: KakaoAuthResponse = await res.json()
//         return data
//     }

//     async getGoogleToken(code: string): Promise<{ access_token: string }> {
//         const body = new URLSearchParams({
//             code,
//             client_id: GOOGLE.client_id as string,
//             redirect_uri: GOOGLE.redirect_uri as string,
//             client_secret: GOOGLE.clientsecret as string,
//             grant_type: 'authorization_code',
//         })

//         const res = await fetch('https://oauth2.googleapis.com/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: body.toString(),
//         })

//         if (!res.ok) {
//             throw new Error('구글 토큰 발급 실패')
//         }

//         return await res.json()
//     }

//     async login({
//         socialType,
//         socialToken,
//     }: {
//         socialType: SocialType
//         socialToken: string
//     }): Promise<LoginResponse> {
//         const url = `${this.baseURL}/oauth/login/${socialType.toLowerCase()}?token=${socialToken}`

//         const res = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         const data: ResultResponse<LoginResponse> = await res.json()

//         console.log('응답:', data)

//         if (!res.ok || !data.success) {
//             throw new Error(data.message || '로그인 실패')
//         }

//         return data.result
//     }

//     async extendLogin(refreshToken: string): Promise<{ accessToken: string }> {
//         const res = await fetch(`${this.baseURL}/token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ refreshToken }),
//         })

//         const data: ResultResponse<{ accessToken: string }> = await res.json()

//         if (!res.ok || !data.success) {
//             throw new Error(data.message || '토큰 갱신 실패')
//         }

//         return data.result
//     }

//     async getSocialLoginResponse({
//         provider,
//         code,
//     }: {
//         provider: SocialType
//         code: string
//     }): Promise<LoginResponse & { provider: SocialType }> {
//         console.log('플랫폼 토큰 발급 시작:', {
//             provider,
//             code: code.substring(0, 20) + '...',
//         })

//         let socialToken: string
//         if (provider === 'KAKAO') {
//             const kakaoData = await this.getKakaoToken(code)
//             socialToken = kakaoData.access_token
//             console.log('카카오 토큰 발급 성공')
//         } else if (provider === 'GOOGLE') {
//             const googleData = await this.getGoogleToken(code)
//             socialToken = googleData.access_token
//             console.log('구글 토큰 발급 성공')
//         } else {
//             throw new Error(`지원하지 않는 소셜 로그인: ${provider}`)
//         }

//         console.log('백엔드 로그인 시도:', {
//             provider,
//             socialToken: socialToken.substring(0, 20) + '...',
//         })

//         const loginData = await this.login({
//             socialType: provider,
//             socialToken,
//         })
//         console.log('백엔드 로그인 성공')

//         return {
//             ...loginData,
//             provider,
//         }
//     }
// }

// export const authService = new AuthService()
