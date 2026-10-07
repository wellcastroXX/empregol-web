/* eslint-disable react-refresh/only-export-components --
   O arquivo não exporta componentes, só a árvore de rotas; os `lazy()` abaixo
   são referências às páginas, que é onde o fast refresh de fato atua. */
import { lazy, Suspense } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

import { RouteFallback } from '@/shared/ui/RouteFallback'
import { SiteLayout } from '@/shared/layout/SiteLayout'

import { RequireAuth } from './RequireAuth'
import { RootLayout } from './RootLayout'
import { ROUTES } from './routes'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const DownloadPage = lazy(() => import('@/pages/download/DownloadPage'))
const AuthPage = lazy(() => import('@/pages/auth/AuthPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'))
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))
const PoliticaPrivacidadePage = lazy(() => import('@/pages/legal/PoliticaPrivacidadePage'))

/** Envolve o elemento da rota no fallback de carregamento do lazy. */
function lazyRoute(element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}

/**
 * Árvore de rotas, em módulo próprio para o teste montá-la com um router de
 * memória: o `createBrowserRouter` do AppRouter lê a URL uma única vez, na
 * importação, e não enxerga navegação simulada.
 */
export const ROUTE_CONFIG: RouteObject[] = [
  {
    // Raiz comum a todas as rotas — ver RootLayout.
    element: <RootLayout />,
    children: [
      {
        // Rotas com hero escuro full-bleed: nav transparente até o primeiro scroll.
        element: <SiteLayout overlay />,
        children: [{ path: ROUTES.home, element: lazyRoute(<HomePage />) }],
      },
      {
        element: <SiteLayout active="App" overlay />,
        children: [{ path: ROUTES.app, element: lazyRoute(<DownloadPage />) }],
      },
      {
        // Telas de auth: casca própria, sem nav e rodapé públicos.
        children: [
          { path: ROUTES.entrar, element: lazyRoute(<AuthPage />) },
          { path: ROUTES.cadastro, element: lazyRoute(<AuthPage />) },
          { path: ROUTES.verificarEmail, element: lazyRoute(<VerifyEmailPage />) },
          { path: ROUTES.esqueciSenha, element: lazyRoute(<ForgotPasswordPage />) },
          { path: ROUTES.redefinirSenha, element: lazyRoute(<ResetPasswordPage />) },
        ],
      },
      {
        // Área logada — sem sessão, volta para o login.
        element: <RequireAuth />,
        children: [{ path: ROUTES.painel, element: lazyRoute(<DashboardPage />) }],
      },
      {
        // `/suporte` não é página: a seção vive na home. Redireciona para a
        // âncora, e o ScrollManager cuida da rolagem até ela.
        path: ROUTES.suporte,
        element: <Navigate to={`${ROUTES.home}#suporte`} replace />,
      },
      {
        // Demais rotas nascem em fundo claro — nav sempre sólido.
        element: <SiteLayout />,
        children: [
          { path: ROUTES.politicaPrivacidade, element: lazyRoute(<PoliticaPrivacidadePage />) },
          { path: '*', element: lazyRoute(<NotFoundPage />) },
        ],
      },
    ],
  },
]
