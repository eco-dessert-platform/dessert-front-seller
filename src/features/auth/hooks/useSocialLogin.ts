import { useEffect } from 'react'
import {
    getKakaoPopup,
    getGooglePopup,
    clearKakaoPopup,
    clearGooglePopup,
} from 'src/features/auth/utils/popupManager'
import { RootState } from 'src/global/store/redux/reduxStore'
import { authAction } from '../store/authReducer'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks'

interface SocialLoginMessage {
    type: 'SOCIAL_LOGIN_SUCCESS' | 'SOCIAL_LOGIN_ERROR'
    provider?: string
    code?: string
    error?: string
}

export const useSocialLogin = () => {
    const dispatch = useAppDispatch()
    const { socialLoginType } = useAppSelector((state: RootState) => state.auth)

    const kakaoLoginData = useAppSelector(
        (state: RootState) => state.auth.kakaoLoginData,
    )
    const googleLoginData = useAppSelector(
        (state: RootState) => state.auth.googleLoginData,
    )

    useEffect(() => {
        const handleMessage = (event: MessageEvent<SocialLoginMessage>) => {
            if (event.origin !== window.location.origin) return
            const { type, provider, code, error } = event.data

            if (type === 'SOCIAL_LOGIN_SUCCESS' && provider && code) {
                console.log('소셜 로그인 성공:', { provider, code })

                const upperProvider = provider.toUpperCase() as
                    | 'KAKAO'
                    | 'GOOGLE'

                if (upperProvider === 'GOOGLE') {
                    dispatch(authAction.googleLogin(code))
                } else {
                    dispatch(authAction.kakaoLogin(code))
                }

                clearGooglePopup()
                clearKakaoPopup()
            }

            if (type === 'SOCIAL_LOGIN_ERROR') {
                console.error('소셜 로그인 에러:', error)
                dispatch(authAction.clearSocialLoginType())
                clearGooglePopup()
                clearKakaoPopup()
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [dispatch])

    useEffect(() => {
        if (kakaoLoginData?.data && !kakaoLoginData.loading) {
            console.log('카카오 로그인 완료:', kakaoLoginData.data)
            dispatch(authAction.handleLoginSuccess(kakaoLoginData.data))

            window.location.href = '/'
        }
    }, [kakaoLoginData, dispatch])

    useEffect(() => {
        if (googleLoginData?.data && !googleLoginData.loading) {
            console.log('구글 로그인 완료:', googleLoginData.data)
            dispatch(authAction.handleLoginSuccess(googleLoginData.data))

            window.location.href = '/'
        }
    }, [googleLoginData, dispatch])

    useEffect(() => {
        if (!socialLoginType) return

        const popup =
            socialLoginType === 'KAKAO' ? getKakaoPopup() : getGooglePopup()

        if (!popup) return

        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                const isLoading =
                    kakaoLoginData?.loading || googleLoginData?.loading

                if (!isLoading) {
                    dispatch(authAction.clearSocialLoginType())
                }
                clearGooglePopup()
                clearKakaoPopup()
                clearInterval(checkPopupClosed)
            }
        }, 1000)

        return () => clearInterval(checkPopupClosed)
    }, [socialLoginType, kakaoLoginData, googleLoginData, dispatch])
}
