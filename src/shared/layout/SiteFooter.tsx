import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'
import { Wordmark } from '@/shared/ui/Wordmark'

interface FooterLink {
  label: string
  /** Rota interna. Sem isso o item ainda não tem página e fica inerte. */
  to?: string
}

interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: 'ATLETAS',
    links: [
      { label: 'Cadastro', to: ROUTES.cadastro },
      { label: 'Baixar o app', to: ROUTES.app },
      { label: 'Vitrine' },
      { label: 'Histórias' },
    ],
  },
  {
    title: 'CLUBES',
    links: [
      { label: 'Entrar', to: ROUTES.entrar },
      { label: 'Painel', to: ROUTES.painel },
      { label: 'Scout' },
      { label: 'Combine 2026' },
    ],
  },
  {
    title: 'EMPRESA',
    links: [{ label: 'Sobre' }, { label: 'Imprensa' }, { label: 'Contato' }],
  },
]

const linkStyle = {
  display: 'block',
  fontFamily: fonts.text,
  fontSize: 14,
  color: colors.giz,
  textDecoration: 'none',
  padding: '4px 0',
} as const

/** Rodapé escuro em três colunas. */
export function SiteFooter() {
  return (
    <footer
      style={{ background: colors.tinta, color: colors.giz, padding: '60px var(--page-x) 36px' }}
    >
      {/* Grade em vez de flex com space-between: no estreito o flex empurrava a
          marca e os links para posições inconsistentes conforme quebravam. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-footer)',
          gap: 'var(--gap-lg)',
          alignItems: 'start',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--cols-footer-links)',
            gap: 'var(--gap-md)',
            rowGap: 32,
          }}
        >
          {FOOTER_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  color: colors.cinzaOnDark,
                  marginBottom: 12,
                  paddingBottom: 10,
                  borderBottom: `1px solid ${colors.ruleDark}`,
                }}
              >
                {title}
              </div>
              {links.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} style={linkStyle}>
                    {link.label}
                  </Link>
                ) : (
                  // Sem página ainda — texto, não link falso que não leva a lugar nenhum.
                  <span key={link.label} style={{ ...linkStyle, color: colors.cinzaOnDark }}>
                    {link.label}
                  </span>
                ),
              )}
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
