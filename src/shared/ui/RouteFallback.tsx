import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const MESSAGES = defineMessages({
  pt: { loading: 'C A R R E G A N D O' },
  en: { loading: 'L O A D I N G' },
  es: { loading: 'C A R G A N D O' },
})

/** Placeholder de carregamento entre rotas — discreto, no tom editorial da marca. */
export function RouteFallback() {
  const m = useMessages(MESSAGES)

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: colors.cinza,
      }}
    >
      {m.loading}
    </div>
  )
}
