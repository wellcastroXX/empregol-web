import { colors, fonts } from '@/shared/config/theme'

interface Figure {
  value: string
  unit?: string
  label: string
  accent?: boolean
}

const FIGURES: readonly Figure[] = [
  { value: '360', unit: 'mil', label: 'atletas registrados no futebol brasileiro' },
  { value: '88', unit: 'mil', label: 'são atletas profissionais' },
  { value: '11–12', unit: 'mil', label: 'têm contrato ativo neste momento', accent: true },
]

/** O TAMANHO DO PROBLEMA — o funil em três números. */
export function ProblemaSection() {
  return (
    <section
      id="problema"
      style={{
        background: colors.osso,
        padding: '110px 40px',
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
        O · T A M A N H O · D O · P R O B L E M A
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
        A maioria dos profissionais do país está, agora mesmo, sem clube
        <span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 48,
          marginBottom: 56,
        }}
      >
        {FIGURES.map((f) => (
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
        Isso significa que a imensa maioria dos atletas profissionais do país está sem clube — sem
        visibilidade, sem renda, sem rede de apoio.{' '}
        <strong>É esse exército de talento esquecido que a Empregol existe para servir.</strong>
      </p>
    </section>
  )
}
