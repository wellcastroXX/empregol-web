import type { Locale } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/locale-context'

import type { AthleteLevel, DominantFoot, Gender } from './auth.types'

export interface Option<T extends string> {
  value: T
  label: string
}

/**
 * Posições em campo. A API recebe a sigla curta (`value`), então é ela que vai
 * no payload — o rótulo longo é só para o formulário.
 */
const POSITION_VALUES = [
  'GOL',
  'ZAG',
  'LAD',
  'LAE',
  'VOL',
  'MC',
  'ME',
  'MD',
  'MCO',
  'ALA',
  'ATA',
  'PD',
  'PE',
  'CA',
] as const

export type Position = (typeof POSITION_VALUES)[number]

interface OptionLabels {
  positions: Record<Position, string>
  dominantFeet: Record<DominantFoot, string>
  levels: Record<AthleteLevel, string>
  genders: Record<Gender, string>
}

const LABELS: Record<Locale, OptionLabels> = {
  pt: {
    positions: {
      GOL: 'Goleiro',
      ZAG: 'Zagueiro',
      LAD: 'Lateral direito',
      LAE: 'Lateral esquerdo',
      VOL: 'Volante',
      MC: 'Meia central',
      ME: 'Meia esquerda',
      MD: 'Meia direita',
      MCO: 'Meia ofensivo',
      ALA: 'Ala',
      ATA: 'Atacante',
      PD: 'Ponta direita',
      PE: 'Ponta esquerda',
      CA: 'Centroavante',
    },
    dominantFeet: { RIGHT: 'Direito', LEFT: 'Esquerdo', BOTH: 'Ambidestro' },
    levels: { PROFESSIONAL: 'Profissional', AMATEUR: 'Amador', YOUTH: 'Base' },
    genders: { MALE: 'Masculino', FEMALE: 'Feminino', OTHER: 'Outro / Prefiro não informar' },
  },
  en: {
    positions: {
      GOL: 'Goalkeeper',
      ZAG: 'Centre-back',
      LAD: 'Right-back',
      LAE: 'Left-back',
      VOL: 'Defensive midfielder',
      MC: 'Central midfielder',
      ME: 'Left midfielder',
      MD: 'Right midfielder',
      MCO: 'Attacking midfielder',
      ALA: 'Wing-back',
      ATA: 'Forward',
      PD: 'Right winger',
      PE: 'Left winger',
      CA: 'Striker',
    },
    dominantFeet: { RIGHT: 'Right', LEFT: 'Left', BOTH: 'Both feet' },
    levels: { PROFESSIONAL: 'Professional', AMATEUR: 'Amateur', YOUTH: 'Youth' },
    genders: { MALE: 'Male', FEMALE: 'Female', OTHER: 'Other / Prefer not to say' },
  },
  es: {
    positions: {
      GOL: 'Portero',
      ZAG: 'Defensa central',
      LAD: 'Lateral derecho',
      LAE: 'Lateral izquierdo',
      VOL: 'Mediocentro defensivo',
      MC: 'Mediocentro',
      ME: 'Volante izquierdo',
      MD: 'Volante derecho',
      MCO: 'Mediapunta',
      ALA: 'Carrilero',
      ATA: 'Delantero',
      PD: 'Extremo derecho',
      PE: 'Extremo izquierdo',
      CA: 'Centrodelantero',
    },
    dominantFeet: { RIGHT: 'Derecho', LEFT: 'Izquierdo', BOTH: 'Ambidiestro' },
    levels: { PROFESSIONAL: 'Profesional', AMATEUR: 'Amateur', YOUTH: 'Juveniles' },
    genders: { MALE: 'Masculino', FEMALE: 'Femenino', OTHER: 'Otro / Prefiero no decirlo' },
  },
}

function toOptions<T extends string>(labels: Record<T, string>): ReadonlyArray<Option<T>> {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

export interface FormOptions {
  positions: ReadonlyArray<Option<Position>>
  dominantFeet: ReadonlyArray<Option<DominantFoot>>
  levels: ReadonlyArray<Option<AthleteLevel>>
  genders: ReadonlyArray<Option<Gender>>
}

/** Listas de opção do cadastro e do perfil, com os rótulos no idioma atual. */
export function useFormOptions(): FormOptions {
  const labels = LABELS[useLocale().locale]
  return {
    // A ordem das posições segue o campo (do gol ao ataque), não a do objeto.
    positions: POSITION_VALUES.map((value) => ({ value, label: labels.positions[value] })),
    dominantFeet: toOptions(labels.dominantFeet),
    levels: toOptions(labels.levels),
    genders: toOptions(labels.genders),
  }
}
