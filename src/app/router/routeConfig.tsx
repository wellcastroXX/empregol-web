/* eslint-disable react-refresh/only-export-components --
   O arquivo não exporta componentes, só a árvore de rotas; os `lazy()` abaixo
   são referências às páginas, que é onde o fast refresh de fato atua. */
import { lazy, Suspense } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

import { defineMessages } from '@/shared/i18n/locale-context'
import { RouteFallback } from '@/shared/ui/RouteFallback'
import { SiteLayout } from '@/shared/layout/SiteLayout'

import { DEFAULT_TITLES } from './default-title'
import type { RouteTitleContext } from './DocumentTitle'
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
const PublicProfilePage = lazy(() => import('@/pages/athlete/PublicProfilePage'))

const TITLES = defineMessages({
  pt: {
    app: 'Baixe o app Empregol — Sua vitrine no bolso.',
    entrar: 'Entrar — Empregol',
    cadastro: 'Cadastre-se — Empregol',
    verificarEmail: 'Verificar e-mail — Empregol',
    esqueciSenha: 'Esqueci a senha — Empregol',
    redefinirSenha: 'Redefinir senha — Empregol',
    painelAtleta: 'Painel do atleta — Empregol',
    painelClube: 'Painel do clube — Empregol',
    perfilPublico: 'Perfil do atleta — Empregol',
    politicaPrivacidade: 'Termos de uso e privacidade — Empregol',
    naoEncontrada: 'Página não encontrada — Empregol',
  },
  en: {
    app: 'Get the Empregol app — Your showcase in your pocket.',
    entrar: 'Sign in — Empregol',
    cadastro: 'Sign up — Empregol',
    verificarEmail: 'Verify email — Empregol',
    esqueciSenha: 'Forgot password — Empregol',
    redefinirSenha: 'Reset password — Empregol',
    painelAtleta: 'Athlete dashboard — Empregol',
    painelClube: 'Club dashboard — Empregol',
    perfilPublico: 'Athlete profile — Empregol',
    politicaPrivacidade: 'Terms of use and privacy — Empregol',
    naoEncontrada: 'Page not found — Empregol',
  },
  es: {
    app: 'Descarga la app Empregol — Tu vitrina en el bolsillo.',
    entrar: 'Entrar — Empregol',
    cadastro: 'Regístrate — Empregol',
    verificarEmail: 'Verificar correo — Empregol',
    esqueciSenha: 'Olvidé mi contraseña — Empregol',
    redefinirSenha: 'Restablecer contraseña — Empregol',
    painelAtleta: 'Panel del atleta — Empregol',
    painelClube: 'Panel del club — Empregol',
    perfilPublico: 'Perfil del atleta — Empregol',
    politicaPrivacidade: 'Términos de uso y privacidad — Empregol',
    naoEncontrada: 'Página no encontrada — Empregol',
  },
})

type TitleKey = keyof (typeof TITLES)['pt']

/** Título fixo da rota, no idioma atual. */
const title =
  (key: TitleKey) =>
  ({ locale }: RouteTitleContext) =>
    TITLES[locale][key]

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
        children: [
          {
            path: ROUTES.home,
            element: lazyRoute(<HomePage />),
            handle: { title: ({ locale }: RouteTitleContext) => DEFAULT_TITLES[locale] },
          },
        ],
      },
      {
        element: <SiteLayout active="app" overlay />,
        children: [
          {
            path: ROUTES.app,
            element: lazyRoute(<DownloadPage />),
            handle: { title: title('app') },
          },
        ],
      },
      {
        // Telas de auth: casca própria, sem nav e rodapé públicos.
        children: [
          {
            path: ROUTES.entrar,
            element: lazyRoute(<AuthPage />),
            handle: { title: title('entrar') },
          },
          {
            path: ROUTES.cadastro,
            element: lazyRoute(<AuthPage />),
            handle: { title: title('cadastro') },
          },
          {
            path: ROUTES.verificarEmail,
            element: lazyRoute(<VerifyEmailPage />),
            handle: { title: title('verificarEmail') },
          },
          {
            path: ROUTES.esqueciSenha,
            element: lazyRoute(<ForgotPasswordPage />),
            handle: { title: title('esqueciSenha') },
          },
          {
            path: ROUTES.redefinirSenha,
            element: lazyRoute(<ResetPasswordPage />),
            handle: { title: title('redefinirSenha') },
          },
        ],
      },
      {
        // Área logada — sem sessão, volta para o login.
        element: <RequireAuth />,
        children: [
          {
            path: ROUTES.painel,
            element: lazyRoute(<DashboardPage />),
            // O painel se divide por papel: o atleta veria "Painel do clube".
            handle: {
              title: ({ locale, role }: RouteTitleContext) =>
                TITLES[locale][role === 'athlete' ? 'painelAtleta' : 'painelClube'],
            },
          },
        ],
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
          {
            path: ROUTES.perfilPublico,
            element: lazyRoute(<PublicProfilePage />),
            // A página refina para o nome do atleta assim que os dados chegam.
            handle: { title: title('perfilPublico') },
          },
          {
            path: ROUTES.politicaPrivacidade,
            element: lazyRoute(<PoliticaPrivacidadePage />),
            handle: { title: title('politicaPrivacidade') },
          },
          {
            path: '*',
            element: lazyRoute(<NotFoundPage />),
            handle: { title: title('naoEncontrada') },
          },
        ],
      },
    ],
  },
]
