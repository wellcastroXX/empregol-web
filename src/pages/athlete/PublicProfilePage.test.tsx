import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type * as RouterDom from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { athleteProfileApi } from '@/features/athlete-profile/api/athlete-profile-api'
import type { AthleteProfile } from '@/features/athlete-profile/model/athlete-profile.types'
import type { AuthUser } from '@/features/auth/model/auth.types'
import { scoutApi } from '@/features/scout/api/scout-api'
import { ApiError } from '@/shared/lib/http/api-client'
import { renderWithProviders, testUser } from '@/test/render-with-providers'

import PublicProfilePage from './PublicProfilePage'

type RouterModule = typeof RouterDom

vi.mock('@/features/athlete-profile/api/athlete-profile-api', () => ({
  athleteProfileApi: { getById: vi.fn(), getPublicBySlug: vi.fn() },
}))
vi.mock('@/features/scout/api/scout-api', () => ({
  scoutApi: { openConversation: vi.fn(), listFavorites: vi.fn(), toggleFavorite: vi.fn() },
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<RouterModule>('react-router-dom')
  return { ...actual, useParams: () => ({ slug: 'wellington-castro' }) }
})

const base = {
  id: 'ath-1',
  slug: 'wellington-castro',
  fullName: 'Wellington Castro',
  position: 'ATA',
  dominantFoot: 'RIGHT',
  level: 'PROFESSIONAL',
  availability: 'FREE',
  agencyStatus: 'UNREPRESENTED',
  age: 24,
  naturalidade: 'Joinville - SC',
  goals: 9,
  seasonStats: [],
  media: [],
} satisfies AthleteProfile

/** O que a rota pública devolve: sem pretensão salarial. */
const publicProfile: AthleteProfile = base

/** O que o contratante vê por id: a mesma ficha, mais a pretensão. */
const fullProfile: AthleteProfile = { ...base, expectedSalary: '9000' }

const athleteUser: AuthUser = {
  id: 'a1',
  email: 'atleta@empregol.com',
  role: 'athlete',
  nome: 'Wellington Castro',
  emailVerificado: true,
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(athleteProfileApi.getPublicBySlug).mockResolvedValue(publicProfile)
  vi.mocked(athleteProfileApi.getById).mockResolvedValue(fullProfile)
  vi.mocked(scoutApi.listFavorites).mockResolvedValue([])
})

/** O nome quebra em duas linhas no hero, então o texto do h1 vem concatenado. */
function heroName(): HTMLElement {
  return screen.getByRole('heading', { level: 1 })
}

