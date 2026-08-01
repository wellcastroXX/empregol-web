import { colors, fonts } from '@/shared/config/theme'

interface Historia {
  avatar: string
  who: string
  sub: string
  days: string
  quote: string
  variant?: 'ink'
}

const HISTORIAS: readonly Historia[] = [
  {
    avatar: 'FB',
    who: 'F. Borges',
    sub: 'ST · VOLTOU AO PAYSANDU',
    days: '22',
    quote: 'Achei que tinha acabado. Em 22 dias eu tava com contrato.',
  },
  {
    avatar: 'Ma',
    who: 'Marina Soares',
    sub: 'HEAD DE SCOUTING · BOTAFOGO-SP',
    days: '3',
    quote: 'Três cliques no painel e a gente acha o atleta certo pra próxima janela.',
    variant: 'ink',
  },
  {
    avatar: 'RP',
    who: 'R. Pinheiro',
    sub: 'ST · NÁUTICO · 2026',
    days: '14',
    quote: 'Era pra ser pausa de seis meses. Em 14 dias eu tava no Recife.',
  },
]

export function HistoriasSection() {
  return (
    <section style={{ padding: '80px 40px', borderTop: `1px solid ${colors.osso}` }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 36,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinza,
              marginBottom: 8,
            }}
          >
            H I S T Ó R I A S · S E A S O N · 2 0 2 6
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 48,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: colors.tinta,
              margin: 0,
            }}
          >
            Sumir do mapa
            <br />
            não é sumir do jogo<span style={{ color: colors.gramado }}>.</span>
          </h2>
        </div>
        <a
          href="#"
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: colors.tinta,
            textDecoration: 'none',
            borderBottom: `1.5px solid ${colors.tinta}`,
            paddingBottom: 1,
          }}
        >
          VER HISTÓRIAS ›
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {HISTORIAS.map((h) => (
          <HistoriaCard key={h.who} {...h} />
        ))}
      </div>
    </section>
  )
}

function HistoriaCard({ avatar, who, sub, days, quote, variant }: Historia) {
  const dark = variant === 'ink'

  return (
    <div
      style={{
        background: dark ? colors.tinta : colors.giz,
        color: dark ? colors.giz : colors.tinta,
        border: dark ? 'none' : `1px solid ${colors.osso}`,
        borderRadius: 8,
        padding: '28px 26px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        minHeight: 280,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: dark ? colors.ruleDark : colors.osso,
            color: dark ? colors.giz : colors.tinta,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {avatar}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 40,
              color: dark ? colors.giz : colors.tinta,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            {days}
            <span
              style={{
                fontSize: 14,
                color: dark ? colors.cinzaOnDark : colors.cinza,
                marginLeft: 4,
              }}
            >
              d
            </span>
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 9,
              letterSpacing: '0.14em',
              color: dark ? colors.cinzaOnDark : colors.cinza,
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            ATÉ EMPREGAR
          </div>
        </div>
      </div>
      <p
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: dark ? colors.giz : colors.tinta,
          margin: 0,
          flex: 1,
        }}
      >
        "{quote}"
      </p>
      <div
        style={{
          paddingTop: 14,
          borderTop: dark ? `1px solid ${colors.ruleDark}` : `1px solid ${colors.osso}`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 14,
            color: dark ? colors.giz : colors.tinta,
            letterSpacing: '-0.005em',
          }}
        >
          {who}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: '0.14em',
            color: dark ? colors.cinzaOnDark : colors.cinza,
            textTransform: 'uppercase',
            marginTop: 3,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  )
}
