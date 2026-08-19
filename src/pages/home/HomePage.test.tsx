import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import HomePage from './HomePage'

/** A home tem CTAs que navegam, então precisa de contexto de rota. */
function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('abre com a manchete do hero', () => {
    renderHome()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Seu gol.*começa.*aqui/s)
  })

  it('traz as seções institucionais na ordem da copy', () => {
    renderHome()

    const eyebrows = [
      /O · Q U E · É · A · E M P R E G O L/,
      /S U P O R T E · C O N T Í N U O/,
      /P O R · Q U E · A · E M P R E G O L · N A S C E U/,
      /O · T A M A N H O · D O · P R O B L E M A/,
      /N O S S A · M I S S Ã O/,
    ]

    for (const eyebrow of eyebrows) {
      expect(screen.getByText(eyebrow)).toBeInTheDocument()
    }
  })

  it('lista os cinco eixos de suporte contínuo', () => {
    renderHome()

    for (const eixo of ['Jurídico', 'Nutricional', 'Psicológico', 'Físico', 'Financeiro']) {
      expect(screen.getByText(eixo)).toBeInTheDocument()
    }
  })

  it('mostra o funil de atletas com o número de contratos ativos em destaque', () => {
    renderHome()

    expect(screen.getByText('360')).toBeInTheDocument()
    expect(screen.getByText('88')).toBeInTheDocument()
    expect(screen.getByText('11–12')).toBeInTheDocument()
  })

  it('fecha com os dois CTAs', () => {
    renderHome()

    expect(screen.getByText(/Cadastre-se agora/)).toBeInTheDocument()
    expect(screen.getByText(/Conheça a Empregol/)).toBeInTheDocument()
  })

  it('reserva blocos de imagem para a direção de arte', () => {
    renderHome()

    const reservas = screen.getAllByRole('img', { name: /Espaço reservado para imagem/ })
    expect(reservas.length).toBeGreaterThanOrEqual(3)
  })

  it('liga os CTAs às páginas reais', () => {
    renderHome()

    expect(screen.getByRole('link', { name: /Quero fazer parte/ })).toHaveAttribute(
      'href',
      '/cadastro',
    )
    expect(screen.getByRole('link', { name: /Cadastre-se agora/ })).toHaveAttribute(
      'href',
      '/cadastro',
    )
    expect(screen.getByRole('link', { name: /Conheça a Empregol/ })).toHaveAttribute(
      'href',
      '#sobre',
    )
  })
})
