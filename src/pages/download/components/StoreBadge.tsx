import appStoreBadge from '@/assets/images/app-store-badge.svg'
import googlePlayBadge from '@/assets/images/disponivel-google-play-badge.png'

export type Store = 'apple' | 'google'

/**
 * Proporção comum aos dois badges oficiais (540 × 160). Manter idêntica é o que
 * faz os dois alinharem lado a lado sem gambiarra de margem.
 */
const RATIO = 540 / 160

/** Altura padrão — a Apple exige no mínimo 40px de altura para o badge dela. */
const DEFAULT_HEIGHT = 48

const BADGES: Record<Store, { src: string; alt: string }> = {
  apple: { src: appStoreBadge, alt: 'Baixar na App Store' },
  google: { src: googlePlayBadge, alt: 'Disponível no Google Play' },
}

export interface StoreBadgeProps {
  store: Store
  /** Altura em px; a largura sai da proporção oficial, nunca distorce. */
  height?: number
}

/**
 * Badge oficial da loja.
 *
 * Os ativos são usados como vêm da Apple e do Google, sem recolorir nem
 * reconstruir: as diretrizes das duas lojas proíbem alterar o badge, e um
 * badge adulterado é motivo de recusa na revisão.
 */
export function StoreBadge({ store, height = DEFAULT_HEIGHT }: StoreBadgeProps) {
  const badge = BADGES[store]
  const width = Math.round(height * RATIO)

  return (
    <a
      href="#"
      style={{ display: 'inline-block', lineHeight: 0, borderRadius: 8 }}
      aria-label={badge.alt}
    >
      <img
        src={badge.src}
        alt={badge.alt}
        width={width}
        height={height}
        style={{ display: 'block', width, height }}
      />
    </a>
  )
}
