import {
  RECENT_ACTIVITY,
  SAVED_SEARCHES,
  SCOUT_MATCHES,
  type ActivityTone,
  type ScoutMatch,
} from '@/features/athletes/api/scout-matches.mock'
import type { StatusVariant } from '@/features/athletes/model/athlete.types'
import { FormationPitch } from '@/features/athletes/ui/FormationPitch'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { DashIcon } from './DashIcon'

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

const TONE: Record<ActivityTone, string> = {
  accent: colors.gramado,
  ink: colors.tinta,
  muted: colors.cinza,
}

const TAG_BG: Record<StatusVariant, string> = {
  livre: colors.gramado,
  ink: colors.tinta,
  warn: colors.statusWarn,
}

/** Visão geral do painel: KPIs, matches, destaque, buscas salvas e atividade. */
export function DashOverview() {
  return (
    <main style={{ padding: '28px 32px 60px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <KpiCard value="43" label="novos no radar" delta="+12 hoje" />
        <KpiCard value="12" label="na shortlist" delta="+3 semana" />
        <KpiCard value="4" label="conversas ativas" />
        <KpiCard value="7" label="buscas restantes" muted />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <section style={cardStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 18,
              gap: 16,
            }}
          >
            <div>
              <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
                MATCH · COM TEUS FILTROS
              </Eyebrow>
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: '-0.015em',
                  color: colors.tinta,
                  margin: 0,
                }}
              >
                ST livres pra tua janela
              </h2>
            </div>
            <a
              href="#"
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: '0.12em',
                color: colors.tinta,
                textDecoration: 'none',
                borderBottom: `1.5px solid ${colors.tinta}`,
                paddingBottom: 1,
                whiteSpace: 'nowrap',
              }}
            >
              VER 43 ›
            </a>
          </div>

          {SCOUT_MATCHES.map((match) => (
            <MatchRow key={match.num} match={match} />
          ))}
        </section>

        <section
          style={{
            background: colors.tinta,
            color: colors.giz,
            borderRadius: 10,
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Eyebrow surface="dark" size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
            DESTAQUE · DA · SEMANA
          </Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
            <span
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 30,
                letterSpacing: '-0.03em',
              }}
            >
              09
            </span>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 20,
                letterSpacing: '-0.015em',
                margin: 0,
              }}
            >
              L. Henrique
            </h2>
          </div>
          <Eyebrow surface="dark" size={9.5} style={{ letterSpacing: '0.14em' }}>
            ST · 27 · LIVRE
          </Eyebrow>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <FormationPitch formation="4-4-2" highlight="ST" size={132} showLabels surface="dark" />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: 14,
              borderTop: `1px solid ${colors.ruleDark}`,
              marginTop: 'auto',
            }}
          >
            <div>
              <Eyebrow surface="dark" size={9} style={{ letterSpacing: '0.14em' }}>
                GERAL
              </Eyebrow>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 24,
                  marginTop: 2,
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                78
              </div>
            </div>
            <button
              type="button"
              style={{
                background: colors.gramado,
                color: colors.giz,
                border: 0,
                borderRadius: 4,
                padding: '10px 16px',
                cursor: 'pointer',
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              CONVIDAR ›
            </button>
          </div>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
        <section style={cardStyle}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: '-0.015em',
              color: colors.tinta,
              margin: '0 0 16px',
            }}
          >
            Buscas salvas
          </h2>
          {SAVED_SEARCHES.map((search) => (
            <div
              key={search.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderTop: `1px solid ${colors.osso}`,
              }}
            >
              <span style={{ color: colors.tinta, display: 'flex' }}>
                <DashIcon name="bookmark" size={16} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: fonts.text,
                    fontWeight: 500,
                    fontSize: 14,
                    color: colors.tinta,
                  }}
                >
                  {search.name}
                </div>
                <Eyebrow size={10} style={{ letterSpacing: '0.12em', marginTop: 2 }}>
                  {search.count}
                </Eyebrow>
              </div>
              {search.badge && (
                <span
                  style={{
                    background: colors.gramado,
                    color: colors.giz,
                    padding: '3px 7px',
                    borderRadius: 2,
                    fontFamily: fonts.mono,
                    fontWeight: 500,
                    fontSize: 9,
                    letterSpacing: '0.10em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {search.badge}
                </span>
              )}
              <span aria-hidden="true" style={{ color: colors.tinta, fontSize: 16 }}>
                ›
              </span>
            </div>
          ))}
        </section>

        <section style={cardStyle}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: '-0.015em',
              color: colors.tinta,
              margin: '0 0 16px',
            }}
          >
            Atividade recente
          </h2>
          {RECENT_ACTIVITY.map((item) => (
            <div
              key={`${item.who}-${item.time}`}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 0',
                borderTop: `1px solid ${colors.osso}`,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: TONE[item.tone],
                  marginTop: 5,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  flex: 1,
                  fontFamily: fonts.text,
                  fontSize: 13,
                  color: colors.tinta,
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                <strong style={{ fontWeight: 600 }}>{item.who}</strong>{' '}
                <span style={{ color: colors.cinza }}>{item.what}</span>
              </p>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: '0.10em',
                  color: colors.cinza,
                  flexShrink: 0,
                }}
              >
                {item.time}
              </span>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

interface KpiCardProps {
  value: string
  label: string
  delta?: string
  muted?: boolean
}

function KpiCard({ value, label, delta, muted }: KpiCardProps) {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 40,
            color: muted ? colors.cinza : colors.tinta,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {value}
        </span>
        {delta && (
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              color: colors.gramado,
              letterSpacing: '0.04em',
            }}
          >
            {delta}
          </span>
        )}
      </div>
      <Eyebrow size={10} style={{ letterSpacing: '0.14em', marginTop: 10 }}>
        {label}
      </Eyebrow>
    </div>
  )
}

function MatchRow({ match }: { match: ScoutMatch }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr) auto auto auto',
        gap: 16,
        alignItems: 'center',
        padding: '12px 0',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 4,
          background: colors.osso,
          color: colors.tinta,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 5px 2px',
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 22,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
        }}
      >
        {match.num}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 15,
              color: colors.tinta,
            }}
          >
            {match.name}
          </span>
          <span
            style={{
              background: TAG_BG[match.tagVar],
              color: colors.giz,
              padding: '3px 7px',
              borderRadius: 2,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 9,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
            }}
          >
            {match.tag}
          </span>
        </div>
        <Eyebrow size={9.5} style={{ letterSpacing: '0.12em', marginTop: 3 }}>
          {match.meta}
        </Eyebrow>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: fonts.mono, fontWeight: 500, fontSize: 15, color: colors.tinta }}>
          {match.gols}
        </div>
        <Eyebrow size={8.5} style={{ letterSpacing: '0.12em' }}>
          GOLS
        </Eyebrow>
      </div>

      <div style={{ width: 40 }}>
        <FormationPitch formation={match.formation} highlight={match.pos} size={30} />
      </div>

      <div style={{ textAlign: 'center', minWidth: 30 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 18,
            color: colors.tinta,
            lineHeight: 1,
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {match.overall}
        </div>
        <Eyebrow size={8} style={{ letterSpacing: '0.14em', marginTop: 2 }}>
          OVR
        </Eyebrow>
      </div>
    </div>
  )
}
