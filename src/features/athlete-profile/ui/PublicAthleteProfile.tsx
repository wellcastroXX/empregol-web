import type { ReactNode } from 'react'

import { DOMINANT_FEET, LEVELS, POSITIONS } from '@/features/auth/model/options'
import { colors, fonts } from '@/shared/config/theme'

import type { AthleteMedia, AthleteProfile, SeasonStat } from '../model/athlete-profile.types'
import { PositionPitch } from './PositionPitch'

/**
 * Perfil público do atleta, no desenho do kit `ui_kits/web/AthleteProfilePage`.
 *
 * Regra que vale para a página inteira: **bloco sem dado não aparece**. O kit
 * mostra atributos técnicos, formação tática e contagem de visualizações, que a
 * API não tem — então essas seções simplesmente não são renderizadas, em vez de
 * exibirem número inventado ou traço.
 */

export type ProfileAudience = 'public' | 'contractor'

const eyebrow = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: colors.cinza,
  margin: 0,
} as const

const AVAILABILITY_LABEL = { FREE: 'LIVRE', EMPLOYED: 'EMPREGADO' } as const
const AGENCY_LABEL = { REPRESENTED: 'Agenciado', UNREPRESENTED: 'Não agenciado' } as const

function labelOf(options: ReadonlyArray<{ value: string; label: string }>, value?: string | null) {
  if (!value) return null
  return options.find((option) => option.value === value)?.label ?? value
}

/** 192 → "1,92 m". Aceita metros também, caso algum cadastro antigo use. */
function height(value?: number | null): string | null {
  if (!value) return null
  const meters = value > 3 ? value / 100 : value
  return `${meters.toFixed(2).replace('.', ',')} m`
}

function money(value?: string | number | null): string | null {
  if (value == null || value === '') return null
  const amount = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(amount)) return null
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

export interface PublicAthleteProfileProps {
  athlete: AthleteProfile
  audience: ProfileAudience
  /** Ações do contratante (conversar / proposta), montadas pela página. */
  actions?: ReactNode
}

export function PublicAthleteProfile({ athlete, audience, actions }: PublicAthleteProfileProps) {
  return (
    <div style={{ background: colors.creme, color: colors.tinta }}>
      <Hero athlete={athlete} actions={actions} />
      <StatsBand athlete={athlete} />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'var(--section-y) var(--page-x)',
          display: 'grid',
          gridTemplateColumns: 'var(--cols-profile-main)',
          gap: 'var(--gap-profile)',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-profile)',
            minWidth: 0,
          }}
        >
          <Videos media={athlete.media ?? []} />
          <Career seasons={athlete.seasonStats ?? []} />
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
          <PositionCard athlete={athlete} />
          <DetailsCard athlete={athlete} />
          <SalaryCard athlete={athlete} audience={audience} />
        </aside>
      </div>
    </div>
  )
}

