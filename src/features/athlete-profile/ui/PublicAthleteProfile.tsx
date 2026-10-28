import { useState, type ReactNode } from 'react'

import { useFormOptions } from '@/features/auth/model/options'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useLocaleTag, useMessages } from '@/shared/i18n/locale-context'

import type { AthleteMedia, AthleteProfile, SeasonStat } from '../model/athlete-profile.types'
import { MediaLightbox } from './MediaLightbox'
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

const MESSAGES = defineMessages<{
  availability: Record<AthleteProfile['availability'], string>
  agency: Record<AthleteProfile['agencyStatus'], string>
  years: (age: number) => string
  formerClub: (club: string) => string
  athletes: string
  foot: (label: string) => string
  goals: string
  assists: string
  games: string
  minutes: string
  videosEyebrow: string
  videosTitle: string
  items: (count: number) => string
  open: (title: string) => string
  careerEyebrow: string
  careerTitle: string
  careerHead: readonly string[]
  positionEyebrow: string
  detailsEyebrow: string
  details: Record<
    'age' | 'height' | 'weight' | 'foot' | 'level' | 'hometown' | 'agency' | 'lastClub',
    string
  >
  sportsProfile: string
  salaryEyebrow: string
  salaryNote: string
}>({
  pt: {
    availability: { FREE: 'LIVRE', EMPLOYED: 'EMPREGADO' },
    agency: { REPRESENTED: 'Agenciado', UNREPRESENTED: 'Não agenciado' },
    years: (age) => `${age} anos`,
    formerClub: (club) => `Ex-${club}`,
    athletes: 'ATLETAS',
    foot: (label) => `Pé ${label}`,
    goals: 'gols',
    assists: 'assistências',
    games: 'jogos',
    minutes: 'minutos',
    videosEyebrow: 'V Í D E O S · & · J O G A D A S',
    videosTitle: 'Jogadas.',
    items: (count) => `${count} ${count === 1 ? 'ITEM' : 'ITENS'}`,
    open: (title) => `Abrir ${title}`,
    careerEyebrow: 'T R A J E T Ó R I A',
    careerTitle: 'Por onde passou.',
    careerHead: ['ANO', 'CLUBE', 'JOGOS', 'GOLS', 'ASSIST.', 'MIN.'],
    positionEyebrow: 'P O S I Ç Ã O · E M · C A M P O',
    detailsEyebrow: 'F I C H A · T É C N I C A',
    details: {
      age: 'Idade',
      height: 'Altura',
      weight: 'Peso',
      foot: 'Pé',
      level: 'Nível',
      hometown: 'Naturalidade',
      agency: 'Agenciamento',
      lastClub: 'Último clube',
    },
    sportsProfile: 'PERFIL ESPORTIVO ›',
    salaryEyebrow: 'P R E T E N S Ã O · M E N S A L',
    salaryNote:
      'Visível para você porque está logado como clube ou agência. Quem abre o link de fora não vê este valor.',
  },
  en: {
    availability: { FREE: 'FREE AGENT', EMPLOYED: 'UNDER CONTRACT' },
    agency: { REPRESENTED: 'Represented', UNREPRESENTED: 'Not represented' },
    years: (age) => `${age} years old`,
    formerClub: (club) => `Formerly ${club}`,
    athletes: 'ATHLETES',
    // "Both feet" já se explica; os outros viram "Right foot" / "Left foot".
    foot: (label) => (label.endsWith('feet') ? label : `${label} foot`),
    goals: 'goals',
    assists: 'assists',
    games: 'games',
    minutes: 'minutes',
    videosEyebrow: 'V I D E O S · & · H I G H L I G H T S',
    videosTitle: 'Highlights.',
    items: (count) => `${count} ${count === 1 ? 'ITEM' : 'ITEMS'}`,
    open: (title) => `Open ${title}`,
    careerEyebrow: 'C A R E E R',
    careerTitle: 'Where they have played.',
    careerHead: ['YEAR', 'CLUB', 'GAMES', 'GOALS', 'ASSISTS', 'MIN.'],
    positionEyebrow: 'P O S I T I O N · O N · T H E · P I T C H',
    detailsEyebrow: 'P L A Y E R · P R O F I L E',
    details: {
      age: 'Age',
      height: 'Height',
      weight: 'Weight',
      foot: 'Foot',
      level: 'Level',
      hometown: 'Hometown',
      agency: 'Representation',
      lastClub: 'Last club',
    },
    sportsProfile: 'SPORTS PROFILE ›',
    salaryEyebrow: 'M O N T H L Y · S A L A R Y · E X P E C T A T I O N',
    salaryNote:
      'Visible to you because you are signed in as a club or agency. People opening the link from outside do not see this amount.',
  },
  es: {
    availability: { FREE: 'LIBRE', EMPLOYED: 'CON CONTRATO' },
    agency: { REPRESENTED: 'Con representante', UNREPRESENTED: 'Sin representante' },
    years: (age) => `${age} años`,
    formerClub: (club) => `Ex-${club}`,
    athletes: 'ATLETAS',
    foot: (label) => `Pie ${label.toLowerCase()}`,
    goals: 'goles',
    assists: 'asistencias',
    games: 'partidos',
    minutes: 'minutos',
    videosEyebrow: 'V I D E O S · & · J U G A D A S',
    videosTitle: 'Jugadas.',
    items: (count) => `${count} ${count === 1 ? 'ELEMENTO' : 'ELEMENTOS'}`,
    open: (title) => `Abrir ${title}`,
    careerEyebrow: 'T R A Y E C T O R I A',
    careerTitle: 'Por dónde pasó.',
    careerHead: ['AÑO', 'CLUB', 'PARTIDOS', 'GOLES', 'ASIST.', 'MIN.'],
    positionEyebrow: 'P O S I C I Ó N · E N · L A · C A N C H A',
    detailsEyebrow: 'F I C H A · T É C N I C A',
    details: {
      age: 'Edad',
      height: 'Altura',
      weight: 'Peso',
      foot: 'Pie',
      level: 'Nivel',
      hometown: 'Lugar de nacimiento',
      agency: 'Representación',
      lastClub: 'Último club',
    },
    sportsProfile: 'PERFIL DEPORTIVO ›',
    salaryEyebrow: 'P R E T E N S I Ó N · M E N S U A L',
    salaryNote:
      'Visible para ti porque iniciaste sesión como club o agencia. Quien abre el enlace desde fuera no ve este valor.',
  },
})

