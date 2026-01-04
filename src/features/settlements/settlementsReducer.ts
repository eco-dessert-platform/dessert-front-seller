import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import {
    getSettlements,
    getChargeStatus,
    getPendingPayments,
    getVatReports,
    getTaxInvoices,
} from './settlementsAPI.tsx'

const prefix = 'settlements'

const asyncRequests = [
    {
        action: 'getSettlements',
        state: 'settlements',
        initialState: null,
        api: getSettlements,
    },
    {
        action: 'getChargeStatus',
        state: 'chargeStatus',
        initialState: null,
        api: getChargeStatus,
    },
    {
        action: 'getPendingPayments',
        state: 'pendingPayments',
        initialState: null,
        api: getPendingPayments,
    },
    {
        action: 'getVatReports',
        state: 'vatReports',
        initialState: null,
        api: getVatReports,
    },
    {
        action: 'getTaxInvoices',
        state: 'taxInvoices',
        initialState: null,
        api: getTaxInvoices,
    },
] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const {
    slice: settlementsSlice,
    actions: settlementsAction,
    saga: settlementsSaga,
} = module

