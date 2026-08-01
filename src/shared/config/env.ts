import { z } from 'zod'

/**
 * Contrato das variáveis de ambiente do client.
 * Falha rápido no boot se algo estiver ausente/inválido — melhor quebrar aqui
 * do que descobrir uma URL de API vazia em produção.
 */
const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1).default('empregol'),
  VITE_API_URL: z.string().url().default('http://localhost:3000'),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')
  throw new Error(`Variáveis de ambiente inválidas:\n${issues}`)
}

export const env = {
  appName: parsed.data.VITE_APP_NAME,
  apiUrl: parsed.data.VITE_API_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

export type Env = typeof env
