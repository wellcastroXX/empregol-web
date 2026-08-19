import { colors, fonts } from '@/shared/config/theme'

export interface MediaPlaceholderProps {
  /** Proporção do bloco, no formato CSS `aspect-ratio` (ex.: '4 / 5'). */
  ratio?: string
  /** Descreve a imagem que vai entrar aqui — some quando a foto real chegar. */
  label?: string
  /** Altura fixa, quando o bloco precisa acompanhar a coluna ao lado. */
  height?: number | string
  surface?: 'light' | 'dark'
}

/**
 * Reserva de imagem. Fica cinza de propósito enquanto a direção de arte não
 * entrega as fotos — o layout já nasce no lugar certo e a troca é só pelo
 * <img> depois.
 */
export function MediaPlaceholder({
  ratio = '4 / 3',
  label,
  height,
  surface = 'light',
}: MediaPlaceholderProps) {
  const dark = surface === 'dark'

  return (
    <div
      role="img"
      aria-label={label ? `Espaço reservado para imagem: ${label}` : 'Espaço reservado para imagem'}
      style={{
        width: '100%',
        aspectRatio: height ? undefined : ratio,
        height,
        background: dark ? colors.tintaElev : '#D9D4C7',
        border: `1px solid ${dark ? colors.ruleDark : colors.osso}`,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        overflow: 'hidden',
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: dark ? colors.cinzaOnDark : colors.cinza,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
