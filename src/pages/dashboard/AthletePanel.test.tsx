import { screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { athleteDashboardApi } from '@/features/athlete-dashboard/api/athlete-dashboard-api'
import { scoutApi } from '@/features/scout/api/scout-api'
import type { AuthUser } from '@/features/auth/model/auth.types'
import { renderWithProviders } from '@/test/render-with-providers'

import DashboardPage from './DashboardPage'

vi.mock('@/features/athlete-dashboard/api/athlete-dashboard-api', () => ({
  athleteDashboardApi: { getDashboard: vi.fn() },
}))
vi.mock('@/features/scout/api/scout-api', () => ({
  scoutApi: {
    exploreAthletes: vi.fn(),
    listFavorites: vi.fn(),
    listConversations: vi.fn(),
    myProfile: vi.fn(),
    toggleFavorite: vi.fn(),
    openConversation: vi.fn(),
    listMessages: vi.fn(),
    sendMessage: vi.fn(),
    markConversationRead: vi.fn(),
  },
}))

const athlete: AuthUser = {
  id: 'a1',
  email: 's7v7nsports@gmail.com',
  role: 'athlete',
  nome: 'Wellington Castro',
  emailVerificado: true,
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(athleteDashboardApi.getDashboard).mockResolvedValue({
    stats: { viewsToday: 3, viewsThisWeek: 12, pendingProposals: 1, daysOnPlatform: 40 },
    latestProposal: {
      id: 'p1',
      status: 'PENDING',
      message: 'Temos interesse',
      contractor: { id: 'c1', name: 'São Paulo FC', type: 'CLUB', companyName: 'São Paulo FC' },
    },
    recentClubs: [],
    whoViewedToday: [
      {
        id: 'v1',
        viewedAt: '2026-09-11T12:00:00Z',
        contractor: { id: 'c1', name: 'São Paulo FC', type: 'CLUB' },
      },
    ],
  })
})

describe('Painel do atleta', () => {
  it('mostra o dashboard do atleta, não o painel de scout', async () => {
    renderWithProviders(<DashboardPage />, { user: athlete })

    expect(await screen.findByText('viram hoje')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Olá, Wellington')
    // Números e convite vindos de /dashboard/athlete.
    expect(screen.getAllByText('São Paulo FC').length).toBeGreaterThan(0)
  })

  it('não chama nenhuma rota exclusiva de contratante (evita o 403)', async () => {
    renderWithProviders(<DashboardPage />, { user: athlete })

    await waitFor(() => expect(athleteDashboardApi.getDashboard).toHaveBeenCalled())

    expect(scoutApi.exploreAthletes).not.toHaveBeenCalled()
    expect(scoutApi.listFavorites).not.toHaveBeenCalled()
    expect(scoutApi.myProfile).not.toHaveBeenCalled()
  })
})
