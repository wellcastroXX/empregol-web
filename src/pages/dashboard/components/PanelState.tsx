import type { ReactNode } from 'react'

import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

const box = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '48px 24px',
  textAlign: 'center',
} as const

/** Carregando — mesmo tom discreto do resto do painel. */
export function PanelLoading({ label = 'Carregando' }: { label?: string }) {
  return (
    <div style={box} role="status" aria-live="polite">
      <Eyebrow style={{ letterSpacing: '0.18em' }}>{label}</Eyebrow>
    </div>
  )
}

export interface PanelEmptyProps {
  title: string
  description?: ReactNode
  action?: ReactNode
}

/** Estado vazio. Diz o que houve e, quando dá, o que fazer a respeito. */
export function PanelEmpty({ title, description, action }: PanelEmptyProps) {
  return (
    <div style={box}>
      <h3
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: '-0.015em',
          color: colors.tinta,
          margin: '0 0 8px',
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: fonts.text,
            fontSize: 14,
            color: colors.cinza,
            lineHeight: 1.55,
            margin: '0 auto',
            maxWidth: 420,
          }}
        >
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  )
}

/** Falha de carregamento, com a mensagem que a API devolveu. */
export function PanelError({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message = error instanceof Error ? error.message : 'Não foi possível carregar.'

  return (
    <div style={{ ...box, border: `1px solid ${colors.statusEmpregado}` }} role="alert">
      <h3
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 18,
          color: colors.statusEmpregado,
          margin: '0 0 8px',
        }}
      >
        Algo falhou
      </h3>
      <p style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: 0 }}>
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            marginTop: 18,
            background: colors.tinta,
            color: colors.giz,
            border: 0,
            borderRadius: 30,
            padding: '12px 20px',
            cursor: 'pointer',
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Tentar de novo
        </button>
      )}
    </div>
  )
}
