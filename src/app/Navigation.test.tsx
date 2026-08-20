import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { App } from '@/app/App'

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
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tua vitrine/),
    )
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
  })

  it('não força o topo quando a navegação tem âncora', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument())
    vi.mocked(window.scrollTo).mockClear()

    await user.click(screen.getByRole('link', { name: 'Suporte' }))

    await waitFor(() => expect(window.location.hash).toBe('#suporte'))
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})
