import { colors, fonts } from '@/shared/config/theme'
import { MediaPlaceholder } from '@/shared/ui/MediaPlaceholder'
import HygorProfilePhoto from '@/assets/images/others/IMG_8894.JPG.jpeg'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const MESSAGES = defineMessages({
  pt: {
    eyebrow: 'P O R · Q U E · A · E M P R E G O L',
    eyebrowLast: 'N A S C E U',
    photoAlt: 'Hygor, fundador da Empregol',
    photoLabel: 'Atleta fora de campo · retrato quadrado',
    title: 'Sentimos o silêncio depois que o telefone para de tocar',
    p1: 'O futebol brasileiro forma milhares de talentos todos os anos. Mas forma também milhares de histórias que terminam cedo demais — não por falta de talento, e sim por falta de oportunidade, de visibilidade, de alguém que ajude a abrir a próxima porta.',
    p2Before: 'Nós vivemos isso.',
    p2Strong: 'Os fundadores da Empregol foram atletas.',
    p2After:
      'Sentimos na pele o que é estar sem contrato, sem clube, sem saber para onde ligar. Sentimos o silêncio depois que o telefone para de tocar.',
    p3: 'Foi ali que nasceu a Empregol: da certeza de que nenhum atleta deveria ficar invisível só porque está entre um contrato e outro.',
  },
  en: {
    eyebrow: 'W H Y · E M P R E G O L · W A S',
    eyebrowLast: 'B O R N',
    photoAlt: 'Hygor, Empregol founder',
    photoLabel: 'Athlete off the pitch · square portrait',
    title: 'We felt the silence after the phone stops ringing',
    p1: 'Brazilian football develops thousands of talents every year. But it also produces thousands of stories that end too soon — not for lack of talent, but for lack of opportunity, of visibility, of someone to help open the next door.',
    p2Before: 'We lived it.',
    p2Strong: 'Empregol’s founders were athletes.',
    p2After:
      'We know firsthand what it is like to be without a contract, without a club, without knowing who to call. We felt the silence after the phone stops ringing.',
    p3: 'That is where Empregol was born: from the certainty that no athlete should become invisible just because they are between one contract and the next.',
  },
  es: {
    eyebrow: 'P O R · Q U É · N A C I Ó',
    eyebrowLast: 'E M P R E G O L',
    photoAlt: 'Hygor, fundador de Empregol',
    photoLabel: 'Atleta fuera de la cancha · retrato cuadrado',
    title: 'Sentimos el silencio cuando el teléfono deja de sonar',
    p1: 'El fútbol brasileño forma miles de talentos cada año. Pero también forma miles de historias que terminan demasiado pronto — no por falta de talento, sino por falta de oportunidades, de visibilidad, de alguien que ayude a abrir la próxima puerta.',
    p2Before: 'Lo vivimos.',
    p2Strong: 'Los fundadores de Empregol fueron atletas.',
    p2After:
      'Sentimos en carne propia lo que es estar sin contrato, sin club, sin saber a quién llamar. Sentimos el silencio cuando el teléfono deja de sonar.',
    p3: 'Ahí nació Empregol: de la certeza de que ningún atleta debería volverse invisible solo porque está entre un contrato y otro.',
  },
})

/** POR QUE A EMPREGOL NASCEU — a origem, contada pelos fundadores. */
export function OrigemSection() {
  const m = useMessages(MESSAGES)

  return (
    <section
      id="origem"
      style={{
        background: colors.creme,
        padding: 'var(--section-y) var(--page-x)',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-split-r)',
          gap: 'var(--gap-lg)',
          alignItems: 'start',
        }}
      >
        {/* Mídia à esquerda — inverte o ritmo da seção anterior */}
        <div style={{ top: 108 }}>
          <MediaPlaceholder
            src={HygorProfilePhoto}
            alt={m.photoAlt}
            ratio="1 / 1"
            surface="dark"
            label={m.photoLabel}
          />
        </div>

        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinza,
              marginBottom: 28,
            }}
          >
            {m.eyebrow} · <span style={{ whiteSpace: 'nowrap' }}>{m.eyebrowLast}</span>
          </div>

          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 'clamp(32px, 4.4vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              color: colors.tinta,
              margin: '0 0 40px',
            }}
          >
            {m.title}
            <span style={{ color: colors.gramado }}>.</span>
          </h2>

          <div style={{ maxWidth: 640 }}>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                lineHeight: 1.6,
                color: colors.tinta,
                margin: '0 0 22px',
              }}
            >
              {m.p1}
            </p>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                lineHeight: 1.6,
                color: colors.tinta,
                margin: '0 0 22px',
              }}
            >
              {m.p2Before} <strong>{m.p2Strong}</strong> {m.p2After}
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
              {m.p3}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
