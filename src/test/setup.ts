import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom não implementa matchMedia. Sem este stub, qualquer componente que
// consulte media query no render quebra o teste inteiro.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

// O jsdom se apresenta como `en-US`, e o site escolhe o idioma pelo navegador na
// primeira visita. Os testes assumem o público principal, que lê português.
Object.defineProperty(window.navigator, 'language', { value: 'pt-BR', configurable: true })
Object.defineProperty(window.navigator, 'languages', { value: ['pt-BR'], configurable: true })

afterEach(() => {
  cleanup()
  // A sessão vive em localStorage; sem limpar, um teste autenticado vazaria
  // para o próximo.
  globalThis.localStorage?.clear()
})