function Hero({ athlete, actions }: { athlete: AthleteProfile; actions?: ReactNode }) {
  const positionLabel = labelOf(POSITIONS, athlete.position)
  const meta = [
    positionLabel?.toUpperCase(),
    athlete.age ? `${athlete.age} ANOS` : null,
    height(athlete.height)?.toUpperCase(),
    athlete.weight ? `${athlete.weight} KG` : null,
    athlete.lastClub ? `EX-${athlete.lastClub.toUpperCase()}` : null,
  ].filter(Boolean)

  const names = athlete.fullName.trim().split(/\s+/)
  const firstName = names[0]
  const restName = names.slice(1).join(' ')

  return (
    <section style={{ background: colors.tinta, color: colors.giz }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px var(--page-x) 56px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 16,
            flexWrap: 'wrap',
            paddingBottom: 18,
            borderBottom: `1px solid ${colors.ruleDark}`,
            marginBottom: 40,
          }}
        >
          <p style={{ ...eyebrow, color: colors.cinzaOnDark }}>
            ATLETAS {positionLabel ? `· ${positionLabel.toUpperCase()} ` : ''}·{' '}
            <span style={{ color: colors.giz }}>{athlete.fullName.toUpperCase()}</span>
          </p>
          {athlete.slug && (
            <p style={{ ...eyebrow, color: colors.cinzaOnDark, wordBreak: 'break-all' }}>
              EMPREGOL.CO/P/{athlete.slug.toUpperCase()}
            </p>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--cols-profile-hero)',
            gap: 'var(--gap-profile)',
            alignItems: 'end',
          }}
        >
          <Portrait athlete={athlete} />

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
              <Tag background={colors.gramado} color={colors.giz}>
                <span
                  style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}
                />
                {AVAILABILITY_LABEL[athlete.availability]}
              </Tag>
              {labelOf(LEVELS, athlete.level) && (
                <Tag background="transparent" color={colors.giz} border={colors.cinzaOnDark}>
                  {labelOf(LEVELS, athlete.level)}
                </Tag>
              )}
              {labelOf(DOMINANT_FEET, athlete.dominantFoot) && (
                <Tag background="transparent" color={colors.giz} border={colors.cinzaOnDark}>
                  Pé {labelOf(DOMINANT_FEET, athlete.dominantFoot)}
                </Tag>
              )}
            </div>

            <h1
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 'clamp(40px, 8vw, 120px)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                margin: 0,
                overflowWrap: 'break-word',
              }}
            >
              {firstName}
              {restName && (
                <>
                  <br />
                  {restName}
                </>
              )}
              <span style={{ color: colors.gramado }}>.</span>
            </h1>

            {meta.length > 0 && (
              <p style={{ ...eyebrow, color: colors.cinzaOnDark, marginTop: 18 }}>
                {meta.join(' · ')}
              </p>
            )}

            {athlete.additionalInfo && (
              <p
                style={{
                  fontFamily: fonts.text,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: colors.gizMuted,
                  margin: '20px 0 0',
                  maxWidth: 560,
                }}
              >
                {athlete.additionalInfo}
              </p>
            )}

            {actions}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Retrato do kit. Sem foto, o número da camisa segura o bloco sozinho. */
function Portrait({ athlete }: { athlete: AthleteProfile }) {
  const jersey = athlete.jerseyNumber != null ? String(athlete.jerseyNumber).padStart(2, '0') : null

  return (
    <div
      style={{
        position: 'relative',
        width: 'var(--profile-portrait)',
        maxWidth: '100%',
        aspectRatio: '17 / 20',
        borderRadius: 6,
        overflow: 'hidden',
        background: colors.tintaElev,
      }}
    >
      {athlete.avatarUrl && (
        <img
          src={athlete.avatarUrl}
          alt={athlete.fullName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {jersey && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 18,
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: athlete.avatarUrl ? 72 : 'clamp(72px, 18vw, 140px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: colors.giz,
            textShadow: athlete.avatarUrl ? '0 2px 8px rgba(0,0,0,.45)' : 'none',
          }}
        >
          {jersey}
        </div>
      )}
    </div>
  )
}

/**
 * Faixa de números. Entram só os que a API preencheu — e ficam numa linha só em
 * qualquer largura, porque "gols" e "assistências" empilhados é o que mais
 * estraga a leitura no celular.
 */
