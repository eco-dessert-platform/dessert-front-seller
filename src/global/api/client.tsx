import axios from 'axios'

const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

/**
 * 기본 API 클라이언트
 */
export const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * 스트림 API 클라이언트
 */
export const stream = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    responseType: 'stream',
})

/**
 * 카카오 OAuth 클라이언트
 */
export const kakaoOAuthClient = axios.create({
    baseURL: 'https://kauth.kakao.com',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})

/**
 * 구글 OAuth 클라이언트
 */
export const googleOAuthClient = axios.create({
    baseURL: 'https://oauth2.googleapis.com',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})
