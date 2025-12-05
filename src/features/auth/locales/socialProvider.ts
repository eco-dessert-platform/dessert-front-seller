export const KAKAO = {
    authUrl: 'https://kauth.kakao.com/oauth/authorize',
    client_id: import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_KAKAO_AUTH_REDIRECT_URI,
    response_type: 'code',
} as const

export const GOOGLE = {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI,
    clientsecret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET,
    response_type: 'code',
    scope: 'openid email profile',
} as const
