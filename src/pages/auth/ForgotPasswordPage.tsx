import { useState, type FormEvent } from 'react'

import { authService } from '@/features/auth/lib/auth-service'
import { colors, fonts } from '@/shared/config/theme'

import { AuthAlert, SubmitButton } from './components/AuthControls'
import { AuthField } from './components/AuthField'
import { AuthShell } from './components/AuthShell'

/** Solicitação de link de redefinição de senha. */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('E-mail inválido')
      return
    }

    setError(null)
    setLoading(true)
    try {
      await authService.requestPasswordReset(email)
      setSent(true)
    } catch {
      // requestPasswordReset engole falhas por padrão; se algo escapar, não
      // vale revelar detalhe — a resposta é sempre genérica de propósito.
      setSent(true)
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
        Recupera o acesso<span style={{ color: colors.gramado }}>.</span>
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
        Informa o e-mail da conta e enviamos um link para criar uma senha nova.
      </p>

      {error && <AuthAlert tone="error">{error}</AuthAlert>}

      {sent ? (
        <AuthAlert tone="success">
          Se existir uma conta com esse e-mail, o link de redefinição já está a caminho. Confere
          também a caixa de spam.
        </AuthAlert>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
          noValidate
        >
          <AuthField
            label="E-mail"
            value={email}
            onChange={setEmail}
            placeholder="seu@email.com"
            type="email"
            inputMode="email"
            autoComplete="email"
          />
          <SubmitButton loading={loading} loadingLabel="Enviando...">
            Enviar link ›
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  )
}
