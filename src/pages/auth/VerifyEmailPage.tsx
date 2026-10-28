import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

import { AuthAlert, SubmitButton } from './components/AuthControls'
import { AuthField } from './components/AuthField'
import { AuthShell } from './components/AuthShell'

const MESSAGES = defineMessages({
  pt: {
    codeLength: 'O código tem 6 dígitos.',
    verifyFailed: 'Não foi possível confirmar o código.',
    resendFailed: 'Não foi possível reenviar o código.',
    title: 'Confirme seu e-mail',
    sentTo: 'Enviamos um código de 6 dígitos para',
    resent: 'Código reenviado. Confira sua caixa de entrada.',
    code: 'Código',
    submit: 'Confirmar ›',
    submitting: 'Confirmando...',
    resend: 'Reenviar código ›',
  },
  en: {
    codeLength: 'The code has 6 digits.',
    verifyFailed: 'Could not confirm the code.',
    resendFailed: 'Could not resend the code.',
    title: 'Confirm your email',
    sentTo: 'We sent a 6-digit code to',
    resent: 'Code resent. Check your inbox.',
    code: 'Code',
    submit: 'Confirm ›',
    submitting: 'Confirming...',
    resend: 'Resend code ›',
  },
  es: {
    codeLength: 'El código tiene 6 dígitos.',
    verifyFailed: 'No se pudo confirmar el código.',
    resendFailed: 'No se pudo reenviar el código.',
    title: 'Confirma tu correo',
    sentTo: 'Enviamos un código de 6 dígitos a',
    resent: 'Código reenviado. Revisa tu bandeja de entrada.',
    code: 'Código',
    submit: 'Confirmar ›',
    submitting: 'Confirmando...',
    resend: 'Reenviar código ›',
  },
})

/** Confirmação do código de 6 dígitos enviado por e-mail no cadastro. */
export default function VerifyEmailPage() {
  const m = useMessages(MESSAGES)
  const { pendingEmail, status, verifyEmail, resendCode } = useAuth()
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resent, setResent] = useState(false)
  const [loading, setLoading] = useState(false)

  if (status === 'authenticated') return <Navigate to={ROUTES.painel} replace />

  // Sem e-mail pendente a tela não tem o que verificar — pode ser F5 numa aba
  // antiga, já que as credenciais ficam em memória.
  if (!pendingEmail) return <Navigate to={ROUTES.entrar} replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    if (code.trim().length !== 6) {
      setError(m.codeLength)
      return
    }

    setError(null)
    setLoading(true)
    try {
      await verifyEmail(code.trim())
      navigate(ROUTES.painel, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : m.verifyFailed)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setError(null)
    setResent(false)
    try {
      await resendCode()
      setResent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : m.resendFailed)
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
        {m.sentTo} <strong style={{ color: colors.tinta }}>{pendingEmail}</strong>.
      </p>

      {error && <AuthAlert tone="error">{error}</AuthAlert>}
      {resent && <AuthAlert tone="success">{m.resent}</AuthAlert>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
        <AuthField
          label={m.code}
          value={code}
          onChange={(v) => setCode(v.replace(/\D/g, '').slice(0, 6))}
          placeholder="000000"
          inputMode="numeric"
          autoComplete="one-time-code"
        />
        <SubmitButton loading={loading} loadingLabel={m.submitting}>
          {m.submit}
        </SubmitButton>
      </form>

      <button
        type="button"
        onClick={handleResend}
        style={{
          marginTop: 18,
          alignSelf: 'flex-start',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          padding: '8px 0',
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: colors.tinta,
          textDecoration: 'underline',
        }}
      >
        {m.resend}
      </button>
    </AuthShell>
  )
}
