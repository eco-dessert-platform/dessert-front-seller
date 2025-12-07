import { AxiosResponse } from 'axios'
import {
    GoogleAuthResponse,
    KakaoAuthResponse,
    LoginResponse,
} from './type/auth.ts'
import { GOOGLE, KAKAO } from './locales/socialProvider.ts'
import {
    client,
    googleOAuthClient,
    kakaoOAuthClient,
} from 'src/global/api/client.tsx'

export const kakaoLogin = async (
    code: string,
): Promise<AxiosResponse<LoginResponse>> => {
    console.log('카카오 토큰 발급 시작:', code)

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

    console.log('카카오 토큰 발급 성공')

    const response = await client.get<LoginResponse>(
        `/api/v1/oauth/seller/login/kakao?token=${tokenData.access_token}`,
    )

    console.log('카카오 로그인 성공')

    return response
}

export const googleLogin = async (
    code: string,
): Promise<AxiosResponse<LoginResponse>> => {
    console.log('구글 토큰 발급 시작:', code)

    const params = new URLSearchParams({
        code,
        client_id: GOOGLE.client_id as string,
        redirect_uri: GOOGLE.redirect_uri as string,
        client_secret: GOOGLE.clientsecret as string,
        grant_type: 'authorization_code',
    })

    const { data: tokenData } =
        await googleOAuthClient.post<GoogleAuthResponse>(
            '/token',
            params.toString(),
        )

    console.log('구글 토큰 발급 성공')

    const response = await client.get<LoginResponse>(
        `/api/v1/oauth/seller/login/google?token=${tokenData.access_token}`,
    )

    console.log('구글 로그인 성공')

    return response
}

export const refreshToken = async (
    token: string,
): Promise<AxiosResponse<{ accessToken: string }>> =>
    await client.post('api/v1/token', { refreshToken: token })
