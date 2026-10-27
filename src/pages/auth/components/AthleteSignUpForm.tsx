import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import type { AthleteLevel, DominantFoot, Gender } from '@/features/auth/model/auth.types'
import { useFormOptions } from '@/features/auth/model/options'
import { useAuth } from '@/features/auth/ui/auth-context'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { maskCpf, maskNumber, maskPhone, onlyDigits } from '@/shared/lib/masks'

import { AuthAlert, SubmitButton } from './AuthControls'
import { AuthField, AuthSelect } from './AuthField'
import { FORM_MESSAGES, type FormMessages } from './form-messages'

const MESSAGES = defineMessages({
  pt: {
    fullName: 'Nome completo',
    cpf: 'CPF',
    birthDate: 'Nascimento',
    hometown: 'Naturalidade',
    hometownPlaceholder: 'Cidade natal',
    profileUrl: 'Link do seu perfil esportivo',
    profileUrlPlaceholder: 'OGol/Transfermarkt ou outro',
    position: 'Posição',
    dominantFoot: 'Pé dominante',
    height: 'Altura (cm)',
    weight: 'Peso (kg)',
    level: 'Nível',
    gender: 'Gênero',
    cpfDigits: 'CPF deve conter 11 dígitos',
    birthDateRequired: 'Informe a data de nascimento',
    hometownRequired: 'Informe a naturalidade',
    profileUrlInvalid: 'Informe um link válido começando com http:// ou https://',
    positionRequired: 'Selecione a posição',
    dominantFootRequired: 'Selecione o pé dominante',
    levelRequired: 'Selecione o nível',
    heightRange: 'Altura entre 100 e 250 cm',
    weightRange: 'Peso entre 30 e 200 kg',
  },
  en: {
    fullName: 'Full name',
    cpf: 'CPF (Brazilian ID)',
    birthDate: 'Date of birth',
    hometown: 'Hometown',
    hometownPlaceholder: 'City of birth',
    profileUrl: 'Link to your sports profile',
    profileUrlPlaceholder: 'OGol/Transfermarkt or other',
    position: 'Position',
    dominantFoot: 'Dominant foot',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    level: 'Level',
    gender: 'Gender',
    cpfDigits: 'CPF must have 11 digits',
    birthDateRequired: 'Enter your date of birth',
    hometownRequired: 'Enter your hometown',
    profileUrlInvalid: 'Enter a valid link starting with http:// or https://',
    positionRequired: 'Select your position',
    dominantFootRequired: 'Select your dominant foot',
    levelRequired: 'Select your level',
    heightRange: 'Height between 100 and 250 cm',
    weightRange: 'Weight between 30 and 200 kg',
  },
  es: {
    fullName: 'Nombre completo',
    cpf: 'CPF (documento brasileño)',
    birthDate: 'Fecha de nacimiento',
    hometown: 'Lugar de nacimiento',
    hometownPlaceholder: 'Ciudad natal',
    profileUrl: 'Enlace a tu perfil deportivo',
    profileUrlPlaceholder: 'OGol/Transfermarkt u otro',
    position: 'Posición',
    dominantFoot: 'Pie dominante',
    height: 'Altura (cm)',
    weight: 'Peso (kg)',
    level: 'Nivel',
    gender: 'Género',
    cpfDigits: 'El CPF debe tener 11 dígitos',
    birthDateRequired: 'Indica tu fecha de nacimiento',
    hometownRequired: 'Indica tu lugar de nacimiento',
    profileUrlInvalid: 'Indica un enlace válido que empiece con http:// o https://',
    positionRequired: 'Selecciona la posición',
    dominantFootRequired: 'Selecciona el pie dominante',
    levelRequired: 'Selecciona el nivel',
    heightRange: 'Altura entre 100 y 250 cm',
    weightRange: 'Peso entre 30 y 200 kg',
  },
})

type AthleteMessages = (typeof MESSAGES)['pt']

