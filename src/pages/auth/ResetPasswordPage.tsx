import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { authService } from '@/features/auth/lib/auth-service'
import { colors, fonts } from '@/shared/config/theme'

import { AuthAlert, SubmitButton } from './components/AuthControls'
import { AuthField } from './components/AuthField'
import { AuthShell } from './components/AuthShell'

/**
 * Define uma senha nova a partir do token do e-mail
 * (`/redefinir-senha?token=...`).
 */
export default function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não conferem.')
      return
    }

    setError(null)
    setLoading(true)
    try {
      await authService.resetPassword(token, password)
      setDone(true)
      // Dá um instante para a confirmação ser lida antes de ir ao login.
      setTimeout(() => navigate(ROUTES.entrar, { replace: true }), 2200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível redefinir a senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <h1
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 36,
          letterSpacing: '-0.025em',
          color: colors.tinta,
          margin: '0 0 6px',
        }}
      >
        Nova senha<span style={{ color: colors.gramado }}>.</span>
      </h1>
      <p
        style={{
          fontFamily: fonts.text,
          fontSize: 14,
          color: colors.cinza,
          margin: '0 0 28px',
          lineHeight: 1.5,
        }}
      >
        Escolhe uma senha nova para tua conta.
      </p>

      {/* Sem token não há o que redefinir — link quebrado ou aberto direto. */}
      {!token ? (
        <AuthAlert tone="error">
          Link inválido ou incompleto. Peça um novo em{' '}
          <Link to={ROUTES.esqueciSenha} style={{ color: colors.tinta, fontWeight: 500 }}>
            esqueci a senha
          </Link>
          .
        </AuthAlert>
      ) : done ? (
        <AuthAlert tone="success">Senha redefinida. Estamos te levando para o login...</AuthAlert>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
          noValidate
        >
          {error && <AuthAlert tone="error">{error}</AuthAlert>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <AuthField
              label="Nova senha"
              value={password}
              onChange={setPassword}
              placeholder="Mínimo 8 caracteres"
              type="password"
              autoComplete="new-password"
            />
            <AuthField
              label="Confirmar senha"
              value={confirm}
              onChange={setConfirm}
              placeholder="Repita a senha"
              type="password"
              autoComplete="new-password"
            />
          </div>

          <SubmitButton loading={loading} loadingLabel="Salvando..." style={{ borderRadius: 30 }}>
            Redefinir senha ›
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  )
}
