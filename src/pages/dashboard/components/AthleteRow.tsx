import type { AthleteCard } from '@/features/scout/model/scout.types'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { useOpenAthleteProfile } from './athlete-profile-context'

const AVAILABILITY_LABEL = { FREE: 'LIVRE', EMPLOYED: 'EMPREGADO' } as const
const AVAILABILITY_BG = { FREE: colors.gramado, EMPLOYED: colors.statusEmpregado } as const

/** Linha de metadados: posição · idade · último clube. */
function meta(athlete: AthleteCard): string {
  return [athlete.position, athlete.age ? `${athlete.age} anos` : null, athlete.lastClub]
    .filter(Boolean)
    .join(' · ')
}

export interface AthleteRowProps {
  athlete: AthleteCard
  onToggleFavorite?: (athleteId: string) => void
  onOpenConversation?: (athleteId: string) => void
  busy?: boolean
}

/**
 * Bloco avatar + nome. Vira botão quando há para onde clicar; sem isso o
 * elemento clicável existiria sem destino e confundiria o leitor de tela.
 */
function Identity({
  as,
  onClick,
  label,
  children,
}: {
  as: 'button' | 'div'
  onClick?: () => void
  label?: string
  children: React.ReactNode
}) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    minWidth: 0,
    textAlign: 'left',
    background: 'transparent',
    border: 0,
    padding: 0,
    font: 'inherit',
    color: 'inherit',
    width: '100%',
  } as const

  if (as === 'div') return <div style={style}>{children}</div>

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ ...style, cursor: 'pointer' }}
    >
      {children}
    </button>
  )
}

/** Atleta numa linha — usado na visão geral, na busca e na shortlist. */
export function AthleteRow({
  athlete,
  onToggleFavorite,
  onOpenConversation,
  busy = false,
}: AthleteRowProps) {
  const jersey = athlete.jerseyNumber != null ? String(athlete.jerseyNumber).padStart(2, '0') : '--'
  const openProfile = useOpenAthleteProfile()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: 16,
        alignItems: 'center',
        padding: '14px 0',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      {/* Identidade inteira é o alvo do clique — um nome de 15px seria um alvo
          pequeno demais no celular. Sem handler (fora do painel) continua div. */}
      <Identity
        as={openProfile ? 'button' : 'div'}
        onClick={openProfile ? () => openProfile(athlete.id) : undefined}
        label={openProfile ? `Abrir o perfil de ${athlete.fullName}` : undefined}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 4,
            flexShrink: 0,
            background: colors.osso,
            color: colors.tinta,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 5px 2px',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            backgroundImage: athlete.avatarUrl ? `url(${athlete.avatarUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {athlete.avatarUrl ? '' : jersey}
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 15,
                color: colors.tinta,
              }}
            >
              {athlete.fullName}
            </span>
            <span
              style={{
                background: AVAILABILITY_BG[athlete.availability],
                color: colors.giz,
                padding: '3px 7px',
                borderRadius: 2,
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 9,
                letterSpacing: '0.10em',
              }}
            >
              {AVAILABILITY_LABEL[athlete.availability]}
            </span>
          </div>
          <Eyebrow size={9.5} style={{ letterSpacing: '0.12em', marginTop: 3 }}>
            {meta(athlete)}
          </Eyebrow>
        </div>
      </Identity>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={() => onToggleFavorite(athlete.id)}
            disabled={busy}
            aria-pressed={athlete.isFavorited ?? false}
            aria-label={
              athlete.isFavorited
                ? `Remover ${athlete.fullName} da shortlist`
                : `Adicionar ${athlete.fullName} à shortlist`
            }
            style={{
              background: athlete.isFavorited ? colors.tinta : 'transparent',
              color: athlete.isFavorited ? colors.giz : colors.tinta,
              border: `1px solid ${colors.tinta}`,
              borderRadius: 30,
              padding: '8px 14px',
              cursor: busy ? 'progress' : 'pointer',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {athlete.isFavorited ? 'Na shortlist' : 'Shortlist'}
          </button>
        )}
        {onOpenConversation && (
          <button
            type="button"
            onClick={() => onOpenConversation(athlete.id)}
            disabled={busy}
            style={{
              background: colors.gramado,
              color: colors.giz,
              border: 0,
              borderRadius: 30,
              padding: '8px 14px',
              cursor: busy ? 'progress' : 'pointer',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Conversar
          </button>
        )}
      </div>
    </div>
  )
}
