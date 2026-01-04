import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { getProductList } from './productsAPI'

const prefix = 'adminProducts'

const asyncRequests = [
    {
        action: 'getProductList',
        state: 'productList',
        initialState: null,
        api: getProductList,
    },
] as const

const localState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: adminProductsSlice,
    actions: productsAction,
    saga: adminProductsSaga,
} = module

