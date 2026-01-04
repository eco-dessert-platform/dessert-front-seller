import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from './productsAPI.tsx'

const prefix = 'products'

const asyncRequests = [
    {
        action: 'getProducts',
        state: 'products',
        initialState: null,
        api: getProducts,
    },
    {
        action: 'getProduct',
        state: 'product',
        initialState: null,
        api: getProduct,
    },
    {
        action: 'createProduct',
        state: 'createProductResult',
        initialState: null,
        api: createProduct,
    },
    {
        action: 'updateProduct',
        state: 'updateProductResult',
        initialState: null,
        api: updateProduct,
    },
    {
        action: 'deleteProduct',
        state: 'deleteProductResult',
        initialState: null,
        api: deleteProduct,
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

