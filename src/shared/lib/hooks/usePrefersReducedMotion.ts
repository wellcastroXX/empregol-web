import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onStoreChange: () => void): () => void {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onStoreChange)
  return () => mql.removeEventListener('change', onStoreChange)
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * Acompanha a preferência de movimento reduzido do sistema.
 *
 * useSyncExternalStore em vez de useState + useEffect: matchMedia é uma store
 * externa, e assinar por efeito dispararia render em cascata a cada montagem.
 *
 * Usado para não empurrar vídeo em autoplay a quem pediu menos movimento —
 * nesses casos o pôster estático já conta a história.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
