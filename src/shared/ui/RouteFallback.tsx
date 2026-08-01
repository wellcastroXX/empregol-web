import { colors, fonts } from '@/shared/config/theme'

/** Placeholder de carregamento entre rotas — discreto, no tom editorial da marca. */
export function RouteFallback() {
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
      C A R R E G A N D O
    </div>
  )
}
