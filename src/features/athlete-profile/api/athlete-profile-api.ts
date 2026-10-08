import { apiRequest, type ApiEnvelope } from '@/shared/lib/http/api-client'

import type { AthleteProfile } from '../model/athlete-profile.types'

export const athleteProfileApi = {
  /**
   * Perfil de um atleta. Exige token — a API não tem rota pública ainda.
   * Contratante que abre o perfil registra uma visualização no servidor.
   */
  getById(athleteId: string) {
    return apiRequest<ApiEnvelope<AthleteProfile>>(`/athletes/${athleteId}/basic`).then(
      (r) => r.data,
    )
  },

  /**
   * Vitrine pública por slug — a única rota de atleta que dispensa token.
   * Responde 404 quando o atleta não abriu a vitrine, então não há como
   * distinguir perfil fechado de slug inexistente. É de propósito.
   */
  getPublicBySlug(slug: string) {
    return apiRequest<ApiEnvelope<AthleteProfile>>(
      `/public/athletes/${encodeURIComponent(slug)}`,
    ).then((r) => r.data)
  },
}
