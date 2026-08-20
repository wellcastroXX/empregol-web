import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { usePrefersReducedMotion } from '@/shared/lib/hooks/usePrefersReducedMotion'

/** Quantos quadros esperar o layout assentar antes de desistir. */
const MAX_FRAMES = 60

/** Quadros consecutivos com a mesma altura para considerar o layout estável. */
const STABLE_FRAMES = 2

/**
 * Gerencia a posição de rolagem entre navegações.
 *
 * O React Router troca a rota sem mexer no scroll: sem isto, sair do rodapé da
 * home para /app abre a nova página já no fim dela.
 *
 * - sem hash: volta ao topo
 * - com hash: rola até a seção, esperando o layout assentar primeiro
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    // O navegador restauraria a posição sozinho no reload e brigaria com a
    // rolagem abaixo.
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash, key])

  useEffect(() => {
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    let frame = 0
    let attempts = 0
    let lastHeight = -1
    let stableFor = 0

    /**
     * Rolar cedo demais erra o alvo: a home é carregada sob demanda e o hero
     * tem vídeo, então a altura do documento ainda cresce depois do primeiro
     * quadro e a posição calculada fica obsoleta. Daí esperar a altura repetir.
     */
    const tick = () => {
      const target = document.getElementById(id)
      const height = document.documentElement.scrollHeight

      if (target) {
        stableFor = height === lastHeight ? stableFor + 1 : 0
        lastHeight = height

        if (stableFor >= STABLE_FRAMES) {
          // scrollIntoView respeita o scroll-margin-top que compensa o nav fixo.
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
          return
        }
      }

      if (attempts++ < MAX_FRAMES) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // `key` muda a cada navegação: reclicar o mesmo item rola de novo.
  }, [hash, key, prefersReducedMotion])

  return null
}
