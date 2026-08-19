import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RouteFallback } from '@/shared/ui/RouteFallback'
import { SiteLayout } from '@/shared/layout/SiteLayout'

import { ROUTES } from './routes'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))

const router = createBrowserRouter([
  {
    // Home: hero escuro full-bleed, nav transparente até o primeiro scroll.
    element: <SiteLayout active="Atletas" overlay />,
    children: [
      {
        path: ROUTES.home,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    // Demais rotas nascem em fundo claro — nav sempre sólido.
    element: <SiteLayout />,
    children: [
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
