import lucasSquare from '@/assets/images/athlete-lucas-square.jpg'

import type { ShowcaseAthlete } from '../model/athlete.types'

/**
 * Vitrine de atacantes livres — dados de vitrine da homepage.
 * Placeholder até o endpoint `/athletes/showcase` da empregol-api entrar no ar.
 */
export const VITRINE_ATHLETES: readonly ShowcaseAthlete[] = [
  {
    num: '09',
    name: 'L. Henrique',
    meta: 'ST · 27 · EX-VITÓRIA',
    tag: 'LIVRE',
    tagVar: 'livre',
    photo: lucasSquare,
    attrs: [84, 79, 76, 83, 81, 62],
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
    attrs: [82, 70, 68, 80, 84, 60],
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
    attrs: [72, 88, 81, 74, 70, 79],
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
    attrs: [78, 76, 74, 80, 73, 70],
    overall: 75,
    pos: 'ST',
    formation: '4-3-3',
  },
  {
    num: '19',
    name: 'M. Tavares',
    meta: 'ST · 29 · EX-ABC',
    tag: 'FIM CONTR.',
    tagVar: 'warn',
    attrs: [70, 65, 60, 78, 82, 67],
    overall: 70,
    pos: 'AM',
    formation: '4-2-3-1',
  },
  {
    num: '10',
    name: 'J. Cristian',
    meta: 'ST · 22 · EX-BAHIA',
    tag: 'LIVRE',
    tagVar: 'livre',
    attrs: [68, 84, 86, 70, 65, 72],
    overall: 74,
    pos: 'RW',
    formation: '4-3-3',
  },
]

/** Atleta em destaque da semana. */
export const FEATURED_ATHLETE: ShowcaseAthlete = VITRINE_ATHLETES[0]!
