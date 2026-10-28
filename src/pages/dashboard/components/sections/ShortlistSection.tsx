import { useFavorites, useToggleFavorite } from '@/features/scout/lib/queries'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { AthleteRow } from '../AthleteRow'
import type { DashSection } from '../DashSidebar'
import { PanelEmpty, PanelError, PanelLoading } from '../PanelState'

const MESSAGES = defineMessages<{
  loading: string
  count: (total: number) => string
  emptyTitle: string
  emptyBody: string
  search: string
}>({
  pt: {
    loading: 'Carregando...',
    count: (total) => `${total} atletas salvos`,
    emptyTitle: 'Shortlist vazia',
    emptyBody: 'Marque atletas na busca e eles ficam guardados aqui para a próxima janela.',
    search: 'Buscar atletas ›',
  },
  en: {
    loading: 'Loading...',
    count: (total) => `${total} saved ${total === 1 ? 'athlete' : 'athletes'}`,
    emptyTitle: 'Empty shortlist',
    emptyBody: 'Mark athletes in the search and they are kept here for the next window.',
    search: 'Search athletes ›',
  },
  es: {
    loading: 'Cargando...',
    count: (total) => `${total} ${total === 1 ? 'atleta guardado' : 'atletas guardados'}`,
    emptyTitle: 'Shortlist vacía',
    emptyBody: 'Marca atletas en la búsqueda y quedarán guardados aquí para el próximo mercado.',
    search: 'Buscar atletas ›',
  },
})

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

export interface ShortlistSectionProps {
  onNavigate: (section: DashSection) => void
}

/** Shortlist — os favoritos do contratante em `/favorites`. */
export function ShortlistSection({ onNavigate }: ShortlistSectionProps) {
  const m = useMessages(MESSAGES)
  const favorites = useFavorites()
  const toggleFavorite = useToggleFavorite()
  const athletes = favorites.data ?? []

  return (
    <section style={cardStyle}>
      <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
        S H O R T L I S T
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
        {favorites.isLoading ? m.loading : m.count(athletes.length)}
      </h2>

      {favorites.isLoading && <PanelLoading />}
      {favorites.isError && (
        <PanelError error={favorites.error} onRetry={() => favorites.refetch()} />
      )}
      {!favorites.isLoading && !favorites.isError && athletes.length === 0 && (
        <PanelEmpty
          title={m.emptyTitle}
          description={m.emptyBody}
          action={
            <button
              type="button"
              onClick={() => onNavigate('BUSCAR')}
              style={{
                background: colors.gramado,
                color: colors.giz,
                border: 0,
                borderRadius: 30,
                padding: '12px 22px',
                cursor: 'pointer',
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {m.search}
            </button>
          }
        />
      )}

      {athletes.map((athlete) => (
        <AthleteRow
          key={athlete.id}
          athlete={{ ...athlete, isFavorited: true }}
          busy={toggleFavorite.isPending}
          onToggleFavorite={(id) => toggleFavorite.mutate(id)}
        />
      ))}
    </section>
  )
}
