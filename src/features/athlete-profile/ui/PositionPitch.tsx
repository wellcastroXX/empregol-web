import { colors } from '@/shared/config/theme'

/**
 * Posição do atleta marcada num campo.
 *
 * O kit de design desenha a formação tática (4-4-2); a API não guarda
 * formação, só posições, então o campo mostra o que existe: a principal cheia
 * e as secundárias vazadas.
 *
 * Coordenadas em % do campo visto de cima, ataque para cima.
 */
const SPOT: Record<string, { x: number; y: number }> = {
  GOL: { x: 50, y: 92 },
  ZAG: { x: 50, y: 76 },
  LAD: { x: 84, y: 72 },
  LAE: { x: 16, y: 72 },
  VOL: { x: 50, y: 60 },
  MC: { x: 50, y: 48 },
  MD: { x: 82, y: 48 },
  ME: { x: 18, y: 48 },
  MCO: { x: 50, y: 34 },
  ALA: { x: 84, y: 40 },
  PD: { x: 80, y: 20 },
  PE: { x: 20, y: 20 },
  ATA: { x: 50, y: 18 },
  CA: { x: 50, y: 10 },
}

export interface PositionPitchProps {
  /** Posição principal — o ponto cheio. */
  position: string
  /** Demais posições do atleta, se houver — pontos vazados. */
  others?: readonly string[]
  size?: number
}

export function PositionPitch({ position, others = [], size = 112 }: PositionPitchProps) {
  const main = SPOT[position]
  // Resolve a coordenada já no filtro: `SPOT[p]` depois do filter continuaria
  // opcional para o compilador.
  const secondary = others
    .filter((p) => p !== position)
    .map((code) => ({ code, spot: SPOT[code] }))
    .filter((entry): entry is { code: string; spot: { x: number; y: number } } =>
      Boolean(entry.spot),
    )

  return (
    <svg
      viewBox="0 0 100 150"
      width={size}
      height={size * 1.5}
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <rect x="0" y="0" width="100" height="150" rx="3" fill={colors.creme} />
      <g stroke={colors.ossoRule} strokeWidth="1" fill="none">
        <rect x="3" y="3" width="94" height="144" rx="2" />
        <line x1="3" y1="75" x2="97" y2="75" />
        <circle cx="50" cy="75" r="14" />
        <rect x="26" y="3" width="48" height="20" />
        <rect x="26" y="127" width="48" height="20" />
      </g>

      {secondary.map(({ code, spot }) => (
        <circle
          key={code}
          cx={spot.x}
          cy={(spot.y / 100) * 150}
          r="6"
          fill="none"
          stroke={colors.cinza}
          strokeWidth="1.5"
        />
      ))}

      {main && <circle cx={main.x} cy={(main.y / 100) * 150} r="7.5" fill={colors.gramado} />}
    </svg>
  )
}
