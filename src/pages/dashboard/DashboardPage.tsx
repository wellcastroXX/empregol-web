import { useState } from 'react'

import { colors } from '@/shared/config/theme'

import { DashOverview } from './components/DashOverview'
import { DashSidebar, type DashSection } from './components/DashSidebar'
import { DashTopbar } from './components/DashTopbar'

/**
 * Área logada de agente/clube (empregol.com/painel).
 *
 * Casca própria — nada do nav e rodapé públicos entra aqui. Hoje só a visão
 * geral está implementada; as demais seções da barra lateral trocam o estado
 * mas ainda caem no mesmo conteúdo.
 */
export default function DashboardPage() {
  const [section, setSection] = useState<DashSection>('VISÃO GERAL')

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '232px minmax(0, 1fr)',
        background: colors.creme,
      }}
    >
      <DashSidebar active={section} onNavigate={setSection} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <DashTopbar />
        <DashOverview />
      </div>
    </div>
  )
}
