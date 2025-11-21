import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'

import { PayloadAction } from '@reduxjs/toolkit'
import { getProduct, getProducts } from 'src/features/sample/sampleAPI.tsx'

const prefix = 'sample'

const asyncRequests = [
    {
        action: 'getProduct',
        state: 'product',
        initialState: null,
        api: getProduct,
    },




    {
        action: 'getProducts',
        state: 'products',
        initialState: null,
        api: getProducts,
    },



] as const

const localState = {
    value: 0,
}

const localReducers = {
    decrement: (state: typeof localState) => {
        state.value -= 1
    },
    setValue: (state: typeof localState, action: PayloadAction<number>) => {
        state.value = action.payload
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const {
    slice: sampleSlice,
    actions: sampleAction,
    saga: sampleSaga,
} = module