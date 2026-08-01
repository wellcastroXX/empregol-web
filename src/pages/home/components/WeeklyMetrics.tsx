import { colors, fonts } from '@/shared/config/theme'

/** Empregos por semana — últimas 7 semanas (valores em % da altura do trilho). */
const SPARK = [42, 58, 51, 67, 73, 80, 89]

export function WeeklyMetrics() {
  return (
    <section
      style={{
        background: colors.osso,
        borderTop: `1px solid ${colors.ossoRule}`,
        borderBottom: `1px solid ${colors.ossoRule}`,
        padding: '40px 40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 22,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.tinta,
          }}
        >
          E S S A · S E M A N A · N A · E M P R E G O L
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: colors.cinza,
          }}
        >
          ATUALIZADO HÁ 12 MIN
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
        <BigMetric value="89" label="empregos" delta="+24%" />
        <BigMetric value="2.847" label="atletas na vitrine" delta="+312" />
        <BigMetric value="312" label="clubes ativos" />
        <BigMetric value="22d" label="tempo médio recolocação" delta="–4d" />
      </div>

      {/* Sparkline strip */}
      <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${colors.ossoRule}` }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colors.cinza,
            }}
          >
            E M P R E G O S · ÚLTIMAS 7 SEMANAS
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.14em',
              color: colors.gramado,
            }}
          >
            ▲ TENDÊNCIA
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
          {SPARK.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v}%`,
                background: i === SPARK.length - 1 ? colors.gramado : colors.tinta,
                opacity: i === SPARK.length - 1 ? 1 : 0.35 + i * 0.06,
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: colors.cinza,
            }}
          >
            14 ABR
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: colors.tinta,
            }}
          >
            04 MAI · 89 →
          </span>
        </div>
      </div>
    </section>
  )
}

interface BigMetricProps {
  value: string
  label: string
  delta?: string
}

function BigMetric({ value, label, delta }: BigMetricProps) {
  return (
    <div style={{ paddingTop: 12, borderTop: `1.5px solid ${colors.tinta}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 56,
            color: colors.tinta,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {value}
        </div>
        {delta && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 14,
              color: colors.gramado,
              letterSpacing: '0.06em',
            }}
          >
            {delta}
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.14em',
          color: colors.cinza,
          textTransform: 'uppercase',
          marginTop: 10,
        }}
      >
        {label}
      </div>
    </div>
  )
}
