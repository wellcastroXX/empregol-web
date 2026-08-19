import { useId, useState } from 'react'

import { colors, fonts } from '@/shared/config/theme'

export interface AuthFieldProps {
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
}

/** Campo de formulário no padrão do site: rótulo em mono caixa-alta sobre giz. */
export function AuthField({ label, placeholder, type = 'text', autoComplete }: AuthFieldProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: colors.tinta,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          appearance: 'none',
          width: '100%',
          background: colors.giz,
          // Foco via estado do React, não mutando o DOM na mão como no protótipo.
          border: `1px solid ${focused ? colors.tinta : colors.osso}`,
          borderRadius: 4,
          padding: '14px',
          fontFamily: fonts.text,
          fontSize: 15,
          color: colors.tinta,
          outline: 'none',
          transition: 'border-color 160ms ease',
        }}
      />
    </div>
  )
}
