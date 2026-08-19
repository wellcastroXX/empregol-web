import { colors, fonts } from '@/shared/config/theme'
import { Wordmark } from '@/shared/ui/Wordmark'

const STATS = [
  ['312', 'viram hoje'],
  ['4', 'propostas'],
  ['22d', 'na vitrine'],
] as const

const TABS = ['FEED', 'CONVERSAS', 'PERFIL'] as const

/** Prévia do app dentro de um aparelho — o mesmo conteúdo da home do app. */
export function PhoneMock() {
  return (
    <div
      style={{
        width: 300,
        height: 600,
        background: colors.creme,
        borderRadius: '40px 40px 0 0',
        border: '9px solid #26261f',
        borderBottom: 'none',
        boxShadow: '0 -8px 60px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px 22px 8px',
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          color: colors.tinta,
        }}
      >
        <span>9:41</span>
        <span>●●●● 5G</span>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 18px 12px',
          borderBottom: `1px solid ${colors.osso}`,
        }}
      >
        <Wordmark variant="dark" height={15} decorative />
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 2,
            background: colors.tinta,
            color: colors.giz,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.mono,
            fontWeight: 600,
            fontSize: 10,
          }}
        >
          09
        </span>
      </div>

      <div style={{ padding: '16px 18px', flex: 1 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.cinza,
          }}
        >
          QUI · 24 MAI
        </div>
        <p
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 26,
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            color: colors.tinta,
            margin: '6px 0 0',
          }}
        >
          4 clubes te viram
          <br />
          essa semana<span style={{ color: colors.gramado }}>..</span>
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
            padding: '14px 0',
            marginTop: 14,
            borderTop: `1.5px solid ${colors.tinta}`,
            borderBottom: `1px solid ${colors.osso}`,
          }}
        >
          {STATS.map(([value, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 20,
                  color: colors.tinta,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 8,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: colors.cinza,
                  marginTop: 4,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: colors.tinta,
            color: colors.giz,
            borderRadius: 8,
            padding: 14,
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 8.5,
                letterSpacing: '0.14em',
                color: colors.cinzaOnDark,
                textTransform: 'uppercase',
              }}
            >
              NOVO · HÁ 12 MIN
            </span>
            <span
              style={{
                background: colors.gramado,
                color: colors.giz,
                padding: '2px 6px',
                borderRadius: 2,
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 8,
                letterSpacing: '0.1em',
              }}
            >
              TESTE
            </span>
          </div>
          <div
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 16, lineHeight: 1.15 }}
          >
            Botafogo-SP marcou
            <br />
            um teste<span style={{ color: colors.gramado }}>.</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
              paddingTop: 10,
              borderTop: `1px solid ${colors.ruleDark}`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 9.5,
                letterSpacing: '0.1em',
              }}
            >
              QUI · 24 MAI · 14H
            </span>
            <span
              style={{
                background: colors.gramado,
                color: colors.giz,
                padding: '6px 10px',
                borderRadius: 3,
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 10,
              }}
            >
              CONFIRMA
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '12px 0 18px',
          borderTop: `1px solid ${colors.osso}`,
          background: colors.creme,
        }}
      >
        {TABS.map((tab, i) => (
          <span
            key={tab}
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 8.5,
              letterSpacing: '0.14em',
              color: i === 0 ? colors.tinta : colors.cinza,
            }}
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  )
}
