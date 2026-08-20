import { apiRequest, type ApiEnvelope, type ApiMessage } from '@/shared/lib/http/api-client'

import type { ApiLoginData, UserRole } from '../model/auth.types'

/** Os endpoints de auth são separados por papel. */
const segment = (role: UserRole) => (role === 'athlete' ? 'athletes' : 'contractors')

export const authApi = {
  register(role: UserRole, body: object) {
    return apiRequest<ApiMessage>(`/auth/${segment(role)}/register`, { method: 'POST', body })
  },

  login(role: UserRole, email: string, password: string) {
    return apiRequest<ApiEnvelope<ApiLoginData>>(`/auth/${segment(role)}/login`, {
      method: 'POST',
      body: { email, password },
    })
  },

  verifyEmail(role: UserRole, email: string, code: string) {
    return apiRequest<ApiMessage>(`/auth/${segment(role)}/verify-email`, {
      method: 'POST',
      body: { email, code },
    })
  },

  resendCode(role: UserRole, email: string) {
    return apiRequest<ApiMessage>(`/auth/${segment(role)}/resend-code`, {
      method: 'POST',
      body: { email },
    })
  },

  forgotPassword(role: UserRole, email: string) {
    return apiRequest<ApiMessage>(`/auth/${segment(role)}/forgot-password`, {
      method: 'POST',
      body: { email },
    })
  },

  /** Perfil do usuário logado, para revalidar a sessão restaurada. */
  me(role: UserRole) {
    return apiRequest<ApiEnvelope<Record<string, unknown>>>(`/${segment(role)}/me`)
  },
}
