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
import { toast } from 'react-toastify'
import {
    getExpFromToken,
    parseUserFromToken,
} from 'src/features/auth/utils/jwtUtils'

/**
 * 부모 창에 에러 메시지 전달
 */
const showErrorInParent = (message: string) => {
    if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'LOGIN_ERROR', message }, '*')
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
        const errorDescription = searchParams.get('error_description')

        if (error) {
            const errorMsg = errorDescription || '소셜 로그인이 취소되었습니다.'
            console.error('소셜 로그인 에러:', error)
            toast.error(errorMsg)
            showErrorInParent(errorMsg)
            setTimeout(() => window.close(), 1500)
            return
        }

        if (!code || !provider) {
            const errorMsg = '잘못된 로그인 요청입니다.'
            toast.error(errorMsg)
            showErrorInParent(errorMsg)
            setTimeout(() => window.close(), 1500)
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

            // 쿠키에 토큰 저장
            setCookie('accessToken', accessToken, getExpFromToken(accessToken))
            setCookie(
                'refreshToken',
                refreshToken,
                getExpFromToken(refreshToken),
            )

            // JWT에서 사용자 정보 파싱 후 Redux 상태 업데이트
            const user = parseUserFromToken(accessToken)
            if (user) {
                dispatch(authAction.setUser(user))
            }
            dispatch(authAction.setIsLoggedIn(true))
            dispatch(authAction.clearSocialLoginType())

            // 부모 창 리다이렉트 후 팝업 닫기
            // (부모 창에서 useAuthInit이 쿠키를 읽어 로그인 상태 초기화)
            if (window.opener && !window.opener.closed) {
                window.opener.location.href = '/'
            }
            window.close()
        }

        // 로그인 실패
        if (loginData?.error) {
            const errorMsg = loginData.errorMsg || '로그인에 실패했습니다.'
            console.error('로그인 처리 실패:', errorMsg)
            toast.error(errorMsg)
            showErrorInParent(errorMsg)
            setTimeout(() => window.close(), 2000)
        }
    }, [kakaoLoginData, googleLoginData, provider])

    return null
}

export default CallbackPage
