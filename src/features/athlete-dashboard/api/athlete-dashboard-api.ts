import { apiRequest, type ApiEnvelope } from '@/shared/lib/http/api-client'

import type { AthleteDashboard } from '../model/athlete-dashboard.types'

export const athleteDashboardApi = {
  /** Painel do atleta. Só ATHLETE tem acesso (authorize no backend). */
  getDashboard() {
    return apiRequest<ApiEnvelope<AthleteDashboard>>('/dashboard/athlete').then((r) => r.data)
  },
}
