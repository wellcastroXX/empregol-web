import { CtaFinal } from './components/CtaFinal'
import { HeroVideo } from './components/HeroVideo'
import { MissaoSection } from './components/MissaoSection'
import { OrigemSection } from './components/OrigemSection'
import { ProblemaSection } from './components/ProblemaSection'
import { SobreSection } from './components/SobreSection'
import { SuporteSection } from './components/SuporteSection'

/**
 * empregol.com — homepage institucional.
 * Ordem: Hero (vídeo) · O que é · Suporte contínuo · Origem · Tamanho do
 * problema · Missão · Fechamento.
 */
export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <SobreSection />
      <SuporteSection />
      <OrigemSection />
      <ProblemaSection />
      <MissaoSection />
      <CtaFinal />
    </>
  )
}
