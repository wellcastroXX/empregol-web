import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, type ReactNode } from 'react'

import { useAthleteProfile } from '@/features/athlete-profile/lib/queries'
import { AthleteProfileView } from '@/features/athlete-profile/ui/AthleteProfileView'
import { scoutApi } from '@/features/scout/api/scout-api'
import { scoutKeys } from '@/features/scout/lib/queries'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

import { AthleteProfileContext } from './athlete-profile-context'
import type { DashSection } from './DashSidebar'
import { PanelError, PanelLoading } from './PanelState'

const MESSAGES = defineMessages<{
  openFailed: string
  profileOf: (name: string) => string
  profile: string
  closeProfile: string
  close: string
  opening: string
  proposalSoon: string
  proposal: string
  openingConversation: string
  message: string
}>({
  pt: {
    openFailed: 'Não foi possível abrir a conversa.',
    profileOf: (name) => `Perfil de ${name}`,
    profile: 'Perfil do atleta',
    closeProfile: 'Fechar perfil',
    close: 'FECHAR ✕',
    opening: 'Abrindo perfil',
    proposalSoon: 'Propostas ainda não estão disponíveis no site — em breve.',
    proposal: 'Proposta',
    openingConversation: 'Abrindo...',
    message: 'Conversar',
  },
  en: {
    openFailed: 'Could not open the conversation.',
    profileOf: (name) => `${name}'s profile`,
    profile: 'Athlete profile',
    closeProfile: 'Close profile',
    close: 'CLOSE ✕',
    opening: 'Opening profile',
    proposalSoon: 'Offers are not available on the website yet — coming soon.',
    proposal: 'Offer',
    openingConversation: 'Opening...',
    message: 'Message',
  },
  es: {
    openFailed: 'No se pudo abrir la conversación.',
    profileOf: (name) => `Perfil de ${name}`,
    profile: 'Perfil del atleta',
    closeProfile: 'Cerrar perfil',
    close: 'CERRAR ✕',
    opening: 'Abriendo perfil',
    proposalSoon: 'Las propuestas todavía no están disponibles en el sitio — próximamente.',
    proposal: 'Propuesta',
    openingConversation: 'Abriendo...',
    message: 'Conversar',
  },
})

export interface AthleteProfileHostProps {
  children: ReactNode
  /** Depois de abrir a conversa, o painel pula para a seção de conversas. */
  onNavigate: (section: DashSection) => void
}

/**
 * Fornece o "abrir perfil" às seções e monta a gaveta por cima delas.
 *
 * Gaveta e não rota: o painel navega por estado de seção, não por URL, e tirar
 * o clube da lista de busca para uma página inteira perderia os filtros que ele
 * acabou de montar.
 */
export function AthleteProfileHost({ children, onNavigate }: AthleteProfileHostProps) {
  const [athleteId, setAthleteId] = useState<string | null>(null)

  return (
    <AthleteProfileContext.Provider value={setAthleteId}>
      {children}
      {athleteId && (
        <AthleteProfileDrawer
          athleteId={athleteId}
          onClose={() => setAthleteId(null)}
          onNavigate={onNavigate}
        />
      )}
    </AthleteProfileContext.Provider>
  )
}

interface AthleteProfileDrawerProps {
  athleteId: string
  onClose: () => void
  onNavigate: (section: DashSection) => void
}

function AthleteProfileDrawer({ athleteId, onClose, onNavigate }: AthleteProfileDrawerProps) {
  const m = useMessages(MESSAGES)
  const profile = useAthleteProfile(athleteId)
  const queryClient = useQueryClient()
  const [opening, setOpening] = useState(false)
  const [openError, setOpenError] = useState<string | null>(null)

  // Esc fecha, e o fundo não rola enquanto a gaveta está aberta.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [onClose])

  async function startConversation() {
    setOpening(true)
    setOpenError(null)
    try {
      await scoutApi.openConversation(athleteId)
      await queryClient.invalidateQueries({ queryKey: scoutKeys.conversations() })
      onClose()
      onNavigate('CONVERSAS')
    } catch (error) {
      setOpenError(error instanceof Error ? error.message : m.openFailed)
      setOpening(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={profile.data ? m.profileOf(profile.data.fullName) : m.profile}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Scrim: clicar fora fecha. É um botão para o teclado também alcançar. */}
      <button
        type="button"
        aria-label={m.closeProfile}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          border: 0,
          padding: 0,
          background: 'rgba(20, 20, 19, 0.55)',
          cursor: 'pointer',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: 'min(620px, 100%)',
          background: colors.creme,
          borderLeft: `1px solid ${colors.osso}`,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '14px var(--page-x) 0',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: `1px solid ${colors.osso}`,
              borderRadius: 30,
              padding: '8px 14px',
              cursor: 'pointer',
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: colors.tinta,
            }}
          >
            {m.close}
          </button>
        </div>

        <div style={{ overflowY: 'auto', padding: '10px var(--page-x) 28px', flex: 1 }}>
          {profile.isLoading && <PanelLoading label={m.opening} />}
          {profile.isError && (
            <PanelError error={profile.error} onRetry={() => profile.refetch()} />
          )}
          {profile.data && <AthleteProfileView athlete={profile.data} audience="contractor" />}
        </div>

        <footer
          style={{
            borderTop: `1px solid ${colors.osso}`,
            background: colors.giz,
            padding: '14px var(--page-x)',
          }}
        >
          {openError && (
            <p
              role="alert"
              style={{
                fontFamily: fonts.text,
                fontSize: 13,
                color: colors.statusEmpregado,
                margin: '0 0 10px',
              }}
            >
              {openError}
            </p>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              disabled
              // A API tem /proposals, mas o fluxo de criação ainda não existe no
              // site. Desabilitado e explicado em vez de escondido: o clube
              // precisa saber que a proposta vem por aqui.
              title={m.proposalSoon}
              style={{
                flex: 1,
                background: 'transparent',
                color: colors.cinza,
                border: `1.5px solid ${colors.osso}`,
                borderRadius: 30,
                padding: '13px 18px',
                cursor: 'not-allowed',
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {m.proposal}
            </button>
            <button
              type="button"
              onClick={() => void startConversation()}
              disabled={opening || !profile.data}
              style={{
                flex: 1,
                background: colors.gramado,
                color: colors.giz,
                border: 0,
                borderRadius: 30,
                padding: '13px 18px',
                cursor: opening ? 'progress' : 'pointer',
                opacity: profile.data ? 1 : 0.6,
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {opening ? m.openingConversation : m.message}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
