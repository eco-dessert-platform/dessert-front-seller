import '@/styles/index.css'

import ReactDOM from 'react-dom/client'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import {
  ApprovedOnlyRoute,
  GuestOnlyRoute,
  RegisterAccessRoute,
} from '@/features/auth'
import { initCreateFunnelRouterSubscription } from '@/features/products/create/create-form/init-create-funnel-router-subscription'
import AuthPage from '@/pages/auth/auth-page'
import SocialCallbackPage from '@/pages/auth/social-callback-page'
import AllOrdersPage from '@/pages/orders/all-orders/all-orders-page'
import CompletedOrdersPage from '@/pages/orders/completed-orders/completed-orders-page'
import CreatePage from '@/pages/products/create/create-page'
import { DetailEditPage } from '@/pages/products/create/detail-edit-page'
import { EditDetailPage } from '@/pages/products/edit/edit-detail-page'
import EditPage from '@/pages/products/edit/edit-page'
import ProductsPage from '@/pages/products/product/product-page'
import CompletePage from '@/pages/register/complete/complete-page'
import RegisterLayout from '@/pages/register/register-layout'
import StoreInfoPage from '@/pages/register/store-info/store-info-page'
import VerificationPage from '@/pages/register/verification/verification-page'
import SettlementPage from '@/pages/settlements/index-page'
import SalesAnalyticsPage from '@/pages/statistics/sales-analytics/sales-analytics-page'
import { ROUTES } from '@/shared/constant/routes'

import App from './App'
import { SellerInfoPage } from './pages/seller-info/seller-info-page'
import ChargePage from './pages/settlements/charge/charge-page'
import FixedLayout from './shared/block/fixed-layout/fixed-layout'

const router = createBrowserRouter([
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: ROUTES.AUTH,
        element: <AuthPage />,
      },
    ],
  },
  {
    path: ROUTES.CALLBACK.SOCIAL,
    element: <SocialCallbackPage />,
  },
  {
    element: <ApprovedOnlyRoute />,
    children: [
      {
        path: ROUTES.PRODUCTS.CREATE_DETAIL,
        element: <DetailEditPage />,
      },
      {
        path: ROUTES.PRODUCTS.EDIT_DETAIL,
        element: <EditDetailPage />,
      },
      {
        path: ROUTES.HOME,
        element: <FixedLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.PRODUCTS.ALL} replace />,
          },
          { path: ROUTES.ORDERS.ALL, element: <AllOrdersPage /> },
          { path: ROUTES.ORDERS.COMPLETED, element: <CompletedOrdersPage /> },
          { path: ROUTES.PRODUCTS.ALL, element: <ProductsPage /> },
          { path: ROUTES.PRODUCTS.CREATE, element: <CreatePage /> },
          { path: ROUTES.PRODUCTS.EDIT, element: <EditPage /> },
          { path: ROUTES.SETTLEMENTS.ALL, element: <SettlementPage /> },
          {
            path: ROUTES.STATISTICS.SALES_ANALYTICS,
            element: <SalesAnalyticsPage />,
          },
          { path: ROUTES.SETTLEMENTS.CHARGE, element: <ChargePage /> },
          { path: ROUTES.INFO.CHANGE, element: <SellerInfoPage /> },
        ],
      },
    ],
  },
  {
    element: <RegisterAccessRoute />,
    children: [
      {
        path: ROUTES.REGISTER.DEFAULT,
        element: <RegisterLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.REGISTER.VERIFICATION} replace />,
          },
          { path: ROUTES.REGISTER.VERIFICATION, element: <VerificationPage /> },
          { path: ROUTES.REGISTER.STORE_INFO, element: <StoreInfoPage /> },
          { path: ROUTES.REGISTER.COMPLETE, element: <CompletePage /> },
        ],
      },
    ],
  },
])

initCreateFunnelRouterSubscription(router)

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(<App router={router} />)
