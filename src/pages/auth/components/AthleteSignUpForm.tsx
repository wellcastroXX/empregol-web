import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import type { AthleteLevel, DominantFoot, Gender } from '@/features/auth/model/auth.types'
import { DOMINANT_FEET, GENDERS, LEVELS, POSITIONS } from '@/features/auth/model/options'
import { useAuth } from '@/features/auth/ui/auth-context'
import { maskCpf, maskNumber, maskPhone, onlyDigits } from '@/shared/lib/masks'

import { AuthAlert, SubmitButton } from './AuthControls'
import { AuthField, AuthSelect } from './AuthField'

const emptyForm = {
  fullName: '',
  email: '',
  password: '',
  cpf: '',
  birthDate: '',
  phone: '',
  naturalidade: '',
  position: '',
  dominantFoot: '',
  gender: '',
  height: '',
  weight: '',
  level: '',
}

type FormState = typeof emptyForm
type Errors = Partial<Record<keyof FormState, string>>

/**
 * Valida no cliente o que a API valida no servidor, para o usuário não gastar
 * uma ida ao servidor por causa de um CPF com 10 dígitos.
 */
function validate(form: FormState): Errors {
  const errors: Errors = {}

  if (form.fullName.trim().length < 3) errors.fullName = 'Nome deve ter no mínimo 3 caracteres'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'E-mail inválido'
  if (form.password.length < 8) errors.password = 'Senha deve ter no mínimo 8 caracteres'
  if (onlyDigits(form.cpf).length !== 11) errors.cpf = 'CPF deve conter 11 dígitos'
  if (!form.birthDate) errors.birthDate = 'Informe a data de nascimento'
  if (onlyDigits(form.phone).length < 10) errors.phone = 'Telefone inválido'
  if (form.naturalidade.trim().length < 2) errors.naturalidade = 'Informe a naturalidade'
  if (!form.position) errors.position = 'Selecione a posição'
  if (!form.dominantFoot) errors.dominantFoot = 'Selecione o pé dominante'
  if (!form.level) errors.level = 'Selecione o nível'

  const height = Number(form.height)
  if (!height || height < 100 || height > 250) errors.height = 'Altura entre 100 e 250 cm'

  const weight = Number(form.weight)
  if (!weight || weight < 30 || weight > 200) errors.weight = 'Peso entre 30 e 200 kg'

  return errors
}

export function AthleteSignUpForm() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (field: keyof FormState) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setApiError(null)
    setLoading(true)
    try {
      await register({
        role: 'athlete',
        email: form.email.trim().toLowerCase(),
        password: form.password,
        fullName: form.fullName.trim(),
        cpf: form.cpf,
        birthDate: form.birthDate,
        phone: form.phone,
        naturalidade: form.naturalidade.trim(),
        position: form.position,
        dominantFoot: form.dominantFoot as DominantFoot,
        height: Number(form.height),
        weight: Number(form.weight),
        level: form.level as AthleteLevel,
        ...(form.gender ? { gender: form.gender as Gender } : {}),
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
          label="Nome completo"
          value={form.fullName}
          onChange={set('fullName')}
          placeholder="Nome completo"
          autoComplete="name"
          error={errors.fullName}
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
            label="CPF"
            value={form.cpf}
            onChange={(v) => set('cpf')(maskCpf(v))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            error={errors.cpf}
          />
          <AuthField
            label="Nascimento"
            value={form.birthDate}
            onChange={set('birthDate')}
            type="date"
            error={errors.birthDate}
          />
        </div>

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
            label="Naturalidade"
            value={form.naturalidade}
            onChange={set('naturalidade')}
            placeholder="Cidade natal"
            error={errors.naturalidade}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthSelect
            label="Posição"
            value={form.position}
            onChange={set('position')}
            options={POSITIONS}
            error={errors.position}
          />
          <AuthSelect
            label="Pé dominante"
            value={form.dominantFoot as DominantFoot | ''}
            onChange={set('dominantFoot')}
            options={DOMINANT_FEET}
            error={errors.dominantFoot}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthField
            label="Altura (cm)"
            value={form.height}
            onChange={(v) => set('height')(maskNumber(v, 3))}
            placeholder="180"
            inputMode="numeric"
            error={errors.height}
          />
          <AuthField
            label="Peso (kg)"
            value={form.weight}
            onChange={(v) => set('weight')(maskNumber(v, 3))}
            placeholder="75"
            inputMode="numeric"
            error={errors.weight}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthSelect
            label="Nível"
            value={form.level as AthleteLevel | ''}
            onChange={set('level')}
            options={LEVELS}
            error={errors.level}
          />
          <AuthSelect
            label="Gênero"
            value={form.gender as Gender | ''}
            onChange={set('gender')}
            options={GENDERS}
            hint="Opcional"
          />
        </div>
      </div>

      <SubmitButton loading={loading} loadingLabel="Criando conta...">
        Criar conta ›
      </SubmitButton>
    </form>
  )
}
