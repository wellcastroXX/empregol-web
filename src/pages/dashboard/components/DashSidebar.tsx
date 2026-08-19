import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'
import { Wordmark } from '@/shared/ui/Wordmark'

import { DashIcon, type DashIconName } from './DashIcon'

export type DashSection =
  'VISÃO GERAL' | 'BUSCAR' | 'SHORTLIST' | 'CONVERSAS' | 'BUSCAS SALVAS' | 'RELATÓRIOS'

const ITEMS: ReadonlyArray<readonly [DashSection, DashIconName]> = [
  ['VISÃO GERAL', 'house'],
  ['BUSCAR', 'search'],
  ['SHORTLIST', 'star'],
  ['CONVERSAS', 'chat'],
  ['BUSCAS SALVAS', 'bookmark'],
  ['RELATÓRIOS', 'chart'],
]

export interface DashSidebarProps {
  active: DashSection
  onNavigate: (section: DashSection) => void
}

/** Coluna escura do painel: marca, clube, navegação, plano e usuário. */
export function DashSidebar({ active, onNavigate }: DashSidebarProps) {
  return (
    <aside
      style={{
        background: colors.tinta,
        color: colors.giz,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <Link to={ROUTES.home} style={{ padding: '0 8px 24px', display: 'block' }}>
        <Wordmark variant="cream" height={20} />
      </Link>

      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 8px',
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
          FL
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: 'block',
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 13,
              color: colors.giz,
            }}
          >
            Flamengo
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
            SCOUT · PRO
          </span>
        </span>
        <span aria-hidden="true" style={{ color: colors.cinzaOnDark, fontSize: 14 }}>
          ⌄
        </span>
      </button>

      <nav
        aria-label="Seções do painel"
        style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {ITEMS.map(([label, icon]) => {
          const on = active === label
          return (
            <button
              key={label}
              type="button"
              aria-current={on ? 'page' : undefined}
              onClick={() => onNavigate(label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                padding: '11px 12px',
                borderRadius: 6,
                border: 0,
                textAlign: 'left',
                background: on ? colors.gramado : 'transparent',
                color: on ? colors.giz : colors.cinzaOnDark,
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 13.5,
              }}
            >
              <DashIcon name={icon} />
              {label}
            </button>
          )
        })}
      </nav>

      <div style={{ flex: 1 }} />

      <div style={{ background: colors.tintaElev, borderRadius: 8, padding: 14 }}>
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
          PLANO PRO
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
          43 de 50 buscas usadas este mês.
        </p>
        <div
          role="progressbar"
          aria-valuenow={43}
          aria-valuemin={0}
          aria-valuemax={50}
          aria-label="Buscas usadas no mês"
          style={{ height: 4, background: colors.ruleDark, borderRadius: 999, overflow: 'hidden' }}
        >
          <div style={{ height: '100%', width: '86%', background: colors.gramado }} />
        </div>
        <a
          href="#"
          style={{
            display: 'inline-block',
            marginTop: 12,
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
          VER PLANO ELITE ›
        </a>
      </div>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, padding: '0 4px' }}
      >
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: colors.ruleDark,
            color: colors.giz,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          Ma
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: 'block',
              fontFamily: fonts.text,
              fontWeight: 500,
              fontSize: 12,
              color: colors.giz,
            }}
          >
            Marina Soares
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 9,
              letterSpacing: '0.12em',
              color: colors.cinzaOnDark,
              textTransform: 'uppercase',
            }}
          >
            HEAD DE SCOUTING
          </span>
        </span>
      </div>
    </aside>
  )
}
