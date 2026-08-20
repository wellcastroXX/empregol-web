import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import heroPoster from '@/assets/videos/hero-poster.jpg'
import heroVideo from '@/assets/videos/hero.mp4'
import { colors, fonts } from '@/shared/config/theme'
import { usePrefersReducedMotion } from '@/shared/lib/hooks/usePrefersReducedMotion'

/**
 * Abertura da home: vídeo full-bleed com scrim escuro e a manchete empilhada
 * por cima. O vídeo é decorativo — sem áudio, sem controles, e o texto vive
 * no DOM, não dentro da mídia.
 */
export function HeroVideo() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // O nav é fixo e transparente aqui: o topo compensa a altura dele para
        // o vídeo correr por trás sem o texto ficar debaixo da barra.
        padding: 'calc(var(--nav-h) + 72px) var(--page-x) 56px',
        overflow: 'hidden',
        // Contém o mix-blend-mode do granulado: sem isto ele mesclaria com o
        // fundo da página em vez de ficar preso ao vídeo.
        isolation: 'isolate',
        background: colors.tinta,
        color: colors.giz,
      }}
    >
      {/* Com movimento reduzido, entrega só o pôster — nada de 6,5 MB de vídeo
          em loop para quem pediu explicitamente menos movimento. */}
      <video
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload={prefersReducedMotion ? 'none' : 'metadata'}
        poster={heroPoster}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        {!prefersReducedMotion && <source src={heroVideo} type="video/mp4" />}
      </video>

      {/* Scrim: garante contraste do texto sobre qualquer quadro do vídeo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(20,20,19,0.55) 0%, rgba(20,20,19,0.35) 38%, rgba(20,20,19,0.88) 100%)',
        }}
      />

      {/* Granulado — acima do vídeo e do scrim, abaixo do conteúdo. */}
      <div className="hero-grain" aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.giz,
            opacity: 0.72,
            marginBottom: 28,
          }}
        >
          E M P R E G O L · P L A T A F O R M A · D O · A T L E T A
        </div>

        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(52px, 10.5vw, 172px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            color: colors.giz,
            margin: '0 0 40px',
            textTransform: 'uppercase',
          }}
        >
          Seu gol
          <br />
          começa
          <br />
          aqui<span style={{ color: colors.gramado }}>.</span>
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--cols-hero)',
            gap: 'var(--gap-md)',
            alignItems: 'end',
            paddingTop: 28,
            borderTop: `1px solid ${colors.giz24}`,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 'clamp(15px, 1.35vw, 18px)',
                lineHeight: 1.55,
                color: colors.giz,
                margin: '0 0 14px',
              }}
            >
              A Empregol nasceu de uma dor que a gente conhece de perto: a de ser esquecido depois
              de dar tudo em campo.
            </p>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 'clamp(15px, 1.35vw, 18px)',
                lineHeight: 1.55,
                color: colors.giz,
                opacity: 0.82,
                margin: 0,
              }}
            >
              Somos a plataforma que conecta atletas de futebol sem contrato ativo a clubes, agentes
              e marcas — dando visibilidade, oportunidade e apoio a quem o mercado deixou de
              enxergar.
            </p>
          </div>

          <Link
            to={ROUTES.cadastro}
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: colors.gramado,
              color: colors.giz,
              padding: '18px 26px',
              borderRadius: 4,
              fontFamily: fonts.text,
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Quero fazer parte ›
          </Link>
        </div>
      </div>
    </section>
  )
}
