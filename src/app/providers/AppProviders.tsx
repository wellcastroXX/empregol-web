import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/ui/AuthProvider'
import { LocaleProvider } from '@/shared/i18n/LocaleProvider'
import { queryClient } from '@/shared/lib/query/query-client'

import { ErrorBoundary } from './ErrorBoundary'

/** Ponto único de composição dos providers globais. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </LocaleProvider>
  )
}
