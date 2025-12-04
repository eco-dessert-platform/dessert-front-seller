import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearSocialLoginType,
    socialLoginRequest,
} from 'src/features/auth/store/authSlice'
import {
    getKakaoPopup,
    getGooglePopup,
    clearKakaoPopup,
    clearGooglePopup,
} from 'src/features/auth/utils/popupManager'
import { RootState } from 'src/global/store/redux/reduxStore'

interface SocialLoginMessage {
    type: 'SOCIAL_LOGIN_SUCCESS' | 'SOCIAL_LOGIN_ERROR'
    provider?: string
    code?: string
    error?: string
}

export const useSocialLogin = () => {
    const dispatch = useDispatch()
    const { socialLoginType, isLoading } = useSelector(
        (state: RootState) => state.auth,
    )

    useEffect(() => {
        const handleMessage = (event: MessageEvent<SocialLoginMessage>) => {
            if (event.origin !== window.location.origin) return

            const { type, provider, code, error } = event.data

            if (type === 'SOCIAL_LOGIN_SUCCESS' && code && provider) {
                console.log('소셜 로그인 성공:', { provider, code })

                const upperProvider = provider.toUpperCase() as
                    | 'KAKAO'
                    | 'GOOGLE'

                dispatch(
                    socialLoginRequest({
                        provider: upperProvider,
                        code,
                    }),
                )

                if (upperProvider === 'GOOGLE') {
                    clearGooglePopup()
                } else {
                    clearKakaoPopup()
                }
            }

            if (type === 'SOCIAL_LOGIN_ERROR') {
                console.error('소셜 로그인 에러:', error)
                dispatch(clearSocialLoginType())
                clearKakaoPopup()
                clearGooglePopup()
            }
        }

        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [dispatch])

    useEffect(() => {
        if (!socialLoginType) return

        const popup =
            socialLoginType === 'KAKAO' ? getKakaoPopup() : getGooglePopup()

        if (!popup) return

        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                if (!isLoading) {
                    dispatch(clearSocialLoginType())
                }
                clearKakaoPopup()
                clearGooglePopup()
                clearInterval(checkPopupClosed)
            }
        }, 1000)

        return () => clearInterval(checkPopupClosed)
    }, [socialLoginType, isLoading, dispatch])
}
