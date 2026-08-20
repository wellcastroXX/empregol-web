import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'

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

/** FECHAMENTO — os dois públicos e a chamada final. */
export function CtaFinal() {
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
          Se você é <strong>atleta</strong>, seu próximo contrato pode estar a um cadastro de
          distância.
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
          Se você é <strong>clube ou agente</strong>, o talento que falta no seu time pode estar
          aqui.
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
        O futuro
        <br />é claro<span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Link
          to={ROUTES.cadastro}
          style={{ ...ctaBase, background: colors.gramado, color: colors.giz }}
        >
          Cadastre-se agora ›
        </Link>
        {/* Não existe página "sobre" ainda; leva à seção que responde isso na
            própria home. O scroll-margin em :target impede o nav fixo de cobrir. */}
        <a
          href="#sobre"
          style={{
            ...ctaBase,
            background: 'transparent',
            color: colors.tinta,
            border: `1.5px solid ${colors.tinta}`,
          }}
        >
          Conheça a Empregol ›
        </a>
      </div>
    </section>
  )
}
