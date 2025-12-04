import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SocialType } from '../type/social'

interface AuthState {
    socialLoginType: SocialType | null
    isLoggedIn: boolean
    accessToken: string | null
    refreshToken: string | null
    isLoading: boolean
    error: string | null
}

const initialState: AuthState = {
    socialLoginType: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSocialLoginType: (
            state,
            action: PayloadAction<SocialType | null>,
        ) => {
            state.socialLoginType = action.payload
        },
        clearSocialLoginType: (state) => {
            state.socialLoginType = null
        },

        socialLoginRequest: (
            state,
            _action: PayloadAction<{ provider: SocialType; code: string }>,
        ) => {
            state.isLoading = true
            state.error = null
        },
        socialLoginSuccess: (
            state,
            action: PayloadAction<{
                accessToken: string
                refreshToken: string
            }>,
        ) => {
            state.isLoading = false
            state.isLoggedIn = true
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.socialLoginType = null
        },
        socialLoginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
            state.socialLoginType = null
        },

        logout: (state) => {
            state.isLoggedIn = false
            state.accessToken = null
            state.refreshToken = null
        },

        refreshTokenRequest: (state) => {
            state.isLoading = true
        },
        refreshTokenSuccess: (
            state,
            action: PayloadAction<{ accessToken: string }>,
        ) => {
            state.isLoading = false
            state.accessToken = action.payload.accessToken
        },
        refreshTokenFailure: (state) => {
            state.isLoading = false
            state.isLoggedIn = false
            state.accessToken = null
            state.refreshToken = null
        },
    },
})

export const {
    setSocialLoginType,
    clearSocialLoginType,
    socialLoginRequest,
    socialLoginSuccess,
    socialLoginFailure,
    logout,
    refreshTokenRequest,
    refreshTokenSuccess,
    refreshTokenFailure,
} = authSlice.actions

export default authSlice
