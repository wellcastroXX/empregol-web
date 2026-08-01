import type { AttributeSet } from './athlete.types'

/** Rótulos curtos — cards e mini gráficos. */
export const ATTRS_LABELS = ['FINAL.', 'VEL.', 'DRIB.', 'POS.', 'FÍS.', 'PASS.'] as const

/** Rótulos completos — showcase e perfil. */
export const ATTRS_LABELS_FULL = [
  'FINALIZAÇÃO',
  'VELOCIDADE',
  'DRIBLE',
  'POSICIONAMENTO',
  'FÍSICO',
  'PASSE',
] as const

/** Média da Série B para atacantes — baseline de comparação. */
export const RADAR_COMPARE_ST: AttributeSet = [71, 73, 70, 72, 74, 65]

export function averageOf(attrs: AttributeSet): number {
  return Math.round(attrs.reduce((sum, v) => sum + v, 0) / attrs.length)
}
