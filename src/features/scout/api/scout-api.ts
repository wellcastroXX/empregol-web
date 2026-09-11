import { apiRequest, type ApiEnvelope } from '@/shared/lib/http/api-client'

import type {
  AthleteCard,
  Conversation,
  ContractorProfile,
  ExploreFilters,
  ExploreResult,
  Message,
} from '../model/scout.types'

/** Monta a query string ignorando campos vazios, que a API rejeitaria. */
function toQuery(filters: ExploreFilters): string {
  const params = new URLSearchParams()

  if (filters.q?.trim()) params.set('q', filters.q.trim())
  if (filters.positions?.length) params.set('positions', filters.positions.join(','))
  if (filters.level) params.set('level', filters.level)
  if (filters.dominantFoot) params.set('dominantFoot', filters.dominantFoot)
  if (filters.availability) params.set('availability', filters.availability)
  if (filters.agencyStatus) params.set('agencyStatus', filters.agencyStatus)
  if (filters.ageMin != null) params.set('ageMin', String(filters.ageMin))
  if (filters.ageMax != null) params.set('ageMax', String(filters.ageMax))
  if (filters.page != null) params.set('page', String(filters.page))
  if (filters.limit != null) params.set('limit', String(filters.limit))

  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export const scoutApi = {
  /** Busca de atletas. Só contratante (AGENT/CLUB) tem acesso. */
  exploreAthletes(filters: ExploreFilters = {}) {
    return apiRequest<ApiEnvelope<ExploreResult>>(`/explore/athletes${toQuery(filters)}`).then(
      (r) => r.data,
    )
  },

  /** Shortlist do contratante. */
  listFavorites() {
    return apiRequest<ApiEnvelope<AthleteCard[]>>('/favorites').then((r) => r.data)
  },

  /** Adiciona ou remove da shortlist — o mesmo endpoint faz os dois. */
  toggleFavorite(athleteId: string) {
    return apiRequest<ApiEnvelope<{ favorited?: boolean }>>(`/favorites/${athleteId}`, {
      method: 'POST',
    }).then((r) => r.data)
  },

  listConversations() {
    return apiRequest<ApiEnvelope<Conversation[]>>('/conversations').then((r) => r.data)
  },

  /** Abre (ou recupera) a conversa com um atleta. */
  openConversation(athleteId: string) {
    return apiRequest<ApiEnvelope<Conversation>>('/conversations', {
      method: 'POST',
      body: { athleteId },
    }).then((r) => r.data)
  },

  listMessages(conversationId: string) {
    return apiRequest<ApiEnvelope<Message[]>>(`/conversations/${conversationId}/messages`).then(
      (r) => r.data,
    )
  },

  sendMessage(conversationId: string, content: string) {
    return apiRequest<ApiEnvelope<{ message: Message }>>(
      `/conversations/${conversationId}/messages`,
      { method: 'POST', body: { type: 'TEXT', content } },
    ).then((r) => r.data.message)
  },

  markConversationRead(conversationId: string) {
    return apiRequest<ApiEnvelope<unknown>>(`/conversations/${conversationId}/read`, {
      method: 'PATCH',
    })
  },

  myProfile() {
    return apiRequest<ApiEnvelope<ContractorProfile>>('/contractors/me').then((r) => r.data)
  },
}
