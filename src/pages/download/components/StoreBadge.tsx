import { colors, fonts } from '@/shared/config/theme'

export type Store = 'apple' | 'google'

export interface StoreBadgeProps {
  store: Store
  /** Invertido: pílula escura sobre superfície clara. */
  light?: boolean
  /** Sobre a faixa gramado do fechamento. */
  onGreen?: boolean
}

/**
 * Selo de loja tipográfico. Desenhado com a marca da Empregol em vez dos
 * badges oficiais da Apple/Google — os ativos das lojas têm regras próprias de
 * uso e não podem ser recoloridos para a paleta do site.
 */
export function StoreBadge({ store, light, onGreen }: StoreBadgeProps) {
  const isApple = store === 'apple'
  const inverted = Boolean(light || onGreen)

  const background = inverted ? colors.tinta : colors.giz
  const foreground = inverted ? colors.giz : colors.tinta
  const subtle = inverted ? colors.giz64 : colors.cinza

  return (
    <a
      href="#"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        background,
        color: foreground,
        textDecoration: 'none',
        padding: '13px 20px 13px 16px',
        borderRadius: 8,
        border: `1px solid ${inverted ? colors.tinta : colors.osso}`,
      }}
    >
      {isApple ? (
        <svg width="22" height="26" viewBox="0 0 22 26" fill={foreground} aria-hidden="true">
          <path d="M18.1 13.8c0-3.3 2.7-4.9 2.8-5-1.5-2.2-3.9-2.5-4.7-2.6-2-.2-3.9 1.2-4.9 1.2-1 0-2.6-1.1-4.2-1.1C4.9 6.4 2.7 8 1.5 10.4c-2.4 4.2-.6 10.4 1.7 13.8 1.1 1.7 2.5 3.5 4.3 3.4 1.7-.1 2.3-1.1 4.4-1.1 2 0 2.6 1.1 4.3 1 1.8 0 3.1-1.6 4.2-3.3.8-1.1 1.1-1.7 1.7-3-3.1-1.2-4-4.6-4-7.4z" />
          <path d="M15.3 4.3C16.2 3.2 16.8 1.7 16.6.2c-1.3.1-2.9.9-3.9 2-.8.9-1.6 2.4-1.4 3.9 1.5.1 3-.7 4-1.8z" />
        </svg>
      ) : (
        <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true">
          <path
            d="M1.3 1.1C1.1 1.4 1 1.8 1 2.4v19.2c0 .6.1 1 .3 1.3l10.2-11.4L1.3 1.1z"
            fill={foreground}
            opacity="0.9"
          />
          <path
            d="M15.2 7.5L11.5 11.5 1.3 1.1c.1-.1.2-.2.3-.2.5-.3 1.1-.2 1.8.2l11.8 6.4z"
            fill={foreground}
            opacity="0.65"
          />
          <path
            d="M15.2 15.5L3.4 22c-.7.4-1.3.4-1.8.1-.1 0-.2-.1-.3-.2l10.2-11.4 3.7 5z"
            fill={foreground}
            opacity="0.75"
          />
          <path
            d="M20.4 10.6c.8.4 1.2 1 1.2 1.6 0 .6-.4 1.2-1.2 1.6l-5.2 2.8-3.7-5 3.7-5 5.2 3z"
            fill={foreground}
          />
        </svg>
      )}
      <span>
        <span
          style={{
            display: 'block',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: subtle,
          }}
        >
          {isApple ? 'Baixar na' : 'Disponível no'}
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: '-0.01em',
            marginTop: 2,
          }}
        >
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </a>
  )
}
