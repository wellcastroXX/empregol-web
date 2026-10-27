import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { detectLocale, LOCALE_TAGS, setCurrentLocale, storeLocale, type Locale } from './locale'
import { LocaleContext } from './locale-context'

export interface LocaleProviderProps {
  children: ReactNode
  /** Força o idioma inicial — usado pelos testes, que não dependem do navegador. */
  initialLocale?: Locale
}

/** Guarda o idioma do site e mantém o `<html lang>` em dia com ele. */
export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? detectLocale())
  // Atualizado no render, não num efeito: a primeira requisição de um filho
  // já sai com o idioma certo.
  setCurrentLocale(locale)

  useEffect(() => {
    document.documentElement.lang = LOCALE_TAGS[locale]
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    storeLocale(next)
    setLocaleState(next)
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
