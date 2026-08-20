import type { ReactNode } from 'react'

import { colors, fonts } from '@/shared/config/theme'

export interface AuthAlertProps {
  tone: 'error' | 'success'
  children: ReactNode
}

/** Aviso do formulário — falha da API ou confirmação de envio. */
export function AuthAlert({ tone, children }: AuthAlertProps) {
  const isError = tone === 'error'

  return (
    <p
      role={isError ? 'alert' : 'status'}
      style={{
        margin: '0 0 18px',
        padding: '12px 14px',
        borderRadius: 4,
        border: `1px solid ${isError ? colors.statusEmpregado : colors.gramado}`,
        background: colors.giz,
        color: isError ? colors.statusEmpregado : colors.tinta,
        fontFamily: fonts.text,
        fontSize: 13.5,
        lineHeight: 1.5,
      }}
    >
      {children}
    </p>
  )
}

export interface SubmitButtonProps {
  children: ReactNode
  loading?: boolean
  loadingLabel?: string
}

/** Botão principal do formulário. Desabilita e troca o rótulo enquanto envia. */
export function SubmitButton({
  children,
  loading = false,
  loadingLabel = 'Enviando...',
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      style={{
        marginTop: 22,
        background: loading ? colors.cinza : colors.gramado,
        color: colors.giz,
        border: 0,
        padding: '16px 20px',
        borderRadius: 4,
        cursor: loading ? 'progress' : 'pointer',
        fontFamily: fonts.text,
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        transition: 'background-color 160ms ease',
      }}
    >
      {loading ? loadingLabel : children}
    </button>
  )
}
