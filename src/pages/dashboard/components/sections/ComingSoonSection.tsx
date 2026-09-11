import { PanelEmpty } from '../PanelState'

export interface ComingSoonSectionProps {
  title: string
  description: string
}

/**
 * Seção sem backend ainda.
 *
 * Existe para o item de menu não virar um clique morto: diz o que a seção será
 * e deixa explícito que ainda não há dado — em vez de mostrar número inventado.
 */
export function ComingSoonSection({ title, description }: ComingSoonSectionProps) {
  return <PanelEmpty title={title} description={description} />
}
