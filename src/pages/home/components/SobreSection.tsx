import { colors, fonts } from '@/shared/config/theme'
import { MediaPlaceholder } from '@/shared/ui/MediaPlaceholder'
import AfterGamePhoto from '@/assets/images/others/IMG_8898.JPG.jpeg'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const MESSAGES = defineMessages({
  pt: {
    eyebrow: 'O · Q U E · É · A · E M P R E G O L',
    title: 'A plataforma mais completa e com maior cuidado pelo atleta do futebol brasileiro',
    p1Before:
      'Conectamos jogadores da base e profissionais — homens e mulheres — a clubes, agências e marcas, com um diferencial que ninguém mais oferece:',
    p1Strong: 'o atleta continua na plataforma mesmo depois de contratado',
    p1After:
      ', com acesso contínuo a suporte jurídico, nutricional, psicológico, físico e financeiro.',
    p2: 'Não somos só uma vitrine de currículos. Somos uma rede de apoio, visibilidade e carreira — do primeiro teste até o topo.',
    photo: 'Atleta comemorando',
  },
  en: {
    eyebrow: 'W H A T · I S · E M P R E G O L',
    title:
      'The most complete platform in Brazilian football, and the one that cares most for the athlete',
    p1Before:
      'We connect youth and professional players — men and women — to clubs, agencies and brands, with something no one else offers:',
    p1Strong: 'athletes stay on the platform even after they sign',
    p1After:
      ', with ongoing access to legal, nutritional, psychological, physical and financial support.',
    p2: 'We are not just a résumé showcase. We are a network of support, visibility and career — from the first trial all the way to the top.',
    photo: 'Athlete celebrating',
  },
  es: {
    eyebrow: 'Q U É · E S · E M P R E G O L',
    title: 'La plataforma más completa y que más cuida al atleta del fútbol brasileño',
    p1Before:
      'Conectamos a jugadores juveniles y profesionales — hombres y mujeres — con clubes, agencias y marcas, con un diferencial que nadie más ofrece:',
    p1Strong: 'el atleta sigue en la plataforma incluso después de ser contratado',
    p1After:
      ', con acceso continuo a apoyo jurídico, nutricional, psicológico, físico y financiero.',
    p2: 'No somos solo una vitrina de currículums. Somos una red de apoyo, visibilidad y carrera — desde la primera prueba hasta la cima.',
    photo: 'Atleta celebrando',
  },
})

/** O QUE É A EMPREGOL — declaração de posicionamento em tipo grande. */
export function SobreSection() {
  const m = useMessages(MESSAGES)

  return (
    <section
      id="sobre"
      style={{
        background: colors.creme,
        padding: 'var(--section-y) var(--page-x)',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: colors.cinza,
          marginBottom: 40,
        }}
      >
        {m.eyebrow}
      </div>

      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(34px, 5vw, 76px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: colors.tinta,
          margin: '0 0 64px',
          maxWidth: 1240,
        }}
      >
        {m.title}
        <span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-2)',
          gap: 'var(--gap-lg)',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.6,
              color: colors.tinta,
              margin: '0 0 22px',
            }}
          >
            {m.p1Before} <strong>{m.p1Strong}</strong>
            {m.p1After}
          </p>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.6,
              color: colors.tinta,
              margin: 0,
            }}
          >
            {m.p2}
          </p>
        </div>

        <MediaPlaceholder
          src={AfterGamePhoto}
          alt={m.photo}
          ratio="1 / 1"
          surface="dark"
          label={m.photo}
        />
      </div>
    </section>
  )
}
