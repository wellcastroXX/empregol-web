import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import HomePage from './HomePage'

describe('HomePage', () => {
  it('renderiza a manchete do hero', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Atleta livre.*não é atleta.*esquecido/s,
    )
  })

  it('mostra as seções editoriais da página', () => {
    render(<HomePage />)

    expect(screen.getByText(/E S S A · S E M A N A · N A · E M P R E G O L/)).toBeInTheDocument()
    expect(screen.getByText(/D E S T A Q U E · D A · S E M A N A/)).toBeInTheDocument()
    expect(screen.getByText(/C O N F I A M · 3 1 2 · C L U B E S/)).toBeInTheDocument()
  })

  it('lista os seis atletas da vitrine', () => {
    render(<HomePage />)

    expect(screen.getAllByText('VER PERFIL')).toHaveLength(6)
  })
})
