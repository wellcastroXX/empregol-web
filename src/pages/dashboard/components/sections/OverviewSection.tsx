import {
  useConversations,
  useExploreAthletes,
  useFavorites,
  useToggleFavorite,
} from '@/features/scout/lib/queries'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { AthleteRow } from '../AthleteRow'
import { PanelEmpty, PanelError, PanelLoading } from '../PanelState'
import type { DashSection } from '../DashSidebar'

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

/** Quantos atletas o feed mostra — o mesmo recorte do app. */
const FEATURED = 6

export interface OverviewSectionProps {
  onNavigate: (section: DashSection) => void
}

/**
 * Visão geral do contratante.
 *
 * A API não tem endpoint de dashboard para contratante (`/dashboard/athlete` é
 * exclusivo de atleta), então os números são compostos das mesmas chamadas que
 * o app usa no ContractorHome: busca de atletas e lista de conversas.
 */
export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const explore = useExploreAthletes({ limit: FEATURED })
  const favorites = useFavorites()
  const conversations = useConversations()
  const toggleFavorite = useToggleFavorite()

  const unread = conversations.data?.filter((c) => c.contractorUnreadCount > 0).length ?? 0

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-4)',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <Kpi
          value={explore.data?.total}
          label="atletas na vitrine"
          loading={explore.isLoading}
          onClick={() => onNavigate('BUSCAR')}
        />
        <Kpi
          value={favorites.data?.length}
          label="na shortlist"
          loading={favorites.isLoading}
          onClick={() => onNavigate('SHORTLIST')}
        />
        <Kpi
          value={conversations.data?.length}
          label="conversas"
          loading={conversations.isLoading}
          onClick={() => onNavigate('CONVERSAS')}
        />
        <Kpi
          value={unread}
          label="não lidas"
          loading={conversations.isLoading}
          accent={unread > 0}
          onClick={() => onNavigate('CONVERSAS')}
        />
      </div>

      <section style={cardStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 6,
            gap: 16,
          }}
        >
          <div>
            <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
              ATLETAS · DISPONÍVEIS
            </Eyebrow>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: '-0.015em',
                color: colors.tinta,
                margin: 0,
              }}
            >
              Quem está na vitrine
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('BUSCAR')}
            style={{
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: colors.tinta,
              borderBottom: `1.5px solid ${colors.tinta}`,
              paddingBottom: 1,
              whiteSpace: 'nowrap',
            }}
          >
            VER TODOS ›
          </button>
        </div>

        {explore.isLoading && <PanelLoading />}
        {explore.isError && <PanelError error={explore.error} onRetry={() => explore.refetch()} />}
        {explore.data?.athletes.length === 0 && (
          <PanelEmpty
            title="Nenhum atleta ainda"
            description="Assim que atletas se cadastrarem e confirmarem o e-mail, eles aparecem aqui."
          />
        )}
        {explore.data?.athletes.map((athlete) => (
          <AthleteRow
            key={athlete.id}
            athlete={athlete}
            busy={toggleFavorite.isPending}
            onToggleFavorite={(id) => toggleFavorite.mutate(id)}
          />
        ))}
      </section>
    </>
  )
}

interface KpiProps {
  value?: number
  label: string
  loading?: boolean
  accent?: boolean
  onClick?: () => void
}

function Kpi({ value, label, loading, accent, onClick }: KpiProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...cardStyle,
        textAlign: 'left',
        cursor: onClick ? 'pointer' : 'default',
        display: 'block',
        width: '100%',
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 40,
          color: accent ? colors.gramado : colors.tinta,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        {loading ? '—' : (value ?? 0)}
      </span>
      <Eyebrow size={10} style={{ letterSpacing: '0.14em', marginTop: 10 }}>
        {label}
      </Eyebrow>
    </button>
  )
}
