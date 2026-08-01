import { ConfiamSection } from './components/ConfiamSection'
import { DestaqueSection } from './components/DestaqueSection'
import { FormationShowcase } from './components/FormationShowcase'
import { Hero } from './components/Hero'
import { HistoriasSection } from './components/HistoriasSection'
import { VitrineCarousel } from './components/VitrineCarousel'
import { WeeklyMetrics } from './components/WeeklyMetrics'

/**
 * empregol.com — homepage editorial.
 * Ordem: Hero · Métricas da semana · Destaque · Vitrine · Formação · Histórias · Confiam.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WeeklyMetrics />
      <DestaqueSection />
      <VitrineCarousel />
      <FormationShowcase />
      <HistoriasSection />
      <ConfiamSection />
    </>
  )
}
