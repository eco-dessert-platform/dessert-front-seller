import { AxiosResponse } from 'axios'
import {
    client,
    kakaoOAuthClient,
    googleOAuthClient,
} from 'src/global/api/client'
import { GOOGLE, KAKAO } from './locales/socialLogin'
import {
    KakaoAuthResponse,
    GoogleAuthResponse,
    LoginResponse,
} from './type/auth'

/**
 * 카카오 로그인 API
 */
export const kakaoLogin = async (
    code: string,
): Promise<AxiosResponse<LoginResponse>> => {
    console.log('카카오 토큰 발급 시작:', {
        code: code.substring(0, 20) + '...',
    })

    // 1. 카카오 서버에서 access_token 발급
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO.client_id as string,
        redirect_uri: KAKAO.redirect_uri as string,
        code,
    })

    const { data: tokenData } = await kakaoOAuthClient.post<KakaoAuthResponse>(
        '/oauth/token',
        params.toString(),
    )

    const socialToken = tokenData.access_token
    console.log('카카오 토큰 발급 성공')

    // 2. 백엔드 로그인
    console.log('백엔드 로그인 시도:', {
        socialToken: socialToken.substring(0, 20) + '...',
    })

    const response = await client.get<LoginResponse>(
        `/oauth/login/kakao?token=${socialToken}`,
    )

    console.log('카카오 로그인 성공')

    return response
}

/**
 * 구글 로그인 API
 */
export const googleLogin = async (
    code: string,
): Promise<AxiosResponse<LoginResponse>> => {
    console.log('구글 토큰 발급 시작:', {
        code: code.substring(0, 20) + '...',
    })

    // 1. 구글 서버에서 access_token 발급
    const params = new URLSearchParams({
        code,
        client_id: GOOGLE.client_id as string,
        redirect_uri: GOOGLE.redirect_uri as string,
        client_secret: GOOGLE.clientsecret as string,
        grant_type: 'authorization_code',
    })

    const { data: tokenData } = await googleOAuthClient.post<GoogleAuthResponse>(
        '/token',
        params.toString(),
    )

    const socialToken = tokenData.access_token
    console.log('구글 토큰 발급 성공')

    // 2. 백엔드 로그인
    console.log('백엔드 로그인 시도:', {
        socialToken: socialToken.substring(0, 20) + '...',
    })

    const response = await client.get<LoginResponse>(
        `/oauth/login/google?token=${socialToken}`,
    )

    console.log('구글 로그인 성공')

    return response
}

/**
 * 토큰 갱신 API
 */
export const refreshToken = async (
    token: string,
): Promise<AxiosResponse<{ accessToken: string }>> => {
    return await client.post<{ accessToken: string }>('/token', {
        refreshToken: token,
    })
}
