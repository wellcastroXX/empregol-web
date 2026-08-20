import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'

import { SiteHeader } from './SiteHeader'

function renderHeader(overlay: boolean) {
  return render(
    <MemoryRouter>
      <SiteHeader active="App" overlay={overlay} />
    </MemoryRouter>,
  )
}

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true, configurable: true })
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

/** Opacidade do wordmark creme — 1 quando a barra está sobre o hero escuro. */
function creamOpacity() {
  const cream = screen.getByAltText('') as HTMLImageElement
  return cream.style.opacity
}

afterEach(() => scrollTo(0))

describe('SiteHeader', () => {
  it('fica transparente no topo quando está sobre o hero', () => {
    renderHeader(true)

    expect(screen.getByRole('navigation')).toHaveStyle({ background: 'transparent' })
    expect(creamOpacity()).toBe('1')
  })

  it('assume fundo sólido e wordmark escuro depois de rolar', () => {
    renderHeader(true)
    scrollTo(200)

    expect(screen.getByRole('navigation')).not.toHaveStyle({ background: 'transparent' })
    expect(creamOpacity()).toBe('0')
  })

  it('volta a ser transparente ao retornar para o topo', () => {
    renderHeader(true)
    scrollTo(200)
    scrollTo(0)

    expect(screen.getByRole('navigation')).toHaveStyle({ background: 'transparent' })
    expect(creamOpacity()).toBe('1')
  })

  it('permanece sólido em rotas sem overlay, mesmo no topo', () => {
    renderHeader(false)

    expect(screen.getByRole('navigation')).not.toHaveStyle({ background: 'transparent' })
    expect(creamOpacity()).toBe('0')
  })

  it('liga as ações de conta às rotas de auth', () => {
    renderHeader(false)

    expect(screen.getByRole('link', { name: 'ENTRAR' })).toHaveAttribute('href', '/entrar')
    expect(screen.getByRole('link', { name: /CADASTRE-SE/ })).toHaveAttribute('href', '/cadastro')
  })

  it('aponta cada item para uma seção que existe na home', () => {
    renderHeader(false)

    const destinos: ReadonlyArray<readonly [string, string]> = [
      ['A Empregol', '/#sobre'],
      ['Suporte', '/#suporte'],
      ['Origem', '/#origem'],
      ['Missão', '/#missao'],
      ['App', '/app'],
    ]

    for (const [label, href] of destinos) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('não deixa nenhum item de navegação sem destino', () => {
    renderHeader(false)

    const mortos = screen.getAllByRole('link').filter((link) => link.getAttribute('href') === '#')

    expect(mortos).toHaveLength(0)
  })

  it('abre e fecha o menu mobile, travando a rolagem do fundo', async () => {
    const user = userEvent.setup()
    renderHeader(true)

    const botao = screen.getByRole('button', { name: 'Abrir menu' })
    expect(botao).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('menu-mobile')).toBeNull()

    await user.click(botao)

    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    const painel = document.getElementById('menu-mobile')
    expect(painel).not.toBeNull()
    // Os 5 itens de navegação mais os dois CTAs de conta.
    expect(painel?.querySelectorAll('a')).toHaveLength(7)
    expect(document.body.style.overflow).toBe('hidden')

    await user.click(screen.getByRole('button', { name: 'Fechar menu' }))

    expect(document.getElementById('menu-mobile')).toBeNull()
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
