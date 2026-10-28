import { fonts } from '@/shared/config/theme'

import { LOCALE_NAMES, LOCALES } from './locale'
import { defineMessages, useLocale, useMessages } from './locale-context'

const MESSAGES = defineMessages({
  pt: { label: 'Idioma' },
  en: { label: 'Language' },
  es: { label: 'Idioma' },
})

export interface LanguageSwitcherProps {
  /** Cor do texto — acompanha o fundo onde o seletor está. */
  color: string
  size?: number
}

/**
 * Seletor de idioma: as três siglas lado a lado, a atual em destaque. Fica
 * visível em todas as cascas (site, auth e painel) para ninguém ficar preso
 * num idioma que não lê.
 */
export function LanguageSwitcher({ color, size = 12 }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()
  const m = useMessages(MESSAGES)

  return (
    <div
      role="group"
      aria-label={m.label}
      style={{ display: 'flex', alignItems: 'center', gap: 2 }}
    >
      {LOCALES.map((option, index) => (
        <span key={option} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {index > 0 && (
            <span aria-hidden="true" style={{ color, opacity: 0.4, fontSize: size }}>
              ·
            </span>
          )}
          <button
            type="button"
            lang={option}
            aria-label={LOCALE_NAMES[option]}
            aria-pressed={locale === option}
            onClick={() => setLocale(option)}
            style={{
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              padding: '6px 4px',
              fontFamily: fonts.mono,
              fontSize: size,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color,
              opacity: locale === option ? 1 : 0.55,
              textDecoration: locale === option ? 'underline' : 'none',
              textUnderlineOffset: 4,
              transition: 'opacity 160ms ease, color 240ms ease',
            }}
          >
            {option}
          </button>
        </span>
      ))}
    </div>
  )
}
