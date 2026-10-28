import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { WHATSAPP_URL } from '@/shared/config/contact'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Wordmark } from '@/shared/ui/Wordmark'

interface FooterLink {
  label: string
  /** Rota interna. Sem isso nem `href`, o item ainda não tem página e fica inerte. */
  to?: string
  /** Destino externo — abre em aba nova (ex.: a conversa no WhatsApp). */
  href?: string
}

interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

const MESSAGES = defineMessages({
  pt: {
    athletes: 'ATLETAS',
    clubs: 'CLUBES',
    company: 'EMPRESA',
    signUp: 'Cadastro',
    getApp: 'Baixar o app',
    showcase: 'Vitrine',
    stories: 'Histórias',
    signIn: 'Entrar',
    dashboard: 'Painel',
    scout: 'Scout',
    combine: 'Combine 2026',
    about: 'Sobre',
    support: 'Suporte',
    press: 'Imprensa',
    contact: 'Contato',
    legal: 'Termos e privacidade',
    tagline: 'Recolocando atletas no jogo.',
    copyright: '© 2026 · EMPREGOL · BRASIL',
  },
  en: {
    athletes: 'ATHLETES',
    clubs: 'CLUBS',
    company: 'COMPANY',
    signUp: 'Sign up',
    getApp: 'Get the app',
    showcase: 'Showcase',
    stories: 'Stories',
    signIn: 'Sign in',
    dashboard: 'Dashboard',
    scout: 'Scout',
    combine: 'Combine 2026',
    about: 'About',
    support: 'Support',
    press: 'Press',
    contact: 'Contact',
    legal: 'Terms and privacy',
    tagline: 'Putting athletes back in the game.',
    copyright: '© 2026 · EMPREGOL · BRAZIL',
  },
  es: {
    athletes: 'ATLETAS',
    clubs: 'CLUBES',
    company: 'EMPRESA',
    signUp: 'Registro',
    getApp: 'Descargar la app',
    showcase: 'Vitrina',
    stories: 'Historias',
    signIn: 'Entrar',
    dashboard: 'Panel',
    scout: 'Scout',
    combine: 'Combine 2026',
    about: 'Nosotros',
    support: 'Soporte',
    press: 'Prensa',
    contact: 'Contacto',
    legal: 'Términos y privacidad',
    tagline: 'Devolviendo atletas al juego.',
    copyright: '© 2026 · EMPREGOL · BRASIL',
  },
})

type FooterMessages = (typeof MESSAGES)['pt']

function footerColumns(m: FooterMessages): readonly FooterColumn[] {
  return [
    {
      title: m.athletes,
      links: [
        { label: m.signUp, to: ROUTES.cadastro },
        { label: m.getApp, to: ROUTES.app },
        { label: m.showcase },
        { label: m.stories },
      ],
    },
    {
      title: m.clubs,
      links: [
        { label: m.signIn, to: ROUTES.entrar },
        { label: m.dashboard, to: ROUTES.painel },
        { label: m.scout },
        { label: m.combine },
      ],
    },
    {
      title: m.company,
      links: [
        { label: m.about, to: `${ROUTES.home}#sobre` },
        { label: m.support, to: ROUTES.suporte },
        { label: m.press },
        { label: m.contact, href: WHATSAPP_URL },
        { label: m.legal, to: ROUTES.politicaPrivacidade },
      ],
    },
  ]
}

/** Item do rodapé: externo abre em aba nova, interno vai pelo router, e o que
 *  ainda não tem destino fica como texto — não link falso. */
function FooterItem({ link }: { link: FooterLink }) {
  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        {link.label}
      </a>
    )
  }

  if (link.to) {
    return (
      <Link to={link.to} style={linkStyle}>
        {link.label}
      </Link>
    )
  }

  return <span style={{ ...linkStyle, color: colors.cinzaOnDark }}>{link.label}</span>
}

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
  const m = useMessages(MESSAGES)
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
            {m.tagline}
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
          {footerColumns(m).map(({ title, links }) => (
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
              {links.map((link) => (
                <FooterItem key={link.label} link={link} />
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
          {m.copyright}
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
