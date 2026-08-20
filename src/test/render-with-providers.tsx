import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { sessionStorage } from '@/features/auth/lib/session-storage'
import type { AuthUser } from '@/features/auth/model/auth.types'
import { AuthProvider } from '@/features/auth/ui/AuthProvider'

export const testUser: AuthUser = {
  id: 'user-1',
  email: 'marina@exemplo.com',
  role: 'contractor',
  kind: 'club',
  nome: 'Marina Soares',
  telefone: '11999998888',
  emailVerificado: true,
}

export interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  /**
   * Semeia uma sessão no localStorage antes de montar. O AuthProvider lê o
   * storage no primeiro render, então isso faz a árvore já nascer autenticada.
   */
  user?: AuthUser | null
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', user = null, ...options }: RenderWithProvidersOptions = {},
) {
  if (user) {
    sessionStorage.save({
      session: { accessToken: 'token-de-teste', refreshToken: 'refresh-de-teste' },
      user,
    })
  }

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>{children}</AuthProvider>
      </MemoryRouter>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}
