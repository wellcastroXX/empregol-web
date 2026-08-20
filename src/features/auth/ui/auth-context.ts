import { createContext, useContext } from 'react'

import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
  Session,
  UserRole,
} from '../model/auth.types'

export interface AuthContextValue {
  status: AuthStatus
  session: Session | null
  user: AuthUser | null
  /** E-mail aguardando verificação — dirige a tela de código. */
  pendingEmail: string | null
  /** Cadastra; a API envia o código por e-mail e ainda não autentica. */
  register(payload: RegisterPayload): Promise<void>
  /** Confirma o código e faz login automático com as credenciais pendentes. */
  verifyEmail(code: string): Promise<void>
  resendCode(): Promise<void>
  signIn(credentials: LoginCredentials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>.')
  return ctx
}

/** Papel a usar na verificação quando a API não informou qual era. */
export const DEFAULT_ROLE: UserRole = 'athlete'
