import { Outlet } from 'react-router-dom'

import { SiteFooter } from './SiteFooter'
import { SiteHeader, type NavItem } from './SiteHeader'

export interface SiteLayoutProps {
  active?: NavItem | ''
  /**
   * Rotas cuja primeira seção é escura e full-bleed. A barra fica transparente
   * no topo e o conteúdo começa colado no topo da viewport, por trás dela.
   */
  overlay?: boolean
}

/** Casca pública do site: nav fixo + conteúdo da rota + rodapé. */
export function SiteLayout({ active = '', overlay = false }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader active={active} overlay={overlay} />
      {/* Sem overlay o nav é opaco e flutua sobre o conteúdo, então o espaço
          dele precisa ser reservado aqui. Com overlay quem cuida disso é o
          próprio hero. */}
      <main style={{ paddingTop: overlay ? 0 : 'var(--nav-h)' }}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
