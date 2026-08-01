import { colors, fonts } from '@/shared/config/theme'

const eyebrowStyle = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: colors.cinza,
} as const

export function Hero() {
  return (
    <section style={{ padding: '40px 40px 80px', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 24,
        }}
      >
        <div style={eyebrowStyle}>E M P R E G O L · 0 4 · M A I · 2 0 2 6</div>
        <div style={eyebrowStyle}>S E A S O N · 2 0 2 6</div>
      </div>
      <div style={{ height: 1.5, background: colors.tinta, marginBottom: 28 }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 'clamp(60px, 8vw, 124px)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: colors.tinta,
              margin: 0,
            }}
          >
            Atleta livre
            <br />
            não é atleta
            <br />
            esquecido<span style={{ color: colors.gramado }}>..</span>
          </h1>
        </div>
        <div style={{ paddingTop: 18 }}>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 18,
              lineHeight: 1.5,
              color: colors.tinta,
              margin: '0 0 28px',
            }}
          >
            Empregol é a ponte entre atletas sem clube e quem decide a próxima janela. Cadastre-se
            em 4 minutos. Apareça pra <strong>312 clubes</strong> hoje.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
            <button
              type="button"
              style={{
                background: colors.gramado,
                color: colors.giz,
                border: 0,
                padding: '16px 22px',
                borderRadius: 4,
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              SOU ATLETA ›
            </button>
            <button
              type="button"
              style={{
                background: colors.tinta,
                color: colors.giz,
                border: 0,
                padding: '16px 22px',
                borderRadius: 4,
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              SOU CLUBE ›
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 28,
              paddingTop: 22,
              borderTop: `1.5px solid ${colors.tinta}`,
            }}
          >
            <Stat value="2.847" label="atletas livres" />
            <Stat value="312" label="clubes ativos" />
            <Stat value="89" label="empregos / semana" />
          </div>
        </div>
      </div>
    </section>
  )
}

interface StatProps {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 32,
          color: colors.tinta,
          lineHeight: 1,
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.14em',
          color: colors.cinza,
          textTransform: 'uppercase',
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  )
}
