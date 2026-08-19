import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'

import { SiteHeader } from './SiteHeader'

function renderHeader(overlay: boolean) {
  return render(
    <MemoryRouter>
      <SiteHeader active="Atletas" overlay={overlay} />
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
})
