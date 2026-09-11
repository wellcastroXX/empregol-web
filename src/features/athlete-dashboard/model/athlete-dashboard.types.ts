/** Resposta de GET /dashboard/athlete — espelha o AthleteDashboard do app. */

export interface ContractorBrief {
  id: string
  name: string
  type: 'AGENT' | 'CLUB'
  companyName?: string | null
  avatarUrl?: string | null
}

export interface AthleteDashboard {
  stats: {
    viewsToday: number
    viewsThisWeek: number
    pendingProposals: number
    daysOnPlatform: number
  }
  latestProposal: {
    id: string
    status: string
    message?: string | null
    scheduledAt?: string | null
    contractor: ContractorBrief
  } | null
  recentClubs: {
    id: string
    name: string
    companyName?: string | null
    avatarUrl?: string | null
    user?: { createdAt: string }
  }[]
  whoViewedToday: {
    id: string
    viewedAt: string
    contractor: ContractorBrief
  }[]
}
