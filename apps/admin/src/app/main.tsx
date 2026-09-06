import React from 'react'
import '@/styles/index.css'

import ReactDOM from 'react-dom/client'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import { GuestOnlyRoute, ProtectedRoute } from '@/features/auth'
import AuthPage from '@/pages/auth/auth-page'
import {
  NoticeCreatePage,
  NoticeEditPage,
  NoticePage,
} from '@/pages/home-page/notice'
import { AllProductPage } from '@/pages/product/all-product'
import { UploadApprovalPage } from '@/pages/product/upload-approval'
import { MemberApprovalPage } from '@/pages/store/member-approval'
import { NameChangeApprovalPage } from '@/pages/store/name-change-approval'
import { StoreRegistrationPage } from '@/pages/store/registration'
import { ROUTES } from '@/shared/constant/routes'

import App from './app'
import FixedLayout from './fixed-layout'

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.HOME,
        element: <FixedLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.STORE.MEMBER_APPROVAL} replace />,
          },
          {
            path: ROUTES.STORE.MEMBER_APPROVAL,
            element: <MemberApprovalPage />,
          },
          {
            path: ROUTES.STORE.NAME_CHANGE_APPROVAL,
            element: <NameChangeApprovalPage />,
          },
          {
            path: ROUTES.STORE.REGISTRATION,
            element: <StoreRegistrationPage />,
          },
          {
            path: ROUTES.PRODUCTS.UPLOAD_APPROVAL,
            element: <UploadApprovalPage />,
          },
          {
            path: ROUTES.PRODUCTS.ALL,
            element: <AllProductPage />,
          },
          {
            path: ROUTES.HOMEPAGE.NOTICE,
            element: <NoticePage />,
          },
          {
            path: ROUTES.HOMEPAGE.NOTICE_CREATE,
            element: <NoticeCreatePage />,
          },
          {
            path: ROUTES.HOMEPAGE.NOTICE_EDIT,
            element: <NoticeEditPage />,
          },
        ],
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <AuthPage />,
      },
    ],
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>,
)
