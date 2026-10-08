import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { useAthleteProfile, usePublicAthleteProfile } from '@/features/athlete-profile/lib/queries'
import {
  PublicAthleteProfile,
  type ProfileAudience,
} from '@/features/athlete-profile/ui/PublicAthleteProfile'
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
    <>
      {/* Faixa no mesmo tom do hero: a troca de modo é ferramenta de quem está
          logado, não parte do perfil. */}
      {isContractor && (
        <div style={{ background: colors.tinta }}>
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '16px var(--page-x) 0',
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
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
        </div>
      )}

      <PublicAthleteProfile
        athlete={profile}
        audience={audience}
        actions={
          isContractor && audience === 'contractor' && athleteId ? (
            <ContractorActions
              athleteId={athleteId}
              onOpened={() => void navigate(ROUTES.painel)}
            />
          ) : null
        }
      />
    </>
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
        background: active ? colors.giz : 'transparent',
        color: active ? colors.tinta : colors.giz,
        border: `1px solid ${active ? colors.giz : colors.ruleDark}`,
        borderRadius: 30,
        padding: '8px 14px',
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

/** Ações do hero, como no kit: proposta ainda não, conversa sim. */
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
    <div style={{ marginTop: 30 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => void startConversation()}
          disabled={opening}
          style={{
            background: colors.gramado,
            color: colors.giz,
            border: 0,
            padding: '16px 22px',
            borderRadius: 4,
            cursor: opening ? 'progress' : 'pointer',
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.04em',
          }}
        >
          {opening ? 'ABRINDO...' : 'ENVIAR MENSAGEM ›'}
        </button>
        <button
          type="button"
          disabled
          title="Propostas ainda não estão disponíveis no site — em breve."
          style={{
            background: 'transparent',
            color: colors.cinzaOnDark,
            border: `1.5px solid ${colors.ruleDark}`,
            padding: '15px 22px',
            borderRadius: 4,
            cursor: 'not-allowed',
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.04em',
          }}
        >
          FAZER PROPOSTA
        </button>
      </div>
      {error && (
        <p
          role="alert"
          style={{
            fontFamily: fonts.text,
            fontSize: 13,
            color: colors.statusWarn,
            margin: '12px 0 0',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
