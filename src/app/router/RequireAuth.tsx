import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/features/auth/ui/auth-context'
import { RouteFallback } from '@/shared/ui/RouteFallback'

import { ROUTES } from './routes'

/**
 * Barra rotas da área logada.
 *
 * Guarda de onde o usuário veio em `state.from`, para o login devolvê-lo ao
 * destino original em vez de despejar todo mundo no painel.
 */
export function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <RouteFallback />

  if (status !== 'authenticated') {
    return <Navigate to={ROUTES.entrar} replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
