import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { scoutApi } from '../api/scout-api'
import type { ExploreFilters } from '../model/scout.types'

/** Chaves centralizadas — evita invalidar a query errada por string solta. */
export const scoutKeys = {
  explore: (filters: ExploreFilters) => ['scout', 'explore', filters] as const,
  favorites: () => ['scout', 'favorites'] as const,
  conversations: () => ['scout', 'conversations'] as const,
  messages: (id: string) => ['scout', 'messages', id] as const,
  profile: () => ['scout', 'profile'] as const,
}

export function useExploreAthletes(filters: ExploreFilters) {
  return useQuery({
    queryKey: scoutKeys.explore(filters),
    queryFn: () => scoutApi.exploreAthletes(filters),
    // Mantém a lista anterior visível enquanto o novo filtro carrega, em vez
    // de piscar um vazio a cada tecla digitada.
    placeholderData: (previous) => previous,
  })
}

export function useFavorites() {
  return useQuery({
    queryKey: scoutKeys.favorites(),
    queryFn: () => scoutApi.listFavorites(),
  })
}

export function useConversations() {
  return useQuery({
    queryKey: scoutKeys.conversations(),
    queryFn: () => scoutApi.listConversations(),
  })
}

export function useMessages(conversationId: string | null) {
  return useQuery({
    queryKey: scoutKeys.messages(conversationId ?? ''),
    queryFn: () => scoutApi.listMessages(conversationId!),
    enabled: Boolean(conversationId),
  })
}

export function useContractorProfile() {
  return useQuery({
    queryKey: scoutKeys.profile(),
    queryFn: () => scoutApi.myProfile(),
  })
}

/** Alterna a shortlist e recarrega as listas que dependem dela. */
export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (athleteId: string) => scoutApi.toggleFavorite(athleteId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: scoutKeys.favorites() })
      // A busca carrega `isFavorited` por atleta, então também fica obsoleta.
      void queryClient.invalidateQueries({ queryKey: ['scout', 'explore'] })
    },
  })
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) => scoutApi.sendMessage(conversationId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: scoutKeys.messages(conversationId) })
      void queryClient.invalidateQueries({ queryKey: scoutKeys.conversations() })
    },
  })
}
