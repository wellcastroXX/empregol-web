import { Link } from 'react-router-dom'

import { colors, fonts } from '@/shared/config/theme'

export default function NotFoundPage() {
  return (
    <section style={{ padding: '120px 40px 160px' }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: colors.cinza,
          marginBottom: 18,
        }}
      >
        E R R O · 4 0 4
      </div>
      <h1
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(44px, 6vw, 96px)',
          lineHeight: 0.92,
          letterSpacing: '-0.025em',
          color: colors.tinta,
          margin: '0 0 28px',
        }}
      >
        Essa página saiu
        <br />
        de campo<span style={{ color: colors.gramado }}>.</span>
      </h1>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '0.12em',
          color: colors.tinta,
          textDecoration: 'none',
          padding: '14px 18px',
          borderRadius: 4,
          border: `1.5px solid ${colors.tinta}`,
        }}
      >
        VOLTAR PRO INÍCIO ›
      </Link>
    </section>
  )
}
