import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { getSalesAnalysis, getSalesSummary } from './statisticsAPI.tsx'

const prefix = 'statistics'

const asyncRequests = [
    {
        action: 'getSalesAnalysis',
        state: 'salesAnalysis',
        initialState: null,
        api: getSalesAnalysis,
    },
    {
        action: 'getSalesSummary',
        state: 'salesSummary',
        initialState: null,
        api: getSalesSummary,
    },
] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const {
    slice: statisticsSlice,
    actions: statisticsAction,
    saga: statisticsSaga,
} = module

