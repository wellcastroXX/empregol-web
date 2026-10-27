import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { Wordmark } from '@/shared/ui/Wordmark'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const MESSAGES = defineMessages({
  pt: {
    login: ['Volte', 'pro campo'],
    signup: ['Entre', 'pro jogo'],
    loginLead: 'Entre e veja quem te procurou.',
    signupLead: 'Cadastro em 4 minutos. Apareça pra quem decide a próxima janela.',
    quote:
      '“E, tendo mandado que a multidão se assentasse sobre a relva, pegando os cinco pães e os dois peixes, erguendo os olhos para o céu, os abençoou. Depois, tendo partido os pães, deu-os aos discípulos, e estes deram às multidões.”',
    quoteSource: 'M A T E U S · 1 4 : 1 9',
    copyright: '© 2026 · EMPREGOL · BRASIL',
  },
  en: {
    login: ['Back', 'on the pitch'],
    signup: ['Get', 'in the game'],
    loginLead: 'Sign in and see who has been looking for you.',
    signupLead: 'Sign up in 4 minutes. Get seen by the people who decide the next window.',
    quote:
      '“And he commanded the multitude to sit down on the grass, and took the five loaves, and the two fishes, and looking up to heaven, he blessed, and brake, and gave the loaves to his disciples, and the disciples to the multitude.”',
    quoteSource: 'M A T T H E W · 1 4 : 1 9',
    copyright: '© 2026 · EMPREGOL · BRAZIL',
  },
  es: {
    login: ['Vuelve', 'a la cancha'],
    signup: ['Entra', 'al juego'],
    loginLead: 'Entra y mira quién te buscó.',
    signupLead: 'Registro en 4 minutos. Hazte ver por quienes deciden el próximo mercado de pases.',
    quote:
      '“Y mandando a las gentes recostarse sobre la hierba, tomando los cinco panes y los dos peces, alzando los ojos al cielo, bendijo, y partió y dio los panes a los discípulos, y los discípulos a las gentes.”',
    quoteSource: 'M A T E O · 1 4 : 1 9',
    copyright: '© 2026 · EMPREGOL · BRASIL',
  },
})

export interface AuthBrandPanelProps {
  mode: 'login' | 'signup'
}

/** Painel editorial escuro à esquerda — o lado da marca no split. */
export function AuthBrandPanel({ mode }: AuthBrandPanelProps) {
  const m = useMessages(MESSAGES)
  const [first, second] = m[mode]

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
          {first}
          <br />
          {second}
          <span style={{ color: colors.gramado }}>.</span>
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
          {mode === 'login' ? m.loginLead : m.signupLead}
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
            {m.quote}
          </p>
          <Eyebrow surface="dark" size={10} style={{ marginTop: 12, letterSpacing: '0.14em' }}>
            {m.quoteSource}
          </Eyebrow>
        </div>
      </div>

      <Eyebrow surface="dark" size={10} style={{ position: 'relative', zIndex: 3 }}>
        {m.copyright}
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
