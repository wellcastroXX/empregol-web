import type { Formation, Position } from './athlete.types'

/** Nó de posição no campo, em coordenadas do viewBox 100 × 150. */
export interface PitchNode {
  id: Position
  x: number
  y: number
}

export const FORMATIONS: Record<Formation, readonly PitchNode[]> = {
  '4-4-2': [
    { id: 'GK', x: 50, y: 138 },
    { id: 'LB', x: 16, y: 112 },
    { id: 'CB', x: 38, y: 116 },
    { id: 'CB', x: 62, y: 116 },
    { id: 'RB', x: 84, y: 112 },
    { id: 'LM', x: 16, y: 74 },
    { id: 'CM', x: 38, y: 78 },
    { id: 'CM', x: 62, y: 78 },
    { id: 'RM', x: 84, y: 74 },
    { id: 'ST', x: 38, y: 36 },
    { id: 'ST', x: 62, y: 36 },
  ],
  '4-3-3': [
    { id: 'GK', x: 50, y: 138 },
    { id: 'LB', x: 16, y: 112 },
    { id: 'CB', x: 38, y: 116 },
    { id: 'CB', x: 62, y: 116 },
    { id: 'RB', x: 84, y: 112 },
    { id: 'CM', x: 30, y: 82 },
    { id: 'CM', x: 50, y: 86 },
    { id: 'CM', x: 70, y: 82 },
    { id: 'LW', x: 20, y: 42 },
    { id: 'ST', x: 50, y: 34 },
    { id: 'RW', x: 80, y: 42 },
  ],
  '4-2-3-1': [
    { id: 'GK', x: 50, y: 138 },
    { id: 'LB', x: 16, y: 112 },
    { id: 'CB', x: 38, y: 116 },
    { id: 'CB', x: 62, y: 116 },
    { id: 'RB', x: 84, y: 112 },
    { id: 'DM', x: 38, y: 92 },
    { id: 'DM', x: 62, y: 92 },
    { id: 'LW', x: 20, y: 58 },
    { id: 'AM', x: 50, y: 62 },
    { id: 'RW', x: 80, y: 58 },
    { id: 'ST', x: 50, y: 30 },
  ],
  '3-5-2': [
    { id: 'GK', x: 50, y: 138 },
    { id: 'CB', x: 28, y: 114 },
    { id: 'CB', x: 50, y: 117 },
    { id: 'CB', x: 72, y: 114 },
    { id: 'LM', x: 14, y: 80 },
    { id: 'CM', x: 38, y: 84 },
    { id: 'CM', x: 62, y: 84 },
    { id: 'RM', x: 86, y: 80 },
    { id: 'AM', x: 50, y: 64 },
    { id: 'ST', x: 38, y: 32 },
    { id: 'ST', x: 62, y: 32 },
  ],
}
