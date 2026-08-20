import type { ReactNode } from 'react'

import { colors } from '@/shared/config/theme'

import { AuthHeader } from './AuthHeader'

/**
 * Casca das telas auxiliares de auth (código de e-mail, recuperação de senha).
 * Coluna única centralizada — sem o painel editorial do login.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: colors.creme, display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'var(--auth-justify)',
          padding: 'var(--auth-pad-y) var(--page-x)',
          maxWidth: 520,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <AuthHeader />
        {children}
      </div>
    </div>
  )
}
