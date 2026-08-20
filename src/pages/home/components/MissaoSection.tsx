import { colors, fonts } from '@/shared/config/theme'
import { MediaPlaceholder } from '@/shared/ui/MediaPlaceholder'

/** NOSSA MISSÃO — a declaração de propósito, sobre superfície escura. */
export function MissaoSection() {
  return (
    <section
      id="missao"
      style={{
        background: colors.tinta,
        color: colors.giz,
        padding: 'var(--section-y) var(--page-x)',
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
          marginBottom: 40,
        }}
      >
        N O S S A · M I S S Ã O
      </div>

      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(44px, 8vw, 132px)',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          color: colors.giz,
          margin: '0 0 72px',
          textTransform: 'uppercase',
        }}
      >
        Mais do que
        <br />
        empregar, queremos
        <br />
        transformar<span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-split-l)',
          gap: 'var(--gap-lg)',
          alignItems: 'start',
          paddingTop: 44,
          borderTop: `1px solid ${colors.ruleDark}`,
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.6,
              color: colors.giz,
              margin: '0 0 22px',
            }}
          >
            Acreditamos que todo atleta — especialmente aqueles que vêm de contextos vulneráveis —
            merece presença digital, conexões reais e ferramentas para construir seu próprio
            caminho, dentro ou fora de campo. Por isso também inspiramos nossos atletas a enxergar o
            empreendedorismo como um caminho possível, não só uma alternativa quando o futebol
            acaba.
          </p>
          <p
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 'clamp(20px, 2vw, 30px)',
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
              color: colors.giz,
              margin: 0,
            }}
          >
            Empregol não é sobre ser o maior. É sobre ser o mais completo e o mais próximo do atleta
            <span style={{ color: colors.gramado }}>.</span>
          </p>
        </div>

        <MediaPlaceholder
          ratio="1 / 1"
          surface="dark"
          label="Atleta fora de campo · retrato quadrado"
        />
      </div>
    </section>
  )
}
