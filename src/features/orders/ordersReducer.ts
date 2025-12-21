import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'

const prefix = 'orders'

const asyncRequests = [] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: ordersSlice,
    actions: ordersAction,
    saga: ordersSaga,
} = module
