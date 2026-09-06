import axios from 'axios'

import { useAuthStore } from '@/entity/auth/auth-store'
import {
  deleteCookie,
  getCookie,
  getExpFromToken,
  setCookie,
} from '@/shared/utils/cookieUtils'

const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const clearSessionAndRedirectToAuth = () => {
  deleteCookie('accessToken')
  useAuthStore.getState().logout()
  if (window.location.pathname !== '/auth') {
    window.location.href = '/auth'
  }
}

// FormData는 Content-Type을 수동 지정하지 않음.
// axios 기본 application/json을 제거해야 boundary 포함 multipart가 설정됩니다.
client.interceptors.request.use(
  (config) => {
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      config.headers.delete('Content-Type')
    }

    const token = getCookie('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 401 응답 시 토큰 재발급
let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push((token: string) => {
          if (!token) {
            reject(error)
            return
          }
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(client(originalRequest))
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const response = await axios.post(
        `${baseURL}/api/v1/auth/reissue`,
        null,
        { withCredentials: true },
      )

      const newAccessToken = response.headers['authorization']?.replace(
        'Bearer ',
        '',
      )

      if (newAccessToken) {
        setCookie(
          'accessToken',
          newAccessToken,
          getExpFromToken(newAccessToken),
        )
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        pendingRequests.forEach((cb) => cb(newAccessToken))
        pendingRequests = []
        return client(originalRequest)
      }

      pendingRequests.forEach((cb) => cb(''))
      pendingRequests = []
      clearSessionAndRedirectToAuth()
    } catch {
      pendingRequests.forEach((cb) => cb(''))
      pendingRequests = []
      clearSessionAndRedirectToAuth()
    } finally {
      isRefreshing = false
    }

    return Promise.reject(error)
  },
)

export const stream = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  responseType: 'stream',
})
