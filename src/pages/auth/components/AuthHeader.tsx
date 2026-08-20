import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors } from '@/shared/config/theme'
import { Wordmark } from '@/shared/ui/Wordmark'

import { BackLink } from './BackLink'

/**
 * Topo da coluna do formulário: voltar à esquerda, marca à direita.
 *
 * O logotipo só aparece abaixo de 860px. Acima disso o painel escuro ao lado
 * já traz a marca em tamanho editorial, e repeti-la aqui seria redundante.
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
      <BackLink />
      <Link to={ROUTES.home} className="only-md" aria-label="Empregol — página inicial">
        <Wordmark variant="dark" height={20} />
      </Link>
    </header>
  )
}
