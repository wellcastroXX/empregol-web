import { Outlet } from 'react-router-dom'

import { ScrollManager } from '@/shared/layout/ScrollManager'

/**
 * Raiz de todas as rotas. Existe só para o ScrollManager valer no app inteiro:
 * dentro do SiteLayout ele deixaria de fora /entrar, /cadastro e /painel, que
 * têm casca própria e sofrem do mesmo problema de rolagem herdada.
 */
export function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  )
}
