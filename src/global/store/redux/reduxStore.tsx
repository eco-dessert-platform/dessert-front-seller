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

const reducers = {
    routerReducer: routerSlice.reducer,
    sampleReducer: sampleSlice.reducer,
    themeReducer: themeSlice.reducer,
    storeReducer: storeSlice.reducer,
    auth: authSlice.reducer,
}

export function* rootSaga() {
    yield all([sampleSaga(), routerSaga(), storeSaga(), authSaga()])
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
