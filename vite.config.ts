/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    // Sem sourcemap em produção: o site é público e o .map expõe o código-fonte
    // inteiro. Ligue temporariamente se precisar depurar um erro de produção.
    sourcemap: false,
    target: 'es2022',
    chunkSizeWarningLimit: 700,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['src/test/**', 'src/**/*.d.ts', 'src/main.tsx'],
    },
  },
})
