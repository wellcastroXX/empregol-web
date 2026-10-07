import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers/AppProviders'
import { ROUTE_CONFIG } from '@/app/router/routeConfig'

describe('Navegação e rolagem', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    window.history.pushState({}, '', '/')
  })

  it('volta ao topo ao trocar de rota', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument())

    // simula o usuário no fim da home
    vi.mocked(window.scrollTo).mockClear()

    await user.click(screen.getByRole('link', { name: 'App' }))

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Sua vitrine/),
    )
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
  })

  it('não força o topo quando a navegação tem âncora', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument())
    vi.mocked(window.scrollTo).mockClear()

    // Escopado à barra superior: o rodapé também tem um atalho para o suporte.
    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getByRole('link', { name: 'Suporte' }))

    await waitFor(() => expect(window.location.hash).toBe('#suporte'))
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('manda /suporte para a seção da home', async () => {
    const router = createMemoryRouter(ROUTE_CONFIG, { initialEntries: ['/suporte'] })
    // Com os providers: o DocumentTitle da raiz consulta o contexto de auth.
    render(
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>,
    )

    await waitFor(() => expect(router.state.location.pathname).toBe('/'))
    expect(router.state.location.hash).toBe('#suporte')
  })
})
