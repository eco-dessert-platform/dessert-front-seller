import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
    getKakaoPopup,
    getGooglePopup,
    clearKakaoPopup,
    clearGooglePopup,
} from 'src/features/auth/utils/popupManager'
import { RootState } from 'src/global/store/redux/reduxStore'
import { authAction } from '../apis/authReducer'
import { useAppDispatch } from 'src/global/store/redux/reduxHooks'

interface SocialLoginMessage {
    type: 'SOCIAL_LOGIN_SUCCESS' | 'SOCIAL_LOGIN_ERROR'
    provider?: string
    code?: string
    error?: string
}

export const useSocialLogin = () => {
    const dispatch = useAppDispatch()
    const { socialLoginType, isLoading } = useSelector(
        (state: RootState) => state.auth,
    )

    useEffect(() => {
        const handleMessage = (event: MessageEvent<SocialLoginMessage>) => {
            if (event.origin !== window.location.origin) return
            const { type, provider, code, error } = event.data

            if (type === 'SOCIAL_LOGIN_SUCCESS' && provider && code) {
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
                dispatch(authAction.clearSocialLoginType(undefined))
                clearGooglePopup()
                clearKakaoPopup()
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [dispatch])

    useEffect(() => {
        if (!socialLoginType) return

        const popup =
            socialLoginType === 'KAKAO' ? getKakaoPopup() : getGooglePopup()

        if (!popup) return

        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                if (!isLoading)
                    dispatch(authAction.clearSocialLoginType(undefined))
                clearGooglePopup()
                clearKakaoPopup()
                clearInterval(checkPopupClosed)
            }
        }, 1000)

        return () => clearInterval(checkPopupClosed)
    }, [socialLoginType, isLoading, dispatch])
}
