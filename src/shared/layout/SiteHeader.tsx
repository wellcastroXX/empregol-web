import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'

import { colors, fonts } from '@/shared/config/theme'
import { useScrolledPast } from '@/shared/lib/hooks/useScrolledPast'
import { Wordmark } from '@/shared/ui/Wordmark'

const NAV_ITEMS = ['Atletas', 'Clubes', 'Agentes', 'Histórias', 'Preço'] as const

/** Rolagem a partir da qual a barra assume o fundo sólido. */
const SOLID_AT = 40

const TRANSITION = 'background-color 240ms ease, border-color 240ms ease, color 240ms ease'

export type NavItem = (typeof NAV_ITEMS)[number]

export interface SiteHeaderProps {
  active?: NavItem | ''
  /**
   * Deixa a barra transparente enquanto a página está no topo, para o hero
   * escuro aparecer por trás. Só faz sentido em rotas cuja primeira seção é
   * escura — em fundo claro o logotipo creme sumiria.
   */
  overlay?: boolean
}

/** Navegação superior do empregol.com — fixa, transparente no topo do hero. */
export function SiteHeader({ active = '', overlay = false }: SiteHeaderProps) {
  const scrolled = useScrolledPast(SOLID_AT)
  const transparent = overlay && !scrolled

  const fg = transparent ? colors.giz : colors.tinta

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        height: 'var(--nav-h)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        background: transparent ? 'transparent' : 'rgba(242, 239, 232, 0.85)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        borderBottom: `1px solid ${transparent ? 'transparent' : colors.osso}`,
        transition: TRANSITION,
      }}
    >
      <Link to="/" aria-label="Empregol — página inicial" style={{ display: 'block' }}>
        <HeaderWordmark cream={transparent} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {NAV_ITEMS.map((i) => (
          <a
            key={i}
            href="#"
            style={{
              fontFamily: fonts.text,
              fontSize: 14,
              fontWeight: 500,
              color: fg,
              textDecoration: 'none',
              opacity: active === i ? 1 : 0.85,
              transition: TRANSITION,
            }}
          >
            {i}
          </a>
        ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            paddingLeft: 16,
            borderLeft: `1px solid ${transparent ? colors.giz24 : colors.osso}`,
            transition: TRANSITION,
          }}
        >
          <Link
            to={ROUTES.entrar}
            style={{
              fontFamily: fonts.text,
              fontSize: 14,
              fontWeight: 500,
              color: fg,
              textDecoration: 'none',
              transition: TRANSITION,
            }}
          >
            ENTRAR
          </Link>
          <Link
            to={ROUTES.cadastro}
            style={{
              // Invertido no topo: sobre o vídeo escuro, o botão claro é que vira o destaque.
              background: transparent ? colors.giz : colors.tinta,
              color: transparent ? colors.tinta : colors.giz,
              padding: '10px 14px',
              borderRadius: 4,
              fontFamily: fonts.text,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: TRANSITION,
            }}
          >
            CADASTRE-SE ›
          </Link>
        </div>
      </div>
    </nav>
  )
}

const WORDMARK_HEIGHT = 22

/**
 * As duas versões ficam empilhadas e alternam por opacidade em vez de trocar o
 * `src`: assim os dois arquivos já estão carregados e a primeira rolagem não
 * pisca esperando download.
 */
function HeaderWordmark({ cream }: { cream: boolean }) {
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <Wordmark
        variant="dark"
        height={WORDMARK_HEIGHT}
        style={{ opacity: cream ? 0 : 1, transition: 'opacity 240ms ease' }}
      />
      <Wordmark
        variant="cream"
        height={WORDMARK_HEIGHT}
        decorative
        style={{
          position: 'absolute',
          inset: 0,
          opacity: cream ? 1 : 0,
          transition: 'opacity 240ms ease',
        }}
      />
    </span>
  )
}
