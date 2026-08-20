import { useState } from 'react'

import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { PhoneMock } from './components/PhoneMock'
import { QrPlaceholder } from './components/QrPlaceholder'
import { StoreBadge } from './components/StoreBadge'

type Platform = 'ios' | 'android'

const REQUIREMENTS: Record<Platform, ReadonlyArray<readonly [string, string]>> = {
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
}

const FEATURES = [
  ['001', 'Monta tua vitrine', 'Posição, físico, estatísticas e vídeos. Tudo editável na mão.'],
  ['002', 'Vê quem te olhou', '312 clubes passaram no teu perfil essa semana. Sabe quais.'],
  ['003', 'Recebe propostas', 'Convite de teste, data e local — direto no chat com o clube.'],
  ['004', 'Sobe vídeo do treino', 'Grava, publica e aparece na frente na próxima janela.'],
] as const

/** empregol.com/app — landing de download do aplicativo. */
export default function DownloadPage() {
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
              A P P · I O S · &amp; · A N D R O I D
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
              Tua vitrine
              <br />
              no bolso<span style={{ color: colors.gramado }}>..</span>
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
              Recebe propostas, vê quem te olhou e sobe vídeo direto do treino. Baixa grátis —
              cadastro em 4 minutos.
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
              <RatingStat value="4,8" label="app store" stars />
              <RatingStat value="4,7" label="google play" stars />
              <RatingStat value="2.847" label="atletas ativos" />
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
          O · Q U E · T U · F A Z · N O · A P P
        </Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-4)', gap: 20 }}>
          {FEATURES.map(([num, title, body]) => (
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
            <Eyebrow style={{ marginBottom: 14 }}>D I S P O N I B I L I D A D E</Eyebrow>
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
              Roda no teu celular<span style={{ color: colors.gramado }}>.</span>
            </h2>

            <div
              role="tablist"
              aria-label="Plataforma"
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
              {REQUIREMENTS[platform].map(([key, value], i, all) => (
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
              A P O N T A · A · C Â M E R A
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
              Baixa em 10 segundos<span style={{ color: colors.gramado }}>.</span>
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
              O QR te leva direto pra loja certa — iOS ou Android, ele reconhece.
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
                EMPREGOL.COM/APP
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
              8 9 · E M P R E G A D O S · E S T A · S E M A N A
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
              O próximo pode
              <br />
              ser você<span style={{ color: colors.tinta }}>..</span>
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
