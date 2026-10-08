import { apiRequest, type ApiEnvelope } from '@/shared/lib/http/api-client'

import type { AthleteDashboard } from '../model/athlete-dashboard.types'

/** Recorte de `/athletes/me` que a vitrine pública usa. */
export interface AthleteShowcase {
  publicProfile: boolean
  slug?: string | null
  birthDate?: string | null
}

export const athleteDashboardApi = {
  /** Painel do atleta. Só ATHLETE tem acesso (authorize no backend). */
  getDashboard() {
    return apiRequest<ApiEnvelope<AthleteDashboard>>('/dashboard/athlete').then((r) => r.data)
  },

  getMyProfile() {
    return apiRequest<ApiEnvelope<AthleteShowcase>>('/athletes/me').then((r) => r.data)
  },

  /**
   * Abre ou fecha a vitrine pública. O slug nasce no servidor na primeira vez
   * que abre; menor de 18 recebe 403 com a explicação.
   */
  setPublicProfile(publicProfile: boolean) {
    return apiRequest<ApiEnvelope<AthleteShowcase>>('/athletes/me', {
      method: 'PUT',
      body: { publicProfile },
    }).then((r) => r.data)
  },
}
