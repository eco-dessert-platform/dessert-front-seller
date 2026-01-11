import axios from 'axios'
import { getCookie } from 'src/global/store/cookie/cookieUtils'

const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

export const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 모든 요청에 Bearer Token 추가
client.interceptors.request.use(
    (config) => {
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

export const stream = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    responseType: 'stream',
})

export const kakaoOAuthClient = axios.create({
    baseURL: 'https://kauth.kakao.com',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})

export const googleOAuthClient = axios.create({
    baseURL: 'https://oauth2.googleapis.com',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})
