import { render, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '@/app/providers/AppProviders'

import { ROUTE_CONFIG } from './routeConfig'

function renderAt(path: string) {
  const router = createMemoryRouter(ROUTE_CONFIG, { initialEntries: [path] })
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  )
}

describe('DocumentTitle', () => {
  it.each([
    ['/', 'Empregol — Atleta livre não é atleta esquecido.'],
    ['/app', 'Baixe o app Empregol — Sua vitrine no bolso.'],
    ['/entrar', 'Entrar — Empregol'],
    ['/cadastro', 'Cadastre-se — Empregol'],
    ['/politica-de-privacidade', 'Termos de uso e privacidade — Empregol'],
    ['/rota-que-nao-existe', 'Página não encontrada — Empregol'],
  ])('nomeia %s', async (path, expected) => {
    renderAt(path)

    await waitFor(() => expect(document.title).toBe(expected))
  })

  it('nomeia o painel pelo papel de quem entrou', async () => {
    // Sem sessão o RequireAuth manda para /entrar — o título acompanha.
    renderAt('/painel')

    await waitFor(() => expect(document.title).toBe('Entrar — Empregol'))
  })
})
