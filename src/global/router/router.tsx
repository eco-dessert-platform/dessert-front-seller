import { createBrowserRouter, Outlet, RouteObject } from 'react-router'
import HomePage from 'src/pages/HomePage'
import React from 'react'
import NotFoundPage from 'src/pages/extra/NotFoundPage'
import BgrLayout from 'src/shared/layout/BgrLayout'
import Test from 'src/pages/test'
import CallbackPage from 'src/pages/url/callback/CallbackPage'

const MODULES = import.meta.glob(['src/pages/url/**/*.tsx'], {
    eager: true,
}) as Record<string, { default: React.FC }>

const NO_LAYOUT_PAGES = [
    '/login',
    '/register',
    '/register/store',
    '/register/success',
]

const generateRoutes = (
    modules: Record<string, { default: React.FC }>,
): RouteObject[] => {
    const routes: RouteObject[] = []

    Object.entries(modules).forEach(([path, module]) => {
        const relativePath = path.replace(/.*src\/pages\/url\//, '')
        const Component = module.default

        const urlPath = relativePath
            .replace(/\/[^/]*\.tsx$/, '')
            .replace(/\[(.*?)]/g, ':$1')

        const finalUrlPath = urlPath === '' ? '/' : `/${urlPath}`

        routes.push({
            path: finalUrlPath,
            element: <Component />,
        })
    })

    return routes
}

const allRoutes = generateRoutes(MODULES)

// 레이아웃 없는 페이지와 레이아웃 있는 페이지 분리
const noLayoutRoutes = allRoutes.filter((route) =>
    NO_LAYOUT_PAGES.includes(route.path || ''),
)
const layoutRoutes = allRoutes.filter(
    (route) => !NO_LAYOUT_PAGES.includes(route.path || ''),
)

const router = createBrowserRouter([
    // 레이아웃 없는 라우트
    {
        path: '/',
        element: <Outlet />,
        errorElement: <NotFoundPage />,
        children: [
            ...noLayoutRoutes,
            // callback은 동적으로 관려(ex- callback/:provider)
            {
                path: 'callback/:provider',
                element: <CallbackPage />,
            },
        ],
    },
    // 레이아웃 있는 라우트 (메인 페이지 등)
    {
        path: '/',
        element: (
            <BgrLayout>
                <Outlet />
            </BgrLayout>
        ),
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            ...layoutRoutes,
        ],
    },
    {
        path: '/test',
        element: <Test />,
    },
])

export default router
