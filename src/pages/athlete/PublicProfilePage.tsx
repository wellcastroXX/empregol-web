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
import { useFavorites, useToggleFavorite } from '@/features/scout/lib/queries'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle'

const MESSAGES = defineMessages({
  pt: {
    fallbackTitle: 'Perfil do atleta — Empregol',
    loading: 'C A R R E G A N D O',
    unavailableEyebrow: 'P E R F I L · I N D I S P O N Í V E L',
    unavailableTitle: ['Esse perfil não está', 'aberto ao público'],
    unavailableBody:
      'Ou o endereço está errado, ou o atleta ainda não abriu a vitrine. Clubes e agências cadastrados encontram todos os atletas pela busca do painel.',
    asClub: 'Como clube',
    asVisitor: 'Como visitante',
    removeShortlist: 'Remover da shortlist',
    saveShortlist: 'Salvar na shortlist',
    onShortlist: 'Na sua shortlist',
    openFailed: 'Não foi possível abrir a conversa.',
    opening: 'ABRINDO...',
    sendMessage: 'ENVIAR MENSAGEM ›',
    proposalSoon: 'Propostas ainda não estão disponíveis no site — em breve.',
    inviteTrial: 'CONVIDAR PARA TESTE',
  },
  en: {
    fallbackTitle: 'Athlete profile — Empregol',
    loading: 'L O A D I N G',
    unavailableEyebrow: 'P R O F I L E · U N A V A I L A B L E',
    unavailableTitle: ['This profile is not', 'open to the public'],
    unavailableBody:
      'Either the address is wrong, or the athlete has not opened their showcase yet. Registered clubs and agencies can find every athlete through the dashboard search.',
    asClub: 'As a club',
    asVisitor: 'As a visitor',
    removeShortlist: 'Remove from shortlist',
    saveShortlist: 'Save to shortlist',
    onShortlist: 'On your shortlist',
    openFailed: 'Could not open the conversation.',
    opening: 'OPENING...',
    sendMessage: 'SEND MESSAGE ›',
    proposalSoon: 'Offers are not available on the website yet — coming soon.',
    inviteTrial: 'INVITE TO A TRIAL',
  },
  es: {
    fallbackTitle: 'Perfil del atleta — Empregol',
    loading: 'C A R G A N D O',
    unavailableEyebrow: 'P E R F I L · N O · D I S P O N I B L E',
    unavailableTitle: ['Este perfil no está', 'abierto al público'],
    unavailableBody:
      'O la dirección es incorrecta, o el atleta todavía no abrió su vitrina. Los clubes y agencias registrados encuentran a todos los atletas en la búsqueda del panel.',
    asClub: 'Como club',
    asVisitor: 'Como visitante',
    removeShortlist: 'Quitar de la shortlist',
    saveShortlist: 'Guardar en la shortlist',
    onShortlist: 'En tu shortlist',
    openFailed: 'No se pudo abrir la conversación.',
    opening: 'ABRIENDO...',
    sendMessage: 'ENVIAR MENSAJE ›',
    proposalSoon: 'Las propuestas todavía no están disponibles en el sitio — próximamente.',
    inviteTrial: 'INVITAR A UNA PRUEBA',
  },
})

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
  const m = useMessages(MESSAGES)
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

  useDocumentTitle(profile ? `${profile.fullName} — Empregol` : m.fallbackTitle)

  if (publicProfile.isLoading) {
    return (
      <Shell>
        <Eyebrow size={11}>{m.loading}</Eyebrow>
      </Shell>
    )
  }

  if (publicProfile.isError || !profile) {
    return (
      <Shell>
        <Eyebrow size={11} style={{ marginBottom: 16 }}>
          {m.unavailableEyebrow}
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
          {m.unavailableTitle[0]}
          <br />
          {m.unavailableTitle[1]}
          <span style={{ color: colors.gramado }}>.</span>
        </h1>
        <p style={{ fontFamily: fonts.text, fontSize: 16, lineHeight: 1.6, maxWidth: 520 }}>
          {m.unavailableBody}
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
              label={m.asClub}
            />
            <ModeButton
              active={audience === 'public'}
              onClick={() => setAudience('public')}
              label={m.asVisitor}
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

/**
 * Estrela da shortlist.
 *
 * O estado vem de `/favorites`, porque o perfil não diz se este contratante já
 * favoritou o atleta — a rota pública é anônima e nem saberia quem pergunta.
 */
function FavoriteButton({ athleteId }: { athleteId: string }) {
  const m = useMessages(MESSAGES)
  const favorites = useFavorites()
  const toggle = useToggleFavorite()
  const saved = favorites.data?.some((athlete) => athlete.id === athleteId) ?? false

  return (
    <button
      type="button"
      onClick={() => toggle.mutate(athleteId)}
      disabled={favorites.isLoading || toggle.isPending}
      aria-pressed={saved}
      aria-label={saved ? m.removeShortlist : m.saveShortlist}
      title={saved ? m.onShortlist : m.saveShortlist}
      style={{
        background: saved ? colors.giz : 'transparent',
        color: saved ? colors.tinta : colors.giz,
        border: `1.5px solid ${saved ? colors.giz : colors.ruleDark}`,
        width: 52,
        borderRadius: 4,
        fontSize: 18,
        cursor: toggle.isPending ? 'progress' : 'pointer',
      }}
    >
      ★
    </button>
  )
}

/** Ações do hero, como no kit: proposta ainda não, conversa sim. */
function ContractorActions({ athleteId, onOpened }: { athleteId: string; onOpened: () => void }) {
  const m = useMessages(MESSAGES)
  const [opening, setOpening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startConversation() {
    setOpening(true)
    setError(null)
    try {
      await scoutApi.openConversation(athleteId)
      onOpened()
    } catch (err) {
      setError(err instanceof Error ? err.message : m.openFailed)
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
          {opening ? m.opening : m.sendMessage}
        </button>
        <button
          type="button"
          disabled
          title={m.proposalSoon}
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
          {m.inviteTrial}
        </button>
        <FavoriteButton athleteId={athleteId} />
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