describe('PublicProfilePage', () => {
  it('abre a ficha para visitante deslogado, pela rota pública', async () => {
    renderWithProviders(<PublicProfilePage />)

    await waitFor(() => expect(heroName()).toHaveTextContent(/Wellington\s*Castro/))
    expect(athleteProfileApi.getPublicBySlug).toHaveBeenCalledWith('wellington-castro')
    expect(screen.getByText(/24 ANOS/)).toBeInTheDocument()
  })

  it('não busca a ficha por id nem oferece ações a quem não é contratante', async () => {
    renderWithProviders(<PublicProfilePage />, { user: athleteUser })

    await waitFor(() => expect(heroName()).toHaveTextContent(/Wellington\s*Castro/))

    // Buscar por id registraria uma visualização que não houve.
    expect(athleteProfileApi.getById).not.toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: /ENVIAR MENSAGEM/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Como visitante/i })).not.toBeInTheDocument()
  })

  it('dá ao contratante a ficha completa e as três ações do kit', async () => {
    renderWithProviders(<PublicProfilePage />, { user: testUser })

    await waitFor(() => expect(athleteProfileApi.getById).toHaveBeenCalledWith('ath-1'))

    expect(await screen.findByText('R$ 9.000')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /CONVIDAR PARA TESTE/ })).toBeDisabled()
    expect(screen.getByRole('button', { name: /ENVIAR MENSAGEM/ })).toBeEnabled()
    expect(screen.getByRole('button', { name: /shortlist/i })).toBeInTheDocument()
  })

  it('marca a estrela quando o atleta já está na shortlist', async () => {
    vi.mocked(scoutApi.listFavorites).mockResolvedValue([
      { ...publicProfile, availability: 'FREE', agencyStatus: 'UNREPRESENTED' } as never,
    ])
    renderWithProviders(<PublicProfilePage />, { user: testUser })

    const star = await screen.findByRole('button', { name: /shortlist/i })
    await waitFor(() => expect(star).toHaveAttribute('aria-pressed', 'true'))
  })

  it('deixa o contratante conferir como o perfil aparece de fora', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PublicProfilePage />, { user: testUser })

    expect(await screen.findByText('R$ 9.000')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Como visitante/i }))

    // No modo visitante some a pretensão salarial e somem as ações.
    await waitFor(() => expect(screen.queryByText('R$ 9.000')).not.toBeInTheDocument())
    expect(screen.queryByRole('button', { name: /ENVIAR MENSAGEM/ })).not.toBeInTheDocument()
  })

  it('esconde o que o atleta não preencheu, em vez de mostrar traço', async () => {
    vi.mocked(athleteProfileApi.getPublicBySlug).mockResolvedValue({
      ...publicProfile,
      goals: null,
      assists: null,
      gamesThisSeason: null,
      minutesPlayed: null,
      seasonStats: [],
      media: [],
      additionalInfo: null,
      lastClub: null,
    })
    renderWithProviders(<PublicProfilePage />)

    await waitFor(() => expect(heroName()).toHaveTextContent(/Wellington\s*Castro/))

    // Sem números, sem temporada e sem vídeo, as seções inteiras somem.
    expect(screen.queryByText('gols')).not.toBeInTheDocument()
    expect(screen.queryByText('Jogadas.')).not.toBeInTheDocument()
    expect(screen.queryByText('Por onde passou.')).not.toBeInTheDocument()
    // O que tem dado continua: ficha técnica e posição.
    expect(screen.getByText('Naturalidade')).toBeInTheDocument()
    expect(screen.getByText('Atacante')).toBeInTheDocument()
  })

  it('monta a faixa de números só com o que existe', async () => {
    vi.mocked(athleteProfileApi.getPublicBySlug).mockResolvedValue({
      ...publicProfile,
      goals: 9,
      assists: 3,
      gamesThisSeason: null,
      minutesPlayed: null,
    })
    renderWithProviders(<PublicProfilePage />)

    expect(await screen.findByText('gols')).toBeInTheDocument()
    expect(screen.getByText('assistências')).toBeInTheDocument()
    expect(screen.queryByText('jogos')).not.toBeInTheDocument()
    expect(screen.queryByText('minutos')).not.toBeInTheDocument()
  })

  it('toca o vídeo numa modal, sem mandar o visitante para outra aba', async () => {
    const user = userEvent.setup()
    vi.mocked(athleteProfileApi.getPublicBySlug).mockResolvedValue({
      ...publicProfile,
      media: [
        {
          id: 'm1',
          mediaType: 'VIDEO',
          url: 'https://api.empregol.co/uploads/lance.mp4',
          title: 'Lance de falta',
          year: 2026,
          category: 'TREINO',
        },
        {
          id: 'm2',
          mediaType: 'VIDEO',
          url: 'https://api.empregol.co/uploads/tela.mp4',
          title: 'Tela',
          year: 2026,
        },
      ],
    })
    renderWithProviders(<PublicProfilePage />)

    const tile = await screen.findByRole('button', { name: /Abrir Lance de falta/ })
    // O ladrilho é botão, não link: nada de target="_blank".
    expect(tile.tagName).toBe('BUTTON')

    await user.click(tile)

    const modal = await screen.findByRole('dialog', { name: 'Lance de falta' })
    expect(within(modal).getByText('1 / 2')).toBeInTheDocument()
    // O player nativo recebe o arquivo da própria API.
    expect(modal.querySelector('video')).toHaveAttribute(
      'src',
      'https://api.empregol.co/uploads/lance.mp4',
    )

    await user.click(within(modal).getByRole('button', { name: /Próximo/ }))
    expect(await screen.findByRole('dialog', { name: 'Tela' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('explica quando a vitrine está fechada, sem entregar que o atleta existe', async () => {
    vi.mocked(athleteProfileApi.getPublicBySlug).mockRejectedValue(
      new ApiError('Perfil não encontrado', 'NOT_FOUND', 404),
    )
    renderWithProviders(<PublicProfilePage />)

    expect(await screen.findByText(/não está/)).toBeInTheDocument()
    expect(screen.queryByText('Wellington Castro')).not.toBeInTheDocument()
  })
})
