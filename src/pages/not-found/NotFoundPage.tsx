import { Link } from 'react-router-dom'

import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const MESSAGES = defineMessages({
  pt: {
    eyebrow: 'E R R O · 4 0 4',
    title: ['Essa página saiu', 'de campo'],
    back: 'VOLTAR PRO INÍCIO ›',
  },
  en: {
    eyebrow: 'E R R O R · 4 0 4',
    title: ['This page has left', 'the pitch'],
    back: 'BACK TO HOME ›',
  },
  es: {
    eyebrow: 'E R R O R · 4 0 4',
    title: ['Esta página salió', 'de la cancha'],
    back: 'VOLVER AL INICIO ›',
  },
})

export default function NotFoundPage() {
  const m = useMessages(MESSAGES)

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
        {m.eyebrow}
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
        {m.title[0]}
        <br />
        {m.title[1]}
        <span style={{ color: colors.gramado }}>.</span>
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
        {m.back}
      </Link>
    </section>
  )
}
