import axios from 'axios'
import qs from 'qs'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getCookie } from '@/shared/utils/cookieUtils'
const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

declare module 'axios' {
  interface AxiosRequestConfig {
    unauthorizedPolicy?: 'redirect' | 'throw'
  }
}

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
})

client.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN_COOKIE_KEYS.ACCESS)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

type UnauthorizedCallback = () => void

export const setupAuthResponseInterceptor = (
  onUnauthorized: UnauthorizedCallback,
) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const requestUrl = error.config?.url ?? ''
        const isLoginRequest = /\/api\/v1\/admin\/login(?:\?|$)/.test(
          requestUrl,
        )
        const unauthorizedPolicy =
          error.config?.unauthorizedPolicy ?? 'redirect'

        // 로그인 요청의 401은 무시 (onError에서 처리)
        // 세션만 정리하면 라우트 가드가 로그인 화면으로 이동시킨다
        if (!isLoginRequest && unauthorizedPolicy === 'redirect') {
          onUnauthorized()
        }
      }
      return Promise.reject(error)
    },
  )
}
