import type { ReactNode } from 'react'

export type DashIconName = 'house' | 'search' | 'star' | 'chat' | 'bookmark' | 'chart'

const PATHS: Record<DashIconName, ReactNode> = {
  house: <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-8.5z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5L20 20" />
    </>
  ),
  star: (
    <path d="M12 3l2.6 5.6 6.4.7-4.8 4.3 1.4 6.4L12 16.6l-5.6 3.4 1.4-6.4L3 9.6l6.4-.7L12 3z" />
  ),
  chat: <path d="M3 12a9 9 0 1 1 4 7.5L3 21l1.5-4A8.96 8.96 0 0 1 3 12z" />,
  bookmark: <path d="M6 4h12v17l-6-4-6 4V4z" />,
  chart: <path d="M4 20V11M10 20V4M16 20v-7M22 20V8M3 21h18" />,
}

export interface DashIconProps {
  name: DashIconName
  size?: number
}

/** Ícones de linha do painel. Herdam a cor do botão via `currentColor`. */
export function DashIcon({ name, size = 18 }: DashIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {PATHS[name]}
    </svg>
  )
}
