import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RouteFallback } from '@/shared/ui/RouteFallback'
import { SiteLayout } from '@/shared/layout/SiteLayout'

import { ROUTES } from './routes'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))

const router = createBrowserRouter([
  {
    element: <SiteLayout active="Atletas" />,
    children: [
      {
        path: ROUTES.home,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
