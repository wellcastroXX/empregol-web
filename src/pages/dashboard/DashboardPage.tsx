import { useState, type CSSProperties } from 'react'

import { colors } from '@/shared/config/theme'

import { DashSidebar, type DashSection } from './components/DashSidebar'
import { DashTopbar } from './components/DashTopbar'
import { ComingSoonSection } from './components/sections/ComingSoonSection'
import { ConversationsSection } from './components/sections/ConversationsSection'
import { OverviewSection } from './components/sections/OverviewSection'
import { ProfileSection } from './components/sections/ProfileSection'
import { SearchSection } from './components/sections/SearchSection'
import { ShortlistSection } from './components/sections/ShortlistSection'

/** Largura da barra em cada estado. O grid da página lê isso por variável. */
const ASIDE_WIDTH = { expanded: '232px', collapsed: '76px' } as const

/**
 * Área logada de agente/clube (empregol.com/painel).
 *
 * Casca própria — nada do nav e rodapé públicos entra aqui. Cada seção busca
 * seus próprios dados na empregol-api; não há mock.
 */
export default function DashboardPage() {
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
          <SectionContent section={section} onNavigate={setSection} />
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
      return (
        <ComingSoonSection
          title="Buscas salvas — em breve"
          description="Guardar um conjunto de filtros e ser avisado quando aparecer atleta novo. A API ainda não tem esse recurso, então nada é exibido aqui para não inventar número."
        />
      )
    case 'RELATÓRIOS':
      return (
        <ComingSoonSection
          title="Relatórios — em breve"
          description="Consolidado de visualizações, propostas e conversões da sua conta. Depende de um endpoint de métricas que ainda não existe na API."
        />
      )
  }
}
