import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

interface Figure {
  value: string
  unit?: string
  label: string
  accent?: boolean
}

const MESSAGES = defineMessages<{
  eyebrow: string
  title: string
  figures: readonly Figure[]
  bodyBefore: string
  bodyStrong: string
}>({
  pt: {
    eyebrow: 'O · T A M A N H O · D O · P R O B L E M A',
    title: 'A maioria dos profissionais do país está, agora mesmo, sem clube',
    figures: [
      {
        value: '360',
        unit: 'mil',
        label: 'atletas registrados no futebol brasileiro',
      },
      {
        value: '88',
        unit: 'mil',
        label: 'são atletas profissionais',
      },
      { value: '11–12', unit: 'mil', label: 'têm contrato ativo neste momento', accent: true },
    ],
    bodyBefore:
      'Isso significa que a imensa maioria dos atletas profissionais do país está sem clube — sem visibilidade, sem renda, sem rede de apoio.',
    bodyStrong: 'É esse exército de talento esquecido que a Empregol existe para servir.',
  },
  en: {
    eyebrow: 'T H E · S I Z E · O F · T H E · P R O B L E M',
    title: 'Most of the country’s professionals are without a club right now',
    figures: [
      { value: '360', unit: 'k', label: 'registered athletes in Brazilian football' },
      { value: '88', unit: 'k', label: 'are professional athletes' },
      { value: '11–12', unit: 'k', label: 'have an active contract right now', accent: true },
    ],
    bodyBefore:
      'That means the vast majority of the country’s professional athletes have no club — no visibility, no income, no support network.',
    bodyStrong: 'This army of forgotten talent is who Empregol exists to serve.',
  },
  es: {
    eyebrow: 'E L · T A M A Ñ O · D E L · P R O B L E M A',
    title: 'La mayoría de los profesionales del país está, ahora mismo, sin club',
    figures: [
      { value: '360', unit: 'mil', label: 'atletas registrados en el fútbol brasileño' },
      { value: '88', unit: 'mil', label: 'son atletas profesionales' },
      {
        value: '11–12',
        unit: 'mil',
        label: 'tienen contrato vigente en este momento',
        accent: true,
      },
    ],
    bodyBefore:
      'Eso significa que la inmensa mayoría de los atletas profesionales del país está sin club — sin visibilidad, sin ingresos, sin red de apoyo.',
    bodyStrong: 'Es a ese ejército de talento olvidado al que Empregol existe para servir.',
  },
})

/** O TAMANHO DO PROBLEMA — o funil em três números. */
export function ProblemaSection() {
  const m = useMessages(MESSAGES)

  return (
    <section
      id="problema"
      style={{
        background: colors.osso,
        padding: 'var(--section-y) var(--page-x)',
        borderTop: `1px solid ${colors.ossoRule}`,
        borderBottom: `1px solid ${colors.ossoRule}`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: colors.cinza,
          marginBottom: 40,
        }}
      >
        {m.eyebrow}
      </div>

      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(32px, 4.4vw, 68px)',
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          color: colors.tinta,
          margin: '0 0 72px',
          maxWidth: 1100,
        }}
      >
        {m.title}
        <span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-3)',
          gap: 'var(--gap-md)',
          marginBottom: 56,
        }}
      >
        {m.figures.map((f) => (
          <div key={f.label} style={{ paddingTop: 20, borderTop: `1.5px solid ${colors.tinta}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 'clamp(48px, 6.5vw, 104px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: f.accent ? colors.gramado : colors.tinta,
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                {f.value}
              </span>
              {f.unit && (
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 500,
                    fontSize: 'clamp(16px, 1.8vw, 26px)',
                    letterSpacing: '0.02em',
                    color: f.accent ? colors.gramado : colors.cinza,
                  }}
                >
                  {f.unit}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: colors.cinza,
                marginTop: 18,
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              {f.label}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: fonts.text,
          fontSize: 'clamp(15px, 1.3vw, 18px)',
          lineHeight: 1.6,
          color: colors.tinta,
          margin: 0,
          maxWidth: 780,
          paddingTop: 32,
          borderTop: `1px solid ${colors.ossoRule}`,
        }}
      >
        {m.bodyBefore} <strong>{m.bodyStrong}</strong>
      </p>
    </section>
  )
}
