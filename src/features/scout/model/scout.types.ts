/** Tipos da área logada de contratante, espelhando as respostas da empregol-api. */

export type Availability = 'FREE' | 'EMPLOYED'
export type AgencyStatus = 'REPRESENTED' | 'UNREPRESENTED'

/** Atleta como vem de `/explore/athletes` e `/favorites` (CARD_SELECT + enrich). */
export interface AthleteCard {
  id: string
  fullName: string
  position: string
  dominantFoot: string
  level: string
  availability: Availability
  agencyStatus: AgencyStatus
  gender?: string | null
  height?: number | null
  weight?: number | null
  birthDate?: string | null
  /** Calculado no servidor a partir de birthDate. */
  age?: number | null
  avatarUrl?: string | null
  jerseyNumber?: number | null
  state?: string | null
  city?: string | null
  lastClub?: string | null
  goals?: number | null
  assists?: number | null
  gamesThisSeason?: number | null
  minutesPlayed?: number | null
  expectedSalary?: string | number | null
  /** Só vem preenchido quando quem busca é um contratante. */
  isFavorited?: boolean
}

export interface ExploreResult {
  athletes: AthleteCard[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/** Filtros aceitos por `/explore/athletes`. Campos vazios não são enviados. */
export interface ExploreFilters {
  q?: string
  /** Siglas de posição; viram lista separada por vírgula na query. */
  positions?: string[]
  level?: string
  dominantFoot?: string
  availability?: Availability
  agencyStatus?: AgencyStatus
  ageMin?: number
  ageMax?: number
  page?: number
  limit?: number
}

export interface ConversationPeerContractor {
  id: string
  name: string
  type: 'AGENT' | 'CLUB'
  companyName?: string | null
  avatarUrl?: string | null
}

export interface ConversationPeerAthlete {
  id: string
  fullName: string
  position: string
  avatarUrl?: string | null
  jerseyNumber?: number | null
}

export interface Conversation {
  id: string
  lastMessageAt?: string | null
  lastMessagePreview?: string | null
  athleteUnreadCount: number
  contractorUnreadCount: number
  contractor?: ConversationPeerContractor
  athlete?: ConversationPeerAthlete
}

export interface Message {
  id: string
  conversationId: string
  senderUserId: string
  type: 'TEXT' | 'AUDIO' | 'INVITE_CARD'
  content: string | null
  audioUrl: string | null
  proposalId: string | null
  readAt: string | null
  createdAt: string
}

/** Perfil do contratante logado, de `/contractors/me`. */
export interface ContractorProfile {
  id: string
  type: 'AGENT' | 'CLUB'
  name: string
  phone: string
  cpf?: string | null
  cnpj?: string | null
  companyName?: string | null
  socialMedia?: string | null
  additionalInfo?: string | null
  avatarUrl?: string | null
  createdAt?: string
}
