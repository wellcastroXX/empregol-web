import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import type { ContractorKind } from '@/features/auth/model/auth.types'
import { useAuth } from '@/features/auth/ui/auth-context'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { maskCnpj, maskPhone, onlyDigits } from '@/shared/lib/masks'

import { AuthAlert, SubmitButton } from './AuthControls'
import { AuthField } from './AuthField'
import { FORM_MESSAGES, type FormMessages } from './form-messages'

const MESSAGES = defineMessages({
  pt: {
    clubName: 'Nome do clube',
    agencyName: 'Nome da agência',
    agencyNamePlaceholder: 'Como a agência é conhecida',
    cnpj: 'CNPJ',
    companyName: 'Razão social',
    companyNamePlaceholder: 'Razão social, como está no CNPJ',
    socialMedia: 'Rede social',
    socialMediaPlaceholder: 'https://instagram.com/seuperfil',
    cnpjDigits: 'CNPJ deve conter 14 dígitos',
    companyNameRequired: 'Razão social é obrigatória para agências',
    socialMediaInvalid: 'Informe uma URL completa, começando por https://',
  },
  en: {
    clubName: 'Club name',
    agencyName: 'Agency name',
    agencyNamePlaceholder: 'The name the agency goes by',
    cnpj: 'CNPJ (Brazilian company ID)',
    companyName: 'Legal company name',
    companyNamePlaceholder: 'Legal name, as registered on the CNPJ',
    socialMedia: 'Social media',
    socialMediaPlaceholder: 'https://instagram.com/yourprofile',
    cnpjDigits: 'CNPJ must have 14 digits',
    companyNameRequired: 'Legal company name is required for agencies',
    socialMediaInvalid: 'Enter a full URL, starting with https://',
  },
  es: {
    clubName: 'Nombre del club',
    agencyName: 'Nombre de la agencia',
    agencyNamePlaceholder: 'Cómo se conoce a la agencia',
    cnpj: 'CNPJ (registro de empresa brasileño)',
    companyName: 'Razón social',
    companyNamePlaceholder: 'Razón social, tal como figura en el CNPJ',
    socialMedia: 'Red social',
    socialMediaPlaceholder: 'https://instagram.com/tuperfil',
    cnpjDigits: 'El CNPJ debe tener 14 dígitos',
    companyNameRequired: 'La razón social es obligatoria para agencias',
    socialMediaInvalid: 'Indica una URL completa, que empiece con https://',
  },
})

type ContractorMessages = (typeof MESSAGES)['pt']

// Sem CPF: desde que agente virou agência, os dois tipos de contratante são
// pessoa jurídica, e a API passou a exigir CNPJ dos dois.
const emptyForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  cnpj: '',
  companyName: '',
  socialMedia: '',
}

type FormState = typeof emptyForm
type Errors = Partial<Record<keyof FormState, string>>

export interface ContractorSignUpFormProps {
  kind: ContractorKind
}

function validate(
  form: FormState,
  kind: ContractorKind,
  m: ContractorMessages,
  common: FormMessages,
): Errors {
  const errors: Errors = {}

  if (form.name.trim().length < 3) errors.name = common.nameMin
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = common.emailInvalid
  if (form.password.length < 8) errors.password = common.passwordMin
  if (onlyDigits(form.phone).length < 10) errors.phone = common.phoneInvalid

  // Espelha o superRefine de auth-contractor.dto.ts: CNPJ vale para os dois, e
  // a razão social é exigida só da agência.
  if (onlyDigits(form.cnpj).length !== 14) {
    errors.cnpj = m.cnpjDigits
  }
  if (kind === 'agent' && form.companyName.trim().length < 2) {
    errors.companyName = m.companyNameRequired
  }
  if (form.socialMedia && !/^https?:\/\/\S+$/.test(form.socialMedia)) {
    errors.socialMedia = m.socialMediaInvalid
  }

  return errors
}

export function ContractorSignUpForm({ kind }: ContractorSignUpFormProps) {
  const m = useMessages(MESSAGES)
  const common = useMessages(FORM_MESSAGES)
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isClub = kind === 'club'

  const set = (field: keyof FormState) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    const found = validate(form, kind, m, common)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setApiError(null)
    setLoading(true)
    try {
      await register({
        role: 'contractor',
        type: isClub ? 'CLUB' : 'AGENT',
        email: form.email.trim().toLowerCase(),
        password: form.password,
        name: form.name.trim(),
        phone: form.phone,
        cnpj: form.cnpj,
        ...(form.companyName.trim() ? { companyName: form.companyName.trim() } : {}),
        ...(form.socialMedia.trim() ? { socialMedia: form.socialMedia.trim() } : {}),
      })
      navigate(ROUTES.verificarEmail)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : common.createAccountFailed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
      {apiError && <AuthAlert tone="error">{apiError}</AuthAlert>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AuthField
          label={isClub ? m.clubName : m.agencyName}
          value={form.name}
          onChange={set('name')}
          placeholder={isClub ? m.clubName : m.agencyNamePlaceholder}
          autoComplete="organization"
          error={errors.name}
        />
        <AuthField
          label={common.email}
          value={form.email}
          onChange={set('email')}
          placeholder={common.emailPlaceholder}
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.email}
        />
        <AuthField
          label={common.password}
          value={form.password}
          onChange={set('password')}
          placeholder={common.newPasswordPlaceholder}
          type="password"
          autoComplete="new-password"
          error={errors.password}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthField
            label={common.phone}
            value={form.phone}
            onChange={(v) => set('phone')(maskPhone(v))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone}
          />
          <AuthField
            label={m.cnpj}
            value={form.cnpj}
            onChange={(v) => set('cnpj')(maskCnpj(v))}
            placeholder="00.000.000/0000-00"
            inputMode="numeric"
            error={errors.cnpj}
          />
        </div>

        <AuthField
          label={m.companyName}
          value={form.companyName}
          onChange={set('companyName')}
          placeholder={m.companyNamePlaceholder}
          error={errors.companyName}
          // Obrigatória só para a agência — o clube segue podendo pular.
          hint={isClub && !errors.companyName ? common.optional : undefined}
        />

        <AuthField
          label={m.socialMedia}
          value={form.socialMedia}
          onChange={set('socialMedia')}
          placeholder={m.socialMediaPlaceholder}
          inputMode="text"
          error={errors.socialMedia}
          hint={errors.socialMedia ? undefined : common.optional}
        />
      </div>

      <SubmitButton
        loading={loading}
        loadingLabel={common.creatingAccount}
        style={{ borderRadius: 30 }}
      >
        {common.createAccount}
      </SubmitButton>
    </form>
  )
}
