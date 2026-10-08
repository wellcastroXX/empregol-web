import { useEffect, useRef, useState } from 'react'

import { colors, fonts } from '@/shared/config/theme'

import type { AthleteMedia } from '../model/athlete-profile.types'

/**
 * Player em modal para a mídia do atleta.
 *
 * Os vídeos são arquivos servidos pela própria API (`/uploads/*.mp4`), então
 * quem toca é o `<video>` do navegador — sem biblioteca. Link externo
 * (YouTube/Vimeo) entra como iframe quando dá para montar a URL de embed; se
 * não der, a modal oferece abrir em outra aba, que é o que sobra.
 */

/** URL de embed de YouTube ou Vimeo. `null` quando o link não é de nenhum dos dois. */
function embedUrl(url: string): string | null {
  const youtube = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(
    url,
  )
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?autoplay=1`

  const vimeo = /vimeo\.com\/(?:video\/)?(\d+)/.exec(url)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`

  return null
}

export interface MediaLightboxProps {
  items: readonly AthleteMedia[]
  /** Índice do item aberto. */
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function MediaLightbox({ items, index, onIndexChange, onClose }: MediaLightboxProps) {
  const item = items[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  // Guarda quem tinha o foco para devolver ao fechar — senão o foco volta pro
  // topo da página e quem navega por teclado perde o lugar na grade.
  const openerRef = useRef<Element | null>(null)

  useEffect(() => {
    openerRef.current = document.activeElement
    closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && index < items.length - 1) onIndexChange(index + 1)
      if (event.key === 'ArrowLeft' && index > 0) onIndexChange(index - 1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [index, items.length, onClose, onIndexChange])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--page-x)',
      }}
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          border: 0,
          padding: 0,
          background: 'rgba(20, 20, 19, 0.92)',
          cursor: 'pointer',
        }}
      />

      <figure
        style={{
          position: 'relative',
          margin: 0,
          width: 'min(1000px, 100%)',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              color: colors.giz,
              border: `1px solid ${colors.giz24}`,
              borderRadius: 30,
              padding: '8px 14px',
              cursor: 'pointer',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
            }}
          >
            FECHAR ✕
          </button>
        </div>

        <Player item={item} />

        <figcaption
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, color: colors.giz }}
          >
            {item.title}
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.cinzaOnDark,
            }}
          >
            {[item.category, String(item.year), item.gameInfo].filter(Boolean).join(' · ')}
          </span>
        </figcaption>

        {items.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <Nav
              label="‹ Anterior"
              onClick={() => onIndexChange(index - 1)}
              disabled={index === 0}
            />
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: '0.12em',
                color: colors.cinzaOnDark,
                alignSelf: 'center',
              }}
            >
              {index + 1} / {items.length}
            </span>
            <Nav
              label="Próximo ›"
              onClick={() => onIndexChange(index + 1)}
              disabled={index === items.length - 1}
            />
          </div>
        )}
      </figure>
    </div>
  )
}

function Player({ item }: { item: AthleteMedia }) {
  const [failed, setFailed] = useState(false)
  const frame = {
    width: '100%',
    maxHeight: '70vh',
    background: '#000',
    borderRadius: 6,
    display: 'block',
  } as const

  if (item.mediaType === 'PHOTO') {
    return <img src={item.url} alt={item.title} style={{ ...frame, objectFit: 'contain' }} />
  }

  const embed = item.mediaType === 'EXTERNAL_LINK' ? embedUrl(item.url) : null

  if (embed) {
    return (
      <iframe
        src={embed}
        title={item.title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        style={{ ...frame, aspectRatio: '16 / 9', border: 0, height: 'auto' }}
      />
    )
  }

  // Arquivo nosso: o player do navegador dá conta. `.mov` nem sempre toca fora
  // do Safari, daí a saída pelo onError em vez de uma tela preta sem resposta.
  if (!failed && item.mediaType === 'VIDEO') {
    return (
      <video
        key={item.id}
        src={item.url}
        controls
        autoPlay
        playsInline
        onError={() => setFailed(true)}
        style={frame}
      >
        <track kind="captions" />
      </video>
    )
  }

  return (
    <div
      style={{
        ...frame,
        padding: 28,
        background: colors.tintaElev,
        color: colors.giz,
        fontFamily: fonts.text,
        fontSize: 15,
        lineHeight: 1.6,
      }}
    >
      <p style={{ margin: '0 0 14px' }}>
        {failed
          ? 'Seu navegador não conseguiu tocar este arquivo.'
          : 'Este item está hospedado fora da Empregol.'}
      </p>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: '0.12em',
          color: colors.giz,
          textDecoration: 'none',
          borderBottom: `1.5px solid ${colors.giz}`,
          paddingBottom: 2,
        }}
      >
        ABRIR EM NOVA ABA ›
      </a>
    </div>
  )
}

function Nav({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'transparent',
        color: disabled ? colors.ruleDark : colors.giz,
        border: `1px solid ${disabled ? colors.ruleDark : colors.giz24}`,
        borderRadius: 30,
        padding: '9px 16px',
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
