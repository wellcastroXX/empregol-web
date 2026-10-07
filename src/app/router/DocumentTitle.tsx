import { useMatches } from 'react-router-dom'

import { useAuth } from '@/features/auth/ui/auth-context'
import type { UserRole } from '@/features/auth/model/auth.types'
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle'

/** Contexto que um título dinâmico pode consultar — hoje, só o papel do usuário. */
export interface RouteTitleContext {
  role?: UserRole
}

export type RouteTitle = string | ((ctx: RouteTitleContext) => string)

/** O que cada rota pode declarar em `handle`. */
export interface RouteHandle {
  title?: RouteTitle
}

/** Título de quem não declarou nada — e o que o index.html já traz no HTML. */
export const DEFAULT_TITLE = 'Empregol — Atleta livre não é atleta esquecido.'

/**
 * Mantém o título da aba em dia a partir do `handle.title` da rota casada.
 *
 * Fica aqui, e não em cada página, por dois motivos: o título passa a ser
 * declarado junto da rota (um lugar só para conferir a lista) e o 404 — que não
 * é página de ninguém — também ganha o seu.
 */
export function DocumentTitle() {
  const matches = useMatches()
  const { user } = useAuth()

  // Da folha para a raiz: a rota mais específica é quem nomeia a página.
  const declared = [...matches]
    .reverse()
    .map((match) => (match.handle as RouteHandle | undefined)?.title)
    .find((title) => title !== undefined)

  const title =
    typeof declared === 'function' ? declared({ role: user?.role }) : (declared ?? DEFAULT_TITLE)

  useDocumentTitle(title)

  return null
}
