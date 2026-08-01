import { FEATURED_ATHLETE } from '@/features/athletes/api/showcase-athletes.mock'
import {
  ATTRS_LABELS_FULL,
  RADAR_COMPARE_ST,
  averageOf,
} from '@/features/athletes/model/attributes'
import { FormationPitch } from '@/features/athletes/ui/FormationPitch'
import { colors, fonts } from '@/shared/config/theme'

/** Formação da semana — atributos do destaque contra a média da Série B. */
export function FormationShowcase() {
  const a = FEATURED_ATHLETE
  const rows = ATTRS_LABELS_FULL.map((label, i) => ({
    label,
    value: a.attrs[i] ?? 0,
    compare: RADAR_COMPARE_ST[i] ?? 0,
  }))
  const overallCompare = averageOf(RADAR_COMPARE_ST)

  return (
    <section
      style={{
        background: colors.creme,
        padding: '90px 40px',
        borderTop: `1px solid ${colors.osso}`,
        borderBottom: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* ESQUERDA — meta + breakdown */}
        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinza,
              marginBottom: 14,
            }}
          >
            F O R M A Ç Ã O · D A · S E M A N A
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 64,
              lineHeight: 0.96,
              letterSpacing: '-0.022em',
              color: colors.tinta,
              margin: 0,
            }}
          >
            Onde cada atleta
            <br />
            joga, no
            <br />
            campo<span style={{ color: colors.gramado }}>.</span>
          </h2>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 16,
              lineHeight: 1.5,
              color: colors.tinta,
              margin: '22px 0 0',
              maxWidth: 460,
            }}
          >
            Cada atleta da Empregol tem posição natural e secundária marcadas em campo, com os
            atributos por trás. <strong>Clube vê onde encaixa antes de chamar.</strong>
          </p>

          {/* Geral lado a lado */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 32,
              marginTop: 36,
              paddingTop: 22,
              borderTop: `1.5px solid ${colors.tinta}`,
            }}
          >
            <ScoreBig label="L. HENRIQUE" value={a.overall} hint="GERAL" />
            <ScoreBig label="MÉDIA ST · SÉRIE B" value={overallCompare} hint="GERAL" muted />
          </div>

          {/* Barras de atributo */}
          <div style={{ marginTop: 28 }}>
            {rows.map((d) => (
              <AttrBar key={d.label} label={d.label} value={d.value} compare={d.compare} />
            ))}
          </div>
        </div>

        {/* DIREITA — campo grande */}
        <div
          style={{
            background: colors.giz,
            border: `1px solid ${colors.osso}`,
            borderRadius: 8,
            padding: '36px 36px 30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 28,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 36,
                  color: colors.tinta,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                09
              </span>
              <div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    fontSize: 20,
                    color: colors.tinta,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.05,
                  }}
                >
                  Lucas Henrique
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: colors.cinza,
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}
                >
                  ST · 27 · EX-VITÓRIA
                </div>
              </div>
            </div>
            <span
              style={{
                padding: '5px 9px',
                borderRadius: 2,
                background: colors.gramado,
                color: colors.giz,
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
              }}
            >
              LIVRE
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormationPitch formation="4-4-2" highlight="ST" size={300} showLabels />
          </div>

          {/* Legenda */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 28,
              marginTop: 24,
              paddingTop: 18,
              borderTop: `1px solid ${colors.osso}`,
            }}
          >
            <PitchLegend accent label="POSIÇÃO NATURAL · ST" />
            <PitchLegend label="FORMAÇÃO · 4-4-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

interface PitchLegendProps {
  accent?: boolean
  label: string
}

function PitchLegend({ accent, label }: PitchLegendProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: accent ? colors.gramado : colors.nodeMuted,
          display: 'inline-block',
        }}
      />
      <span
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.14em',
          color: accent ? colors.tinta : colors.cinza,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

interface ScoreBigProps {
  label: string
  value: number
  hint: string
  muted?: boolean
}

function ScoreBig({ label, value, hint, muted }: ScoreBigProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.14em',
          color: colors.cinza,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 64,
          color: muted ? colors.cinza : colors.tinta,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          marginTop: 8,
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.14em',
          color: colors.cinza,
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        {hint}
      </div>
    </div>
  )
}

interface AttrBarProps {
  label: string
  value: number
  compare: number
}

function AttrBar({ label, value, compare }: AttrBarProps) {
  const delta = value - compare
  const positive = delta >= 0

  return (
    <div style={{ padding: '12px 0', borderTop: `1px solid ${colors.osso}` }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: fonts.text,
            fontSize: 14,
            fontWeight: 500,
            color: colors.tinta,
            textTransform: 'capitalize',
          }}
        >
          {label.toLowerCase()}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.10em',
              color: positive ? colors.gramado : colors.statusWarn,
              textTransform: 'uppercase',
            }}
          >
            {positive ? '+' : ''}
            {delta}
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 18,
              color: colors.tinta,
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            {value}
          </span>
        </div>
      </div>
      <div style={{ position: 'relative', height: 5, background: colors.osso, borderRadius: 999 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${value}%`,
            background: colors.tinta,
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `calc(${compare}% - 1.5px)`,
            top: -4,
            width: 3,
            height: 13,
            background: colors.cinza,
          }}
        />
      </div>
    </div>
  )
}
