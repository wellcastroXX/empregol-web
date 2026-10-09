import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { Wordmark } from '@/shared/ui/Wordmark'

export interface AuthBrandPanelProps {
  mode: 'login' | 'signup'
}

/** Painel editorial escuro à esquerda — o lado da marca no split. */
export function AuthBrandPanel({ mode }: AuthBrandPanelProps) {
  return (
    <div
      className="hide-md"
      style={{
        background: colors.tinta,
        color: colors.giz,
        padding: 'calc(var(--section-y) * 0.5) var(--page-x)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Fixo na altura da tela: o formulário ao lado muda de tamanho conforme o tipo de
        // conta (atleta, clube, agente) e, se o painel esticasse junto, o texto pulava de
        // lugar. Assim ele fica igual em /entrar e /cadastro e não rola com o formulário.
        position: 'sticky',
        top: 0,
        height: '100vh',
        alignSelf: 'start',
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
              Volte
              <br />
              pro campo<span style={{ color: colors.gramado }}>.</span>
            </>
          ) : (
            <>
              Entre
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
            ? 'Entre e veja quem te procurou.'
            : 'Cadastro em 4 minutos. Apareça pra quem decide a próxima janela.'}
        </p>

        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: `1px solid ${colors.ruleDark}`,
            maxWidth: 400,
          }}
        >
          <p
            style={{
              fontFamily: fonts.text,
              fontStyle: 'italic',
              fontSize: 15,
              lineHeight: 1.55,
              color: colors.gizMuted,
              margin: 0,
            }}
          >
            “E, tendo mandado que a multidão se assentasse sobre a relva, pegando os cinco pães e os
            dois peixes, erguendo os olhos para o céu, os abençoou. Depois, tendo partido os pães,
            deu-os aos discípulos, e estes deram às multidões.”
          </p>
          <Eyebrow surface="dark" size={10} style={{ marginTop: 12, letterSpacing: '0.14em' }}>
            M A T E U S · 1 4 : 1 9
          </Eyebrow>
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
