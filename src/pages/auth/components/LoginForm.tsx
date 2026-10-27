import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { AuthError } from '@/features/auth/lib/auth-service'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

import { AuthAlert, SubmitButton } from './AuthControls'
import { AuthField } from './AuthField'
import { FORM_MESSAGES } from './form-messages'

const MESSAGES = defineMessages({
  pt: {
    failed: 'Não foi possível entrar.',
    forgot: 'Esqueci a senha ›',
    submit: 'Entrar ›',
    loading: 'Entrando...',
  },
  en: {
    failed: 'Could not sign in.',
    forgot: 'Forgot password ›',
    submit: 'Sign in ›',
    loading: 'Signing in...',
  },
  es: {
    failed: 'No se pudo entrar.',
    forgot: 'Olvidé mi contraseña ›',
    submit: 'Entrar ›',
    loading: 'Entrando...',
  },
})

export function LoginForm() {
  const m = useMessages(MESSAGES)
  const common = useMessages(FORM_MESSAGES)
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
      setError(err instanceof Error ? err.message : m.failed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
      {error && <AuthAlert tone="error">{error}</AuthAlert>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AuthField
          label={common.email}
          value={email}
          onChange={setEmail}
          placeholder={common.emailPlaceholder}
          type="email"
          inputMode="email"
          autoComplete="email"
        />
        <AuthField
          label={common.password}
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
          {m.forgot}
        </Link>
      </div>

      <SubmitButton loading={loading} loadingLabel={m.loading}>
        {m.submit}
      </SubmitButton>
    </form>
  )
}
