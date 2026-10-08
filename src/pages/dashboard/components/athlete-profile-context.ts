import { createContext, useContext } from 'react'

/**
 * Abre a ficha de um atleta na gaveta do painel.
 *
 * Contexto em vez de prop: a linha do atleta aparece em três seções, e todas
 * teriam de repassar o mesmo callback só para chegar ao `AthleteRow`.
 */
export const AthleteProfileContext = createContext<((athleteId: string) => void) | null>(null)

/** `null` fora do painel — a linha então não vira botão. */
export function useOpenAthleteProfile(): ((athleteId: string) => void) | null {
  return useContext(AthleteProfileContext)
}
