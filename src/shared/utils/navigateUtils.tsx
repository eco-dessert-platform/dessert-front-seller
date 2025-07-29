import { useNavigate, useLocation } from 'react-router-dom'

/**
 * 히스토리 뒤로가기 + trailing slash 제거
 */
export const useSafeNavigateBack = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const safeNavigateBack = () => {
        // 브라우저 히스토리 뒤로가기 시도
        navigate(-1)

        // setTimeout으로 한 프레임 뒤에 URL 체크
        setTimeout(() => {
            const currentUrl = window.location.pathname
            // 마지막이 /이면 제거
            if (currentUrl.endsWith('/') && currentUrl.length > 1) {
                const fixedUrl = currentUrl.slice(0, -1)
                window.history.replaceState(null, '', fixedUrl)
            }
        }, 0)
    }

    return safeNavigateBack
}
