import type { AthleteLevel, DominantFoot, Gender } from './auth.types'

export interface Option<T extends string> {
  value: T
  label: string
}

/**
 * Posições em campo. A API recebe a sigla curta (`short`), então é ela que vai
 * no payload — o rótulo longo é só para o formulário.
 */
export const POSITIONS = [
  { value: 'GOL', label: 'Goleiro' },
  { value: 'ZAG', label: 'Zagueiro' },
  { value: 'LAD', label: 'Lateral direito' },
  { value: 'LAE', label: 'Lateral esquerdo' },
  { value: 'VOL', label: 'Volante' },
  { value: 'MC', label: 'Meia central' },
  { value: 'ME', label: 'Meia esquerda' },
  { value: 'MD', label: 'Meia direita' },
  { value: 'MCO', label: 'Meia ofensivo' },
  { value: 'ALA', label: 'Ala' },
  { value: 'ATA', label: 'Atacante' },
  { value: 'PD', label: 'Ponta direita' },
  { value: 'PE', label: 'Ponta esquerda' },
  { value: 'CA', label: 'Centroavante' },
] as const satisfies ReadonlyArray<Option<string>>

export const DOMINANT_FEET: ReadonlyArray<Option<DominantFoot>> = [
  { value: 'RIGHT', label: 'Direito' },
  { value: 'LEFT', label: 'Esquerdo' },
  { value: 'BOTH', label: 'Ambidestro' },
]

export const LEVELS: ReadonlyArray<Option<AthleteLevel>> = [
  { value: 'PROFESSIONAL', label: 'Profissional' },
  { value: 'AMATEUR', label: 'Amador' },
  { value: 'YOUTH', label: 'Base' },
]

export const GENDERS: ReadonlyArray<Option<Gender>> = [
  { value: 'MALE', label: 'Masculino' },
  { value: 'FEMALE', label: 'Feminino' },
]
