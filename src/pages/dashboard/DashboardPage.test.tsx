import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { scoutApi } from '@/features/scout/api/scout-api'
import type { AthleteCard, Conversation } from '@/features/scout/model/scout.types'
import { renderWithProviders, testUser } from '@/test/render-with-providers'

import DashboardPage from './DashboardPage'

vi.mock('@/features/scout/api/scout-api', () => ({
  scoutApi: {
    exploreAthletes: vi.fn(),
    listFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
    listConversations: vi.fn(),
    openConversation: vi.fn(),
    listMessages: vi.fn(),
    sendMessage: vi.fn(),
    markConversationRead: vi.fn(),
    myProfile: vi.fn(),
  },
}))

const athlete: AthleteCard = {
  id: 'ath-1',
  fullName: 'Lucas Henrique',
  position: 'ATA',
  dominantFoot: 'RIGHT',
  level: 'PROFESSIONAL',
  availability: 'FREE',
  agencyStatus: 'UNREPRESENTED',
  age: 27,
  lastClub: 'Vitória',
  jerseyNumber: 9,
  isFavorited: false,
}

const conversation: Conversation = {
  id: 'conv-1',
  lastMessageAt: '2026-05-24T12:00:00.000Z',
  lastMessagePreview: 'Bom dia',
  athleteUnreadCount: 0,
  contractorUnreadCount: 2,
  athlete: { id: 'ath-1', fullName: 'Lucas Henrique', position: 'ATA' },
}

function renderDashboard() {
  return renderWithProviders(<DashboardPage />, { user: testUser })
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(scoutApi.exploreAthletes).mockResolvedValue({
    athletes: [athlete],
    total: 43,
    page: 1,
    limit: 6,
    totalPages: 8,
  })
  vi.mocked(scoutApi.listFavorites).mockResolvedValue([])
  vi.mocked(scoutApi.listConversations).mockResolvedValue([conversation])
})

describe('DashboardPage', () => {
  it('saúda o usuário logado pelo primeiro nome', () => {
    renderDashboard()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bom te ver, Marina')
  })

  it('mostra a conta autenticada na barra lateral', () => {
    renderDashboard()

    expect(screen.getByText('Marina Soares')).toBeInTheDocument()
    expect(screen.getByText('CLUBE')).toBeInTheDocument()
    expect(screen.getByText(testUser.email)).toBeInTheDocument()
    expect(screen.getByText('MS')).toBeInTheDocument()
  })

  it('alimenta os KPIs com dados da API, sem mock', async () => {
    renderDashboard()

    // total vindo do explore, conversas e não lidas vindo de /conversations
    await waitFor(() => expect(screen.getByText('43')).toBeInTheDocument())
    expect(screen.getByText('atletas na vitrine')).toBeInTheDocument()
    expect(screen.getByText('não lidas')).toBeInTheDocument()
    expect(scoutApi.exploreAthletes).toHaveBeenCalled()
    expect(scoutApi.listConversations).toHaveBeenCalled()
  })

  it('lista os atletas que a API devolveu', async () => {
    renderDashboard()

    expect(await screen.findByText('Lucas Henrique')).toBeInTheDocument()
    expect(screen.getByText(/ATA · 27 anos · Vitória/)).toBeInTheDocument()
  })

  it('troca de seção e busca os dados daquela seção', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: /SHORTLIST/ }))

    await waitFor(() => expect(scoutApi.listFavorites).toHaveBeenCalled())
    expect(await screen.findByText('Shortlist vazia')).toBeInTheDocument()
  })

  it('deixa explícito que buscas salvas ainda não existe, em vez de inventar dado', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: /BUSCAS SALVAS/ }))

    expect(await screen.findByText(/Buscas salvas — em breve/)).toBeInTheDocument()
  })

  it('retrai e expande a barra lateral', async () => {
    const user = userEvent.setup()
    renderDashboard()

    expect(screen.getByRole('button', { name: 'Retrair menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await user.click(screen.getByRole('button', { name: 'Retrair menu' }))

    const expand = screen.getByRole('button', { name: 'Expandir menu' })
    expect(expand).toHaveAttribute('aria-expanded', 'false')
    // Retraída, a barra esconde os rótulos e mantém só os ícones.
    expect(screen.queryByText('Marina Soares')).not.toBeInTheDocument()

    await user.click(expand)
    expect(screen.getByText('Marina Soares')).toBeInTheDocument()
  })

  it('oferece sair da conta', async () => {
    const user = userEvent.setup()
    renderDashboard()

    expect(globalThis.localStorage.getItem('empregol.auth')).not.toBeNull()

    await user.click(screen.getByRole('button', { name: 'Sair' }))

    expect(globalThis.localStorage.getItem('empregol.auth')).toBeNull()
  })

  it('mostra o erro da API quando a busca falha', async () => {
    vi.mocked(scoutApi.exploreAthletes).mockRejectedValue(new Error('API fora do ar'))
    renderDashboard()

    expect(await screen.findByText('API fora do ar')).toBeInTheDocument()
  })
})
