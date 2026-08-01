export type Position =
  'GK' | 'LB' | 'CB' | 'RB' | 'LM' | 'CM' | 'RM' | 'DM' | 'AM' | 'LW' | 'RW' | 'ST'

export type Formation = '4-4-2' | '4-3-3' | '4-2-3-1' | '3-5-2'

/** Variante visual da tag de status exibida no card da vitrine. */
export type StatusVariant = 'livre' | 'ink' | 'warn'

/** Atributos na ordem: finalização, velocidade, drible, posicionamento, físico, passe. */
export type AttributeSet = readonly [number, number, number, number, number, number]

export interface ShowcaseAthlete {
  /** Número da camisa, com zero à esquerda ("09"). */
  num: string
  name: string
  /** Linha de metadados: "ST · 27 · EX-VITÓRIA". */
  meta: string
  tag: string
  tagVar: StatusVariant
  photo?: string
  attrs: AttributeSet
  overall: number
  pos: Position
  formation: Formation
}
