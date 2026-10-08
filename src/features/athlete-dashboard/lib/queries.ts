import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { athleteDashboardApi } from '../api/athlete-dashboard-api'

const myProfileKey = ['athlete-dashboard', 'me'] as const

export function useAthleteDashboard() {
  return useQuery({
    queryKey: ['athlete-dashboard'],
    queryFn: () => athleteDashboardApi.getDashboard(),
  })
}

/** Perfil do próprio atleta — a vitrine pública lê `publicProfile` e `slug`. */
export function useMyAthleteProfile() {
  return useQuery({
    queryKey: myProfileKey,
    queryFn: () => athleteDashboardApi.getMyProfile(),
  })
}

export function useSetPublicProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (publicProfile: boolean) => athleteDashboardApi.setPublicProfile(publicProfile),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: myProfileKey })
    },
  })
}
