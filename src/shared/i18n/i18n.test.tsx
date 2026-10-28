import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'

import { AppProviders } from '@/app/providers/AppProviders'
import { ROUTE_CONFIG } from '@/app/router/routeConfig'
import { ROUTES } from '@/app/router/routes'
import AuthPage from '@/pages/auth/AuthPage'
import { renderWithProviders } from '@/test/render-with-providers'

import { detectLocale } from './locale'

function setBrowserLanguages(languages: string[]) {
  Object.defineProperty(window.navigator, 'languages', { value: languages, configurable: true })
  Object.defineProperty(window.navigator, 'language', { value: languages[0], configurable: true })
}

function renderAppAt(path: string) {
  const router = createMemoryRouter(ROUTE_CONFIG, { initialEntries: [path] })
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  )
  return router
}

afterEach(() => {
  // Volta ao português que o setup dos testes assume.
  setBrowserLanguages(['pt-BR'])
})

describe('detectLocale', () => {
  it('segue o idioma do navegador na primeira visita', () => {
    setBrowserLanguages(['es-AR', 'en-US'])
    expect(detectLocale()).toBe('es')

    setBrowserLanguages(['en-GB'])
    expect(detectLocale()).toBe('en')
  })

  it('pula idiomas que o site não tem até achar um que tem', () => {
    setBrowserLanguages(['fr-FR', 'en-US'])
    expect(detectLocale()).toBe('en')
  })

  it('cai no português quando nenhum idioma do navegador é atendido', () => {
    setBrowserLanguages(['fr-FR', 'de-DE'])
    expect(detectLocale()).toBe('pt')
  })

  it('prefere a escolha salva pelo seletor ao idioma do navegador', () => {
    setBrowserLanguages(['es-ES'])
    localStorage.setItem('empregol.locale', 'en')
    expect(detectLocale()).toBe('en')
  })

  it('ignora valor salvo que não é idioma do site', () => {
    setBrowserLanguages(['es-ES'])
    localStorage.setItem('empregol.locale', 'fr')
    expect(detectLocale()).toBe('es')
  })
})

describe('Seletor de idioma', () => {
  it('troca os textos do site, o lang do documento e o título da aba', async () => {
    const user = userEvent.setup()
    renderAppAt(ROUTES.home)

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Seu gol/),
    )
    expect(document.documentElement.lang).toBe('pt-BR')

    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getByRole('button', { name: 'English' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Your goal/)
    expect(within(nav).getByRole('link', { name: 'Support' })).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: 'English' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(document.documentElement.lang).toBe('en')
    await waitFor(() =>
      expect(document.title).toBe('Empregol — A free agent is not a forgotten athlete.'),
    )

    await user.click(within(nav).getByRole('button', { name: 'Español' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tu gol/)
    expect(document.documentElement.lang).toBe('es')
  })

  it('guarda a escolha para a próxima visita', async () => {
    const user = userEvent.setup()
    renderAppAt(ROUTES.home)

    const nav = await screen.findByRole('navigation')
    await user.click(within(nav).getByRole('button', { name: 'Español' }))

    expect(localStorage.getItem('empregol.locale')).toBe('es')
  })

  it('aparece também nas telas de login, que não têm o nav do site', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AuthPage />, { route: ROUTES.entrar })

    await user.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome back')
    expect(screen.getByRole('tab', { name: 'Sign in' })).toHaveAttribute('aria-selected', 'true')
  })
})

describe('Validação no idioma escolhido', () => {
  it('mostra os erros do cadastro em espanhol', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AuthPage />, { route: ROUTES.cadastro, locale: 'es' })

    await user.click(screen.getByRole('button', { name: /Crear cuenta/ }))

    expect(screen.getByText('El nombre debe tener al menos 3 caracteres')).toBeInTheDocument()
    expect(screen.getByText('Correo electrónico inválido')).toBeInTheDocument()
  })
})

describe('Páginas públicas em inglês e espanhol', () => {
  it.each([
    ['en', ROUTES.home, /Your goal/],
    ['en', ROUTES.app, /Your showcase/],
    ['en', ROUTES.entrar, /Welcome back/],
    ['en', ROUTES.politicaPrivacidade, /Termos de Uso/],
    ['en', '/rota-que-nao-existe', /This page has left/],
    ['es', ROUTES.home, /Tu gol/],
    ['es', ROUTES.app, /Tu vitrina/],
    ['es', ROUTES.cadastro, /Crea tu cuenta/],
    ['es', '/rota-que-nao-existe', /Esta página salió/],
  ])('[%s] %s abre traduzida', async (locale, path, heading) => {
    localStorage.setItem('empregol.locale', locale)
    renderAppAt(path)

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading),
    )
  })

  it('avisa que o documento legal vale em português', async () => {
    localStorage.setItem('empregol.locale', 'en')
    renderAppAt(ROUTES.politicaPrivacidade)

    expect(await screen.findByRole('note')).toHaveTextContent(/available in Portuguese only/)
  })
})
