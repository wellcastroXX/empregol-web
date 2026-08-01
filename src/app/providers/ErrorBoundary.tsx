import { Component, type ErrorInfo, type ReactNode } from 'react'

import { colors, fonts } from '@/shared/config/theme'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/** Rede de segurança na raiz — evita a tela branca em erro de render. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // TODO: enviar para o serviço de observabilidade (Sentry/Datadog).
    console.error('[empregol] erro não tratado:', error, info.componentStack)
  }

  override render(): ReactNode {
    if (!this.state.error) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <div style={{ padding: '120px 40px', background: colors.creme, minHeight: '100vh' }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.cinza,
            marginBottom: 18,
          }}
        >
          A L G O · Q U E B R O U
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(40px, 5vw, 72px)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            color: colors.tinta,
            margin: '0 0 24px',
          }}
        >
          Erro fora do script<span style={{ color: colors.gramado }}>.</span>
        </h1>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            background: colors.tinta,
            color: colors.giz,
            border: 0,
            padding: '16px 22px',
            borderRadius: 4,
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.04em',
            cursor: 'pointer',
          }}
        >
          RECARREGAR ›
        </button>
      </div>
    )
  }
}
