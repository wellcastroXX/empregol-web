/**
 * Perfil de atleta como vem de `GET /athletes/:id/basic`.
 *
 * É o recorte que a API expõe a qualquer token: traz temporadas e mídia, e
 * deixa de fora CPF, telefone e e-mail — que só existem em `/athletes/:id/full`
 * e que nem o clube precisa ver para avaliar um atleta.
 */

import type { AgencyStatus, Availability } from '@/features/scout/model/scout.types'

export interface SeasonStat {
  id: string
  year: number
  goals: number
  assists: number
  gamesPlayed: number
  minutesPlayed: number
  position: string
  height: number
  weight: number
  dominantFoot: string
  lastClub?: string | null
}

export type MediaType = 'VIDEO' | 'PHOTO' | 'EXTERNAL_LINK'

export interface AthleteMedia {
  id: string
  mediaType: MediaType
  url: string
  title: string
  year: number
  category?: string | null
  subcategory?: string | null
  /** Ex.: "Vitória 2 × 1 ABC · 14/10/2024". */
  gameInfo?: string | null
}

export interface AthleteProfile {
  id: string
  fullName: string
  /** Só na vitrine pública — lá a URL é o slug. */
  slug?: string | null
  /** A rota pública manda a idade pronta, e omite a data de nascimento. */
  age?: number | null
  birthDate?: string | null
  naturalidade?: string | null
  gender?: string | null
  position: string
  positions?: string[]
  dominantFoot: string
  height?: number | null
  weight?: number | null
  level: string
  availability: Availability
  agencyStatus: AgencyStatus
  jerseyNumber?: number | null
  expectedSalary?: string | number | null
  avatarUrl?: string | null
  socialMedia?: string | null
  sportsProfileUrl?: string | null
  additionalInfo?: string | null
  createdAt?: string
  lastClub?: string | null
  goals?: number | null
  assists?: number | null
  gamesThisSeason?: number | null
  minutesPlayed?: number | null
  seasonStats?: SeasonStat[]
  media?: AthleteMedia[]
}
