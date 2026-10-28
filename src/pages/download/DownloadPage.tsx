import { useState } from 'react'

import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { PhoneMock } from './components/PhoneMock'
import { QrPlaceholder } from './components/QrPlaceholder'
import { StoreBadge } from './components/StoreBadge'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

type Platform = 'ios' | 'android'

const MESSAGES = defineMessages<{
  requirements: Record<Platform, ReadonlyArray<readonly [string, string]>>
  features: ReadonlyArray<readonly [string, string, string]>
  eyebrow: string
  title: readonly [string, string]
  lead: string
  ratingIos: string
  ratingAndroid: string
  featuresEyebrow: string
  availability: string
  runs: string
  platform: string
  scan: string
  qrTitle: string
  qrBody: string
  closingEyebrow: string
  closing: readonly [string, string]
}>({
  pt: {
    requirements: {
      ios: [
        ['Sistema', 'iOS 16 ou superior'],
        ['Tamanho', '48 MB'],
        ['Idioma', 'Português (BR)'],
        ['Versão', '1.4.0 · ago 2026'],
        ['Preço', 'Grátis · com plano opcional'],
      ],
      android: [
        ['Sistema', 'Android 10 ou superior'],
        ['Tamanho', '42 MB'],
        ['Idioma', 'Português (BR)'],
        ['Versão', '1.4.0 · ago 2026'],
        ['Preço', 'Grátis · com plano opcional'],
      ],
    },
    features: [
      [
        '001',
        'Monte sua vitrine',
        'Posição, físico, estatísticas e vídeos. Tudo editável na palma da mão.',
      ],
      [
        '002',
        'Veja quem olhou seu perfil',
        '312 clubes passaram pelo seu perfil essa semana. Saiba quais.',
      ],
      ['003', 'Receba propostas', 'Convite de teste, data e local — direto no chat com o clube.'],
      ['004', 'Suba vídeo do treino', 'Grave, publique e apareça em destaque na próxima janela.'],
    ],
    eyebrow: 'A P P · I O S · & · A N D R O I D',
    title: ['Sua vitrine', 'no bolso'],
    lead: 'Receba propostas, veja quem te olhou e suba vídeos direto do treino. Baixe grátis — cadastro em 4 minutos.',
    ratingIos: '4,8',
    ratingAndroid: '4,7',
    featuresEyebrow: 'O · Q U E · V O C Ê · F A Z · N O · A P P',
    availability: 'D I S P O N I B I L I D A D E',
    runs: 'Roda no seu celular',
    platform: 'Plataforma',
    scan: 'A P O N T E · A · C Â M E R A',
    qrTitle: 'Baixe em 10 segundos',
    qrBody: 'O QR te leva direto para a loja certa.',
    closingEyebrow: 'E M P R E G O L · P L A T A F O R M A · D O · A T L E T A',
    closing: ['O próximo pode', 'ser você'],
  },
  en: {
    requirements: {
      ios: [
        ['System', 'iOS 16 or later'],
        ['Size', '48 MB'],
        ['Language', 'Portuguese (BR)'],
        ['Version', '1.4.0 · Aug 2026'],
        ['Price', 'Free · optional plan'],
      ],
      android: [
        ['System', 'Android 10 or later'],
        ['Size', '42 MB'],
        ['Language', 'Portuguese (BR)'],
        ['Version', '1.4.0 · Aug 2026'],
        ['Price', 'Free · optional plan'],
      ],
    },
    features: [
      [
        '001',
        'Build your showcase',
        'Position, physique, stats and videos. All editable from the palm of your hand.',
      ],
      [
        '002',
        'See who viewed your profile',
        '312 clubs visited your profile this week. Find out which ones.',
      ],
      [
        '003',
        'Get offers',
        'Trial invitations, date and venue — straight to your chat with the club.',
      ],
      [
        '004',
        'Upload training videos',
        'Record, post and get featured in the next transfer window.',
      ],
    ],
    eyebrow: 'A P P · I O S · & · A N D R O I D',
    title: ['Your showcase', 'in your pocket'],
    lead: 'Get offers, see who checked you out and upload videos straight from training. Free download — sign up in 4 minutes.',
    ratingIos: '4.8',
    ratingAndroid: '4.7',
    featuresEyebrow: 'W H A T · Y O U · D O · I N · T H E · A P P',
    availability: 'A V A I L A B I L I T Y',
    runs: 'Runs on your phone',
    platform: 'Platform',
    scan: 'P O I N T · Y O U R · C A M E R A',
    qrTitle: 'Download in 10 seconds',
    qrBody: 'The QR code takes you straight to the right store.',
    closingEyebrow: 'E M P R E G O L · T H E · A T H L E T E · P L A T F O R M',
    closing: ['The next one', 'could be you'],
  },
  es: {
    requirements: {
      ios: [
        ['Sistema', 'iOS 16 o superior'],
        ['Tamaño', '48 MB'],
        ['Idioma', 'Portugués (BR)'],
        ['Versión', '1.4.0 · ago 2026'],
        ['Precio', 'Gratis · con plan opcional'],
      ],
      android: [
        ['Sistema', 'Android 10 o superior'],
        ['Tamaño', '42 MB'],
        ['Idioma', 'Portugués (BR)'],
        ['Versión', '1.4.0 · ago 2026'],
        ['Precio', 'Gratis · con plan opcional'],
      ],
    },
    features: [
      [
        '001',
        'Arma tu vitrina',
        'Posición, físico, estadísticas y videos. Todo editable en la palma de tu mano.',
      ],
      [
        '002',
        'Mira quién vio tu perfil',
        '312 clubes pasaron por tu perfil esta semana. Descubre cuáles.',
      ],
      [
        '003',
        'Recibe propuestas',
        'Invitación a prueba, fecha y lugar — directo en el chat con el club.',
      ],
      [
        '004',
        'Sube videos del entrenamiento',
        'Graba, publica y destácate en el próximo mercado de pases.',
      ],
    ],
    eyebrow: 'A P P · I O S · & · A N D R O I D',
    title: ['Tu vitrina', 'en el bolsillo'],
    lead: 'Recibe propuestas, mira quién te vio y sube videos directo del entrenamiento. Descarga gratis — registro en 4 minutos.',
    ratingIos: '4,8',
    ratingAndroid: '4,7',
    featuresEyebrow: 'Q U É · H A C E S · E N · L A · A P P',
    availability: 'D I S P O N I B I L I D A D',
    runs: 'Funciona en tu celular',
    platform: 'Plataforma',
    scan: 'A P U N T A · L A · C Á M A R A',
    qrTitle: 'Descárgala en 10 segundos',
    qrBody: 'El QR te lleva directo a la tienda correcta.',
    closingEyebrow: 'E M P R E G O L · L A · P L A T A F O R M A · D E L · A T L E T A',
    closing: ['El próximo', 'puedes ser tú'],
  },
})

