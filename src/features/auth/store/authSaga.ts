import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../services/authService'
import {
    socialLoginRequest,
    socialLoginSuccess,
    socialLoginFailure,
    refreshTokenRequest,
    refreshTokenSuccess,
    refreshTokenFailure,
} from './authSlice'
import { SocialType } from '../type/social'

function getExpFromToken(token: string): Date {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return new Date(payload.exp * 1000)
    } catch {
        return new Date(Date.now() + 3600 * 1000)
    }
}

function setCookie(name: string, value: string, expires: Date) {
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

function getCookie(name: string): string | null {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') +
                '=([^;]*)',
        ),
    )
    return matches ? decodeURIComponent(matches[1]) : null
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

function* handleSocialLogin(
    action: PayloadAction<{ provider: SocialType; code: string }>,
) {
    try {
        const { provider, code } = action.payload
        console.log('플랫폼 토큰 발급 시작:', {
            provider,
            code: code.substring(0, 20) + '...',
        })

        let socialToken: string
        if (provider === 'KAKAO') {
            const kakaoData: { access_token: string } = yield call(
                authService.getKakaoToken,
                code,
            )
            socialToken = kakaoData.access_token
            console.log('카카오 토큰 발급 성공')
        } else if (provider === 'GOOGLE') {
            const googleData: { access_token: string } = yield call(
                authService.getGoogleToken,
                code,
            )
            socialToken = googleData.access_token
            console.log('구글 토큰 발급 성공')
        } else {
            throw new Error(`지원하지 않는 소셜 로그인: ${provider}`)
        }

        console.log('백엔드 로그인 시도:', {
            provider,
            socialToken: socialToken.substring(0, 20) + '...',
        })

        const loginData: { accessToken: string; refreshToken: string } =
            yield call([authService, authService.login], {
                socialType: provider,
                socialToken,
            })
        console.log('백엔드 로그인 성공')

        const accessTokenExp = getExpFromToken(loginData.accessToken)
        const refreshTokenExp = getExpFromToken(loginData.refreshToken)

        setCookie('accessToken', loginData.accessToken, accessTokenExp)
        setCookie('refreshToken', loginData.refreshToken, refreshTokenExp)

        yield put(
            socialLoginSuccess({
                accessToken: loginData.accessToken,
                refreshToken: loginData.refreshToken,
            }),
        )

        window.location.href = '/' // 이미 가입된 셀러는 '/', 신규 셀러는 '/register'
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : '로그인 실패'
        yield put(socialLoginFailure(errorMessage))
        console.error('소셜 로그인 실패:', error)
    }
}

function* handleRefreshToken() {
    try {
        const refreshToken = getCookie('refreshToken')

        if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다')
        }

        const data: { accessToken: string } = yield call(
            authService.extendLogin,
            refreshToken,
        )

        const accessTokenExp = getExpFromToken(data.accessToken)
        setCookie('accessToken', data.accessToken, accessTokenExp)

        yield put(refreshTokenSuccess({ accessToken: data.accessToken }))
    } catch (error) {
        console.log(error)
        yield put(refreshTokenFailure())
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        window.location.href = '/login'
    }
}

export function* authSaga() {
    yield takeLatest(socialLoginRequest.type, handleSocialLogin)
    yield takeLatest(refreshTokenRequest.type, handleRefreshToken)
}
