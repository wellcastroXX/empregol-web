import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { Wordmark } from '@/shared/ui/Wordmark'

const STATS = [
  ['2.847', 'atletas livres'],
  ['312', 'clubes ativos'],
  ['89', 'empregos / semana'],
] as const

export interface AuthBrandPanelProps {
  mode: 'login' | 'signup'
}

/** Painel editorial escuro à esquerda — o lado da marca no split. */
export function AuthBrandPanel({ mode }: AuthBrandPanelProps) {
  return (
    <div
      style={{
        background: colors.tinta,
        color: colors.giz,
        padding: '48px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        // Contém o granulado, no mesmo esquema do hero da home.
        isolation: 'isolate',
      }}
    >
      <div className="hero-grain" aria-hidden="true" />

      <a href="/" style={{ position: 'relative', zIndex: 3 }}>
        <Wordmark variant="cream" height={24} />
      </a>

      <div style={{ position: 'relative', zIndex: 3 }}>
        <Eyebrow surface="dark" style={{ marginBottom: 20 }}>
          S E A S O N · 2 0 2 6
        </Eyebrow>

        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(44px, 5vw, 80px)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {mode === 'login' ? (
            <>
              Volta
              <br />
              pro campo<span style={{ color: colors.gramado }}>.</span>
            </>
          ) : (
            <>
              Entra
              <br />
              pro jogo<span style={{ color: colors.gramado }}>.</span>
            </>
          )}
        </h2>

        <p
          style={{
            fontFamily: fonts.text,
            fontSize: 16,
            lineHeight: 1.55,
            color: colors.gizMuted,
            margin: '22px 0 0',
            maxWidth: 400,
          }}
        >
          {mode === 'login'
            ? '312 clubes olham hoje. Entra e vê quem te procurou.'
            : 'Cadastro em 4 minutos. Apareça pra quem decide a próxima janela.'}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 36,
            marginTop: 40,
            paddingTop: 24,
            borderTop: `1px solid ${colors.ruleDark}`,
          }}
        >
          {STATS.map(([value, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 28,
                  lineHeight: 1,
                  color: colors.giz,
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                {value}
              </div>
              <Eyebrow surface="dark" size={10} style={{ marginTop: 6, letterSpacing: '0.14em' }}>
                {label}
              </Eyebrow>
            </div>
          ))}
        </div>
      </div>

      <Eyebrow surface="dark" size={10} style={{ position: 'relative', zIndex: 3 }}>
        © 2026 · EMPREGOL · BRASIL
      </Eyebrow>

      {/* Camisa fantasma — o motivo gráfico do kit, atrás do granulado */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: -40,
          bottom: -80,
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 420,
          color: colors.tintaElev,
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          zIndex: 0,
        }}
      >
        09
      </div>
    </div>
  )
}
