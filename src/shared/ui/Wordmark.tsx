import wordmarkCream from '@/assets/images/empregol-wordmark-cream.svg'
import wordmarkDark from '@/assets/images/empregol-wordmark.svg'

/** Proporção do viewBox do SVG (692 × 130.59). */
const RATIO = 692 / 130.59

export type WordmarkVariant = 'dark' | 'cream'

export interface WordmarkProps {
  /** `cream` sobre superfície escura, `dark` sobre clara. */
  variant: WordmarkVariant
  /** Altura em px; a largura é derivada da proporção para não distorcer. */
  height?: number
  /** Marca como decorativo — use quando um rótulo acessível já existe em volta. */
  decorative?: boolean
  style?: React.CSSProperties
}

/** Logotipo oficial da Empregol. Sempre com width/height para não saltar layout. */
export function Wordmark({ variant, height = 22, decorative = false, style }: WordmarkProps) {
  const width = Math.round(height * RATIO)

  return (
    <img
      src={variant === 'cream' ? wordmarkCream : wordmarkDark}
      alt={decorative ? '' : 'Empregol'}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      style={{ display: 'block', ...style }}
    />
  )
}
