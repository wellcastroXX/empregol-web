import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/app/router/routes'

import AuthPage from './AuthPage'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthPage />
    </MemoryRouter>,
  )
}

describe('AuthPage', () => {
  it('abre em modo login na rota /entrar', () => {
    renderAt(ROUTES.entrar)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Entra de novo')
    expect(screen.getByRole('tab', { name: 'Entrar' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Esqueci a senha/)).toBeInTheDocument()
  })

  it('abre em modo cadastro na rota /cadastro', () => {
    renderAt(ROUTES.cadastro)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cria tua conta')
    expect(screen.getByRole('tab', { name: 'Cadastrar' })).toHaveAttribute('aria-selected', 'true')
  })

  it('pede o nome e o perfil apenas no cadastro', () => {
    renderAt(ROUTES.entrar)
    expect(screen.queryByLabelText('Nome')).not.toBeInTheDocument()

    renderAt(ROUTES.cadastro)
    expect(screen.getAllByLabelText('Nome').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /Atleta/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('troca o rótulo do campo de nome quando o perfil é clube', async () => {
    const user = userEvent.setup()
    renderAt(ROUTES.cadastro)

    expect(screen.getByPlaceholderText('Nome completo')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Clube/ }))

    expect(screen.getByPlaceholderText('Nome do clube')).toBeInTheDocument()
  })

  it('mostra os três eixos de credibilidade no painel da marca', () => {
    renderAt(ROUTES.entrar)

    expect(screen.getByText('2.847')).toBeInTheDocument()
    expect(screen.getByText('312')).toBeInTheDocument()
    expect(screen.getByText('89')).toBeInTheDocument()
  })

  it('oferece voltar para a página anterior', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={[ROUTES.home, ROUTES.entrar]} initialIndex={1}>
        <Routes>
          <Route path={ROUTES.home} element={<p>home</p>} />
          <Route path={ROUTES.entrar} element={<AuthPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /Voltar/ }))

    expect(screen.getByText('home')).toBeInTheDocument()
  })
})
