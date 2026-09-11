import { useAthleteDashboard } from '@/features/athlete-dashboard/lib/queries'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { Wordmark } from '@/shared/ui/Wordmark'

import { PanelEmpty, PanelError, PanelLoading } from './components/PanelState'

const CONTRACTOR_LABEL = { AGENT: 'AGENTE', CLUB: 'CLUBE' } as const

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

/** Cabeçalho próprio — o atleta não tem barra lateral de scout. */
function AthleteTopbar({ onSignOut }: { onSignOut: () => void }) {
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
        Sair
      </button>
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
        <Eyebrow style={{ marginBottom: 8 }}>Á R E A · D O · A T L E T A</Eyebrow>
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
          Olá, {firstName || 'atleta'}
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
              <StatCard value={stats?.viewsToday ?? 0} label="viram hoje" accent />
              <StatCard value={stats?.pendingProposals ?? 0} label="propostas" />
              <StatCard value={`${stats?.daysOnPlatform ?? 0}d`} label="na vitrine" />
            </div>

            <section style={{ ...cardStyle, marginBottom: 16 }}>
              <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 12 }}>
                N O V O · C O N V I T E
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
                    {CONTRACTOR_LABEL[proposal.contractor.type]} · quer conversar com você
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
                  Nenhum convite ainda. Mantém teu perfil completo para aparecer nas buscas.
                </p>
              )}
            </section>

            <section style={cardStyle}>
              <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
                Q U E M · T E · V I U · H O J E
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
                {viewers.length} visualizações hoje
              </h2>
              {viewers.length === 0 ? (
                <p style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: 0 }}>
                  Ainda ninguém te viu hoje — mas a semana toda soma {stats?.viewsThisWeek ?? 0}.
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
                      {CONTRACTOR_LABEL[view.contractor.type]}
                    </Eyebrow>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {!dashboard.isLoading && !dashboard.isError && !dashboard.data && (
          <PanelEmpty title="Sem dados ainda" description="Volte em instantes." />
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
