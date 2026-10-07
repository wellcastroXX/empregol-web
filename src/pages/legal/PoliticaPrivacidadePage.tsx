import { Fragment } from 'react'

import pdfUrl from '@/assets/others/termos-de-uso–empregol.pdf'
import { colors, fonts } from '@/shared/config/theme'

import {
  ANEXO,
  DOCUMENT_PLACE_DATE,
  DOCUMENT_TITLE,
  DOCUMENT_VERSION,
  SECTIONS,
  type LegalBlock,
  type LegalSection,
  type LegalTable,
} from './termos-de-uso.content'

/**
 * Documento legal da Empregol em página única — todas as cláusulas em uma
 * rolagem só, sem abas nem visualizador de PDF. O texto vem de
 * `termos-de-uso.content.ts`; o PDF original fica disponível para download.
 */
export default function PoliticaPrivacidadePage() {
  return (
    <article style={{ padding: 'var(--section-y) var(--page-x)' }}>
      <header style={{ maxWidth: 760, margin: '0 auto 56px' }}>
        <div style={eyebrowStyle}>D O C U M E N T O · L E G A L</div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(38px, 5vw, 68px)',
            lineHeight: 0.96,
            letterSpacing: '-0.025em',
            color: colors.tinta,
            margin: '0 0 20px',
          }}
        >
          {DOCUMENT_TITLE}
          <span style={{ color: colors.gramado }}>.</span>
        </h1>
        <p style={{ ...bodyStyle, color: colors.cinza, margin: '0 0 8px' }}>{DOCUMENT_VERSION}</p>
        <a
          href={pdfUrl}
          download
          style={{
            display: 'inline-block',
            marginTop: 16,
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.12em',
            color: colors.tinta,
            textDecoration: 'none',
            padding: '12px 16px',
            borderRadius: 4,
            border: `1.5px solid ${colors.tinta}`,
          }}
        >
          BAIXAR EM PDF ›
        </a>
      </header>

      {/* Sumário: 11 cláusulas em uma rolagem só pedem um atalho no topo. */}
      <nav aria-label="Sumário" style={{ maxWidth: 760, margin: '0 auto 64px' }}>
        <div style={{ ...eyebrowStyle, marginBottom: 14 }}>S U M Á R I O</div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {[...SECTIONS, ANEXO].map((section) => (
            <li key={section.number} style={{ borderTop: `1px solid ${colors.osso}` }}>
              <a
                href={`#${anchorOf(section)}`}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '11px 0',
                  fontFamily: fonts.text,
                  fontSize: 15,
                  color: colors.tinta,
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 13,
                    color: colors.cinza,
                    flexShrink: 0,
                  }}
                >
                  {section.number}
                </span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {[...SECTIONS, ANEXO].map((section) => (
          <section key={section.number} id={anchorOf(section)} style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 'clamp(22px, 2.6vw, 30px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: colors.tinta,
                margin: '0 0 20px',
                paddingTop: 20,
                borderTop: `1.5px solid ${colors.tinta}`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  color: colors.cinza,
                  marginRight: 12,
                }}
              >
                {section.number}
              </span>
              {section.title}
            </h2>
            {section.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </section>
        ))}

        <p style={{ ...bodyStyle, color: colors.cinza, marginTop: 48 }}>{DOCUMENT_PLACE_DATE}</p>
      </div>
    </article>
  )
}

/** `3` → `clausula-3`; `Anexo I` → `anexo-i`. */
function anchorOf(section: LegalSection): string {
  const slug = section.number.toLowerCase().replace(/\s+/g, '-')
  return /^\d+$/.test(section.number) ? `clausula-${slug}` : slug
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'p':
      return <p style={{ ...bodyStyle, margin: '0 0 16px' }}>{emphasize(block.text)}</p>

    case 'list':
      return (
        <ul style={{ ...bodyStyle, margin: '0 0 16px', paddingLeft: 20 }}>
          {block.items.map((item, index) => (
            <li key={index} style={{ marginBottom: 8 }}>
              {emphasize(item)}
            </li>
          ))}
        </ul>
      )

    case 'subtitle':
      return (
        <h3
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: colors.cinza,
            margin: '32px 0 14px',
          }}
        >
          {block.text}
        </h3>
      )

    case 'table':
      return <Table table={block.table} />
  }
}

/**
 * Tabela em trilho próprio: o Anexo I tem seis colunas, e sem a rolagem
 * horizontal a largura mínima delas empurraria a página inteira no celular.
 */
function Table({ table }: { table: LegalTable }) {
  return (
    <div className="empregol-scroll-x" style={{ overflowX: 'auto', margin: '0 0 24px' }}>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          minWidth: table.head.length > 3 ? 620 : 420,
          fontFamily: fonts.text,
          fontSize: 14,
          color: colors.tinta,
        }}
      >
        <thead>
          <tr>
            {table.head.map((cell) => (
              <th
                key={cell}
                scope="col"
                style={{
                  textAlign: 'left',
                  verticalAlign: 'bottom',
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: colors.cinza,
                  padding: '0 12px 10px 0',
                  borderBottom: `1.5px solid ${colors.tinta}`,
                }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    verticalAlign: 'top',
                    padding: '12px 12px 12px 0',
                    borderBottom: `1px solid ${colors.osso}`,
                    lineHeight: 1.5,
                    // Primeira coluna é o rótulo da linha — carrega o peso.
                    fontWeight: cellIndex === 0 ? 500 : 400,
                    color: cellIndex === 0 ? colors.tinta : colors.cinza,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Converte os trechos entre `**` em <strong>, preservando o resto do texto. */
function emphasize(text: string) {
  return text.split(/\*\*(.+?)\*\*/gs).map((part, index) =>
    // Os índices ímpares são o conteúdo capturado entre os asteriscos.
    index % 2 === 1 ? (
      <strong key={index} style={{ fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  )
}

const bodyStyle = {
  fontFamily: fonts.text,
  fontSize: 16,
  lineHeight: 1.65,
  color: colors.tinta,
} as const

const eyebrowStyle = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: colors.cinza,
  marginBottom: 18,
} as const
