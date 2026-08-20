import { colors, fonts } from '@/shared/config/theme'

import { DashIcon } from './DashIcon'

/** Barra superior do painel: data, saudação e busca global. */
export function DashTopbar() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '16px var(--page-x)',
        borderBottom: `1px solid ${colors.osso}`,
        background: 'rgba(242, 239, 232, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.cinza,
          }}
        >
          QUI · 24 MAI · 2026
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: '-0.02em',
            color: colors.tinta,
            margin: '2px 0 0',
          }}
        >
          Bom te ver, Marina<span style={{ color: colors.gramado }}>.</span>
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          type="button"
          className="hide-md"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: colors.giz,
            border: `1px solid ${colors.osso}`,
            borderRadius: 4,
            padding: '9px 14px',
            width: 300,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{ color: colors.cinza, display: 'flex' }}>
            <DashIcon name="search" size={14} />
          </span>
          <span style={{ flex: 1, fontFamily: fonts.text, fontSize: 13, color: colors.cinza }}>
            Buscar atleta, posição...
          </span>
          <kbd
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: colors.cinza,
              border: `1px solid ${colors.osso}`,
              padding: '2px 6px',
              borderRadius: 3,
            }}
          >
            ⌘K
          </kbd>
        </button>
        <button
          type="button"
          aria-label="Nova busca"
          style={{
            width: 38,
            height: 38,
            borderRadius: 4,
            background: colors.tinta,
            color: colors.giz,
            border: 0,
            cursor: 'pointer',
            fontFamily: fonts.text,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          +
        </button>
      </div>
    </header>
  )
}
