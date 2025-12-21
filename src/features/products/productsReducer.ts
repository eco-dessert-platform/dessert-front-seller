import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { getProductList } from './productsAPI'

const prefix = 'products'

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
    slice: productsSlice,
    actions: productsAction,
    saga: productsSaga,
} = module
