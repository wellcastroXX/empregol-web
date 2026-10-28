import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const ctaBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '18px 26px',
  borderRadius: 4,
  fontFamily: fonts.text,
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
} as const

const MESSAGES = defineMessages({
  pt: {
    athleteBefore: 'Se você é',
    athleteStrong: 'atleta',
    athleteAfter: ', seu próximo contrato pode estar a um cadastro de distância.',
    clubBefore: 'Se você é',
    clubStrong: 'clube ou agência',
    clubAfter: ', o talento que falta no seu time pode estar aqui.',
    title: ['O futuro', 'é claro'],
    signUp: 'Cadastre-se agora ›',
    about: 'Conheça a Empregol ›',
  },
  en: {
    athleteBefore: 'If you are an',
    athleteStrong: 'athlete',
    athleteAfter: ', your next contract may be just one sign-up away.',
    clubBefore: 'If you are a',
    clubStrong: 'club or agency',
    clubAfter: ', the talent your team is missing may be right here.',
    title: ['The future', 'is clear'],
    signUp: 'Sign up now ›',
    about: 'Discover Empregol ›',
  },
  es: {
    athleteBefore: 'Si eres',
    athleteStrong: 'atleta',
    athleteAfter: ', tu próximo contrato puede estar a un registro de distancia.',
    clubBefore: 'Si eres un',
    clubStrong: 'club o agencia',
    clubAfter: ', el talento que le falta a tu equipo puede estar aquí.',
    title: ['El futuro', 'es claro'],
    signUp: 'Regístrate ahora ›',
    about: 'Conoce Empregol ›',
  },
})

/** FECHAMENTO — os dois públicos e a chamada final. */
export function CtaFinal() {
  const m = useMessages(MESSAGES)

  return (
    <section
      style={{
        background: colors.creme,
        padding: 'var(--section-y) var(--page-x)',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-2)',
          gap: 'var(--gap-md)',
          marginBottom: 72,
        }}
      >
        <p
          style={{
            fontFamily: fonts.text,
            fontSize: 'clamp(16px, 1.5vw, 21px)',
            lineHeight: 1.55,
            color: colors.tinta,
            margin: 0,
            paddingTop: 22,
            borderTop: `1.5px solid ${colors.tinta}`,
          }}
        >
          {m.athleteBefore} <strong>{m.athleteStrong}</strong>
          {m.athleteAfter}
        </p>
        <p
          style={{
            fontFamily: fonts.text,
            fontSize: 'clamp(16px, 1.5vw, 21px)',
            lineHeight: 1.55,
            color: colors.tinta,
            margin: 0,
            paddingTop: 22,
            borderTop: `1.5px solid ${colors.tinta}`,
          }}
        >
          {m.clubBefore} <strong>{m.clubStrong}</strong>
          {m.clubAfter}
        </p>
      </div>

      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(56px, 12vw, 200px)',
          lineHeight: 0.86,
          letterSpacing: '-0.035em',
          color: colors.tinta,
          margin: '0 0 56px',
          textTransform: 'uppercase',
        }}
      >
        {m.title[0]}
        <br />
        {m.title[1]}
        <span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Link
          to={ROUTES.cadastro}
          style={{ ...ctaBase, background: colors.gramado, color: colors.giz, borderRadius: 30 }}
        >
          {m.signUp}
        </Link>
        {/* Não existe página "sobre" ainda; leva à seção que responde isso na
            própria home. O scroll-margin em :target impede o nav fixo de cobrir. */}
        <a
          href="#sobre"
          style={{
            ...ctaBase,
            background: 'transparent',
            color: colors.tinta,
            borderRadius: 30,
            border: `1.5px solid ${colors.tinta}`,
          }}
        >
          {m.about}
        </a>
      </div>
    </section>
  )
}
