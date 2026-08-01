import { Link } from 'react-router-dom'

import { colors, fonts } from '@/shared/config/theme'

const NAV_ITEMS = ['Atletas', 'Clubes', 'Agentes', 'Histórias', 'Preço'] as const

export type NavItem = (typeof NAV_ITEMS)[number]

export interface SiteHeaderProps {
  active?: NavItem | ''
}

/** Navegação superior do empregol.com — sticky com blur sobre o creme. */
export function SiteHeader({ active = '' }: SiteHeaderProps) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: `1px solid ${colors.osso}`,
        background: 'rgba(242, 239, 232, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: colors.tinta,
          display: 'flex',
          alignItems: 'baseline',
          gap: 1,
        }}
      >
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: '-0.03em',
          }}
        >
          empregol
        </span>
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 22,
            color: colors.gramado,
          }}
        >
          .
        </span>
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
              color: colors.tinta,
              textDecoration: 'none',
              opacity: active === i ? 1 : 0.85,
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
            borderLeft: `1px solid ${colors.osso}`,
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: fonts.text,
              fontSize: 14,
              fontWeight: 500,
              color: colors.tinta,
              textDecoration: 'none',
            }}
          >
            ENTRAR
          </a>
          <a
            href="#"
            style={{
              background: colors.tinta,
              color: colors.giz,
              padding: '10px 14px',
              borderRadius: 4,
              fontFamily: fonts.text,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            CADASTRE-SE ›
          </a>
        </div>
      </div>
    </nav>
  )
}
