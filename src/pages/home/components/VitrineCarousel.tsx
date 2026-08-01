import { useRef } from 'react'

import { VITRINE_ATHLETES } from '@/features/athletes/api/showcase-athletes.mock'
import type { ShowcaseAthlete, StatusVariant } from '@/features/athletes/model/athlete.types'
import { FormationPitch } from '@/features/athletes/ui/FormationPitch'
import { colors, fonts } from '@/shared/config/theme'

const CARD_WIDTH = 264
const CARD_GAP = 18

export function VitrineCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' })
  }

  return (
    <section style={{ padding: '72px 40px', borderTop: `1px solid ${colors.osso}` }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 28,
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
              color: colors.cinza,
              marginBottom: 8,
            }}
          >
            V I T R I N E · A T A C A N T E S · L I V R E S
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 48,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: colors.tinta,
              margin: 0,
            }}
          >
            43 ST esperando
            <br />
            tua janela<span style={{ color: colors.gramado }}>.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CarouselArrow dir="left" onClick={() => scrollBy(-1)} />
          <CarouselArrow dir="right" onClick={() => scrollBy(1)} />
          <a
            href="#"
            style={{
              marginLeft: 12,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.14em',
              color: colors.tinta,
              textDecoration: 'none',
              borderBottom: `1.5px solid ${colors.tinta}`,
              paddingBottom: 1,
            }}
          >
            VER OS 43 ›
          </a>
        </div>
      </div>

      <div
        ref={trackRef}
        className="empregol-scroll-x"
        style={{
          display: 'flex',
          gap: CARD_GAP,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          margin: '0 -8px',
          padding: '0 8px 6px',
        }}
      >
        {VITRINE_ATHLETES.map((a) => (
          <VitrineCard key={a.num} athlete={a} />
        ))}
      </div>
    </section>
  )
}

interface CarouselArrowProps {
  dir: 'left' | 'right'
  onClick: () => void
}

function CarouselArrow({ dir, onClick }: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? 'Ver atletas anteriores' : 'Ver próximos atletas'}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'transparent',
        border: `1.5px solid ${colors.tinta}`,
        color: colors.tinta,
        fontFamily: fonts.display,
        fontSize: 18,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {dir === 'left' ? '‹' : '›'}
    </button>
  )
}

const TAG_BG: Record<StatusVariant, string> = {
  livre: colors.gramado,
  ink: colors.tinta,
  warn: 'transparent',
}

const TAG_FG: Record<StatusVariant, string> = {
  livre: colors.giz,
  ink: colors.giz,
  warn: colors.statusWarn,
}

interface VitrineCardProps {
  athlete: ShowcaseAthlete
}

function VitrineCard({ athlete: a }: VitrineCardProps) {
  const tagBorder = a.tagVar === 'warn' ? `1px solid ${colors.statusWarn}` : 'none'

  return (
    <div
      style={{
        flexShrink: 0,
        scrollSnapAlign: 'start',
        width: CARD_WIDTH,
        background: colors.giz,
        border: `1px solid ${colors.osso}`,
        borderRadius: 8,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Foto / número */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          width: '100%',
          background: a.photo ? colors.tinta : colors.osso,
          overflow: 'hidden',
        }}
      >
        {a.photo ? (
          <img
            src={a.photo}
            alt={a.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 140,
              color: colors.tinta,
              letterSpacing: '-0.04em',
            }}
          >
            {a.num}
          </div>
        )}
        {/* Número sobreposto nos cards com foto */}
        {a.photo && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 14,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 42,
              lineHeight: 0.9,
              color: colors.giz,
              letterSpacing: '-0.04em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}
          >
            {a.num}
          </div>
        )}
        {/* Tag de status */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: TAG_BG[a.tagVar],
            color: TAG_FG[a.tagVar],
            border: tagBorder,
            padding: '4px 8px',
            borderRadius: 2,
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}
        >
          {a.tag}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 18,
              color: colors.tinta,
              letterSpacing: '-0.005em',
            }}
          >
            {a.name}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.14em',
              color: colors.cinza,
              textTransform: 'uppercase',
              marginTop: 3,
            }}
          >
            {a.meta}
          </div>
        </div>

        {/* Mini formação */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            paddingTop: 12,
            borderTop: `1px solid ${colors.osso}`,
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <FormationPitch formation={a.formation} highlight={a.pos} size={56} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 9,
                letterSpacing: '0.14em',
                color: colors.cinza,
                textTransform: 'uppercase',
              }}
            >
              GERAL
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 26,
                color: colors.tinta,
                lineHeight: 1,
                marginTop: 2,
              }}
            >
              {a.overall}
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 9,
                letterSpacing: '0.14em',
                color: colors.gramado,
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              {a.pos} · {a.formation}
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0 0',
            borderTop: `1px solid ${colors.osso}`,
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: colors.tinta,
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          <span>VER PERFIL</span>
          <span>›</span>
        </a>
      </div>
    </div>
  )
}
