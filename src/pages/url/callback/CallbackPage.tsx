import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const CallbackPage = () => {
    const { provider } = useParams<{ provider: string }>()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
            console.error('소셜 로그인 에러:', error)
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'SOCIAL_LOGIN_ERROR', error },
                    window.location.origin,
                )
            }
            window.close()
            return
        }

        if (code) {
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'SOCIAL_LOGIN_SUCCESS', provider, code },
                    window.location.origin,
                )
            }
            window.close()
        }
    }, [searchParams, provider])

    return null
}

export default CallbackPage
