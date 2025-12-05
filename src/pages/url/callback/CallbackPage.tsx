import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { kakaoLogin, googleLogin } from 'src/features/auth/authAPI'
import { setCookie } from 'src/global/store/cookie/cookieUtils'

const getExpFromToken = (token: string): Date => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return new Date(payload.exp * 1000)
    } catch {
        return new Date(Date.now() + 3600 * 1000)
    }
}

const CallbackPage = () => {
    const { provider } = useParams<{ provider: string }>()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const handleCallback = async () => {
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

            try {
                const upperProvider = provider.toUpperCase()
                const response =
                    upperProvider === 'KAKAO'
                        ? await kakaoLogin(code)
                        : await googleLogin(code)

                const { accessToken, refreshToken } = response.data

                setCookie('accessToken', accessToken, getExpFromToken(accessToken))
                setCookie('refreshToken', refreshToken, getExpFromToken(refreshToken))

                // 부모 창 리다이렉트 후 팝업 닫기
                if (window.opener) {
                    window.opener.location.href = '/'
                }
                window.close()
            } catch (err) {
                console.error('로그인 처리 실패:', err)
                window.close()
            }
        }

        handleCallback()
    }, [searchParams, provider])

    return null
}

export default CallbackPage
