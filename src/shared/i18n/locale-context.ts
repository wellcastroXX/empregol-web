import { createContext, useContext } from 'react'

import { DEFAULT_LOCALE, LOCALE_TAGS, type Locale } from './locale'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

// Fora do provider (testes que montam um componente solto) o site fica em
// português, como sempre foi.
export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
})

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}

/** Textos de um componente nos três idiomas — o português dita o formato. */
export type Messages<T> = { pt: T; en: NoInfer<T>; es: NoInfer<T> }

/**
 * Declara os textos de um componente. O tipo sai do bloco em português, então
 * esquecer uma chave (ou errar a assinatura de uma função) no inglês ou no
 * espanhol é erro de compilação.
 */
export function defineMessages<T>(messages: Messages<T>): Messages<T> {
  return messages
}

/** Os textos do componente no idioma atual. */
export function useMessages<T>(messages: Messages<T>): T {
  return messages[useLocale().locale]
}

/** Tag BCP 47 do idioma atual, para `toLocaleString` e afins. */
export function useLocaleTag(): string {
  return LOCALE_TAGS[useLocale().locale]
}
