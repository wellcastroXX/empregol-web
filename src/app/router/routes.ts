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
  /** Vitrine pública do atleta. Use `perfilPublicoDe` para montar o endereço. */
  perfilPublico: '/p/:slug',
} as const

/** `/p/wellington-castro` — o link que o atleta compartilha. */
export function perfilPublicoDe(slug: string): string {
  return `/p/${slug}`
}

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
