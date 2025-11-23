import { createBrowserRouter, Outlet, RouteObject } from 'react-router'
import HomePage from 'src/pages/HomePage'
import React from 'react'
import NotFoundPage from 'src/pages/extra/NotFoundPage.tsx'
import BgrLayout from 'src/shared/layout/BgrLayout.tsx'
import Test from 'src/pages/test'

const MODULES = import.meta.glob(['src/pages/url/**/*.tsx'], {
    eager: true,
}) as Record<string, { default: React.FC }>

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

const authRoutes = allRoutes.filter((route) => route.path?.startsWith('/auth'))
const layoutRoutes = allRoutes.filter(
    (route) => !route.path?.startsWith('/auth'),
)

const router = createBrowserRouter([
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
        path: '/auth',
        element: <Outlet />,
        children: authRoutes.map((route) => ({
            ...route,
            path: route.path?.replace('/auth/', ''),
        })),
    },
    {
        path: '/test',
        element: <Test />,
    },
])

export default router
