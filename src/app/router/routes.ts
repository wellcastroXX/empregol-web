/** Fonte única de verdade das rotas — evite string literal espalhada pelo app. */
export const ROUTES = {
  home: '/',
  vitrine: '/vitrine',
  atletas: '/atletas',
  clubes: '/clubes',
  historias: '/historias',
  entrar: '/entrar',
  cadastro: '/cadastro',
  verificarEmail: '/verificar-email',
  esqueciSenha: '/esqueci-senha',
  redefinirSenha: '/redefinir-senha',
  painel: '/painel',
  app: '/app',
  /** Atalho para a seção de suporte da home — redireciona para `/#suporte`. */
  suporte: '/suporte',
  politicaPrivacidade: '/politica-de-privacidade',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
