import createSagaMiddleware from 'redux-saga'
import { configureStore, Tuple } from '@reduxjs/toolkit'
import { all } from 'redux-saga/effects'
import { routerSaga, routerSlice } from 'src/global/router/routerReducer.tsx'
import { sampleSaga, sampleSlice } from 'src/features/sample/sampleReducer.ts'
import { themeSlice } from 'src/shared/components/theme/themeReducer.tsx'
import {
    storeSaga,
    storeSlice,
} from 'src/pages/url/register/store/storeReducer'
import { authSaga, authSlice } from 'src/features/auth/authReducer.ts'
import { ordersSaga, ordersSlice } from 'src/features/orders/ordersReducer.ts'
import { adminProductsSaga, adminProductsSlice } from 'src/features/admin/products/productsReducer.ts'
import { productsSaga, productsSlice } from 'src/features/products/productsReducer.ts'
import { settlementsSaga, settlementsSlice } from 'src/features/settlements/settlementsReducer.ts'
import { statisticsSaga, statisticsSlice } from 'src/features/statistics/statisticsReducer.ts'
import { sellerSaga, sellerSlice } from 'src/features/seller/sellerReducer.ts'

const reducers = {
    routerReducer: routerSlice.reducer,
    sampleReducer: sampleSlice.reducer,
    themeReducer: themeSlice.reducer,
    storeReducer: storeSlice.reducer,
    auth: authSlice.reducer,
    ordersReducer: ordersSlice.reducer,
    adminProductsReducer: adminProductsSlice.reducer,
    productsReducer: productsSlice.reducer,
    settlementsReducer: settlementsSlice.reducer,
    statisticsReducer: statisticsSlice.reducer,
    sellerReducer: sellerSlice.reducer,
}

export function* rootSaga() {
    yield all([
        sampleSaga(),
        routerSaga(),
        storeSaga(),
        authSaga(),
        ordersSaga(),
        adminProductsSaga(),
        productsSaga(),
        settlementsSaga(),
        statisticsSaga(),
        sellerSaga(),
    ])
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', //보여지는지 여부
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

sagaMiddleware.run(rootSaga)
export default store
