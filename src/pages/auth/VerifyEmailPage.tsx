import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'

import { AuthAlert, SubmitButton } from './components/AuthControls'
import { AuthField } from './components/AuthField'
import { AuthShell } from './components/AuthShell'

/** Confirmação do código de 6 dígitos enviado por e-mail no cadastro. */
export default function VerifyEmailPage() {
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
      setError('O código tem 6 dígitos.')
      return
    }

    setError(null)
    setLoading(true)
    try {
      await verifyEmail(code.trim())
      navigate(ROUTES.painel, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível confirmar o código.')
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
      setError(err instanceof Error ? err.message : 'Não foi possível reenviar o código.')
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
        Confirma teu e-mail<span style={{ color: colors.gramado }}>.</span>
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
        Enviamos um código de 6 dígitos para{' '}
        <strong style={{ color: colors.tinta }}>{pendingEmail}</strong>.
      </p>

      {error && <AuthAlert tone="error">{error}</AuthAlert>}
      {resent && (
        <AuthAlert tone="success">Código reenviado. Confere tua caixa de entrada.</AuthAlert>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
        <AuthField
          label="Código"
          value={code}
          onChange={(v) => setCode(v.replace(/\D/g, '').slice(0, 6))}
          placeholder="000000"
          inputMode="numeric"
          autoComplete="one-time-code"
        />
        <SubmitButton loading={loading} loadingLabel="Confirmando...">
          Confirmar ›
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
        Reenviar código ›
      </button>
    </AuthShell>
  )
}
