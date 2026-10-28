import type { Locale } from '@/shared/i18n/locale'

/**
 * Título de quem não declarou nada. O português é o que o index.html já traz
 * no HTML — mantenha os dois iguais.
 */
export const DEFAULT_TITLES: Record<Locale, string> = {
  pt: 'Empregol — Atleta livre não é atleta esquecido.',
  en: 'Empregol — A free agent is not a forgotten athlete.',
  es: 'Empregol — Atleta libre no es atleta olvidado.',
}
