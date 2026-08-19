import { colors, fonts } from '@/shared/config/theme'

interface SupportItem {
  n: string
  title: string
  description: string
}

/**
 * Os cinco eixos de suporte citados na seção "O que é a Empregol", abertos em
 * lista numerada — é o que sustenta a promessa de acompanhar o atleta depois
 * da contratação.
 */
const ITEMS: readonly SupportItem[] = [
  {
    n: '001',
    title: 'Jurídico',
    description:
      'Leitura de contrato, direitos de imagem e representação. O atleta assina sabendo exatamente o que está assinando.',
  },
  {
    n: '002',
    title: 'Nutricional',
    description:
      'Acompanhamento alimentar ajustado à rotina de treino, à posição em campo e ao momento da temporada.',
  },
  {
    n: '003',
    title: 'Psicológico',
    description:
      'Suporte para pressão, lesão e entressafra. O período sem clube cobra da cabeça tanto quanto do corpo.',
  },
  {
    n: '004',
    title: 'Físico',
    description:
      'Preparação e retorno de lesão com protocolo, para chegar em teste e pré-temporada pronto para competir.',
  },
  {
    n: '005',
    title: 'Financeiro',
    description:
      'Educação financeira e planejamento de carreira, incluindo empreender — dentro ou fora das quatro linhas.',
  },
]

export function SuporteSection() {
  return (
    <section style={{ background: colors.tinta, color: colors.giz, padding: '110px 40px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
          gap: 72,
          alignItems: 'end',
          marginBottom: 72,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinzaOnDark,
              marginBottom: 28,
            }}
          >
            S U P O R T E · C O N T Í N U O
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 'clamp(36px, 5.2vw, 84px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: colors.giz,
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            O apoio
            <br />
            não acaba na
            <br />
            assinatura<span style={{ color: colors.gramado }}>.</span>
          </h2>
        </div>
        <p
          style={{
            fontFamily: fonts.text,
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.6,
            color: colors.giz,
            opacity: 0.82,
            margin: 0,
            maxWidth: 560,
          }}
        >
          Na maioria das plataformas o atleta desaparece do sistema no dia em que fecha contrato. Na
          Empregol, é aí que a rede de apoio começa a valer mais.
        </p>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {ITEMS.map((item) => (
          <li
            key={item.n}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0, 1fr) minmax(0, 1.6fr)',
              gap: 40,
              alignItems: 'baseline',
              padding: '30px 0',
              borderTop: `1px solid ${colors.ruleDark}`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.1em',
                color: colors.gramado,
                minWidth: 46,
              }}
            >
              {item.n}
            </span>
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 'clamp(24px, 2.6vw, 40px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: colors.giz,
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                fontFamily: fonts.text,
                fontSize: 15,
                lineHeight: 1.6,
                color: colors.cinzaOnDark,
              }}
            >
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
