import { useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { authAction } from 'src/features/auth/authReducer'
import { setCookie } from 'src/global/store/cookie/cookieUtils'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks'
import { LoginResponse } from 'src/features/auth/type/auth'
import { AsyncState } from 'src/global/store/redux/reduxUtils'

const getExpFromToken = (token: string): Date => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return new Date(payload.exp * 1000)
    } catch {
        return new Date(Date.now() + 3600 * 1000)
    }
}

const CallbackPage = () => {
    const dispatch = useAppDispatch()
    const { provider } = useParams<{ provider: string }>()
    const [searchParams] = useSearchParams()
    const isDispatched = useRef(false)

    const kakaoLoginData = useAppSelector(
        (state) => state.auth.kakaoLoginData as AsyncState<LoginResponse>,
    )
    const googleLoginData = useAppSelector(
        (state) => state.auth.googleLoginData as AsyncState<LoginResponse>,
    )

    // 최초 마운트 시 로그인 action dispatch
    useEffect(() => {
        if (isDispatched.current) return
        isDispatched.current = true

        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
            console.error('소셜 로그인 에러:', error)
            window.close()
            return
        }

        if (!code || !provider) {
            window.close()
            return
        }

        const upperProvider = provider.toUpperCase()
        if (upperProvider === 'KAKAO') {
            dispatch(authAction.kakaoLogin(code))
        } else {
            dispatch(authAction.googleLogin(code))
        }
    }, [searchParams, provider, dispatch])

    // 로그인 결과 감지
    useEffect(() => {
        const loginData =
            provider?.toUpperCase() === 'KAKAO'
                ? kakaoLoginData
                : googleLoginData

        // 로그인 성공
        if (loginData?.data) {
            const { accessToken, refreshToken } = loginData.data

            setCookie('accessToken', accessToken, getExpFromToken(accessToken))
            setCookie(
                'refreshToken',
                refreshToken,
                getExpFromToken(refreshToken),
            )

            // 부모 창에 로그인 성공 알림 후 리다이렉트
            if (window.opener) {
                window.opener.location.href = '/'
            }
            window.close()
        }

        // 로그인 실패
        if (loginData?.error) {
            console.error('로그인 처리 실패:', loginData.errorMsg)
            window.close()
        }
    }, [kakaoLoginData, googleLoginData, provider])

    return null
}

export default CallbackPage
