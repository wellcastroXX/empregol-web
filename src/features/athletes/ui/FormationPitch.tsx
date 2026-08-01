import { colors, fonts } from '@/shared/config/theme'

import type { Formation, Position } from '../model/athlete.types'
import { FORMATIONS } from '../model/formations'

export interface FormationPitchProps {
  formation?: Formation
  highlight?: Position
  size?: number
  showLabels?: boolean
  surface?: 'light' | 'dark'
}

/**
 * Campo vertical minimalista com a posição do atleta destacada em gramado.
 * SVG puro, sem dependências. Só a primeira ocorrência da posição é destacada.
 */
export function FormationPitch({
  formation = '4-4-2',
  highlight = 'ST',
  size = 120,
  showLabels = false,
  surface = 'light',
}: FormationPitchProps) {
  const W = 100
  const H = 150
  const h = size * (H / W)
  const dark = surface === 'dark'
  const grass = dark ? colors.tinta : colors.giz
  const line = dark ? colors.ruleDark : colors.osso
  const nodeMuted = dark ? '#4a4a45' : colors.nodeMuted
  const accent = colors.gramado

  const nodes = FORMATIONS[formation] ?? FORMATIONS['4-4-2']
  const highlightIndex = nodes.findIndex((n) => n.id === highlight)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={h}
      style={{ display: 'block' }}
      role="img"
      aria-label={`Formação ${formation}, posição em destaque ${highlight}`}
    >
      <rect x="0" y="0" width={W} height={H} rx="5" fill={grass} stroke={line} strokeWidth="1.2" />
      <line x1="3" y1={H / 2} x2={W - 3} y2={H / 2} stroke={line} strokeWidth="0.8" />
      <circle cx={W / 2} cy={H / 2} r="11" fill="none" stroke={line} strokeWidth="0.8" />
      <circle cx={W / 2} cy={H / 2} r="1.2" fill={line} />
      <rect x="28" y="0" width="44" height="20" fill="none" stroke={line} strokeWidth="0.8" />
      <rect x="40" y="0" width="20" height="8" fill="none" stroke={line} strokeWidth="0.8" />
      <rect x="28" y={H - 20} width="44" height="20" fill="none" stroke={line} strokeWidth="0.8" />
      <rect x="40" y={H - 8} width="20" height="8" fill="none" stroke={line} strokeWidth="0.8" />

      {nodes.map((n, i) => {
        const hi = i === highlightIndex
        return (
          <g key={i}>
            {hi && (
              <circle
                cx={n.x}
                cy={n.y}
                r="8.5"
                fill="none"
                stroke={accent}
                strokeWidth="1.2"
                opacity="0.4"
              />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={hi ? 5 : 3}
              fill={hi ? accent : nodeMuted}
              stroke={hi ? accent : 'none'}
              strokeWidth="1"
            />
            {showLabels && (
              <text
                x={n.x}
                y={n.y + (n.y > H - 24 ? -9 : 13)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily={fonts.mono}
                fontWeight="500"
                fontSize="6"
                letterSpacing="0.5"
                fill={hi ? accent : dark ? colors.cinzaOnDark : colors.cinza}
              >
                {n.id}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
