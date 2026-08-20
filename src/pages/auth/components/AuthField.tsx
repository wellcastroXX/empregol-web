import { useId, useState, type ReactNode } from 'react'

import { colors, fonts } from '@/shared/config/theme'

const labelStyle = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: colors.tinta,
} as const

const controlBase = {
  appearance: 'none',
  width: '100%',
  background: colors.giz,
  borderRadius: 4,
  padding: '14px',
  fontFamily: fonts.text,
  fontSize: 15,
  color: colors.tinta,
  outline: 'none',
  transition: 'border-color 160ms ease',
} as const

export interface AuthFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal'
  error?: string
  /** Texto de apoio abaixo do campo, quando o rótulo não basta. */
  hint?: string
}

/** Campo de texto do padrão do site, com erro e dica opcionais. */
export function AuthField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  inputMode,
  error,
  hint,
}: AuthFieldProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...controlBase,
          border: `1px solid ${error ? colors.statusEmpregado : focused ? colors.tinta : colors.osso}`,
        }}
      />
      <FieldFootnote id={id} error={error} hint={hint} />
    </div>
  )
}

export interface AuthSelectProps<T extends string> {
  label: string
  value: T | ''
  onChange: (value: T) => void
  options: ReadonlyArray<{ value: T; label: string }>
  placeholder?: string
  error?: string
  hint?: string
}

/** Seleção no mesmo desenho do campo de texto. */
export function AuthSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecione',
  error,
  hint,
}: AuthSelectProps<T>) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value as T)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...controlBase,
          cursor: 'pointer',
          border: `1px solid ${error ? colors.statusEmpregado : focused ? colors.tinta : colors.osso}`,
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldFootnote id={id} error={error} hint={hint} />
    </div>
  )
}

function FieldFootnote({
  id,
  error,
  hint,
}: {
  id: string
  error?: string
  hint?: string
}): ReactNode {
  if (error) {
    return (
      <span
        id={`${id}-error`}
        role="alert"
        style={{
          fontFamily: fonts.text,
          fontSize: 12,
          color: colors.statusEmpregado,
          lineHeight: 1.4,
        }}
      >
        {error}
      </span>
    )
  }

  if (hint) {
    return (
      <span
        id={`${id}-hint`}
        style={{ fontFamily: fonts.text, fontSize: 12, color: colors.cinza, lineHeight: 1.4 }}
      >
        {hint}
      </span>
    )
  }

  return null
}
