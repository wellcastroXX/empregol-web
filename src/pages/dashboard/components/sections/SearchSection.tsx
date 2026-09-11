import { useState } from 'react'

import { POSITIONS } from '@/features/auth/model/options'
import { useExploreAthletes, useToggleFavorite } from '@/features/scout/lib/queries'
import type { Availability, ExploreFilters } from '@/features/scout/model/scout.types'
import { colors, fonts } from '@/shared/config/theme'
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

const AVAILABILITY: ReadonlyArray<readonly [Availability | '', string]> = [
  ['', 'Todos'],
  ['FREE', 'Livres'],
  ['EMPLOYED', 'Empregados'],
]

/** Busca de atletas — `/explore/athletes` com os filtros que a API aceita. */
export function SearchSection() {
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
        B U S C A · D E · A T L E T A S
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
        {explore.isLoading ? 'Buscando...' : `${explore.data?.total ?? 0} atletas`}
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
          placeholder="Nome do atleta"
          aria-label="Buscar por nome"
          style={controlStyle}
        />
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          aria-label="Posição"
          style={{ ...controlStyle, cursor: 'pointer' }}
        >
          <option value="">Todas as posições</option>
          {POSITIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value as Availability | '')}
          aria-label="Disponibilidade"
          style={{ ...controlStyle, cursor: 'pointer' }}
        >
          {AVAILABILITY.map(([value, label]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {explore.isError && <PanelError error={explore.error} onRetry={() => explore.refetch()} />}
      {explore.isLoading && <PanelLoading label="Buscando" />}
      {!explore.isLoading && !explore.isError && athletes.length === 0 && (
        <PanelEmpty
          title="Nenhum atleta com esses filtros"
          description="Tente ampliar a busca — remover a posição ou o status costuma trazer resultado."
        />
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
