import { env } from '@/shared/config/env'

/** Envelope padrão de sucesso da empregol-api. */
export interface ApiEnvelope<T> {
  status: string
  data: T
}

/** Resposta que devolve só uma mensagem (registro, verificação, reenvio). */
export interface ApiMessage {
  status: string
  message: string
}

/**
 * Erro de qualquer resposta não-2xx, carregando o `code` e os erros por campo
 * que a API devolve em validação (422).
 */
export class ApiError extends Error {
  // Campos explícitos em vez de parameter properties: o tsconfig usa
  // erasableSyntaxOnly, que proíbe a forma curta.
  readonly code: string
  readonly httpStatus: number
  readonly fieldErrors?: Record<string, string[]>

  constructor(
    message: string,
    code: string,
    httpStatus: number,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.httpStatus = httpStatus
    this.fieldErrors = fieldErrors
  }

  /** Primeiro erro de campo, que é o mais útil para mostrar em formulário. */
  get firstFieldError(): string | undefined {
    return this.fieldErrors ? Object.values(this.fieldErrors)[0]?.[0] : undefined
  }
}

let accessToken: string | null = null

/** Define o token injetado em toda requisição. Chamado pelo AuthProvider. */
export function setAccessToken(token: string | null): void {
  accessToken = token
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

interface ApiErrorBody {
  message?: string
  code?: string
  errors?: Record<string, string[]>
}

/**
 * Cliente HTTP da empregol-api.
 *
 * `fetch` em vez de uma biblioteca: o uso é JSON simples com bearer, e o app
 * já faz assim — não compensa ~50 kB de bundle para isso.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options

  let response: Response
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch {
    // fetch só rejeita em falha de rede ou abort — a API nunca chegou a responder.
    throw new ApiError('Sem conexão com o servidor. Verifique sua internet.', 'NETWORK_ERROR', 0)
  }

  const payload = (await response.json().catch(() => null)) as (ApiErrorBody & T) | null

  if (!response.ok) {
    throw new ApiError(
      payload?.message ?? 'Algo deu errado. Tente novamente.',
      payload?.code ?? 'UNKNOWN',
      response.status,
      payload?.errors,
    )
  }

  return payload as T
}

/** Normaliza qualquer falha em ApiError. */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error
  return new ApiError(error instanceof Error ? error.message : 'Erro inesperado.', 'UNKNOWN', 0)
}
