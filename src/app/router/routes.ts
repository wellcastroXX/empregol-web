/** Fonte única de verdade das rotas — evite string literal espalhada pelo app. */
export const ROUTES = {
  home: '/',
  vitrine: '/vitrine',
  atletas: '/atletas',
  clubes: '/clubes',
  historias: '/historias',
  entrar: '/entrar',
  cadastro: '/cadastro',
  painel: '/painel',
  app: '/app',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
