/**
 * Tokens do Empregol Design System expostos ao TypeScript.
 * Espelham 1:1 os custom properties de `src/styles/tokens.css` — use estas
 * constantes em estilos inline/JS e as CSS vars em folhas de estilo.
 */

export const colors = {
  /** Tinta — tinta primária, texto sobre claro e fundos escuros */
  tinta: '#141413',
  /** Creme — canvas neutro, fundo padrão da página */
  creme: '#F2EFE8',
  /** Gramado — verde de campo, o acento (CTAs, status positivo, ênfase) */
  gramado: '#2f8a4f',
  /** Osso — suporte, divisores, superfícies sutis */
  osso: '#E8E3D5',
  /** Giz — texto SOBRE tinta (off-white) */
  giz: '#FBFAF5',
  /** Cinza — texto auxiliar */
  cinza: '#6B6B66',

  /** Superfície escura: elevação, régua e texto auxiliar */
  tintaElev: '#1c1c1a',
  ruleDark: '#2a2a26',
  cinzaOnDark: '#9c9c95',

  /** Apoios do kit web */
  ossoRule: '#ddd6c2',
  nodeMuted: '#c9c2b0',

  /** Status */
  statusEmpregado: '#B33A2A',
  statusWarn: '#C77A1A',

  /** Tints — réguas e scrims sobre superfície escura */
  giz12: 'rgba(251, 250, 245, 0.12)',
  giz24: 'rgba(251, 250, 245, 0.24)',
  giz64: 'rgba(251, 250, 245, 0.64)',
  tinta12: 'rgba(20, 20, 19, 0.12)',
} as const

export const fonts = {
  display: '"Bricolage Grotesque", system-ui',
  text: '"Geist", system-ui',
  mono: '"Geist Mono", monospace',
} as const

export type Colors = typeof colors
export type Fonts = typeof fonts
