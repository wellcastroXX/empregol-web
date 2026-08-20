import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiError } from '@/shared/lib/http/api-client'

import { authApi } from '../api/auth-api'
import type { ApiUser } from '../model/auth.types'
import { AuthError, authService } from './auth-service'

vi.mock('../api/auth-api', () => ({
  authApi: {
    register: vi.fn(),
    login: vi.fn(),
    verifyEmail: vi.fn(),
    resendCode: vi.fn(),
    forgotPassword: vi.fn(),
    me: vi.fn(),
  },
}))

const athleteUser: ApiUser = {
  id: 'a1',
  email: 'atleta@exemplo.com',
  role: 'ATHLETE',
  emailVerified: true,
  athlete: { fullName: 'Lucas Henrique', phone: '11999990000' },
}

const clubUser: ApiUser = {
  id: 'c1',
  email: 'clube@exemplo.com',
  role: 'CLUB',
  emailVerified: true,
  contractor: { name: 'Flamengo', phone: '2133330000', type: 'CLUB' },
}

function loginOk(user: ApiUser) {
  return { status: 'success', data: { accessToken: 'acc', refreshToken: 'ref', user } }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('authService.login', () => {
  it('normaliza o e-mail antes de enviar', async () => {
    vi.mocked(authApi.login).mockResolvedValueOnce(loginOk(athleteUser))

    await authService.login({ email: '  Atleta@Exemplo.COM ', password: 'segredo123' })

    expect(authApi.login).toHaveBeenCalledWith('athlete', 'atleta@exemplo.com', 'segredo123')
  })

  it('cai para o endpoint de contratante quando não é atleta', async () => {
    vi.mocked(authApi.login)
      .mockRejectedValueOnce(new ApiError('Credenciais inválidas', 'INVALID_CREDENTIALS', 401))
      .mockResolvedValueOnce(loginOk(clubUser))

    const result = await authService.login({ email: 'clube@exemplo.com', password: 'segredo123' })

    expect(authApi.login).toHaveBeenNthCalledWith(1, 'athlete', 'clube@exemplo.com', 'segredo123')
    expect(authApi.login).toHaveBeenNthCalledWith(
      2,
      'contractor',
      'clube@exemplo.com',
      'segredo123',
    )
    expect(result.user).toMatchObject({ role: 'contractor', kind: 'club', nome: 'Flamengo' })
  })

  it('não tenta contratante quando o atleta existe mas não verificou o e-mail', async () => {
    vi.mocked(authApi.login).mockRejectedValueOnce(
      new ApiError('Confirme seu e-mail', 'EMAIL_NOT_VERIFIED', 403),
    )

    await expect(
      authService.login({ email: 'atleta@exemplo.com', password: 'segredo123' }),
    ).rejects.toMatchObject({ code: 'EMAIL_NOT_VERIFIED', role: 'athlete' })

    // Insistir no outro endpoint criaria um segundo erro e esconderia o real.
    expect(authApi.login).toHaveBeenCalledTimes(1)
  })

  it('prefere a mensagem do campo em erro de validação', async () => {
    vi.mocked(authApi.login)
      .mockRejectedValueOnce(
        new ApiError('Dados inválidos', 'VALIDATION_ERROR', 422, {
          email: ['E-mail inválido'],
        }),
      )
      .mockRejectedValueOnce(
        new ApiError('Dados inválidos', 'VALIDATION_ERROR', 422, {
          email: ['E-mail inválido'],
        }),
      )

    await expect(authService.login({ email: 'nada', password: 'x' })).rejects.toThrow(
      'E-mail inválido',
    )
  })
})

describe('authService.register', () => {
  it('remove máscara de CPF e telefone do atleta', async () => {
    vi.mocked(authApi.register).mockResolvedValueOnce({ status: 'success', message: 'ok' })

    await authService.register({
      role: 'athlete',
      email: 'atleta@exemplo.com',
      password: 'segredo123',
      fullName: 'Lucas Henrique',
      cpf: '123.456.789-01',
      birthDate: '1998-05-04',
      phone: '(11) 99999-0000',
      naturalidade: 'Salvador',
      position: 'ATA',
      dominantFoot: 'RIGHT',
      height: 180,
      weight: 75,
      level: 'PROFESSIONAL',
    })

    expect(authApi.register).toHaveBeenCalledWith(
      'athlete',
      expect.objectContaining({ cpf: '12345678901', phone: '11999990000' }),
    )
    // `role` é do domínio da web e não existe no DTO da API.
    expect(vi.mocked(authApi.register).mock.calls[0]?.[1]).not.toHaveProperty('role')
  })

  it('envia CNPJ sem máscara para clube', async () => {
    vi.mocked(authApi.register).mockResolvedValueOnce({ status: 'success', message: 'ok' })

    await authService.register({
      role: 'contractor',
      type: 'CLUB',
      email: 'clube@exemplo.com',
      password: 'segredo123',
      name: 'Flamengo',
      phone: '(21) 3333-0000',
      cnpj: '12.345.678/0001-90',
    })

    expect(authApi.register).toHaveBeenCalledWith(
      'contractor',
      expect.objectContaining({ cnpj: '12345678000190', phone: '2133330000' }),
    )
  })
})

describe('authService.requestPasswordReset', () => {
  it('dispara nos dois papéis e não vaza falha individual', async () => {
    vi.mocked(authApi.forgotPassword)
      .mockRejectedValueOnce(new ApiError('não existe', 'NOT_FOUND', 404))
      .mockResolvedValueOnce({ status: 'success', message: 'ok' })

    await expect(authService.requestPasswordReset('ALGUEM@Exemplo.com ')).resolves.toBeUndefined()

    expect(authApi.forgotPassword).toHaveBeenCalledWith('athlete', 'alguem@exemplo.com')
    expect(authApi.forgotPassword).toHaveBeenCalledWith('contractor', 'alguem@exemplo.com')
  })
})

describe('AuthError', () => {
  it('carrega o código da API', () => {
    const err = new AuthError('falhou', 'EMAIL_NOT_VERIFIED')
    expect(err.code).toBe('EMAIL_NOT_VERIFIED')
    expect(err.name).toBe('AuthError')
  })
})
