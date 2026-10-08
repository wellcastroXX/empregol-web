import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { useAthleteProfile, usePublicAthleteProfile } from '@/features/athlete-profile/lib/queries'
import {
  AthleteProfileView,
  type ProfileAudience,
} from '@/features/athlete-profile/ui/AthleteProfileView'
import { useAuth } from '@/features/auth/ui/auth-context'
import { scoutApi } from '@/features/scout/api/scout-api'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle'

/**
 * Vitrine pública do atleta — empregol.co/p/<slug>.
 *
 * Dois modos, como pede o link compartilhado:
 *
 * - **visitante**: o que a rota `/public/athletes/:slug` devolve. Ficha
 *   esportiva, temporadas e vídeos; sem pretensão salarial e sem data de
 *   nascimento. É o que qualquer pessoa com o link vê.
 * - **clube**: só para contratante autenticado. Busca a ficha completa por id
 *   (o que registra a visualização para o atleta) e libera as ações.
 *
 * O contratante pode alternar entre os dois para conferir como o perfil
 * aparece para quem está de fora.
 */
export default function PublicProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const isContractor = user != null && user.role !== 'athlete'
  const [audience, setAudience] = useState<ProfileAudience>(isContractor ? 'contractor' : 'public')

  const publicProfile = usePublicAthleteProfile(slug)
  // Só busca a ficha de contratante quando é esse o modo — a chamada registra
  // uma visualização, e o atleta não deve ver visita que não aconteceu.
  const athleteId = publicProfile.data?.id ?? null
  const fullProfile = useAthleteProfile(
    isContractor && audience === 'contractor' ? athleteId : null,
  )

  const profile =
    audience === 'contractor' ? (fullProfile.data ?? publicProfile.data) : publicProfile.data

  useDocumentTitle(profile ? `${profile.fullName} — Empregol` : 'Perfil do atleta — Empregol')

  if (publicProfile.isLoading) {
    return (
      <Shell>
        <Eyebrow size={11}>C A R R E G A N D O</Eyebrow>
      </Shell>
    )
  }

  if (publicProfile.isError || !profile) {
    return (
      <Shell>
        <Eyebrow size={11} style={{ marginBottom: 16 }}>
          P E R F I L · I N D I S P O N Í V E L
        </Eyebrow>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(30px, 4vw, 54px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            margin: '0 0 18px',
          }}
        >
          Esse perfil não está
          <br />
          aberto ao público<span style={{ color: colors.gramado }}>.</span>
        </h1>
        <p style={{ fontFamily: fonts.text, fontSize: 16, lineHeight: 1.6, maxWidth: 520 }}>
          Ou o endereço está errado, ou o atleta ainda não abriu a vitrine. Clubes e agentes
          cadastrados encontram todos os atletas pela busca do painel.
        </p>
      </Shell>
    )
  }

  return (
    <Shell>
      {isContractor && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <ModeButton
            active={audience === 'contractor'}
            onClick={() => setAudience('contractor')}
            label="Como clube"
          />
          <ModeButton
            active={audience === 'public'}
            onClick={() => setAudience('public')}
            label="Como visitante"
          />
        </div>
      )}

      <AthleteProfileView athlete={profile} audience={audience} />

      {isContractor && audience === 'contractor' && athleteId && (
        <ContractorActions athleteId={athleteId} onOpened={() => void navigate(ROUTES.painel)} />
      )}
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ padding: 'var(--section-y) var(--page-x)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        background: active ? colors.tinta : 'transparent',
        color: active ? colors.giz : colors.tinta,
        border: `1px solid ${colors.tinta}`,
        borderRadius: 30,
        padding: '9px 16px',
        cursor: 'pointer',
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}

/** Mesmas ações da gaveta do painel: proposta ainda não, conversa sim. */
function ContractorActions({ athleteId, onOpened }: { athleteId: string; onOpened: () => void }) {
  const [opening, setOpening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startConversation() {
    setOpening(true)
    setError(null)
    try {
      await scoutApi.openConversation(athleteId)
      onOpened()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível abrir a conversa.')
      setOpening(false)
    }
  }

  return (
    <div style={{ marginTop: 36, paddingTop: 20, borderTop: `1.5px solid ${colors.tinta}` }}>
      {error && (
        <p
          role="alert"
          style={{
            fontFamily: fonts.text,
            fontSize: 13,
            color: colors.statusEmpregado,
            margin: '0 0 12px',
          }}
        >
          {error}
        </p>
      )}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          type="button"
          disabled
          title="Propostas ainda não estão disponíveis no site — em breve."
          style={{
            flex: '1 1 180px',
            background: 'transparent',
            color: colors.cinza,
            border: `1.5px solid ${colors.osso}`,
            borderRadius: 30,
            padding: '14px 18px',
            cursor: 'not-allowed',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Proposta
        </button>
        <button
          type="button"
          onClick={() => void startConversation()}
          disabled={opening}
          style={{
            flex: '1 1 180px',
            background: colors.gramado,
            color: colors.giz,
            border: 0,
            borderRadius: 30,
            padding: '14px 18px',
            cursor: opening ? 'progress' : 'pointer',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {opening ? 'Abrindo...' : 'Conversar'}
        </button>
      </div>
    </div>
  )
}
