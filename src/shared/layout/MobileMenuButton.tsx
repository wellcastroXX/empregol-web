export interface MobileMenuButtonProps {
  open: boolean
  onToggle: () => void
  /** Cor do traço — acompanha o estado transparente/sólido da barra. */
  color: string
}

const BAR = {
  display: 'block',
  width: 22,
  height: 1.5,
  borderRadius: 1,
  transition: 'transform 240ms ease, opacity 180ms ease, background-color 240ms ease',
} as const

/** Botão de menu. Os três traços viram um X quando aberto. */
export function MobileMenuButton({ open, onToggle, color }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className="only-md"
      onClick={onToggle}
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={open}
      aria-controls="menu-mobile"
      style={{
        width: 44,
        height: 44,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        // 44px é o alvo mínimo confortável para o dedo; a área maior que o
        // desenho é intencional.
        margin: '0 -10px 0 0',
        padding: 0,
      }}
    >
      <span
        style={{
          ...BAR,
          background: color,
          transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
        }}
      />
      <span style={{ ...BAR, background: color, opacity: open ? 0 : 1 }} />
      <span
        style={{
          ...BAR,
          background: color,
          transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
        }}
      />
    </button>
  )
}