const emptyForm = {
  fullName: '',
  email: '',
  password: '',
  cpf: '',
  birthDate: '',
  phone: '',
  naturalidade: '',
  sportsProfileUrl: '',
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
function validate(form: FormState, m: AthleteMessages, common: FormMessages): Errors {
  const errors: Errors = {}

  if (form.fullName.trim().length < 3) errors.fullName = common.nameMin
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = common.emailInvalid
  if (form.password.length < 8) errors.password = common.passwordMin
  if (onlyDigits(form.cpf).length !== 11) errors.cpf = m.cpfDigits
  if (!form.birthDate) errors.birthDate = m.birthDateRequired
  if (onlyDigits(form.phone).length < 10) errors.phone = common.phoneInvalid
  if (form.naturalidade.trim().length < 2) errors.naturalidade = m.hometownRequired
  if (form.sportsProfileUrl.trim()) {
    try {
      const profileUrl = new URL(form.sportsProfileUrl.trim())
      if (!['http:', 'https:'].includes(profileUrl.protocol)) {
        errors.sportsProfileUrl = m.profileUrlInvalid
      }
    } catch {
      errors.sportsProfileUrl = m.profileUrlInvalid
    }
  }
  if (!form.position) errors.position = m.positionRequired
  if (!form.dominantFoot) errors.dominantFoot = m.dominantFootRequired
  if (!form.level) errors.level = m.levelRequired

  const height = Number(form.height)
  if (!height || height < 100 || height > 250) errors.height = m.heightRange

  const weight = Number(form.weight)
  if (!weight || weight < 30 || weight > 200) errors.weight = m.weightRange

  return errors
}

export function AthleteSignUpForm() {
  const m = useMessages(MESSAGES)
  const common = useMessages(FORM_MESSAGES)
  const options = useFormOptions()
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

    const found = validate(form, m, common)
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
        ...(form.sportsProfileUrl.trim() ? { sportsProfileUrl: form.sportsProfileUrl.trim() } : {}),
        position: form.position,
        dominantFoot: form.dominantFoot as DominantFoot,
        height: Number(form.height),
        weight: Number(form.weight),
        level: form.level as AthleteLevel,
        ...(form.gender ? { gender: form.gender as Gender } : {}),
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
          label={m.fullName}
          value={form.fullName}
          onChange={set('fullName')}
          placeholder={m.fullName}
          autoComplete="name"
          error={errors.fullName}
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
            label={m.cpf}
            value={form.cpf}
            onChange={(v) => set('cpf')(maskCpf(v))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            error={errors.cpf}
          />
          <AuthField
            label={m.birthDate}
            value={form.birthDate}
            onChange={set('birthDate')}
            type="date"
            error={errors.birthDate}
          />
        </div>

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
            label={m.hometown}
            value={form.naturalidade}
            onChange={set('naturalidade')}
            placeholder={m.hometownPlaceholder}
            error={errors.naturalidade}
          />
        </div>

        <AuthField
          label={m.profileUrl}
          value={form.sportsProfileUrl}
          onChange={set('sportsProfileUrl')}
          placeholder={m.profileUrlPlaceholder}
          type="url"
          hint={common.optional}
          error={errors.sportsProfileUrl}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthSelect
            label={m.position}
            value={form.position}
            onChange={set('position')}
            options={options.positions}
            error={errors.position}
          />
          <AuthSelect
            label={m.dominantFoot}
            value={form.dominantFoot as DominantFoot | ''}
            onChange={set('dominantFoot')}
            options={options.dominantFeet}
            error={errors.dominantFoot}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthField
            label={m.height}
            value={form.height}
            onChange={(v) => set('height')(maskNumber(v, 3))}
            placeholder="180"
            inputMode="numeric"
            error={errors.height}
          />
          <AuthField
            label={m.weight}
            value={form.weight}
            onChange={(v) => set('weight')(maskNumber(v, 3))}
            placeholder="75"
            inputMode="numeric"
            error={errors.weight}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: 14 }}>
          <AuthSelect
            label={m.level}
            value={form.level as AthleteLevel | ''}
            onChange={set('level')}
            options={options.levels}
            error={errors.level}
          />
          <AuthSelect
            label={m.gender}
            value={form.gender as Gender | ''}
            onChange={set('gender')}
            options={options.genders}
            hint={common.optional}
          />
        </div>
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
