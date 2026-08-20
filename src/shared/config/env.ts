/**
 * Contrato das variáveis de ambiente do client.
 *
 * Validação escrita à mão de propósito: são dois campos, e usar um validador de
 * schema aqui arrastava a biblioteca inteira para dentro do bundle (~60 kB) em
 * troca de duas checagens.
 */

function required(name: string, value: string | undefined, fallback: string): string {
  const resolved = (value ?? '').trim() || fallback
  if (!resolved) throw new Error(`Variável de ambiente ausente: ${name}`)
  return resolved
}

function requiredUrl(name: string, value: string | undefined, fallback: string): string {
  const resolved = required(name, value, fallback)
  try {
    new URL(resolved)
  } catch {
    throw new Error(
      `Variável de ambiente inválida: ${name} precisa ser uma URL — recebido "${resolved}"`,
    )
  }
  // Barra no fim duplicaria a barra do path em toda requisição.
  return resolved.replace(/\/+$/, '')
}

export const env = {
  appName: required('VITE_APP_NAME', import.meta.env.VITE_APP_NAME, 'empregol'),
  apiUrl: requiredUrl('VITE_API_URL', import.meta.env.VITE_API_URL, 'http://localhost:3000'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

export type Env = typeof env
