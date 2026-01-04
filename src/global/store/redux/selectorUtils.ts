import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './reduxStore'

/**
 * 타입 안전한 selector 생성 헬퍼
 * 각 리듀서의 상태를 안전하게 선택할 수 있도록 도와줍니다.
 */

// Store Reducer Selectors
export const selectStoreReducer = (state: RootState) => state.storeReducer
export const selectStoreSearchKeyword = createSelector(
    [selectStoreReducer],
    (storeReducer) => storeReducer.searchKeyword,
)

// Orders Reducer Selectors
export const selectOrdersReducer = (state: RootState) => state.ordersReducer
export const selectOrderList = createSelector(
    [selectOrdersReducer],
    (ordersReducer) => ordersReducer.orderList,
)
export const selectOrderCompletedList = createSelector(
    [selectOrdersReducer],
    (ordersReducer) => ordersReducer.orderCompletedList,
)

// Products Reducer Selectors
export const selectProductsReducer = (state: RootState) => state.productsReducer
export const selectProducts = createSelector(
    [selectProductsReducer],
    (productsReducer) => productsReducer.products,
)
export const selectProduct = createSelector(
    [selectProductsReducer],
    (productsReducer) => productsReducer.product,
)

// Settlements Reducer Selectors
export const selectSettlementsReducer = (state: RootState) =>
    state.settlementsReducer
export const selectSettlements = createSelector(
    [selectSettlementsReducer],
    (settlementsReducer) => settlementsReducer.settlements,
)
export const selectChargeStatus = createSelector(
    [selectSettlementsReducer],
    (settlementsReducer) => settlementsReducer.chargeStatus,
)
export const selectPendingPayments = createSelector(
    [selectSettlementsReducer],
    (settlementsReducer) => settlementsReducer.pendingPayments,
)
export const selectVatReports = createSelector(
    [selectSettlementsReducer],
    (settlementsReducer) => settlementsReducer.vatReports,
)
export const selectTaxInvoices = createSelector(
    [selectSettlementsReducer],
    (settlementsReducer) => settlementsReducer.taxInvoices,
)

// Statistics Reducer Selectors
export const selectStatisticsReducer = (state: RootState) =>
    state.statisticsReducer
export const selectSalesAnalysis = createSelector(
    [selectStatisticsReducer],
    (statisticsReducer) => statisticsReducer.salesAnalysis,
)
export const selectSalesSummary = createSelector(
    [selectStatisticsReducer],
    (statisticsReducer) => statisticsReducer.salesSummary,
)

// Seller Reducer Selectors
export const selectSellerReducer = (state: RootState) => state.sellerReducer
export const selectSellerProfile = createSelector(
    [selectSellerReducer],
    (sellerReducer) => sellerReducer.sellerProfile,
)

// Auth Reducer Selectors
export const selectAuthReducer = (state: RootState) => state.auth
export const selectIsAuthenticated = createSelector(
    [selectAuthReducer],
    (auth) => auth.isLoggedIn,
)

// Admin Products Reducer Selectors
export const selectAdminProductsReducer = (state: RootState) =>
    state.adminProductsReducer
export const selectAdminProductList = createSelector(
    [selectAdminProductsReducer],
    (adminProductsReducer) => adminProductsReducer.productList,
)

// Sample Reducer Selectors
export const selectSampleReducer = (state: RootState) => state.sampleReducer
export const selectSampleProduct = createSelector(
    [selectSampleReducer],
    (sampleReducer) => sampleReducer.product,
)
export const selectSampleProducts = createSelector(
    [selectSampleReducer],
    (sampleReducer) => sampleReducer.products,
)
export const selectSampleValue = createSelector(
    [selectSampleReducer],
    (sampleReducer) => sampleReducer.value,
)