function labelOf(options: ReadonlyArray<{ value: string; label: string }>, value?: string | null) {
  if (!value) return null
  return options.find((option) => option.value === value)?.label ?? value
}

/** 192 → "1,92 m" (ou "1.92 m"). Aceita metros também, caso algum cadastro antigo use. */
function height(value: number | null | undefined, localeTag: string): string | null {
  if (!value) return null
  const meters = value > 3 ? value / 100 : value
  const formatted = meters.toLocaleString(localeTag, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatted} m`
}

function money(value: string | number | null | undefined, localeTag: string): string | null {
  if (value == null || value === '') return null
  const amount = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(amount)) return null
  return amount.toLocaleString(localeTag, {
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
          <Videos media={athlete.media ?? []} thumb={athlete.avatarUrl} />
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
  const m = useMessages(MESSAGES)
  const localeTag = useLocaleTag()
  const options = useFormOptions()
  const positionLabel = labelOf(options.positions, athlete.position)
  const levelLabel = labelOf(options.levels, athlete.level)
  const footLabel = labelOf(options.dominantFeet, athlete.dominantFoot)
  const meta = [
    positionLabel?.toUpperCase(),
    athlete.age ? m.years(athlete.age).toUpperCase() : null,
    height(athlete.height, localeTag)?.toUpperCase(),
    athlete.weight ? `${athlete.weight} KG` : null,
    athlete.lastClub ? m.formerClub(athlete.lastClub).toUpperCase() : null,
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
            {m.athletes} {positionLabel ? `· ${positionLabel.toUpperCase()} ` : ''}·{' '}
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
            // Alinhado ao topo, não à base: sem as ações (visitante deslogado)
            // a coluna encurta, e com `end` o nome descia junto com ela.
            alignItems: 'start',
          }}
        >
          <Portrait athlete={athlete} />

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              <Tag background={colors.gramado} color={colors.giz}>
                <span
                  style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}
                />
                {m.availability[athlete.availability]}
              </Tag>
              {levelLabel && (
                <Tag background="transparent" color={colors.giz} border={colors.cinzaOnDark}>
                  {levelLabel}
                </Tag>
              )}
              {footLabel && (
                <Tag background="transparent" color={colors.giz} border={colors.cinzaOnDark}>
                  {m.foot(footLabel)}
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

/**
 * Retrato do kit, com a posição sobreposta. O kit usa o número da camisa, mas
 * a posição diz mais a quem está avaliando o atleta — e todo atleta tem uma,
 * enquanto o número é opcional no cadastro.
 */
function Portrait({ athlete }: { athlete: AthleteProfile }) {
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
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 18,
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: athlete.avatarUrl ? 64 : 'clamp(64px, 16vw, 120px)',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          color: colors.giz,
          textShadow: athlete.avatarUrl ? '0 2px 8px rgba(0,0,0,.45)' : 'none',
        }}
      >
        {athlete.position}
      </div>
    </div>
  )
}

/**
 * Faixa de números. Entram só os que a API preencheu — e ficam numa linha só em
 * qualquer largura, porque "gols" e "assistências" empilhados é o que mais
 * estraga a leitura no celular.
 */
function StatsBand({ athlete }: { athlete: AthleteProfile }) {
  const m = useMessages(MESSAGES)
  const localeTag = useLocaleTag()
  const stats = [
    [athlete.goals, m.goals],
    [athlete.assists, m.assists],
    [athlete.gamesThisSeason, m.games],
    [athlete.minutesPlayed, m.minutes],
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
              {value.toLocaleString(localeTag)}
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
function Videos({ media, thumb }: { media: readonly AthleteMedia[]; thumb?: string | null }) {
  const m = useMessages(MESSAGES)
  // Índice do item aberto na modal; `null` com a modal fechada.
  const [playing, setPlaying] = useState<number | null>(null)
  const [first, ...rest] = media
  if (!first) return null

  // Só os itens exibidos entram na navegação da modal, para o "2 / 3" bater
  // com o que está na tela.
  const shown = [first, ...rest.slice(0, 2)]

  return (
    <section>
      <SectionHead
        eyebrowText={m.videosEyebrow}
        title={m.videosTitle}
        right={<span style={{ ...eyebrow, color: colors.tinta }}>{m.items(media.length)}</span>}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: rest.length > 0 ? 'var(--cols-profile-videos)' : 'minmax(0, 1fr)',
          gap: 14,
        }}
      >
        <MediaTile item={first} thumb={thumb} onOpen={() => setPlaying(0)} big />
        {rest.length > 0 && (
          <div style={{ display: 'grid', gap: 14, gridAutoRows: '1fr' }}>
            {rest.slice(0, 2).map((item, i) => (
              <MediaTile key={item.id} item={item} thumb={thumb} onOpen={() => setPlaying(i + 1)} />
            ))}
          </div>
        )}
      </div>

      {playing != null && (
        <MediaLightbox
          items={shown}
          index={playing}
          onIndexChange={setPlaying}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  )
}

/**
 * Ladrilho de mídia.
 *
 * O fundo é sempre a foto do perfil, como no kit — a API não guarda miniatura
 * de vídeo, e misturar capa do YouTube com foto própria deixava a grade
 * descasada. A foto do próprio item só aparece quando ele é uma foto.
 */
function MediaTile({
  item,
  thumb,
  onOpen,
  big = false,
}: {
  item: AthleteMedia
  thumb?: string | null
  onOpen: () => void
  big?: boolean
}) {
  const m = useMessages(MESSAGES)
  const isPhoto = item.mediaType === 'PHOTO'
  const background = isPhoto ? item.url : thumb

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={m.open(item.title)}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: 0,
        border: 0,
        textAlign: 'left',
        borderRadius: 6,
        overflow: 'hidden',
        background: colors.tinta,
        minHeight: big ? 320 : 150,
        cursor: 'pointer',
      }}
    >
      {background && (
        <img
          src={background}
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
    </button>
  )
}

/** Trajetória, das temporadas que o atleta cadastrou. */
function Career({ seasons }: { seasons: readonly SeasonStat[] }) {
  const m = useMessages(MESSAGES)
  const localeTag = useLocaleTag()
  if (seasons.length === 0) return null

  // A coluna "divisão" do kit não existe na API — a tabela nasce sem ela.
  const head = m.careerHead
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
      <SectionHead eyebrowText={m.careerEyebrow} title={m.careerTitle} />
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
                <td style={cell}>{season.minutesPlayed.toLocaleString(localeTag)}&apos;</td>
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
  const m = useMessages(MESSAGES)
  const { positions } = useFormOptions()
  const others = (athlete.positions ?? []).filter((p) => p !== athlete.position)

  return (
    <Card>
      <p style={{ ...eyebrow, fontSize: 10, marginBottom: 16 }}>{m.positionEyebrow}</p>
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
            {labelOf(positions, athlete.position)}
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
  const m = useMessages(MESSAGES)
  const localeTag = useLocaleTag()
  const options = useFormOptions()
  const rows = [
    [m.details.age, athlete.age ? m.years(athlete.age) : null],
    [m.details.height, height(athlete.height, localeTag)],
    [m.details.weight, athlete.weight ? `${athlete.weight} kg` : null],
    [m.details.foot, labelOf(options.dominantFeet, athlete.dominantFoot)],
    [m.details.level, labelOf(options.levels, athlete.level)],
    [m.details.hometown, athlete.naturalidade],
    [m.details.agency, m.agency[athlete.agencyStatus]],
    [m.details.lastClub, athlete.lastClub],
  ].filter(([, value]) => Boolean(value)) as Array<[string, string]>

  if (rows.length === 0) return null

  return (
    <Card>
      <p style={{ ...eyebrow, fontSize: 10, marginBottom: 10 }}>{m.detailsEyebrow}</p>
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
          {m.sportsProfile}
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
  const m = useMessages(MESSAGES)
  const localeTag = useLocaleTag()
  const value = audience === 'contractor' ? money(athlete.expectedSalary, localeTag) : null
  if (!value) return null

  return (
    <Card dark>
      <p style={{ ...eyebrow, fontSize: 10, color: colors.cinzaOnDark, marginBottom: 10 }}>
        {m.salaryEyebrow}
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
        {m.salaryNote}
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
