import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ROUTES } from '@/app/router/routes'
import { renderWithProviders } from '@/test/render-with-providers'

import AuthPage from './AuthPage'

function renderAt(route: string) {
  return renderWithProviders(<AuthPage />, { route })
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

  it('mostra no login apenas e-mail e senha', () => {
    renderAt(ROUTES.entrar)

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.queryByLabelText('CPF')).not.toBeInTheDocument()
  })

  it('pede todos os campos que a API exige do atleta', () => {
    renderAt(ROUTES.cadastro)

    for (const label of [
      'Nome completo',
      'E-mail',
      'Senha',
      'CPF',
      'Nascimento',
      'Telefone',
      'Naturalidade',
      'Posição',
      'Pé dominante',
      'Altura (cm)',
      'Peso (kg)',
      'Nível',
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
  })

  it('troca para o formulário de clube, que pede CNPJ em vez de CPF', async () => {
    const user = userEvent.setup()
    renderAt(ROUTES.cadastro)

    await user.click(screen.getByRole('button', { name: /Clube/ }))

    expect(screen.getByLabelText('Nome do clube')).toBeInTheDocument()
    expect(screen.getByLabelText('CNPJ')).toBeInTheDocument()
    expect(screen.queryByLabelText('CPF')).not.toBeInTheDocument()
  })

  it('pede CPF quando o perfil é agente', async () => {
    const user = userEvent.setup()
    renderAt(ROUTES.cadastro)

    await user.click(screen.getByRole('button', { name: /Agente/ }))

    expect(screen.getByLabelText('CPF')).toBeInTheDocument()
    expect(screen.queryByLabelText('CNPJ')).not.toBeInTheDocument()
  })

  it('valida no cliente antes de chamar a API', async () => {
    const user = userEvent.setup()
    renderAt(ROUTES.cadastro)

    await user.click(screen.getByRole('button', { name: /Criar conta/ }))

    expect(await screen.findByText('Nome deve ter no mínimo 3 caracteres')).toBeInTheDocument()
    expect(screen.getByText('CPF deve conter 11 dígitos')).toBeInTheDocument()
    expect(screen.getByText('Senha deve ter no mínimo 8 caracteres')).toBeInTheDocument()
  })

  it('aplica máscara de CPF enquanto digita', async () => {
    const user = userEvent.setup()
    renderAt(ROUTES.cadastro)

    await user.type(screen.getByLabelText('CPF'), '12345678901')

    expect(screen.getByLabelText('CPF')).toHaveValue('123.456.789-01')
  })

  it('traz o logotipo no topo, ligado à home', () => {
    renderAt(ROUTES.entrar)

    expect(screen.getByRole('link', { name: /página inicial/ })).toHaveAttribute(
      'href',
      ROUTES.home,
    )
  })

  it('manda quem já tem sessão para o painel', () => {
    renderWithProviders(<AuthPage />, {
      route: ROUTES.entrar,
      user: {
        id: 'u1',
        email: 'a@b.com',
        role: 'athlete',
        nome: 'Lucas Henrique',
        emailVerificado: true,
      },
    })

    // Redirecionado: o formulário não chega a renderizar.
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument()
  })
})
