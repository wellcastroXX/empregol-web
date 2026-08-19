import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import HomePage from './HomePage'

describe('HomePage', () => {
  it('abre com a manchete do hero', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Seu gol.*começa.*aqui/s)
  })

  it('traz as seções institucionais na ordem da copy', () => {
    render(<HomePage />)

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
    render(<HomePage />)

    for (const eixo of ['Jurídico', 'Nutricional', 'Psicológico', 'Físico', 'Financeiro']) {
      expect(screen.getByText(eixo)).toBeInTheDocument()
    }
  })

  it('mostra o funil de atletas com o número de contratos ativos em destaque', () => {
    render(<HomePage />)

    expect(screen.getByText('360')).toBeInTheDocument()
    expect(screen.getByText('88')).toBeInTheDocument()
    expect(screen.getByText('11–12')).toBeInTheDocument()
  })

  it('fecha com os dois CTAs', () => {
    render(<HomePage />)

    expect(screen.getByText(/Cadastre-se agora/)).toBeInTheDocument()
    expect(screen.getByText(/Conheça a Empregol/)).toBeInTheDocument()
  })

  it('reserva blocos de imagem para a direção de arte', () => {
    render(<HomePage />)

    const reservas = screen.getAllByRole('img', { name: /Espaço reservado para imagem/ })
    expect(reservas.length).toBeGreaterThanOrEqual(3)
  })
})
