import { Outlet } from 'react-router-dom'

import { ScrollManager } from '@/shared/layout/ScrollManager'

import { DocumentTitle } from './DocumentTitle'

/**
 * Raiz de todas as rotas. Existe para o ScrollManager e o DocumentTitle valerem
 * no app inteiro: dentro do SiteLayout eles deixariam de fora /entrar,
 * /cadastro e /painel, que têm casca própria e sofrem dos mesmos problemas de
 * rolagem herdada e de título desatualizado.
 */
export function RootLayout() {
  return (
    <>
      <ScrollManager />
      <DocumentTitle />
      <Outlet />
    </>
  )
}
