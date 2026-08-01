import { Outlet } from 'react-router-dom'

import { SiteFooter } from './SiteFooter'
import { SiteHeader, type NavItem } from './SiteHeader'

export interface SiteLayoutProps {
  active?: NavItem | ''
}

/** Casca pública do site: nav sticky + conteúdo da rota + rodapé. */
export function SiteLayout({ active = '' }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader active={active} />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
