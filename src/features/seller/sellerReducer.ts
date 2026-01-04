import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import {
    getSellerProfile,
    updateSellerProfile,
    changePassword,
} from './sellerAPI.tsx'

const prefix = 'seller'

const asyncRequests = [
    {
        action: 'getSellerProfile',
        state: 'sellerProfile',
        initialState: null,
        api: getSellerProfile,
    },
    {
        action: 'updateSellerProfile',
        state: 'updateSellerProfileResult',
        initialState: null,
        api: updateSellerProfile,
    },
    {
        action: 'changePassword',
        state: 'changePasswordResult',
        initialState: null,
        api: changePassword,
    },
] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const {
    slice: sellerSlice,
    actions: sellerAction,
    saga: sellerSaga,
} = module

