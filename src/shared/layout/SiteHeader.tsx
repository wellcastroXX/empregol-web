import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'

import { colors, fonts } from '@/shared/config/theme'
import { useScrolledPast } from '@/shared/lib/hooks/useScrolledPast'
import { Wordmark } from '@/shared/ui/Wordmark'

import { MobileMenuButton } from './MobileMenuButton'

interface NavEntry {
  label: string
  /** Destino: âncora de seção da home (`/#id`) ou rota própria. */
  to: string
}

/**
 * Espelha as seções que a home realmente tem. A lista anterior vinha do kit de
 * design da home antiga (Atletas, Clubes, Agentes, Preço) e apontava para
 * páginas que nunca existiram.
 */
// `as const satisfies` em vez de anotar o tipo: anotar colapsaria `label` em
// `string` e NavItem deixaria de restringir o que a rota pode marcar como ativo.
const NAV_ITEMS = [
  { label: 'A Empregol', to: `${ROUTES.home}#sobre` },
  { label: 'Suporte', to: `${ROUTES.home}#suporte` },
  { label: 'Origem', to: `${ROUTES.home}#origem` },
  { label: 'Missão', to: `${ROUTES.home}#missao` },
  { label: 'App', to: ROUTES.app },
] as const satisfies readonly NavEntry[]

/** Rolagem a partir da qual a barra assume o fundo sólido. */
const SOLID_AT = 40

const TRANSITION = 'background-color 240ms ease, border-color 240ms ease, color 240ms ease'

export type NavItem = (typeof NAV_ITEMS)[number]['label']

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
  const { key } = useLocation()
  // Guarda a localização em que o menu foi aberto em vez de um booleano: assim
  // qualquer navegação — inclusive voltar pelo botão do navegador — fecha o
  // painel por derivação, sem efeito sincronizando estado.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const menuOpen = openedAt === key
  const toggleMenu = () => setOpenedAt((current) => (current === key ? null : key))
  const closeMenu = () => setOpenedAt(null)

  // Aberto, o menu cobre a tela: manter o fundo transparente deixaria o vídeo
  // aparecendo atrás dos itens.
  const transparent = overlay && !scrolled && !menuOpen

  const fg = transparent ? colors.giz : colors.tinta

  // Trava a rolagem do fundo enquanto o painel está aberto.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

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
        padding: '0 var(--page-x)',
        background: transparent ? 'transparent' : 'rgba(242, 239, 232, 0.85)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        borderBottom: `1px solid ${transparent ? 'transparent' : colors.osso}`,
        transition: TRANSITION,
      }}
    >
      <Link to="/" aria-label="Empregol — página inicial" style={{ display: 'block' }}>
        <HeaderWordmark cream={transparent} />
      </Link>

      <div className="hide-md" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            style={{
              fontFamily: fonts.text,
              fontSize: 14,
              fontWeight: 500,
              color: fg,
              textDecoration: 'none',
              opacity: active === item.label ? 1 : 0.85,
              transition: TRANSITION,
            }}
          >
            {item.label}
          </Link>
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

      <MobileMenuButton open={menuOpen} onToggle={toggleMenu} color={fg} />

      {menuOpen && <MobileMenu active={active} onNavigate={closeMenu} />}
    </nav>
  )
}

/** Painel de navegação em tela cheia, abaixo do nav. */
function MobileMenu({ active, onNavigate }: { active: NavItem | ''; onNavigate: () => void }) {
  return (
    <div
      id="menu-mobile"
      className="only-md"
      style={{
        position: 'fixed',
        top: 'var(--nav-h)',
        left: 0,
        right: 0,
        bottom: 0,
        background: colors.creme,
        borderTop: `1px solid ${colors.osso}`,
        padding: 'var(--page-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
      }}
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          onClick={onNavigate}
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: '-0.02em',
            color: colors.tinta,
            textDecoration: 'none',
            padding: '14px 0',
            borderBottom: `1px solid ${colors.osso}`,
            opacity: active === item.label ? 1 : 0.9,
          }}
        >
          {item.label}
        </Link>
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        <Link
          to={ROUTES.cadastro}
          onClick={onNavigate}
          style={{
            background: colors.gramado,
            color: colors.giz,
            padding: '18px 22px',
            borderRadius: 4,
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Cadastre-se ›
        </Link>
        <Link
          to={ROUTES.entrar}
          onClick={onNavigate}
          style={{
            color: colors.tinta,
            padding: '18px 22px',
            borderRadius: 4,
            border: `1.5px solid ${colors.tinta}`,
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Entrar
        </Link>
      </div>
    </div>
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
