import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RouteFallback } from '@/shared/ui/RouteFallback'
import { SiteLayout } from '@/shared/layout/SiteLayout'

import { ROUTES } from './routes'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const DownloadPage = lazy(() => import('@/pages/download/DownloadPage'))
const AuthPage = lazy(() => import('@/pages/auth/AuthPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))

/** Envolve o elemento da rota no fallback de carregamento do lazy. */
function lazyRoute(element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}

const router = createBrowserRouter([
  {
    // Rotas com hero escuro full-bleed: nav transparente até o primeiro scroll.
    element: <SiteLayout active="Atletas" overlay />,
    children: [
      { path: ROUTES.home, element: lazyRoute(<HomePage />) },
      { path: ROUTES.app, element: lazyRoute(<DownloadPage />) },
    ],
  },
  {
    // Login e painel têm casca própria — sem nav e rodapé públicos.
    children: [
      { path: ROUTES.entrar, element: lazyRoute(<AuthPage />) },
      { path: ROUTES.cadastro, element: lazyRoute(<AuthPage />) },
      { path: ROUTES.painel, element: lazyRoute(<DashboardPage />) },
    ],
  },
  {
    // Demais rotas nascem em fundo claro — nav sempre sólido.
    element: <SiteLayout />,
    children: [{ path: '*', element: lazyRoute(<NotFoundPage />) }],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
