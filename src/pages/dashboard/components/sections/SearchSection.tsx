import { useState } from 'react'

import { useFormOptions } from '@/features/auth/model/options'
import { useExploreAthletes, useToggleFavorite } from '@/features/scout/lib/queries'
import type { Availability, ExploreFilters } from '@/features/scout/model/scout.types'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { AthleteRow } from '../AthleteRow'
import { PanelEmpty, PanelError, PanelLoading } from '../PanelState'

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

const controlStyle = {
  appearance: 'none',
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 30,
  padding: '11px 16px',
  fontFamily: fonts.text,
  fontSize: 14,
  color: colors.tinta,
  outline: 'none',
  minWidth: 0,
} as const

const AVAILABILITY: ReadonlyArray<Availability | ''> = ['', 'FREE', 'EMPLOYED']

const MESSAGES = defineMessages<{
  eyebrow: string
  searching: string
  searchingLabel: string
  count: (total: number) => string
  namePlaceholder: string
  nameLabel: string
  position: string
  allPositions: string
  availability: string
  availabilityOptions: Record<Availability | 'ALL', string>
  emptyTitle: string
  emptyBody: string
}>({
  pt: {
    eyebrow: 'B U S C A · D E · A T L E T A S',
    searching: 'Buscando...',
    searchingLabel: 'Buscando',
    count: (total) => `${total} atletas`,
    namePlaceholder: 'Nome do atleta',
    nameLabel: 'Buscar por nome',
    position: 'Posição',
    allPositions: 'Todas as posições',
    availability: 'Disponibilidade',
    availabilityOptions: { ALL: 'Todos', FREE: 'Livres', EMPLOYED: 'Empregados' },
    emptyTitle: 'Nenhum atleta com esses filtros',
    emptyBody: 'Tente ampliar a busca — remover a posição ou o status costuma trazer resultado.',
  },
  en: {
    eyebrow: 'A T H L E T E · S E A R C H',
    searching: 'Searching...',
    searchingLabel: 'Searching',
    count: (total) => `${total} ${total === 1 ? 'athlete' : 'athletes'}`,
    namePlaceholder: 'Athlete name',
    nameLabel: 'Search by name',
    position: 'Position',
    allPositions: 'All positions',
    availability: 'Availability',
    availabilityOptions: { ALL: 'All', FREE: 'Free agents', EMPLOYED: 'Under contract' },
    emptyTitle: 'No athletes match these filters',
    emptyBody:
      'Try broadening the search — removing the position or status usually brings results.',
  },
  es: {
    eyebrow: 'B Ú S Q U E D A · D E · A T L E T A S',
    searching: 'Buscando...',
    searchingLabel: 'Buscando',
    count: (total) => `${total} ${total === 1 ? 'atleta' : 'atletas'}`,
    namePlaceholder: 'Nombre del atleta',
    nameLabel: 'Buscar por nombre',
    position: 'Posición',
    allPositions: 'Todas las posiciones',
    availability: 'Disponibilidad',
    availabilityOptions: { ALL: 'Todos', FREE: 'Libres', EMPLOYED: 'Con contrato' },
    emptyTitle: 'Ningún atleta con esos filtros',
    emptyBody:
      'Intenta ampliar la búsqueda — quitar la posición o el estado suele traer resultados.',
  },
})

/** Busca de atletas — `/explore/athletes` com os filtros que a API aceita. */
export function SearchSection() {
  const m = useMessages(MESSAGES)
  const { positions } = useFormOptions()
  const [q, setQ] = useState('')
  const [position, setPosition] = useState('')
  const [availability, setAvailability] = useState<Availability | ''>('')

  const filters: ExploreFilters = {
    ...(q.trim() ? { q: q.trim() } : {}),
    ...(position ? { positions: [position] } : {}),
    ...(availability ? { availability } : {}),
    limit: 20,
  }

  const explore = useExploreAthletes(filters)
  const toggleFavorite = useToggleFavorite()
  const athletes = explore.data?.athletes ?? []

  return (
    <section style={cardStyle}>
      <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
        {m.eyebrow}
      </Eyebrow>
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: '-0.015em',
          color: colors.tinta,
          margin: '0 0 18px',
        }}
      >
        {explore.isLoading ? m.searching : m.count(explore.data?.total ?? 0)}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-3)',
          gap: 12,
          marginBottom: 8,
        }}
      >
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={m.namePlaceholder}
          aria-label={m.nameLabel}
          style={controlStyle}
        />
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          aria-label={m.position}
          style={{ ...controlStyle, cursor: 'pointer' }}
        >
          <option value="">{m.allPositions}</option>
          {positions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value as Availability | '')}
          aria-label={m.availability}
          style={{ ...controlStyle, cursor: 'pointer' }}
        >
          {AVAILABILITY.map((value) => (
            <option key={value} value={value}>
              {m.availabilityOptions[value || 'ALL']}
            </option>
          ))}
        </select>
      </div>

      {explore.isError && <PanelError error={explore.error} onRetry={() => explore.refetch()} />}
      {explore.isLoading && <PanelLoading label={m.searchingLabel} />}
      {!explore.isLoading && !explore.isError && athletes.length === 0 && (
        <PanelEmpty title={m.emptyTitle} description={m.emptyBody} />
      )}

      {athletes.map((athlete) => (
        <AthleteRow
          key={athlete.id}
          athlete={athlete}
          busy={toggleFavorite.isPending}
          onToggleFavorite={(id) => toggleFavorite.mutate(id)}
        />
      ))}
    </section>
  )
}
