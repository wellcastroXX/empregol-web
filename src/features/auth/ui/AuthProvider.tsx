import { useCallback, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'

import { setAccessToken } from '@/shared/lib/http/api-client'

import { AuthError, authService } from '../lib/auth-service'
import { sessionStorage } from '../lib/session-storage'
import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
  Session,
  UserRole,
} from '../model/auth.types'
import { AuthContext, DEFAULT_ROLE, type AuthContextValue } from './auth-context'

interface AuthState {
  status: AuthStatus
  session: Session | null
  user: AuthUser | null
  pendingEmail: string | null
}

type AuthAction =
  | { type: 'authenticated'; session: Session; user: AuthUser }
  | { type: 'pending'; email: string }
  | { type: 'signOut' }

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'authenticated':
      return {
        status: 'authenticated',
        session: action.session,
        user: action.user,
        pendingEmail: null,
      }
    case 'pending':
      return { ...state, pendingEmail: action.email }
    case 'signOut':
      return { status: 'unauthenticated', session: null, user: null, pendingEmail: null }
  }
}

/**
 * Estado inicial lido do localStorage de forma síncrona.
 *
 * Ler no primeiro render (e não em efeito) evita o piscar de "deslogado" antes
 * da sessão ser restaurada — que, com rota protegida, jogaria o usuário para o
 * login a cada F5.
 */
function restore(): AuthState {
  const snapshot = sessionStorage.load()
  if (!snapshot) {
    return { status: 'unauthenticated', session: null, user: null, pendingEmail: null }
  }
  setAccessToken(snapshot.session.accessToken)
  return {
    status: 'authenticated',
    session: snapshot.session,
    user: snapshot.user,
    pendingEmail: null,
  }
}

/** Credenciais mantidas em memória entre o cadastro e a verificação do e-mail. */
interface PendingCredentials {
  role: UserRole
  email: string
  password: string
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // `useState` com inicializador: restore() roda uma vez, antes do primeiro paint.
  const [initial] = useState(restore)
  const [state, dispatch] = useReducer(reducer, initial)
  const pending = useRef<PendingCredentials | null>(null)

  const authenticate = useCallback((session: Session, user: AuthUser) => {
    setAccessToken(session.accessToken)
    sessionStorage.save({ session, user })
    pending.current = null
    dispatch({ type: 'authenticated', session, user })
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    await authService.register(payload)
    pending.current = {
      role: payload.role,
      email: payload.email,
      password: payload.password,
    }
    dispatch({ type: 'pending', email: payload.email })
  }, [])

  const verifyEmail = useCallback(
    async (code: string) => {
      const p = pending.current
      if (!p) throw new AuthError('Sessão de cadastro expirada. Entre novamente.')
      await authService.verifyEmail(p.role, p.email, code)
      const { session, user } = await authService.login({ email: p.email, password: p.password })
      authenticate(session, user)
    },
    [authenticate],
  )

  const resendCode = useCallback(async () => {
    const p = pending.current
    if (!p) throw new AuthError('Sessão de cadastro expirada. Entre novamente.')
    await authService.resendCode(p.role, p.email)
  }, [])

  const signIn = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const { session, user } = await authService.login(credentials)
        authenticate(session, user)
      } catch (err) {
        if (err instanceof AuthError && err.code === 'EMAIL_NOT_VERIFIED') {
          // Guarda as credenciais para a tela de código poder logar sozinha depois.
          pending.current = {
            role: err.role ?? DEFAULT_ROLE,
            email: credentials.email,
            password: credentials.password,
          }
          dispatch({ type: 'pending', email: credentials.email })
        }
        throw err
      }
    },
    [authenticate],
  )

  const signOut = useCallback(() => {
    setAccessToken(null)
    sessionStorage.clear()
    pending.current = null
    dispatch({ type: 'signOut' })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, register, verifyEmail, resendCode, signIn, signOut }),
    [state, register, verifyEmail, resendCode, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
