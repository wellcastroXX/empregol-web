import type { ReactNode } from 'react'

import { colors, fonts } from '@/shared/config/theme'

export interface EyebrowProps {
  children: ReactNode
  /** `dark` para superfície escura, onde o cinza padrão não teria contraste. */
  surface?: 'light' | 'dark'
  size?: number
  color?: string
  style?: React.CSSProperties
}

/**
 * Rótulo de seção em mono caixa-alta — o marcador que abre cada bloco no site.
 * O espaçamento entre letras vem do texto (`E X E M P L O`), como no design.
 */
export function Eyebrow({ children, surface = 'light', size = 11, color, style }: EyebrowProps) {
  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: size,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: color ?? (surface === 'dark' ? colors.cinzaOnDark : colors.cinza),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
