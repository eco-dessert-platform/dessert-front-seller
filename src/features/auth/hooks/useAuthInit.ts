import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks'
import { authAction } from 'src/features/auth/authReducer'
import { getCookie } from 'src/global/store/cookie/cookieUtils'
import { parseUserFromToken, isTokenExpired } from 'src/features/auth/utils/jwtUtils'

/**
 * 앱 초기화 시 쿠키에서 토큰을 읽어 사용자 정보 초기화
 * - 페이지 새로고침 시에도 로그인 상태 유지
 */
export const useAuthInit = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    useEffect(() => {
        // 이미 로그인 상태면 초기화 건너뛰기
        if (isLoggedIn) return

        const accessToken = getCookie('accessToken')

        if (accessToken) {
            // 토큰 만료 확인
            if (isTokenExpired(accessToken)) {
                dispatch(authAction.logout({}))
                return
            }

            const user = parseUserFromToken(accessToken)

            if (user) {
                dispatch(authAction.setIsLoggedIn(true))
                dispatch(authAction.setUser(user))
            } else {
                dispatch(authAction.logout({}))
            }
        }
    }, [dispatch, isLoggedIn])
}

export default useAuthInit
