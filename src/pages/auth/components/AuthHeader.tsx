import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors } from '@/shared/config/theme'
import { Wordmark } from '@/shared/ui/Wordmark'

import { BackLink } from './BackLink'

/**
 * Topo da coluna do formulário: marca à esquerda, voltar à direita.
 *
 * O logotipo só aparece abaixo de 860px — acima disso o painel escuro ao lado
 * já traz a marca em tamanho editorial. Sem ele, o space-between deixa o
 * voltar sozinho e alinhado à esquerda, que é o certo no desktop.
 */
export function AuthHeader() {
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
      <Link to={ROUTES.home} className="only-md" aria-label="Empregol — página inicial">
        <Wordmark variant="dark" height={20} />
      </Link>
      <BackLink />
    </header>
  )
}
