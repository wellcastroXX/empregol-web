import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import type { ContractorKind } from '@/features/auth/model/auth.types'
import { useAuth } from '@/features/auth/ui/auth-context'
import { maskCnpj, maskPhone, onlyDigits } from '@/shared/lib/masks'

import { AuthAlert, SubmitButton } from './AuthControls'
import { AuthField } from './AuthField'

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

function validate(form: FormState, kind: ContractorKind): Errors {
  const errors: Errors = {}

  if (form.name.trim().length < 3) errors.name = 'Nome deve ter no mínimo 3 caracteres'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'E-mail inválido'
  if (form.password.length < 8) errors.password = 'Senha deve ter no mínimo 8 caracteres'
  if (onlyDigits(form.phone).length < 10) errors.phone = 'Telefone inválido'

  // Espelha o superRefine de auth-contractor.dto.ts: CNPJ vale para os dois, e
  // a razão social é exigida só da agência.
  if (onlyDigits(form.cnpj).length !== 14) {
    errors.cnpj = 'CNPJ deve conter 14 dígitos'
  }
  if (kind === 'agent' && form.companyName.trim().length < 2) {
    errors.companyName = 'Razão social é obrigatória para agências'
  }
  if (form.socialMedia && !/^https?:\/\/\S+$/.test(form.socialMedia)) {
    errors.socialMedia = 'Informe uma URL completa, começando por https://'
  }

  return errors
}

export function ContractorSignUpForm({ kind }: ContractorSignUpFormProps) {
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

    const found = validate(form, kind)
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
      setApiError(err instanceof Error ? err.message : 'Não foi possível criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
      {apiError && <AuthAlert tone="error">{apiError}</AuthAlert>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AuthField
          label={isClub ? 'Nome do clube' : 'Nome da agência'}
          value={form.name}
          onChange={set('name')}
          placeholder={isClub ? 'Nome do clube' : 'Como a agência é conhecida'}
          autoComplete="organization"
          error={errors.name}
        />
        <AuthField
          label="E-mail"
          value={form.email}
          onChange={set('email')}
          placeholder="seu@email.com"
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.email}
        />
        <AuthField
          label="Senha"
          value={form.password}
          onChange={set('password')}
          placeholder="Mínimo 8 caracteres"
          type="password"
          autoComplete="new-password"
          error={errors.password}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthField
            label="Telefone"
            value={form.phone}
            onChange={(v) => set('phone')(maskPhone(v))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone}
          />
          <AuthField
            label="CNPJ"
            value={form.cnpj}
            onChange={(v) => set('cnpj')(maskCnpj(v))}
            placeholder="00.000.000/0000-00"
            inputMode="numeric"
            error={errors.cnpj}
          />
        </div>

        <AuthField
          label="Razão social"
          value={form.companyName}
          onChange={set('companyName')}
          placeholder="Razão social, como está no CNPJ"
          error={errors.companyName}
          // Obrigatória só para a agência — o clube segue podendo pular.
          hint={isClub && !errors.companyName ? 'Opcional' : undefined}
        />

        <AuthField
          label="Rede social"
          value={form.socialMedia}
          onChange={set('socialMedia')}
          placeholder="https://instagram.com/seuperfil"
          inputMode="text"
          error={errors.socialMedia}
          hint={errors.socialMedia ? undefined : 'Opcional'}
        />
      </div>

      <SubmitButton loading={loading} loadingLabel="Criando conta..." style={{ borderRadius: 30 }}>
        Criar conta ›
      </SubmitButton>
    </form>
  )
}
