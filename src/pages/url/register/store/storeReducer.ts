import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'

const prefix = 'store'

const asyncRequests = [] as const

const localState = {
    searchKeyword: '',
}

const localReducers = {
    setSearchKeyword: (
        state: typeof localState,
        action: PayloadAction<string>,
    ) => {
        state.searchKeyword = action.payload
    },
    clearSearchKeyword: (state: typeof localState) => {
        state.searchKeyword = ''
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const {
    slice: storeSlice,
    actions: storeAction,
    saga: storeSaga,
} = module
