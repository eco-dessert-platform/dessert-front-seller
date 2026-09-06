import { useEffect } from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/entity/auth'
import { ROUTES, TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getCookie } from '@/shared/utils'

export interface RedirectState {
  from?: string
}

const hasValidSession = (isLoggedIn: boolean) =>
  isLoggedIn && Boolean(getCookie(TOKEN_COOKIE_KEYS.ACCESS))

/** 스토어에는 로그인 상태로 남아 있지만 토큰이 사라진 경우 정리 */
const useClearStaleSession = (isLoggedIn: boolean) => {
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (isLoggedIn && !getCookie(TOKEN_COOKIE_KEYS.ACCESS)) {
      logout()
    }
  }, [isLoggedIn, logout])
}

/** 관리자 화면 - 로그인하지 않았다면 로그인 화면으로 이동 */
export const ProtectedRoute = () => {
  const location = useLocation()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useClearStaleSession(isLoggedIn)

  if (!hasValidSession(isLoggedIn)) {
    const state: RedirectState = {
      from: `${location.pathname}${location.search}`,
    }
    return <Navigate to={ROUTES.LOGIN} replace state={state} />
  }

  return <Outlet />
}

/** 로그인 화면 - 이미 로그인했다면 관리자 화면으로 이동 */
export const GuestOnlyRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useClearStaleSession(isLoggedIn)

  if (hasValidSession(isLoggedIn)) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Outlet />
}
