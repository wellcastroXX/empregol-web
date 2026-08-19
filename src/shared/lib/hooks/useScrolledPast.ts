import { useCallback, useSyncExternalStore } from 'react'

function getServerSnapshot(): boolean {
  return false
}

/**
 * Diz se a página já rolou além de um limiar.
 *
 * useSyncExternalStore em vez de useState + listener: o snapshot é um boolean,
 * então o React descarta sozinho os milhares de eventos de scroll que não
 * cruzam o limiar e só re-renderiza na virada.
 */
export function useScrolledPast(threshold = 40): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('scroll', onStoreChange, { passive: true })
    return () => window.removeEventListener('scroll', onStoreChange)
  }, [])

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
