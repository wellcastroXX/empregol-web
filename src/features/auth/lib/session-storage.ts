import type { AuthUser, Session } from '../model/auth.types'

/** Mesma chave usada pelo app, para o formato ficar reconhecível entre as duas bases. */
const KEY = 'empregol.auth'

export interface AuthSnapshot {
  session: Session
  user: AuthUser
}

/**
 * Sessão persistida em `localStorage`.
 *
 * Guardar JWT em localStorage é legível por XSS. Optamos por isso porque a API
 * devolve os tokens no corpo da resposta (não em cookie httpOnly) e não expõe
 * endpoint de refresh — sem persistir, o usuário seria deslogado a cada F5.
 * É também o que o app já faz na versão web. Quando a API passar a emitir
 * cookie httpOnly, este módulo é o único ponto a trocar.
 */
export const sessionStorage = {
  save(snapshot: AuthSnapshot): void {
    try {
      globalThis.localStorage?.setItem(KEY, JSON.stringify(snapshot))
    } catch {
      // Modo privado ou storage cheio: a sessão vale só para esta aba.
    }
  },

  load(): AuthSnapshot | null {
    try {
      const raw = globalThis.localStorage?.getItem(KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as AuthSnapshot
      // Snapshot de versão antiga ou corrompido não deve derrubar o boot.
      if (!parsed?.session?.accessToken || !parsed?.user?.id) return null
      return parsed
    } catch {
      return null
    }
  },

  clear(): void {
    try {
      globalThis.localStorage?.removeItem(KEY)
    } catch {
      // Nada a fazer — a sessão em memória já foi descartada.
    }
  },
}
