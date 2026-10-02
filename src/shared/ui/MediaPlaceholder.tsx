import { colors } from '@/shared/config/theme'

export interface MediaPlaceholderProps {
  /** Proporção do bloco, no formato CSS `aspect-ratio` (ex.: '4 / 5'). */
  ratio?: string
  /** Descreve a imagem que vai entrar aqui — some quando a foto real chegar. */
  label?: string
  /** Altura fixa, quando o bloco precisa acompanhar a coluna ao lado. */
  height?: number | string
  surface?: 'light' | 'dark'
  /* URL/PATCH da imagem que será exibida */
  src?: string

  /* Texto alternativo da imagem. */
  alt?: string

  /* Como a imagem deve se comportar dentro do bloco */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
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
  objectFit = 'cover',
  src,
  alt,
}: MediaPlaceholderProps) {
  const dark = surface === 'dark'

  return (
     <div
      role={src ? undefined : 'img'}
      aria-label={
        src
          ? undefined
          : label
            ? `Espaço reservado para imagem: ${label}`
            : 'Espaço reservado para imagem'
      }
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
        overflow: 'hidden',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? label ?? ''}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit,
          }}
        />
      ) : (
        <span
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