function StatsBand({ athlete }: { athlete: AthleteProfile }) {
  const stats = [
    [athlete.goals, 'gols'],
    [athlete.assists, 'assistências'],
    [athlete.gamesThisSeason, 'jogos'],
    [athlete.minutesPlayed, 'minutos'],
  ].filter(([value]) => value != null) as Array<[number, string]>

  if (stats.length === 0) return null

  return (
    <section style={{ background: colors.osso, borderBottom: `1px solid ${colors.ossoRule}` }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px var(--page-x)',
          display: 'grid',
          gridTemplateColumns: 'var(--cols-profile-stats)',
          gap: 'var(--gap-profile-stats)',
          // Quantas colunas a faixa tem hoje — lido pela var do global.css.
          ['--profile-stats-n' as string]: String(stats.length),
        }}
      >
        {stats.map(([value, label]) => (
          <div
            key={label}
            style={{ paddingTop: 12, borderTop: `1.5px solid ${colors.tinta}`, minWidth: 0 }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 'clamp(24px, 7vw, 48px)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: colors.tinta,
              }}
            >
              {value.toLocaleString('pt-BR')}
            </div>
            <div
              style={{
                ...eyebrow,
                fontSize: 'clamp(8px, 2.4vw, 10px)',
                letterSpacing: '0.1em',
                marginTop: 10,
                // Rótulo numa linha: "assistências" encolhe antes de quebrar.
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionHead({
  eyebrowText,
  title,
  right,
}: {
  eyebrowText: string
  title: string
  right?: ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 16,
        flexWrap: 'wrap',
        paddingBottom: 14,
        marginBottom: 22,
        borderBottom: `1.5px solid ${colors.tinta}`,
      }}
    >
      <div>
        <p style={{ ...eyebrow, marginBottom: 8 }}>{eyebrowText}</p>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(26px, 4vw, 36px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {right}
    </div>
  )
}

/** Vídeos e fotos do atleta. O kit usa um destaque grande + dois menores. */
function Videos({ media }: { media: readonly AthleteMedia[] }) {
  const [first, ...rest] = media
  if (!first) return null

  return (
    <section>
      <SectionHead
        eyebrowText="V Í D E O S · & · J O G A D A S"
        title="Jogadas."
        right={
          <span style={{ ...eyebrow, color: colors.tinta }}>
            {media.length} {media.length === 1 ? 'ITEM' : 'ITENS'}
          </span>
        }
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: rest.length > 0 ? 'var(--cols-profile-videos)' : 'minmax(0, 1fr)',
          gap: 14,
        }}
      >
        <MediaTile item={first} big />
        {rest.length > 0 && (
          <div style={{ display: 'grid', gap: 14, gridAutoRows: '1fr' }}>
            {rest.slice(0, 2).map((item) => (
              <MediaTile key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/** Miniatura do YouTube, quando o link é de lá — não há thumbnail na API. */
function youtubeThumb(url: string): string | null {
  const match = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(url)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

function MediaTile({ item, big = false }: { item: AthleteMedia; big?: boolean }) {
  const isPhoto = item.mediaType === 'PHOTO'
  const thumb = isPhoto ? item.url : youtubeThumb(item.url)

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'relative',
        display: 'block',
        borderRadius: 6,
        overflow: 'hidden',
        background: colors.tinta,
        minHeight: big ? 320 : 150,
        textDecoration: 'none',
      }}
    >
      {thumb && (
        <img
          src={thumb}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: big ? 0.75 : 0.55,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(20,20,19,.9), rgba(20,20,19,0) 60%)',
        }}
      />
      {item.category && (
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <Tag background={colors.giz} color={colors.tinta}>
            {item.category}
          </Tag>
        </div>
      )}
      {!isPhoto && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width: big ? 64 : 44,
              height: big ? 64 : 44,
              borderRadius: '50%',
              background: 'rgba(251,250,245,.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: 0,
                height: 0,
                borderTop: `${big ? 10 : 7}px solid transparent`,
                borderBottom: `${big ? 10 : 7}px solid transparent`,
                borderLeft: `${big ? 16 : 11}px solid ${colors.tinta}`,
                marginLeft: 4,
              }}
            />
          </span>
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 10,
          color: colors.giz,
        }}
      >
        <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: big ? 20 : 14 }}>
          {item.title}
        </span>
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          {item.year}
        </span>
      </div>
    </a>
  )
}

/** Trajetória, das temporadas que o atleta cadastrou. */
function Career({ seasons }: { seasons: readonly SeasonStat[] }) {
  if (seasons.length === 0) return null

  // A coluna "divisão" do kit não existe na API — a tabela nasce sem ela.
  const head = ['ANO', 'CLUBE', 'JOGOS', 'GOLS', 'ASSIST.', 'MIN.']
  const cell = {
    padding: '14px 10px 14px 0',
    fontFamily: fonts.mono,
    fontWeight: 500,
    fontSize: 14,
    borderBottom: `1px solid ${colors.osso}`,
    whiteSpace: 'nowrap',
  } as const

  return (
    <section>
      <SectionHead eyebrowText="T R A J E T Ó R I A" title="Por onde passou." />
      <div className="empregol-scroll-x" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 440, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {head.map((title) => (
                <th
                  key={title}
                  scope="col"
                  style={{
                    ...eyebrow,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textAlign: 'left',
                    padding: '0 10px 10px 0',
                    borderBottom: `1px solid ${colors.osso}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seasons.map((season) => (
              <tr key={season.id}>
                <td style={{ ...cell, color: colors.cinza }}>{season.year}</td>
                <td style={{ ...cell, fontFamily: fonts.display, fontWeight: 600, fontSize: 16 }}>
                  {season.lastClub ?? '—'}
                </td>
                <td style={cell}>{season.gamesPlayed}</td>
                <td style={cell}>{season.goals}</td>
                <td style={cell}>{season.assists}</td>
                <td style={cell}>{season.minutesPlayed.toLocaleString('pt-BR')}&apos;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Card({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      style={{
        background: dark ? colors.tinta : colors.giz,
        color: dark ? colors.giz : colors.tinta,
        border: dark ? 'none' : `1px solid ${colors.osso}`,
        borderRadius: 8,
        padding: 22,
      }}
    >
      {children}
    </div>
  )
}

function PositionCard({ athlete }: { athlete: AthleteProfile }) {
  const others = (athlete.positions ?? []).filter((p) => p !== athlete.position)

  return (
    <Card>
      <p style={{ ...eyebrow, fontSize: 10, marginBottom: 16 }}>P O S I Ç Ã O · E M · C A M P O</p>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <PositionPitch position={athlete.position} others={others} size={96} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 40,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {athlete.position}
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, marginTop: 4 }}>
            {labelOf(POSITIONS, athlete.position)}
          </div>
          {others.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              {others.map((p) => (
                <Tag key={p} background="transparent" color={colors.tinta} border={colors.osso}>
                  {p}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function DetailsCard({ athlete }: { athlete: AthleteProfile }) {
  const rows = [
    ['Idade', athlete.age ? `${athlete.age} anos` : null],
    ['Altura', height(athlete.height)],
    ['Peso', athlete.weight ? `${athlete.weight} kg` : null],
    ['Pé', labelOf(DOMINANT_FEET, athlete.dominantFoot)],
    ['Nível', labelOf(LEVELS, athlete.level)],
    ['Naturalidade', athlete.naturalidade],
    ['Agenciamento', AGENCY_LABEL[athlete.agencyStatus]],
    ['Último clube', athlete.lastClub],
  ].filter(([, value]) => Boolean(value)) as Array<[string, string]>

  if (rows.length === 0) return null

  return (
    <Card>
      <p style={{ ...eyebrow, fontSize: 10, marginBottom: 10 }}>F I C H A · T É C N I C A</p>
      {rows.map(([key, value], index) => (
        <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            padding: '11px 0',
            borderTop: index ? `1px solid ${colors.osso}` : 'none',
          }}
        >
          <span style={{ fontFamily: fonts.text, fontSize: 13, color: colors.cinza }}>{key}</span>
          <span
            style={{ fontFamily: fonts.mono, fontWeight: 500, fontSize: 13, textAlign: 'right' }}
          >
            {value}
          </span>
        </div>
      ))}
      {athlete.sportsProfileUrl && (
        <a
          href={athlete.sportsProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...eyebrow,
            fontSize: 10,
            color: colors.tinta,
            display: 'inline-block',
            marginTop: 14,
            textDecoration: 'none',
            borderBottom: `1.5px solid ${colors.tinta}`,
            paddingBottom: 2,
          }}
        >
          PERFIL ESPORTIVO ›
        </a>
      )}
    </Card>
  )
}

/**
 * Pretensão salarial — some da vitrine aberta. A rota pública nem devolve o
 * campo; o cartão só existe para contratante autenticado.
 */
function SalaryCard({ athlete, audience }: { athlete: AthleteProfile; audience: ProfileAudience }) {
  const value = audience === 'contractor' ? money(athlete.expectedSalary) : null
  if (!value) return null

  return (
    <Card dark>
      <p style={{ ...eyebrow, fontSize: 10, color: colors.cinzaOnDark, marginBottom: 10 }}>
        P R E T E N S Ã O · M E N S A L
      </p>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      <p
        style={{
          fontFamily: fonts.text,
          fontSize: 13,
          color: colors.gizMuted,
          lineHeight: 1.5,
          margin: '12px 0 0',
        }}
      >
        Visível para você porque está logado como clube ou agente. Quem abre o link de fora não vê
        este valor.
      </p>
    </Card>
  )
}

function Tag({
  children,
  background,
  color,
  border,
}: {
  children: ReactNode
  background: string
  color: string
  border?: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 9px',
        borderRadius: 2,
        background,
        color,
        border: border ? `1px solid ${border}` : 'none',
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  )
}
