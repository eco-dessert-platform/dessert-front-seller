import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'
import {
    deleteCookie,
    getExpFromToken,
    setCookie,
} from 'src/global/store/cookie/cookieUtils.ts'
import { googleLogin, kakaoLogin, refreshToken } from './authAPI.ts'
import { SocialType } from './type/auth.ts'

const prefix = 'auth'

const asyncRequests = [
    {
        action: 'kakaoLogin',
        state: 'kakaoLoginData',
        initialState: null,
        api: kakaoLogin,
    },
    {
        action: 'googleLogin',
        state: 'googleLoginData',
        initialState: null,
        api: googleLogin,
    },
    {
        action: 'refreshToken',
        state: 'tokenData',
        initialState: null,
        api: refreshToken,
    },
] as const

const localState = {
    socialLoginType: null as SocialType | null,
    isLoggedIn: false,
}

const localReducers = {
    setSocialLoginType: (
        state: typeof localState,
        action: PayloadAction<SocialType | null>,
    ) => {
        state.socialLoginType = action.payload
    },

    clearSocialLoginType(state: typeof localState) {
        state.socialLoginType = null
    },

    logout: (state: typeof localState) => {
        state.isLoggedIn = false
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
    },

    setIsLoggedIn: (
        state: typeof localState,
        action: PayloadAction<boolean>,
    ) => {
        state.isLoggedIn = action.payload
    },

    handleLoginSuccess: (
        state: typeof localState,
        action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
        const { accessToken, refreshToken } = action.payload

        const accessTokenExp = getExpFromToken(accessToken)
        const refreshTokenExp = getExpFromToken(refreshToken)

        setCookie('accessToken', accessToken, accessTokenExp)
        setCookie('refreshToken', refreshToken, refreshTokenExp)

        state.isLoggedIn = true
        state.socialLoginType = null
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const { slice: authSlice, actions: authAction, saga: authSaga } = module
