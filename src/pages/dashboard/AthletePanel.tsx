import { useAthleteDashboard } from '@/features/athlete-dashboard/lib/queries'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'
import { LanguageSwitcher } from '@/shared/i18n/LanguageSwitcher'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { Wordmark } from '@/shared/ui/Wordmark'

import { PanelEmpty, PanelError, PanelLoading } from './components/PanelState'
import { ShowcaseCard } from './components/ShowcaseCard'

const MESSAGES = defineMessages<{
  signOut: string
  eyebrow: string
  hello: (name: string) => string
  viewsToday: string
  proposals: string
  daysShowcase: string
  newInvite: string
  contractorTypes: Record<'AGENT' | 'CLUB', string>
  wantsToTalk: string
  noInvite: string
  whoViewed: string
  viewsCount: (count: number) => string
  noViews: (week: number) => string
  emptyTitle: string
  emptyBody: string
}>({
  pt: {
    signOut: 'Sair',
    eyebrow: 'Á R E A · D O · A T L E T A',
    hello: (name) => `Olá, ${name || 'atleta'}`,
    viewsToday: 'viram hoje',
    proposals: 'propostas',
    daysShowcase: 'na vitrine',
    newInvite: 'N O V O · C O N V I T E',
    contractorTypes: { AGENT: 'AGÊNCIA', CLUB: 'CLUBE' },
    wantsToTalk: 'quer conversar com você',
    noInvite: 'Nenhum convite ainda. Mantém teu perfil completo para aparecer nas buscas.',
    whoViewed: 'Q U E M · T E · V I U · H O J E',
    viewsCount: (count) => `${count} visualizações hoje`,
    noViews: (week) => `Ainda ninguém te viu hoje — mas a semana toda soma ${week}.`,
    emptyTitle: 'Sem dados ainda',
    emptyBody: 'Volte em instantes.',
  },
  en: {
    signOut: 'Sign out',
    eyebrow: 'A T H L E T E · A R E A',
    hello: (name) => `Hi, ${name || 'athlete'}`,
    viewsToday: 'viewed today',
    proposals: 'offers',
    daysShowcase: 'in the showcase',
    newInvite: 'N E W · I N V I T A T I O N',
    contractorTypes: { AGENT: 'AGENCY', CLUB: 'CLUB' },
    wantsToTalk: 'wants to talk to you',
    noInvite: 'No invitations yet. Keep your profile complete to show up in searches.',
    whoViewed: 'W H O · V I E W E D · Y O U · T O D A Y',
    viewsCount: (count) => `${count} ${count === 1 ? 'view' : 'views'} today`,
    noViews: (week) => `Nobody has viewed you today yet — but the whole week adds up to ${week}.`,
    emptyTitle: 'No data yet',
    emptyBody: 'Check back in a moment.',
  },
  es: {
    signOut: 'Salir',
    eyebrow: 'Á R E A · D E L · A T L E T A',
    hello: (name) => `Hola, ${name || 'atleta'}`,
    viewsToday: 'te vieron hoy',
    proposals: 'propuestas',
    daysShowcase: 'en la vitrina',
    newInvite: 'N U E V A · I N V I T A C I Ó N',
    contractorTypes: { AGENT: 'AGENCIA', CLUB: 'CLUB' },
    wantsToTalk: 'quiere conversar contigo',
    noInvite:
      'Todavía no hay invitaciones. Mantén tu perfil completo para aparecer en las búsquedas.',
    whoViewed: 'Q U I É N · T E · V I O · H O Y',
    viewsCount: (count) => `${count} ${count === 1 ? 'visualización' : 'visualizaciones'} hoy`,
    noViews: (week) => `Todavía nadie te vio hoy — pero en toda la semana suman ${week}.`,
    emptyTitle: 'Todavía no hay datos',
    emptyBody: 'Vuelve en un momento.',
  },
})

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

/** Cabeçalho próprio — o atleta não tem barra lateral de scout. */
function AthleteTopbar({ onSignOut }: { onSignOut: () => void }) {
  const m = useMessages(MESSAGES)

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '18px var(--page-x)',
        borderBottom: `1px solid ${colors.osso}`,
        background: 'rgba(242, 239, 232, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Wordmark variant="dark" height={22} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <LanguageSwitcher color={colors.tinta} />
        <button
          type="button"
          onClick={onSignOut}
          style={{
            background: 'transparent',
            border: `1px solid ${colors.tinta}`,
            borderRadius: 30,
            padding: '9px 16px',
            cursor: 'pointer',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: colors.tinta,
          }}
        >
          {m.signOut}
        </button>
      </div>
    </header>
  )
}

