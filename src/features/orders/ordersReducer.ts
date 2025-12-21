import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { getOrderList, getOrderCompletedList } from './ordersAPI'

const prefix = 'orders'

const asyncRequests = [
    {
        action: 'getOrderList',
        state: 'orderList',
        initialState: null,
        api: getOrderList,
    },
    {
        action: 'getOrderCompletedList',
        state: 'orderCompletedList',
        initialState: null,
        api: getOrderCompletedList,
    },
] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: ordersSlice,
    actions: ordersAction,
    saga: ordersSaga,
} = module
