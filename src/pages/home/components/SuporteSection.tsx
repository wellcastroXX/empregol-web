import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

/**
 * Os cinco eixos de suporte citados na seção "O que é a Empregol", abertos em
 * lista numerada — é o que sustenta a promessa de acompanhar o atleta depois
 * da contratação.
 */
interface SupportItem {
  n: string
  title: string
  description: string
}

const MESSAGES = defineMessages<{
  eyebrow: string
  title: readonly [string, string, string]
  lead: string
  items: readonly SupportItem[]
}>({
  pt: {
    eyebrow: 'S U P O R T E · C O N T Í N U O',
    title: ['O apoio', 'não acaba na', 'assinatura'],
    lead: 'Na maioria das plataformas o atleta desaparece do sistema no dia em que fecha contrato. Na Empregol, é aí que a rede de apoio começa a valer mais.',
    items: [
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
          'Educação financeira e planejamento de carreira, incluindo o empreendedorismo — dentro ou fora das quatro linhas.',
      },
    ],
  },
  en: {
    eyebrow: 'O N G O I N G · S U P P O R T',
    title: ['Support', 'doesn’t end at', 'signing'],
    lead: 'On most platforms, athletes vanish from the system the day they sign a contract. At Empregol, that is when the support network starts to matter most.',
    items: [
      {
        n: '001',
        title: 'Legal',
        description:
          'Contract review, image rights and representation. Athletes sign knowing exactly what they are signing.',
      },
      {
        n: '002',
        title: 'Nutrition',
        description:
          'Dietary support tailored to the training routine, the playing position and the stage of the season.',
      },
      {
        n: '003',
        title: 'Mental health',
        description:
          'Support for pressure, injury and the off-season. Time without a club takes as much of a toll on the mind as on the body.',
      },
      {
        n: '004',
        title: 'Physical',
        description:
          'Conditioning and injury return with proper protocols, to arrive at trials and pre-season ready to compete.',
      },
      {
        n: '005',
        title: 'Financial',
        description:
          'Financial education and career planning, including entrepreneurship — on and off the pitch.',
      },
    ],
  },
  es: {
    eyebrow: 'A P O Y O · C O N T I N U O',
    title: ['El apoyo', 'no termina en', 'la firma'],
    lead: 'En la mayoría de las plataformas el atleta desaparece del sistema el día en que firma contrato. En Empregol, es ahí cuando la red de apoyo empieza a valer más.',
    items: [
      {
        n: '001',
        title: 'Jurídico',
        description:
          'Lectura de contratos, derechos de imagen y representación. El atleta firma sabiendo exactamente lo que está firmando.',
      },
      {
        n: '002',
        title: 'Nutricional',
        description:
          'Acompañamiento alimentario ajustado a la rutina de entrenamiento, a la posición en la cancha y al momento de la temporada.',
      },
      {
        n: '003',
        title: 'Psicológico',
        description:
          'Apoyo ante la presión, las lesiones y el receso. El período sin club le pasa factura a la mente tanto como al cuerpo.',
      },
      {
        n: '004',
        title: 'Físico',
        description:
          'Preparación y recuperación de lesiones con protocolo, para llegar a las pruebas y a la pretemporada listo para competir.',
      },
      {
        n: '005',
        title: 'Financiero',
        description:
          'Educación financiera y planificación de carrera, incluido el emprendimiento — dentro o fuera de la cancha.',
      },
    ],
  },
})

export function SuporteSection() {
  const m = useMessages(MESSAGES)

  return (
    <section
      id="suporte"
      style={{
        background: colors.tinta,
        color: colors.giz,
        padding: 'var(--section-y) var(--page-x)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-2)',
          gap: 'var(--gap-lg)',
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
            {m.eyebrow}
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
            {m.title[0]}
            <br />
            {m.title[1]}
            <br />
            {m.title[2]}
            <span style={{ color: colors.gramado }}>.</span>
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
          {m.lead}
        </p>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {m.items.map((item) => (
          <li
            key={item.n}
            style={{
              display: 'grid',
              gridTemplateColumns: 'var(--cols-suporte)',
              gap: 'var(--gap-md)',
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
