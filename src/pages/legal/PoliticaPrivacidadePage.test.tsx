import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import PoliticaPrivacidadePage from './PoliticaPrivacidadePage'

function renderPage() {
  return render(
    <MemoryRouter>
      <PoliticaPrivacidadePage />
    </MemoryRouter>,
  )
}

describe('PoliticaPrivacidadePage', () => {
  it('abre com o título do documento', () => {
    renderPage()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Termos de Uso')
  })

  it('traz as onze cláusulas e o anexo em uma página só', () => {
    renderPage()

    const titles = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)

    expect(titles).toHaveLength(12)
    expect(titles[0]).toContain('Das Partes e do Aceite')
    expect(titles.at(-1)).toContain('Planos e Preços')
  })

  it('liga o sumário às âncoras das seções', () => {
    renderPage()

    const sumario = screen.getByRole('navigation', { name: 'Sumário' })
    const primeiro = within(sumario).getByRole('link', { name: /Das Partes e do Aceite/ })

    expect(primeiro).toHaveAttribute('href', '#clausula-1')
    expect(document.getElementById('clausula-1')).toBeInTheDocument()
  })

  it('destaca as cláusulas que o documento grifa', () => {
    renderPage()

    // 8.1 — a cláusula que afasta a Empregol das negociações entre Usuários.
    expect(
      screen.getByText(/não atua como agente, intermediário/, { selector: 'strong' }),
    ).toBeInTheDocument()
  })

  it('oferece o PDF original para download', () => {
    renderPage()

    expect(screen.getByRole('link', { name: /BAIXAR EM PDF/ })).toHaveAttribute('download')
  })
})
