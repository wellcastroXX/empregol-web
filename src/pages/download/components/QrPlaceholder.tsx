import { colors } from '@/shared/config/theme'

const SIZE = 21

/**
 * Grade no formato de QR, para o layout. **Não é um código escaneável** — o
 * padrão é determinístico só para ler como QR. Trocar por um código real antes
 * de publicar, senão a câmera do usuário não vai a lugar nenhum.
 */
export function QrPlaceholder() {
  const cells: Array<{ x: number; y: number }> = []

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const isFinder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)

      const isFinderCore =
        (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
        (x >= 16 && x <= 18 && y >= 2 && y <= 4) ||
        (x >= 2 && x <= 4 && y >= 16 && y <= 18)

      const isFinderRing =
        ((x === 0 || x === 6) && y <= 6) ||
        ((y === 0 || y === 6) && x <= 6) ||
        ((x === 14 || x === 20) && y <= 6) ||
        ((y === 0 || y === 6) && x >= 14) ||
        ((x === 0 || x === 6) && y >= 14) ||
        ((y === 14 || y === 20) && x <= 6)

      const on = isFinder
        ? isFinderRing || isFinderCore
        : (x * 7 + y * 13 + (x % 3) * (y % 4)) % 5 < 2

      if (on) cells.push({ x, y })
    }
  }

  return (
    <div style={{ background: colors.giz, padding: 16, borderRadius: 10 }}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="168"
        height="168"
        shapeRendering="crispEdges"
        style={{ display: 'block' }}
        role="img"
        aria-label="Espaço reservado para o QR code de download do app"
      >
        {cells.map((cell) => (
          <rect
            key={`${cell.x}-${cell.y}`}
            x={cell.x}
            y={cell.y}
            width="1"
            height="1"
            fill={colors.tinta}
          />
        ))}
      </svg>
    </div>
  )
}
