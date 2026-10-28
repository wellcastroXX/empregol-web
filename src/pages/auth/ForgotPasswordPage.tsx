import { useState, type FormEvent } from 'react'

import { authService } from '@/features/auth/lib/auth-service'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

import { AuthAlert, SubmitButton } from './components/AuthControls'
import { AuthField } from './components/AuthField'
import { AuthShell } from './components/AuthShell'
import { FORM_MESSAGES } from './components/form-messages'

const MESSAGES = defineMessages({
  pt: {
    title: 'Recupere o acesso',
    lead: 'Informe o e-mail da conta e enviamos um link para criar uma senha nova.',
    sent: 'Se existir uma conta com esse e-mail, o link de redefinição já está a caminho. Confira também a caixa de spam.',
    submit: 'Enviar link ›',
  },
  en: {
    title: 'Recover access',
    lead: 'Enter your account email and we will send you a link to create a new password.',
    sent: 'If an account exists with that email, the reset link is on its way. Check your spam folder too.',
    submit: 'Send link ›',
  },
  es: {
    title: 'Recupera el acceso',
    lead: 'Indica el correo de la cuenta y te enviaremos un enlace para crear una contraseña nueva.',
    sent: 'Si existe una cuenta con ese correo, el enlace para restablecerla ya va en camino. Revisa también la carpeta de spam.',
    submit: 'Enviar enlace ›',
  },
})

/** Solicitação de link de redefinição de senha. */
export default function ForgotPasswordPage() {
  const m = useMessages(MESSAGES)
  const common = useMessages(FORM_MESSAGES)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(common.emailInvalid)
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

      {error && <AuthAlert tone="error">{error}</AuthAlert>}

      {sent ? (
        <AuthAlert tone="success">{m.sent}</AuthAlert>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
          noValidate
        >
          <AuthField
            label={common.email}
            value={email}
            onChange={setEmail}
            placeholder={common.emailPlaceholder}
            type="email"
            inputMode="email"
            autoComplete="email"
          />
          <SubmitButton loading={loading}>{m.submit}</SubmitButton>
        </form>
      )}
    </AuthShell>
  )
}