/** empregol.com/app — landing de download do aplicativo. */
export default function DownloadPage() {
  const m = useMessages(MESSAGES)
  const [platform, setPlatform] = useState<Platform>('ios')

  return (
    <div style={{ background: colors.creme }}>
      {/* HERO — escuro e full-bleed, no mesmo registro do hero da home */}
      <section
        style={{
          background: colors.tinta,
          color: colors.giz,
          padding: 'calc(var(--nav-h) + 48px) var(--page-x) 0',
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        <div className="hero-grain" aria-hidden="true" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--cols-hero-app)',
            gap: 'var(--gap-lg)',
            alignItems: 'end',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div style={{ paddingBottom: 80 }}>
            <Eyebrow surface="dark" style={{ marginBottom: 22 }}>
              {m.eyebrow}
            </Eyebrow>

            <h1
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 'clamp(52px, 7vw, 116px)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {m.title[0]}
              <br />
              {m.title[1]}
              <span style={{ color: colors.gramado }}>...</span>
            </h1>

            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 18,
                lineHeight: 1.55,
                color: colors.gizMuted,
                margin: '24px 0 0',
                maxWidth: 440,
              }}
            >
              {m.lead}
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
              <StoreBadge store="apple" />
              <StoreBadge store="google" />
            </div>

            <div
              style={{
                display: 'flex',
                gap: 34,
                marginTop: 32,
                paddingTop: 22,
                borderTop: `1px solid ${colors.ruleDark}`,
                flexWrap: 'wrap',
              }}
            >
              <RatingStat value={m.ratingIos} label="app store" stars />
              <RatingStat value={m.ratingAndroid} label="google play" stars />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <PhoneMock />
          </div>
        </div>

        {/* Camisa fantasma — motivo gráfico do kit */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: -30,
            bottom: -110,
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 380,
            color: colors.tintaElev,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            zIndex: 0,
          }}
        >
          09
        </div>
      </section>

      {/* O QUE FAZ NO APP — lista numerada, como o suporte contínuo da home */}
      <section
        style={{
          padding: 'var(--section-y) var(--page-x)',
          background: colors.osso,
          borderBottom: `1px solid ${colors.ossoRule}`,
        }}
      >
        <Eyebrow color={colors.tinta} style={{ marginBottom: 28 }}>
          {m.featuresEyebrow}
        </Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-4)', gap: 20 }}>
          {m.features.map(([num, title, body]) => (
            <div key={num} style={{ paddingTop: 14, borderTop: `1.5px solid ${colors.tinta}` }}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 32,
                  color: colors.gramado,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {num}
              </div>
              <h3
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: '-0.015em',
                  color: colors.tinta,
                  margin: '14px 0 6px',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: fonts.text,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: colors.cinza,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DISPONIBILIDADE + QR */}
      <section style={{ padding: 'var(--section-y) var(--page-x)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--cols-2)',
            gap: 'var(--gap-lg)',
            alignItems: 'start',
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 14 }}>{m.availability}</Eyebrow>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: colors.tinta,
                margin: '0 0 26px',
              }}
            >
              {m.runs}
              <span style={{ color: colors.gramado }}>.</span>
            </h2>

            <div
              role="tablist"
              aria-label={m.platform}
              style={{
                display: 'flex',
                gap: 4,
                background: colors.osso,
                padding: 4,
                borderRadius: 999,
                width: 'fit-content',
                marginBottom: 24,
              }}
            >
              {(
                [
                  ['ios', 'iOS'],
                  ['android', 'Android'],
                ] as ReadonlyArray<readonly [Platform, string]>
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={platform === id}
                  onClick={() => setPlatform(id)}
                  style={{
                    border: 0,
                    cursor: 'pointer',
                    padding: '9px 24px',
                    borderRadius: 999,
                    background: platform === id ? colors.giz : 'transparent',
                    color: platform === id ? colors.tinta : colors.cinza,
                    fontFamily: fonts.mono,
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    boxShadow: platform === id ? `0 1px 2px ${colors.tinta12}` : 'none',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <dl
              style={{
                background: colors.giz,
                border: `1px solid ${colors.osso}`,
                borderRadius: 10,
                padding: '4px 20px',
                margin: 0,
              }}
            >
              {m.requirements[platform].map(([key, value], i, all) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: i === all.length - 1 ? 'none' : `1px solid ${colors.osso}`,
                  }}
                >
                  <dt
                    style={{
                      fontFamily: fonts.mono,
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: colors.cinza,
                    }}
                  >
                    {key}
                  </dt>
                  <dd
                    style={{
                      fontFamily: fonts.text,
                      fontSize: 14,
                      fontWeight: 500,
                      color: colors.tinta,
                      margin: 0,
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
              <StoreBadge store={platform === 'ios' ? 'apple' : 'google'} />
            </div>
          </div>

          <div
            style={{
              background: colors.tinta,
              color: colors.giz,
              borderRadius: 12,
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Eyebrow surface="dark" style={{ marginBottom: 20 }}>
              {m.scan}
            </Eyebrow>
            <QrPlaceholder />
            <h3
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 26,
                letterSpacing: '-0.02em',
                margin: '26px 0 8px',
              }}
            >
              {m.qrTitle}
              <span style={{ color: colors.gramado }}>.</span>
            </h3>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 14,
                color: colors.gizMuted,
                margin: 0,
                maxWidth: 280,
                lineHeight: 1.55,
              }}
            >
              {m.qrBody}
            </p>
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: `1px solid ${colors.ruleDark}`,
                width: '100%',
              }}
            >
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: colors.giz,
                }}
              >
                EMPREGOL.CO/APP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FECHAMENTO */}
      <section
        style={{
          background: colors.gramado,
          color: colors.giz,
          padding: 'var(--section-y) var(--page-x)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Eyebrow color="rgba(251,250,245,0.75)" style={{ marginBottom: 14 }}>
              {m.closingEyebrow}
            </Eyebrow>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 'clamp(36px, 5vw, 76px)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {m.closing[0]}
              <br />
              {m.closing[1]}
              <span style={{ color: colors.tinta }}>.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StoreBadge store="apple" />
            <StoreBadge store="google" />
          </div>
        </div>
      </section>
    </div>
  )
}

interface RatingStatProps {
  value: string
  label: string
  stars?: boolean
}

function RatingStat({ value, label, stars }: RatingStatProps) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 28,
            color: colors.giz,
            lineHeight: 1,
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {value}
        </span>
        {stars && (
          <span
            aria-hidden="true"
            style={{ color: colors.gramado, fontSize: 13, letterSpacing: '0.1em' }}
          >
            ★★★★★
          </span>
        )}
      </div>
      <Eyebrow surface="dark" size={10} style={{ marginTop: 7, letterSpacing: '0.14em' }}>
        {label}
      </Eyebrow>
    </div>
  )
}
