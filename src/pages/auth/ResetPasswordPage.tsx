import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { authService } from '@/features/auth/lib/auth-service'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

import { AuthAlert, SubmitButton } from './components/AuthControls'
import { AuthField } from './components/AuthField'
import { AuthShell } from './components/AuthShell'
import { FORM_MESSAGES } from './components/form-messages'

const MESSAGES = defineMessages({
  pt: {
    passwordMin: 'A senha deve ter no mínimo 8 caracteres.',
    mismatch: 'As senhas não conferem.',
    failed: 'Não foi possível redefinir a senha.',
    title: 'Nova senha',
    lead: 'Escolhe uma senha nova para tua conta.',
    invalidBefore: 'Link inválido ou incompleto. Peça um novo em',
    invalidLink: 'esqueci a senha',
    done: 'Senha redefinida. Estamos te levando para o login...',
    newPassword: 'Nova senha',
    confirm: 'Confirmar senha',
    confirmPlaceholder: 'Repita a senha',
    submit: 'Redefinir senha ›',
    submitting: 'Salvando...',
  },
  en: {
    passwordMin: 'Password must be at least 8 characters.',
    mismatch: 'Passwords do not match.',
    failed: 'Could not reset the password.',
    title: 'New password',
    lead: 'Choose a new password for your account.',
    invalidBefore: 'Invalid or incomplete link. Request a new one at',
    invalidLink: 'forgot password',
    done: 'Password reset. Taking you to sign in...',
    newPassword: 'New password',
    confirm: 'Confirm password',
    confirmPlaceholder: 'Repeat the password',
    submit: 'Reset password ›',
    submitting: 'Saving...',
  },
  es: {
    passwordMin: 'La contraseña debe tener al menos 8 caracteres.',
    mismatch: 'Las contraseñas no coinciden.',
    failed: 'No se pudo restablecer la contraseña.',
    title: 'Nueva contraseña',
    lead: 'Elige una contraseña nueva para tu cuenta.',
    invalidBefore: 'Enlace inválido o incompleto. Pide uno nuevo en',
    invalidLink: 'olvidé mi contraseña',
    done: 'Contraseña restablecida. Te llevamos al inicio de sesión...',
    newPassword: 'Nueva contraseña',
    confirm: 'Confirmar contraseña',
    confirmPlaceholder: 'Repite la contraseña',
    submit: 'Restablecer contraseña ›',
    submitting: 'Guardando...',
  },
})

/**
 * Define uma senha nova a partir do token do e-mail
 * (`/redefinir-senha?token=...`).
 */
export default function ResetPasswordPage() {
  const m = useMessages(MESSAGES)
  const common = useMessages(FORM_MESSAGES)
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
      setError(m.passwordMin)
      return
    }
    if (password !== confirm) {
      setError(m.mismatch)
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
      setError(err instanceof Error ? err.message : m.failed)
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
        {m.title}
        <span style={{ color: colors.gramado }}>.</span>
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
        {m.lead}
      </p>

      {/* Sem token não há o que redefinir — link quebrado ou aberto direto. */}
      {!token ? (
        <AuthAlert tone="error">
          {m.invalidBefore}{' '}
          <Link to={ROUTES.esqueciSenha} style={{ color: colors.tinta, fontWeight: 500 }}>
            {m.invalidLink}
          </Link>
          .
        </AuthAlert>
      ) : done ? (
        <AuthAlert tone="success">{m.done}</AuthAlert>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
          noValidate
        >
          {error && <AuthAlert tone="error">{error}</AuthAlert>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <AuthField
              label={m.newPassword}
              value={password}
              onChange={setPassword}
              placeholder={common.newPasswordPlaceholder}
              type="password"
              autoComplete="new-password"
            />
            <AuthField
              label={m.confirm}
              value={confirm}
              onChange={setConfirm}
              placeholder={m.confirmPlaceholder}
              type="password"
              autoComplete="new-password"
            />
          </div>

          <SubmitButton loading={loading} loadingLabel={m.submitting} style={{ borderRadius: 30 }}>
            {m.submit}
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  )
}
