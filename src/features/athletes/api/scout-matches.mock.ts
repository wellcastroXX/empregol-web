import type { Formation, Position, StatusVariant } from '../model/athlete.types'

export interface ScoutMatch {
  num: string
  name: string
  meta: string
  tag: string
  tagVar: StatusVariant
  /** Gols na última temporada. */
  gols: string
  overall: number
  pos: Position
  formation: Formation
}

/**
 * Atletas que batem com os filtros salvos do scout.
 * Placeholder até `/scout/matches` da empregol-api entrar no ar.
 */
export const SCOUT_MATCHES: readonly ScoutMatch[] = [
  {
    num: '09',
    name: 'L. Henrique',
    meta: 'ST · 27 · EX-VITÓRIA',
    tag: 'LIVRE',
    tagVar: 'livre',
    gols: '14',
    overall: 78,
    pos: 'ST',
    formation: '4-4-2',
  },
  {
    num: '23',
    name: 'R. Pinheiro',
    meta: 'ST · 31 · EX-CORITIBA',
    tag: 'LIVRE',
    tagVar: 'livre',
    gols: '21',
    overall: 74,
    pos: 'ST',
    formation: '4-4-2',
  },
  {
    num: '11',
    name: 'D. Castro',
    meta: 'ST · 23 · EX-ATHLETICO',
    tag: 'EMPRÉSTIMO',
    tagVar: 'ink',
    gols: '9',
    overall: 77,
    pos: 'LW',
    formation: '4-3-3',
  },
  {
    num: '07',
    name: 'F. Borges',
    meta: 'ST · 25 · EX-TOMBENSE',
    tag: 'LIVRE',
    tagVar: 'livre',
    gols: '11',
    overall: 75,
    pos: 'ST',
    formation: '4-3-3',
  },
]

export interface SavedSearch {
  name: string
  count: string
  badge?: string
}

export const SAVED_SEARCHES: readonly SavedSearch[] = [
  { name: 'ST jovem livre', count: '43 atletas', badge: '+5 novos' },
  { name: 'Zagueiro canhoto', count: '18 atletas', badge: '+1 novo' },
  { name: 'Goleiro sub-23', count: '9 atletas' },
]

export type ActivityTone = 'accent' | 'ink' | 'muted'

export interface ActivityItem {
  who: string
  what: string
  time: string
  tone: ActivityTone
}

export const RECENT_ACTIVITY: readonly ActivityItem[] = [
  { who: 'L. Henrique', what: 'aceitou teu convite de teste', time: '2h', tone: 'accent' },
  { who: 'R. Pacheco', what: 'respondeu sobre proposta', time: '5h', tone: 'ink' },
  { who: 'D. Castro', what: 'adicionado à shortlist', time: '1d', tone: 'muted' },
  { who: 'Operário-PR', what: 'também viu L. Henrique', time: '2d', tone: 'muted' },
]
