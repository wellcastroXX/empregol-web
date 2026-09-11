import { useFavorites, useToggleFavorite } from '@/features/scout/lib/queries'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { AthleteRow } from '../AthleteRow'
import type { DashSection } from '../DashSidebar'
import { PanelEmpty, PanelError, PanelLoading } from '../PanelState'

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
        {favorites.isLoading ? 'Carregando...' : `${athletes.length} atletas salvos`}
      </h2>

      {favorites.isLoading && <PanelLoading />}
      {favorites.isError && (
        <PanelError error={favorites.error} onRetry={() => favorites.refetch()} />
      )}
      {!favorites.isLoading && !favorites.isError && athletes.length === 0 && (
        <PanelEmpty
          title="Shortlist vazia"
          description="Marque atletas na busca e eles ficam guardados aqui para a próxima janela."
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
              Buscar atletas ›
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
