import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors } from '@/shared/config/theme'
import { LanguageSwitcher } from '@/shared/i18n/LanguageSwitcher'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Wordmark } from '@/shared/ui/Wordmark'

import { BackLink } from './BackLink'

const MESSAGES = defineMessages({
  pt: { home: 'Empregol — página inicial' },
  en: { home: 'Empregol — home page' },
  es: { home: 'Empregol — página de inicio' },
})

/**
 * Topo da coluna do formulário: marca à esquerda, voltar à direita.
 *
 * O logotipo só aparece abaixo de 860px — acima disso o painel escuro ao lado
 * já traz a marca em tamanho editorial. Sem ele, o space-between deixa o
 * voltar sozinho e alinhado à esquerda, que é o certo no desktop. O seletor de
 * idioma fica sempre na ponta direita: a tela de auth não tem o nav do site.
 */
export function AuthHeader() {
  const m = useMessages(MESSAGES)

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 28,
        paddingBottom: 20,
        borderBottom: `1px solid ${colors.osso}`,
      }}
    >
      <Link to={ROUTES.home} className="only-md" aria-label={m.home}>
        <Wordmark variant="dark" height={20} />
      </Link>
      <BackLink />
      <div style={{ marginLeft: 'auto' }}>
        <LanguageSwitcher color={colors.tinta} />
      </div>
    </header>
  )
}
