import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { getAdminProductList, deleteAdminProducts } from './adminProductsAPI'

const prefix = 'adminProducts'

const asyncRequests = [
    {
        action: 'getAdminProductList',
        state: 'adminProductList',
        initialState: null,
        api: getAdminProductList,
    },
    {
        action: 'deleteAdminProducts',
        state: 'deleteProductsResult',
        initialState: null,
        api: deleteAdminProducts,
    },
] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: adminProductsSlice,
    actions: adminProductsAction,
    saga: adminProductsSaga,
} = module
