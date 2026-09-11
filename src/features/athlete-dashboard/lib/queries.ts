import { useQuery } from '@tanstack/react-query'

import { athleteDashboardApi } from '../api/athlete-dashboard-api'

export function useAthleteDashboard() {
  return useQuery({
    queryKey: ['athlete-dashboard'],
    queryFn: () => athleteDashboardApi.getDashboard(),
  })
}
