import { colors, fonts } from '@/shared/config/theme'
import { Wordmark } from '@/shared/ui/Wordmark'

const FOOTER_COLUMNS: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['ATLETAS', ['Cadastro', 'Vitrine', 'Histórias']],
  ['CLUBES', ['Scout', 'Painel', 'Combine 2026']],
  ['EMPRESA', ['Sobre', 'Imprensa', 'Contato']],
]

/** Rodapé escuro em três colunas. */
export function SiteFooter() {
  return (
    <footer style={{ background: colors.tinta, color: colors.giz, padding: '60px 40px 36px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 36,
          alignItems: 'flex-start',
        }}
      >
        <div>
          {/* Rodapé é superfície escura (tinta) — entra a versão creme. */}
          <Wordmark variant="cream" height={40} />
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 14,
              color: colors.cinzaOnDark,
              margin: '14px 0 0',
              maxWidth: 320,
            }}
          >
            Recolocando atletas no jogo.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 60 }}>
          {FOOTER_COLUMNS.map(([title, links]) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  color: colors.cinzaOnDark,
                  marginBottom: 12,
                }}
              >
                {title}
              </div>
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    display: 'block',
                    fontFamily: fonts.text,
                    fontSize: 14,
                    color: colors.giz,
                    textDecoration: 'none',
                    padding: '4px 0',
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 60,
          paddingTop: 24,
          borderTop: `1px solid ${colors.ruleDark}`,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: colors.cinzaOnDark,
          }}
        >
          © 2026 · EMPREGOL · BRASIL
        </span>
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: colors.cinzaOnDark,
          }}
        >
          S E A S O N · 2 0 2 6
        </span>
      </div>
    </footer>
  )
}
