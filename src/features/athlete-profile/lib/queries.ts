import { useQuery } from '@tanstack/react-query'

import { athleteProfileApi } from '../api/athlete-profile-api'

export const athleteProfileKeys = {
  byId: (id: string) => ['athlete-profile', id] as const,
  bySlug: (slug: string) => ['athlete-profile', 'public', slug] as const,
}

/** Vitrine pública. Funciona deslogado — é a única rota sem token. */
export function usePublicAthleteProfile(slug: string | undefined) {
  return useQuery({
    queryKey: athleteProfileKeys.bySlug(slug ?? ''),
    queryFn: () => athleteProfileApi.getPublicBySlug(slug!),
    enabled: Boolean(slug),
    // 404 aqui é "não existe ou está fechado" — repetir não muda a resposta.
    retry: false,
  })
}

/** Carrega o perfil só quando há um atleta selecionado. */
export function useAthleteProfile(athleteId: string | null) {
  return useQuery({
    queryKey: athleteProfileKeys.byId(athleteId ?? ''),
    queryFn: () => athleteProfileApi.getById(athleteId!),
    enabled: Boolean(athleteId),
  })
}
