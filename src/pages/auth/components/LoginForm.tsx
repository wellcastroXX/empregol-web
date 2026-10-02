import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { AuthError } from '@/features/auth/lib/auth-service'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'

import { AuthAlert, SubmitButton } from './AuthControls'
import { AuthField } from './AuthField'

export function LoginForm() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // RequireAuth guarda aqui a rota que o usuário tentou abrir sem sessão.
  const from = (location.state as { from?: string } | null)?.from

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    setError(null)
    setLoading(true)
    try {
      await signIn({ email, password })
      navigate(from ?? ROUTES.painel, { replace: true })
    } catch (err) {
      // Conta existente mas sem e-mail confirmado: a tela de código assume
      // daqui, já com as credenciais guardadas pelo provider.
      if (err instanceof AuthError && err.code === 'EMAIL_NOT_VERIFIED') {
        navigate(ROUTES.verificarEmail)
        return
      }
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
      {error && <AuthAlert tone="error">{error}</AuthAlert>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AuthField
          label="E-mail"
          value={email}
          onChange={setEmail}
          placeholder="seu@email.com"
          type="email"
          inputMode="email"
          autoComplete="email"
        />
        <AuthField
          label="Senha"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
        />
        <Link
          to={ROUTES.esqueciSenha}
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: colors.tinta,
            textDecoration: 'none',
            alignSelf: 'flex-start',
          }}
        >
          Esqueci a senha ›
        </Link>
      </div>

      <SubmitButton loading={loading} loadingLabel="Entrando...">
        Entrar ›
      </SubmitButton>
    </form>
  )
}
