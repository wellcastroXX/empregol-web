import axios, { AxiosError, type AxiosInstance } from 'axios'

import { env } from '@/shared/config/env'

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

/** Token de acesso em memória — evita XSS ler o token do localStorage. */
let accessToken: string | null = null

export function setAccessToken(token: string | null): void {
  accessToken = token
}

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export interface ApiErrorShape {
  message: string
  status?: number
  code?: string
}

/** Normaliza qualquer erro (axios, rede, runtime) em um formato único. */
export function toApiError(error: unknown): ApiErrorShape {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string; code?: string } | undefined
    return {
      message: data?.message ?? error.message,
      status: error.response?.status,
      code: data?.code ?? error.code,
    }
  }
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: 'Erro inesperado.' }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
)
