/** Idiomas do site. O português é o original; inglês e espanhol são traduções. */
export const LOCALES = ['pt', 'en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt'

/** Valor do `<html lang>` e das APIs `Intl` para cada idioma. */
export const LOCALE_TAGS: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
}

/** Nome de cada idioma escrito nele mesmo — é o que o seletor mostra. */
export const LOCALE_NAMES: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
}

const STORAGE_KEY = 'empregol.locale'

// Espelho do idioma atual para o código que vive fora do React (o cliente
// HTTP). Quem escreve é o LocaleProvider.
let current: Locale = DEFAULT_LOCALE

export function currentLocale(): Locale {
  return current
}

export function setCurrentLocale(locale: Locale): void {
  current = locale
}

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/** Idioma salvo pelo seletor, se houver. Storage bloqueado não pode derrubar o site. */
function readStoredLocale(): Locale | null {
  try {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

export function storeLocale(locale: Locale): void {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, locale)
  } catch {
    // Sem storage o idioma vale só nesta visita — nada a fazer.
  }
}

/**
 * Idioma da primeira tela: o que o visitante escolheu antes ou, na primeira
 * visita, o do navegador. Qualquer idioma fora dos três cai no português, que é
 * o público principal do site.
 */
export function detectLocale(): Locale {
  const stored = readStoredLocale()
  if (stored) return stored

  const languages = globalThis.navigator?.languages?.length
    ? globalThis.navigator.languages
    : [globalThis.navigator?.language ?? '']

  for (const language of languages) {
    const prefix = language.toLowerCase().split('-')[0]
    if (isLocale(prefix)) return prefix
  }
  return DEFAULT_LOCALE
}
