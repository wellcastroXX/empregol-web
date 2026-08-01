import { colors, fonts } from '@/shared/config/theme'

const CLUBES = [
  'NÁUTICO',
  'AVAÍ',
  'PONTE PRETA',
  'OPERÁRIO',
  'BRUSQUE',
  'CRB',
  'PAYSANDU',
  'GUARANI',
] as const

export function ConfiamSection() {
  return (
    <section style={{ padding: '50px 40px', borderTop: `1px solid ${colors.osso}` }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: colors.cinza,
          marginBottom: 22,
        }}
      >
        C O N F I A M · 3 1 2 · C L U B E S
      </div>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
        {CLUBES.map((c) => (
          <span
            key={c}
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: '-0.005em',
              color: colors.tinta,
              opacity: 0.85,
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  )
}
