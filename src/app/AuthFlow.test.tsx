import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from '@/app/App'
import { authApi } from '@/features/auth/api/auth-api'
import type { ApiUser } from '@/features/auth/model/auth.types'

vi.mock('@/features/auth/api/auth-api', () => ({
  authApi: {
    register: vi.fn(),
    login: vi.fn(),
    verifyEmail: vi.fn(),
    resendCode: vi.fn(),
    forgotPassword: vi.fn(),
    me: vi.fn(),
  },
}))

const athlete: ApiUser = {
  id: 'a1',
  email: 'lucas@exemplo.com',
  role: 'ATHLETE',
  emailVerified: true,
  athlete: { fullName: 'Lucas Henrique', phone: '11999990000' },
}

/**
 * Monta o App numa rota.
 *
 * `createBrowserRouter` é criado no escopo do módulo e fixa a URL do primeiro
 * import, então um `pushState` posterior não o sincroniza — o `popstate` é o
 * que faz o roteador reler a localização atual.
 */
function renderAt(path: string) {
  window.history.pushState({}, '', path)
  const utils = render(<App />)
  act(() => {
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  return utils
}

beforeEach(() => {
  vi.clearAllMocks()
  globalThis.localStorage.clear()
})

describe('Fluxo de autenticação', () => {
  it('manda para o login quem abre o painel sem sessão', async () => {
    renderAt('/painel')

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Entra de novo'),
    )
    expect(window.location.pathname).toBe('/entrar')
  })

  it('entra e chega no painel, com a sessão persistida', async () => {
    const user = userEvent.setup()
    vi.mocked(authApi.login).mockResolvedValue({
      status: 'success',
      data: { accessToken: 'acc', refreshToken: 'ref', user: athlete },
    })

    renderAt('/entrar')

    await waitFor(() => expect(screen.getByLabelText('E-mail')).toBeInTheDocument())
    await user.type(screen.getByLabelText('E-mail'), 'lucas@exemplo.com')
    await user.type(screen.getByLabelText('Senha'), 'segredo123')
    await user.click(screen.getByRole('button', { name: /Entrar/ }))

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bom te ver, Lucas'),
    )
    expect(window.location.pathname).toBe('/painel')
    expect(globalThis.localStorage.getItem('empregol.auth')).toContain('Lucas Henrique')
  })

  it('mostra a mensagem da API quando a credencial está errada', async () => {
    const user = userEvent.setup()
    const { ApiError } = await import('@/shared/lib/http/api-client')
    vi.mocked(authApi.login).mockRejectedValue(
      new ApiError('E-mail ou senha incorretos', 'INVALID_CREDENTIALS', 401),
    )

    renderAt('/entrar')

    await waitFor(() => expect(screen.getByLabelText('E-mail')).toBeInTheDocument())
    await user.type(screen.getByLabelText('E-mail'), 'lucas@exemplo.com')
    await user.type(screen.getByLabelText('Senha'), 'errada')
    await user.click(screen.getByRole('button', { name: /Entrar/ }))

    expect(await screen.findByRole('alert')).toHaveTextContent('E-mail ou senha incorretos')
    expect(window.location.pathname).toBe('/entrar')
  })

  it('leva para a verificação quando o e-mail ainda não foi confirmado', async () => {
    const user = userEvent.setup()
    const { ApiError } = await import('@/shared/lib/http/api-client')
    vi.mocked(authApi.login).mockRejectedValue(
      new ApiError('Confirme seu e-mail', 'EMAIL_NOT_VERIFIED', 403),
    )

    renderAt('/entrar')

    await waitFor(() => expect(screen.getByLabelText('E-mail')).toBeInTheDocument())
    await user.type(screen.getByLabelText('E-mail'), 'lucas@exemplo.com')
    await user.type(screen.getByLabelText('Senha'), 'segredo123')
    await user.click(screen.getByRole('button', { name: /Entrar/ }))

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Confirma teu e-mail'),
    )
    expect(screen.getByText('lucas@exemplo.com')).toBeInTheDocument()
  })

  it('restaura a sessão do localStorage num carregamento novo', async () => {
    globalThis.localStorage.setItem(
      'empregol.auth',
      JSON.stringify({
        session: { accessToken: 'acc', refreshToken: 'ref' },
        user: {
          id: 'a1',
          email: 'lucas@exemplo.com',
          role: 'athlete',
          nome: 'Lucas Henrique',
          emailVerificado: true,
        },
      }),
    )

    renderAt('/painel')

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bom te ver, Lucas'),
    )
    // Não redirecionou para o login: a sessão foi lida antes do primeiro paint.
    expect(window.location.pathname).toBe('/painel')
  })
})
