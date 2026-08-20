import { ApiError, toApiError } from '@/shared/lib/http/api-client'

import { authApi } from '../api/auth-api'
import {
  toAuthUser,
  type AuthResult,
  type LoginCredentials,
  type RegisterPayload,
  type UserRole,
} from '../model/auth.types'

/** Erro de autenticação já pronto para a interface, com o código da API junto. */
export class AuthError extends Error {
  /** Papel tentado quando o erro ocorreu — usado para retomar a verificação. */
  role?: UserRole
  readonly code: string

  constructor(message: string, code: string = 'AUTH_ERROR') {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}

/** Em erro de validação, a mensagem do campo é mais útil que a genérica. */
function toAuthError(err: unknown): AuthError {
  const api = err instanceof ApiError ? err : toApiError(err)
  if (api.code === 'VALIDATION_ERROR' && api.firstFieldError) {
    return new AuthError(api.firstFieldError, api.code)
  }
  return new AuthError(api.message, api.code)
}

function unmask(value: string): string {
  return value.replace(/\D/g, '')
}

export const authService = {
  /**
   * Cadastra. **Não autentica**: a API envia um código de 6 dígitos por e-mail,
   * e só depois de verificar é que o login passa.
   */
  async register(payload: RegisterPayload): Promise<void> {
    try {
      if (payload.role === 'athlete') {
        const { role: _role, cpf, phone, ...rest } = payload
        await authApi.register('athlete', { ...rest, cpf: unmask(cpf), phone: unmask(phone) })
        return
      }
      const { role: _role, cpf, cnpj, phone, ...rest } = payload
      await authApi.register('contractor', {
        ...rest,
        phone: unmask(phone),
        ...(cpf ? { cpf: unmask(cpf) } : {}),
        ...(cnpj ? { cnpj: unmask(cnpj) } : {}),
      })
    } catch (err) {
      throw toAuthError(err)
    }
  },

  /**
   * Login. A API separa os endpoints por papel e o usuário não escolhe qual é
   * na tela — então tenta atleta e cai para contratante.
   */
  async login({ email, password }: LoginCredentials): Promise<AuthResult> {
    const normalized = email.trim().toLowerCase()

    const attempt = async (role: UserRole): Promise<AuthResult> => {
      try {
        const { data } = await authApi.login(role, normalized, password)
        return {
          session: { accessToken: data.accessToken, refreshToken: data.refreshToken },
          user: toAuthUser(data.user),
        }
      } catch (err) {
        const authErr = toAuthError(err)
        authErr.role = role
        throw authErr
      }
    }

    try {
      return await attempt('athlete')
    } catch (err) {
      // E-mail não verificado precisa aparecer na hora; qualquer outra falha
      // ainda pode ser uma conta de contratante.
      if (err instanceof AuthError && err.code === 'EMAIL_NOT_VERIFIED') throw err
      return attempt('contractor')
    }
  },

  async verifyEmail(role: UserRole, email: string, code: string): Promise<void> {
    try {
      await authApi.verifyEmail(role, email, code)
    } catch (err) {
      throw toAuthError(err)
    }
  },

  async resendCode(role: UserRole, email: string): Promise<void> {
    try {
      await authApi.resendCode(role, email)
    } catch (err) {
      throw toAuthError(err)
    }
  },

  /**
   * Recuperação de senha. Não sabemos o papel da conta, e a API responde
   * genérico de propósito (não revela se o e-mail existe), então dispara nos
   * dois endpoints e ignora falhas individuais.
   */
  async requestPasswordReset(email: string): Promise<void> {
    const normalized = email.trim().toLowerCase()
    await Promise.allSettled([
      authApi.forgotPassword('athlete', normalized),
      authApi.forgotPassword('contractor', normalized),
    ])
  },
}
