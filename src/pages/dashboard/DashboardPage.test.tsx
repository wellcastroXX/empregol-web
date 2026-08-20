import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderWithProviders, testUser } from '@/test/render-with-providers'

import DashboardPage from './DashboardPage'

function renderDashboard() {
  return renderWithProviders(<DashboardPage />, { user: testUser })
}

describe('DashboardPage', () => {
  it('saúda o usuário logado pelo primeiro nome', () => {
    renderDashboard()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bom te ver, Marina')
  })

  it('mostra a conta autenticada na barra lateral', () => {
    renderDashboard()

    expect(screen.getByText('Marina Soares')).toBeInTheDocument()
    expect(screen.getByText('CLUBE')).toBeInTheDocument()
    expect(screen.getByText(testUser.email)).toBeInTheDocument()
    // Iniciais derivadas do nome real, não fixas.
    expect(screen.getByText('MS')).toBeInTheDocument()
  })

  it('oferece sair da conta', async () => {
    const user = userEvent.setup()
    renderDashboard()

    expect(globalThis.localStorage.getItem('empregol.auth')).not.toBeNull()

    await user.click(screen.getByRole('button', { name: 'Sair' }))

    expect(globalThis.localStorage.getItem('empregol.auth')).toBeNull()
  })

  it('começa na visão geral e permite trocar de seção', async () => {
    const user = userEvent.setup()
    renderDashboard()

    const overview = screen.getByRole('button', { name: /VISÃO GERAL/ })
    expect(overview).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: /SHORTLIST/ }))

    expect(screen.getByRole('button', { name: /SHORTLIST/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(overview).not.toHaveAttribute('aria-current')
  })

  it('mostra os KPIs da visão geral', () => {
    renderDashboard()

    expect(screen.getByText('novos no radar')).toBeInTheDocument()
    expect(screen.getByText('na shortlist')).toBeInTheDocument()
    expect(screen.getByText('conversas ativas')).toBeInTheDocument()
    expect(screen.getByText('buscas restantes')).toBeInTheDocument()
  })

  it('lista os atletas que batem com os filtros', () => {
    renderDashboard()

    for (const name of ['L. Henrique', 'R. Pinheiro', 'D. Castro', 'F. Borges']) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0)
    }
  })

  it('expõe o consumo do plano de forma acessível', () => {
    renderDashboard()

    const bar = screen.getByRole('progressbar', { name: /Buscas usadas no mês/ })
    expect(bar).toHaveAttribute('aria-valuenow', '43')
    expect(bar).toHaveAttribute('aria-valuemax', '50')
  })
})
