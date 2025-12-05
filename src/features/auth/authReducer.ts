import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'
import { kakaoLogin, googleLogin, refreshToken } from './authAPI'
import { SocialType } from './type/social'
import { UserInfo } from './type/auth'
import { deleteCookie } from 'src/global/store/cookie/cookieUtils'

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
    user: null as UserInfo | null,
}

const localReducers = {
    setSocialLoginType: (
        state: typeof localState,
        action: PayloadAction<SocialType | null>,
    ) => {
        state.socialLoginType = action.payload
    },
    clearSocialLoginType: (state: typeof localState) => {
        state.socialLoginType = null
    },
    logout: (state: typeof localState) => {
        state.isLoggedIn = false
        state.user = null
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
    },
    setIsLoggedIn: (
        state: typeof localState,
        action: PayloadAction<boolean>,
    ) => {
        state.isLoggedIn = action.payload
    },
    setUser: (
        state: typeof localState,
        action: PayloadAction<UserInfo | null>,
    ) => {
        state.user = action.payload
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: authSlice,
    actions: authAction,
    saga: authSaga,
} = module
