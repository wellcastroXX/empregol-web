import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTE_CONFIG } from './routeConfig'

const router = createBrowserRouter(ROUTE_CONFIG)

export function AppRouter() {
  return <RouterProvider router={router} />
}
