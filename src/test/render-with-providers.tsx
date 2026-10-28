import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { sessionStorage } from '@/features/auth/lib/session-storage'
import type { AuthUser } from '@/features/auth/model/auth.types'
import { AuthProvider } from '@/features/auth/ui/AuthProvider'
import type { Locale } from '@/shared/i18n/locale'
import { LocaleProvider } from '@/shared/i18n/LocaleProvider'

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
  /** Idioma da árvore. Português por padrão, como o site nasce para o público principal. */
  locale?: Locale
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', user = null, locale = 'pt', ...options }: RenderWithProvidersOptions = {},
) {
  if (user) {
    sessionStorage.save({
      session: { accessToken: 'token-de-teste', refreshToken: 'refresh-de-teste' },
      user,
    })
  }

  // Cliente novo por render: sem retry e sem cache vazando entre testes.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  })

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <LocaleProvider initialLocale={locale}>
        <MemoryRouter initialEntries={[route]}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </MemoryRouter>
      </LocaleProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}