/**
 * Painel do atleta (empregol.com/painel para quem entra como atleta).
 *
 * Usa `/dashboard/athlete` — o único endpoint de dashboard que a API expõe, e
 * exclusivo de ATHLETE. Espelha o AthleteHome do app: saudação, números,
 * último convite e quem visualizou.
 */
export function AthletePanel() {
  const m = useMessages(MESSAGES)
  const { user, signOut } = useAuth()
  const dashboard = useAthleteDashboard()

  const firstName = user?.nome.trim().split(/\s+/)[0] ?? ''
  const stats = dashboard.data?.stats
  const proposal = dashboard.data?.latestProposal
  const viewers = dashboard.data?.whoViewedToday ?? []

  return (
    <div style={{ minHeight: '100vh', background: colors.creme }}>
      <AthleteTopbar onSignOut={signOut} />

      <main style={{ padding: '28px var(--page-x) 60px', maxWidth: 900, margin: '0 auto' }}>
        <Eyebrow style={{ marginBottom: 8 }}>{m.eyebrow}</Eyebrow>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '-0.025em',
            color: colors.tinta,
            margin: '0 0 28px',
          }}
        >
          {m.hello(firstName)}
          <span style={{ color: colors.gramado }}>.</span>
        </h1>

        {dashboard.isLoading && <PanelLoading />}
        {dashboard.isError && (
          <PanelError error={dashboard.error} onRetry={() => dashboard.refetch()} />
        )}

        {dashboard.data && (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'var(--cols-3)',
                gap: 16,
                marginBottom: 28,
              }}
            >
              <StatCard value={stats?.viewsToday ?? 0} label={m.viewsToday} accent />
              <StatCard value={stats?.pendingProposals ?? 0} label={m.proposals} />
              <StatCard value={`${stats?.daysOnPlatform ?? 0}d`} label={m.daysShowcase} />
            </div>

            <ShowcaseCard />

            <section style={{ ...cardStyle, marginBottom: 16 }}>
              <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 12 }}>
                {m.newInvite}
              </Eyebrow>
              {proposal ? (
                <div>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: 20,
                      color: colors.tinta,
                    }}
                  >
                    {proposal.contractor.companyName ?? proposal.contractor.name}
                  </div>
                  <Eyebrow size={9.5} style={{ letterSpacing: '0.14em', marginTop: 4 }}>
                    {m.contractorTypes[proposal.contractor.type]} · {m.wantsToTalk}
                  </Eyebrow>
                  {proposal.message && (
                    <p
                      style={{
                        fontFamily: fonts.text,
                        fontSize: 14,
                        color: colors.cinza,
                        lineHeight: 1.55,
                        margin: '12px 0 0',
                      }}
                    >
                      {proposal.message}
                    </p>
                  )}
                </div>
              ) : (
                <p style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: 0 }}>
                  {m.noInvite}
                </p>
              )}
            </section>

            <section style={cardStyle}>
              <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
                {m.whoViewed}
              </Eyebrow>
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: '-0.015em',
                  color: colors.tinta,
                  margin: '0 0 8px',
                }}
              >
                {m.viewsCount(viewers.length)}
              </h2>
              {viewers.length === 0 ? (
                <p style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: 0 }}>
                  {m.noViews(stats?.viewsThisWeek ?? 0)}
                </p>
              ) : (
                viewers.map((view) => (
                  <div
                    key={view.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '12px 0',
                      borderTop: `1px solid ${colors.osso}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fonts.display,
                        fontWeight: 600,
                        fontSize: 15,
                        color: colors.tinta,
                      }}
                    >
                      {view.contractor.companyName ?? view.contractor.name}
                    </span>
                    <Eyebrow size={9.5} style={{ letterSpacing: '0.12em' }}>
                      {m.contractorTypes[view.contractor.type]}
                    </Eyebrow>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {!dashboard.isLoading && !dashboard.isError && !dashboard.data && (
          <PanelEmpty title={m.emptyTitle} description={m.emptyBody} />
        )}
      </main>
    </div>
  )
}

interface StatCardProps {
  value: string | number
  label: string
  accent?: boolean
}

function StatCard({ value, label, accent }: StatCardProps) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 40,
          color: accent ? colors.gramado : colors.tinta,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        {value}
      </div>
      <Eyebrow size={10} style={{ letterSpacing: '0.14em', marginTop: 10 }}>
        {label}
      </Eyebrow>
    </div>
  )
}
