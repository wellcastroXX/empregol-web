import { FEATURED_ATHLETE } from '@/features/athletes/api/showcase-athletes.mock'
import { FormationPitch } from '@/features/athletes/ui/FormationPitch'
import { colors, fonts } from '@/shared/config/theme'

/** Destaque da semana — banda escura com foto, números e posição em campo. */
export function DestaqueSection() {
  const lucas = FEATURED_ATHLETE

  return (
    <section style={{ background: colors.tinta, color: colors.giz, padding: '80px 40px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 36,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.cinzaOnDark,
          }}
        >
          D E S T A Q U E · D A · S E M A N A
        </div>
        <a
          href="#"
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: colors.giz,
            textDecoration: 'none',
          }}
        >
          VER TODOS ›
        </a>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 60,
          alignItems: 'end',
        }}
      >
        {/* Foto + número da camisa */}
        <div style={{ position: 'relative', width: 320, height: 320, flexShrink: 0 }}>
          <img
            src={lucas.photo}
            alt={lucas.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
          />
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 18,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 64,
              lineHeight: 0.9,
              color: colors.giz,
              letterSpacing: '-0.04em',
              textShadow: '0 2px 6px rgba(0,0,0,0.45)',
            }}
          >
            {lucas.num}
          </div>
        </div>

        {/* Nome + meta + números */}
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '5px 9px',
              borderRadius: 2,
              background: colors.gramado,
              color: colors.giz,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            LIVRE
          </span>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 88,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: colors.giz,
              margin: '0 0 10px',
            }}
          >
            Lucas
            <br />
            Henrique<span style={{ color: colors.gramado }}>.</span>
          </h2>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinzaOnDark,
            }}
          >
            A T A C A N T E · 2 7 A N O S · E X - V I T Ó R I A
          </div>
          <div
            style={{
              display: 'flex',
              gap: 36,
              marginTop: 32,
              paddingTop: 18,
              borderTop: `1px solid ${colors.ruleDark}`,
            }}
          >
            <DarkStat value="14" label="gols / 24" />
            <DarkStat value="1.872'" label="minutos" />
            <DarkStat value="32" label="jogos" />
            <DarkStat value="78" label="atributo geral" accent />
          </div>
          <div style={{ marginTop: 24 }}>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 14,
                color: colors.giz,
                textDecoration: 'none',
                padding: '14px 18px',
                borderRadius: 4,
                border: `1.5px solid ${colors.giz}`,
              }}
            >
              VER PERFIL COMPLETO ›
            </a>
          </div>
        </div>

        {/* Formação — posição em campo (superfície noturna) */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinzaOnDark,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            P O S I Ç Ã O · E M · C A M P O
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormationPitch formation="4-4-2" highlight="ST" size={150} showLabels surface="dark" />
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: `1px solid ${colors.ruleDark}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: '0.14em',
                color: colors.gramado,
                textTransform: 'uppercase',
              }}
            >
              ST · ATACANTE
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: '0.14em',
                color: colors.cinzaOnDark,
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              FORMAÇÃO · 4-4-2
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface DarkStatProps {
  value: string
  label: string
  accent?: boolean
}

function DarkStat({ value, label, accent }: DarkStatProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 32,
          color: accent ? colors.gramado : colors.giz,
          lineHeight: 1,
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
          color: colors.cinzaOnDark,
          textTransform: 'uppercase',
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  )
}
