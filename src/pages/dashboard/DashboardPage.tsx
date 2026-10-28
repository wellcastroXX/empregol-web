import { useState, type CSSProperties } from 'react'

import { useAuth } from '@/features/auth/ui/auth-context'

import { colors } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

import { AthletePanel } from './AthletePanel'
import { AthleteProfileHost } from './components/AthleteProfileDrawer'
import { DashSidebar, type DashSection } from './components/DashSidebar'
import { DashTopbar } from './components/DashTopbar'
import { ComingSoonSection } from './components/sections/ComingSoonSection'
import { ConversationsSection } from './components/sections/ConversationsSection'
import { OverviewSection } from './components/sections/OverviewSection'
import { ProfileSection } from './components/sections/ProfileSection'
import { SearchSection } from './components/sections/SearchSection'
import { ShortlistSection } from './components/sections/ShortlistSection'

const MESSAGES = defineMessages({
  pt: {
    savedSearchesTitle: 'Buscas salvas — em breve',
    savedSearchesBody:
      'Guardar um conjunto de filtros e ser avisado quando aparecer atleta novo. A API ainda não tem esse recurso, então nada é exibido aqui para não inventar número.',
    reportsTitle: 'Relatórios — em breve',
    reportsBody:
      'Consolidado de visualizações, propostas e conversões da sua conta. Depende de um endpoint de métricas que ainda não existe na API.',
  },
  en: {
    savedSearchesTitle: 'Saved searches — coming soon',
    savedSearchesBody:
      'Save a set of filters and get notified when a new athlete shows up. The API does not support this yet, so nothing is shown here rather than making up numbers.',
    reportsTitle: 'Reports — coming soon',
    reportsBody:
      'A summary of views, offers and conversions for your account. It depends on a metrics endpoint the API does not have yet.',
  },
  es: {
    savedSearchesTitle: 'Búsquedas guardadas — próximamente',
    savedSearchesBody:
      'Guardar un conjunto de filtros y recibir un aviso cuando aparezca un atleta nuevo. La API todavía no tiene esta función, así que aquí no se muestra nada para no inventar cifras.',
    reportsTitle: 'Informes — próximamente',
    reportsBody:
      'Resumen de visualizaciones, propuestas y conversiones de tu cuenta. Depende de un endpoint de métricas que la API todavía no tiene.',
  },
})

/** Largura da barra em cada estado. O grid da página lê isso por variável. */
const ASIDE_WIDTH = { expanded: '232px', collapsed: '76px' } as const

/**
 * Área logada de agente/clube (empregol.com/painel).
 *
 * Casca própria — nada do nav e rodapé públicos entra aqui. Cada seção busca
 * seus próprios dados na empregol-api; não há mock.
 */
/**
 * Painel logado. Divide por papel, como o HomeScreen do app: contratante vê o
 * scout (busca, shortlist, conversas); atleta vê o próprio dashboard. Sem a
 * divisão, um atleta caía no painel de scout e recebia 403 nas rotas
 * exclusivas de AGENT/CLUB.
 */
export default function DashboardPage() {
  const { user } = useAuth()

  if (user?.role === 'athlete') return <AthletePanel />

  return <ScoutPanel />
}

function ScoutPanel() {
  const [section, setSection] = useState<DashSection>('VISÃO GERAL')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      style={
        {
          minHeight: '100vh',
          background: colors.creme,
          '--dash-aside-w': collapsed ? ASIDE_WIDTH.collapsed : ASIDE_WIDTH.expanded,
        } as CSSProperties
      }
    >
      <DashSidebar
        active={section}
        onNavigate={setSection}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
      />
      <div className="dash-main" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <DashTopbar />
        <main style={{ padding: '28px var(--page-x) 60px' }}>
          {/* A gaveta de perfil vive aqui: as três seções com lista de atletas
              compartilham a mesma, em vez de cada uma montar a sua. */}
          <AthleteProfileHost onNavigate={setSection}>
            <SectionContent section={section} onNavigate={setSection} />
          </AthleteProfileHost>
        </main>
      </div>
    </div>
  )
}

function SectionContent({
  section,
  onNavigate,
}: {
  section: DashSection
  onNavigate: (section: DashSection) => void
}) {
  const m = useMessages(MESSAGES)

  switch (section) {
    case 'VISÃO GERAL':
      return <OverviewSection onNavigate={onNavigate} />
    case 'BUSCAR':
      return <SearchSection />
    case 'SHORTLIST':
      return <ShortlistSection onNavigate={onNavigate} />
    case 'CONVERSAS':
      return <ConversationsSection />
    case 'PERFIL':
      return <ProfileSection />
    case 'BUSCAS SALVAS':
      return <ComingSoonSection title={m.savedSearchesTitle} description={m.savedSearchesBody} />
    case 'RELATÓRIOS':
      return <ComingSoonSection title={m.reportsTitle} description={m.reportsBody} />
  }
}
