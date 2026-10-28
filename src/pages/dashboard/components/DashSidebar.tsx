import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Wordmark } from '@/shared/ui/Wordmark'

import { DashIcon, type DashIconName } from './DashIcon'

export type DashSection =
  'VISÃO GERAL' | 'BUSCAR' | 'SHORTLIST' | 'CONVERSAS' | 'BUSCAS SALVAS' | 'RELATÓRIOS' | 'PERFIL'

const ITEMS: ReadonlyArray<readonly [DashSection, DashIconName]> = [
  ['VISÃO GERAL', 'house'],
  ['BUSCAR', 'search'],
  ['SHORTLIST', 'star'],
  ['CONVERSAS', 'chat'],
  ['BUSCAS SALVAS', 'bookmark'],
  ['RELATÓRIOS', 'chart'],
  ['PERFIL', 'user'],
]

/** Iniciais para o avatar, a partir do nome real. */
function initials(nome: string): string {
  const parts = nome.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '--'
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

/**
 * Os rótulos do menu. A seção em si continua identificada pelo nome em
 * português (é o que o resto do painel usa para navegar); só o texto exibido
 * muda de idioma.
 */
const MESSAGES = defineMessages<{
  sections: Record<DashSection, string>
  roles: Record<string, string>
  expand: string
  collapse: string
  myAccount: string
  nav: string
  plan: string
  planBody: string
  planCta: string
  signOut: string
}>({
  pt: {
    sections: {
      'VISÃO GERAL': 'VISÃO GERAL',
      BUSCAR: 'BUSCAR',
      SHORTLIST: 'SHORTLIST',
      CONVERSAS: 'CONVERSAS',
      'BUSCAS SALVAS': 'BUSCAS SALVAS',
      RELATÓRIOS: 'RELATÓRIOS',
      PERFIL: 'PERFIL',
    },
    roles: { athlete: 'ATLETA', agent: 'AGÊNCIA', club: 'CLUBE' },
    expand: 'Expandir menu',
    collapse: 'Retrair menu',
    myAccount: 'Minha conta',
    nav: 'Seções do painel',
    plan: 'PLANO PRO',
    planBody: 'Busca ilimitada de atletas e shortlist sem teto.',
    planCta: 'VER PLANO ELITE ›',
    signOut: 'Sair',
  },
  en: {
    sections: {
      'VISÃO GERAL': 'OVERVIEW',
      BUSCAR: 'SEARCH',
      SHORTLIST: 'SHORTLIST',
      CONVERSAS: 'MESSAGES',
      'BUSCAS SALVAS': 'SAVED SEARCHES',
      RELATÓRIOS: 'REPORTS',
      PERFIL: 'PROFILE',
    },
    roles: { athlete: 'ATHLETE', agent: 'AGENCY', club: 'CLUB' },
    expand: 'Expand menu',
    collapse: 'Collapse menu',
    myAccount: 'My account',
    nav: 'Dashboard sections',
    plan: 'PRO PLAN',
    planBody: 'Unlimited athlete search and no cap on your shortlist.',
    planCta: 'SEE ELITE PLAN ›',
    signOut: 'Sign out',
  },
  es: {
    sections: {
      'VISÃO GERAL': 'RESUMEN',
      BUSCAR: 'BUSCAR',
      SHORTLIST: 'SHORTLIST',
      CONVERSAS: 'CONVERSACIONES',
      'BUSCAS SALVAS': 'BÚSQUEDAS GUARDADAS',
      RELATÓRIOS: 'INFORMES',
      PERFIL: 'PERFIL',
    },
    roles: { athlete: 'ATLETA', agent: 'AGENCIA', club: 'CLUB' },
    expand: 'Expandir menú',
    collapse: 'Contraer menú',
    myAccount: 'Mi cuenta',
    nav: 'Secciones del panel',
    plan: 'PLAN PRO',
    planBody: 'Búsqueda ilimitada de atletas y shortlist sin límite.',
    planCta: 'VER PLAN ELITE ›',
    signOut: 'Salir',
  },
})

export interface DashSidebarProps {
  active: DashSection
  onNavigate: (section: DashSection) => void
  collapsed: boolean
  onToggleCollapsed: () => void
}

/** Coluna escura do painel: marca, conta, navegação, plano e sair. */
export function DashSidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapsed,
}: DashSidebarProps) {
  const m = useMessages(MESSAGES)
  const { user, signOut } = useAuth()
  const nome = user?.nome ?? ''
  const papel = m.roles[user?.kind ?? user?.role ?? ''] ?? ''

  return (
    <aside
      className="dash-sidebar"
      style={{
        background: colors.tinta,
        color: colors.giz,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        // Fixa: a navegação fica sempre à mão, independente da rolagem do
        // conteúdo. A largura vem do grid da página, via --cols-dash.
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        width: 'var(--dash-aside-w)',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'width 240ms ease, padding 240ms ease',
        zIndex: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 8,
          padding: '0 4px 20px',
        }}
      >
        {!collapsed && (
          <Link to={ROUTES.home} style={{ display: 'block' }}>
            <Wordmark variant="cream" height={20} />
          </Link>
        )}
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? m.expand : m.collapse}
          aria-expanded={!collapsed}
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: `1px solid ${colors.ruleDark}`,
            borderRadius: 30,
            cursor: 'pointer',
            color: colors.cinzaOnDark,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              fontSize: 15,
              lineHeight: 1,
              // A seta gira em vez de trocar de glifo: a transição fica contínua.
              transform: collapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 240ms ease',
            }}
          >
            ‹
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('PERFIL')}
        title={collapsed ? nome : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: collapsed ? '10px 0' : '10px 8px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          marginBottom: 18,
          background: colors.tintaElev,
          border: 0,
          borderRadius: 6,
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 2,
            background: colors.giz,
            color: colors.tinta,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {initials(nome)}
        </span>
        {!collapsed && (
          <span style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: 'block',
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 13,
                color: colors.giz,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {nome || m.myAccount}
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 9,
                letterSpacing: '0.14em',
                color: colors.cinzaOnDark,
                textTransform: 'uppercase',
              }}
            >
              {papel}
            </span>
          </span>
        )}
      </button>

      <nav aria-label={m.nav} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ITEMS.map(([section, icon]) => {
          const on = active === section
          const label = m.sections[section]
          return (
            <button
              key={section}
              type="button"
              aria-current={on ? 'page' : undefined}
              onClick={() => onNavigate(section)}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                padding: collapsed ? '11px 0' : '11px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 6,
                border: 0,
                textAlign: 'left',
                background: on ? colors.gramado : 'transparent',
                color: on ? colors.giz : colors.cinzaOnDark,
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 13.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <DashIcon name={icon} />
              {!collapsed && label}
            </button>
          )
        })}
      </nav>

      {/* Plano e sair sobem logo após o menu em vez de colarem no rodapé:
          com a barra fixa, o espaçador empurrava os dois para fora da vista
          em telas baixas. */}
      {!collapsed && (
        <div
          className="dash-aside-secondary"
          style={{ background: colors.tintaElev, borderRadius: 8, padding: 14, marginTop: 24 }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 9,
              letterSpacing: '0.14em',
              color: colors.gramado,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {m.plan}
          </div>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 12,
              color: colors.gizMuted,
              lineHeight: 1.4,
              margin: '0 0 10px',
            }}
          >
            {m.planBody}
          </p>
          <a
            href="#"
            style={{
              display: 'inline-block',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: colors.giz,
              textDecoration: 'none',
              borderBottom: `1.5px solid ${colors.giz}`,
              paddingBottom: 1,
            }}
          >
            {m.planCta}
          </a>
        </div>
      )}

      <div
        className="dash-aside-secondary"
        style={{ marginTop: 16, padding: collapsed ? 0 : '0 4px' }}
      >
        {!collapsed && (
          <div
            style={{
              fontFamily: fonts.text,
              fontSize: 12,
              color: colors.cinzaOnDark,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: 10,
            }}
          >
            {user?.email}
          </div>
        )}
        <button
          type="button"
          onClick={signOut}
          title={collapsed ? m.signOut : undefined}
          style={{
            background: 'transparent',
            border: `1px solid ${colors.ruleDark}`,
            borderRadius: 30,
            padding: collapsed ? '10px 0' : '10px 12px',
            width: '100%',
            cursor: 'pointer',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: colors.giz,
          }}
        >
          {collapsed ? '⏻' : m.signOut}
        </button>
      </div>
    </aside>
  )
}
