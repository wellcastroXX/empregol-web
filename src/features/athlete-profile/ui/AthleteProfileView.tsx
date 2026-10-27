import { useState } from 'react'

import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useLocaleTag, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import type { AthleteProfile, SeasonStat } from '../model/athlete-profile.types'
import { MediaLightbox } from './MediaLightbox'

/**
 * Quem está olhando.
 *
 * `public` é a vitrine aberta: ficha esportiva e vídeos, sem pretensão salarial
 * nem contato. `contractor` é o clube ou Agência autenticado, que vê a ficha
 * completa para decidir se aborda o atleta.
 */
export type ProfileAudience = 'public' | 'contractor'

const AVAILABILITY_BG = { FREE: colors.gramado, EMPLOYED: colors.statusEmpregado } as const

const MESSAGES = defineMessages<{
  availability: Record<AthleteProfile['availability'], string>
  agency: Record<AthleteProfile['agencyStatus'], string>
  feet: Record<string, string>
  years: (age: number) => string
  lastClub: (club: string) => string
  goals: string
  assists: string
  games: string
  minutes: string
  sheet: string
  height: string
  weight: string
  foot: string
  level: string
  pretension: string
  jersey: string
  seasons: string
  media: string
  about: string
  seasonHead: readonly string[]
}>({
  pt: {
    availability: { FREE: 'LIVRE', EMPLOYED: 'EMPREGADO' },
    agency: { REPRESENTED: 'COM AGÊNCIA', UNREPRESENTED: 'SEM AGÊNCIA' },
    feet: { RIGHT: 'Destro', LEFT: 'Canhoto', BOTH: 'Ambidestro' },
    years: (age) => `${age} anos`,
    lastClub: (club) => `Últ. clube: ${club}`,
    goals: 'gols',
    assists: 'assistências',
    games: 'jogos',
    minutes: 'minutos',
    sheet: 'F I C H A',
    height: 'Altura',
    weight: 'Peso',
    foot: 'Pé',
    level: 'Nível',
    pretension: 'Pretensão',
    jersey: 'Camisa',
    seasons: 'T E M P O R A D A S',
    media: 'M Í D I A',
    about: 'S O B R E',
    seasonHead: ['Ano', 'Clube', 'Jogos', 'Gols', 'Assist.', 'Min.'],
  },
  en: {
    availability: { FREE: 'FREE AGENT', EMPLOYED: 'UNDER CONTRACT' },
    agency: { REPRESENTED: 'REPRESENTED', UNREPRESENTED: 'NO AGENCY' },
    feet: { RIGHT: 'Right-footed', LEFT: 'Left-footed', BOTH: 'Two-footed' },
    years: (age) => `${age} years old`,
    lastClub: (club) => `Last club: ${club}`,
    goals: 'goals',
    assists: 'assists',
    games: 'games',
    minutes: 'minutes',
    sheet: 'P R O F I L E',
    height: 'Height',
    weight: 'Weight',
    foot: 'Foot',
    level: 'Level',
    pretension: 'Salary expectation',
    jersey: 'Shirt',
    seasons: 'S E A S O N S',
    media: 'M E D I A',
    about: 'A B O U T',
    seasonHead: ['Year', 'Club', 'Games', 'Goals', 'Assists', 'Min.'],
  },
  es: {
    availability: { FREE: 'LIBRE', EMPLOYED: 'CON CONTRATO' },
    agency: { REPRESENTED: 'CON AGENCIA', UNREPRESENTED: 'SIN AGENCIA' },
    feet: { RIGHT: 'Diestro', LEFT: 'Zurdo', BOTH: 'Ambidiestro' },
    years: (age) => `${age} años`,
    lastClub: (club) => `Últ. club: ${club}`,
    goals: 'goles',
    assists: 'asistencias',
    games: 'partidos',
    minutes: 'minutos',
    sheet: 'F I C H A',
    height: 'Altura',
    weight: 'Peso',
    foot: 'Pie',
    level: 'Nivel',
    pretension: 'Pretensión',
    jersey: 'Camiseta',
    seasons: 'T E M P O R A D A S',
    media: 'M U L T I M E D I A',
    about: 'S O B R E · M Í',
    seasonHead: ['Año', 'Club', 'Partidos', 'Goles', 'Asist.', 'Min.'],
  },
})

function age(birthDate?: string | null): number | null {
  if (!birthDate) return null
  const birth = new Date(birthDate)
  if (Number.isNaN(birth.getTime())) return null

  const today = new Date()
  let years = today.getFullYear() - birth.getFullYear()
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  if (beforeBirthday) years -= 1
  return years
}

function salary(value: string | number | null | undefined, localeTag: string): string | null {
  if (value == null || value === '') return null
  const amount = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(amount)) return null
  return amount.toLocaleString(localeTag, { style: 'currency', currency: 'BRL' })
}

export interface AthleteProfileViewProps {
  athlete: AthleteProfile
  audience: ProfileAudience
}

/**
 * Ficha do atleta, sem nenhuma ação.
 *
 * Os botões ficam de fora de propósito: no painel eles vivem na barra fixa do
 * rodapé da gaveta, e a vitrine pública não tem ação nenhuma.
 */
export function AthleteProfileView({ athlete, audience }: AthleteProfileViewProps) {
  // A rota pública manda `age` pronta e omite a data de nascimento.
  const m = useMessages(MESSAGES)
  const localeTag = useLocaleTag()
  const years = athlete.age ?? age(athlete.birthDate)
  const pretension = audience === 'contractor' ? salary(athlete.expectedSalary, localeTag) : null
  const seasons = athlete.seasonStats ?? []
  const media = athlete.media ?? []
  // Mesma modal da vitrine pública: o vídeo toca aqui dentro, sem jogar o
  // clube para outra aba e fazer ele perder a gaveta.
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <div>
      <header style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Avatar athlete={athlete} />
        <div style={{ minWidth: 0, flex: '1 1 240px' }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 'clamp(24px, 3vw, 34px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: colors.tinta,
              margin: '0 0 10px',
            }}
          >
            {athlete.fullName}
          </h2>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            <Tag background={AVAILABILITY_BG[athlete.availability]} color={colors.giz}>
              {m.availability[athlete.availability]}
            </Tag>
            <Tag background={colors.osso} color={colors.tinta}>
              {m.agency[athlete.agencyStatus]}
            </Tag>
            {(athlete.positions?.length ? athlete.positions : [athlete.position]).map(
              (position) => (
                <Tag key={position} background={colors.osso} color={colors.tinta}>
                  {position}
                </Tag>
              ),
            )}
          </div>

          <Eyebrow size={10} style={{ letterSpacing: '0.12em' }}>
            {[
              years != null ? m.years(years) : null,
              athlete.naturalidade,
              athlete.lastClub ? m.lastClub(athlete.lastClub) : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Eyebrow>
        </div>
      </header>

      <Grid>
        <Stat value={athlete.goals} label={m.goals} />
        <Stat value={athlete.assists} label={m.assists} />
        <Stat value={athlete.gamesThisSeason} label={m.games} />
        <Stat value={athlete.minutesPlayed} label={m.minutes} />
      </Grid>

      <Block title={m.sheet}>
        <Grid>
          <Field label={m.height} value={athlete.height ? `${athlete.height} m` : null} />
          <Field label={m.weight} value={athlete.weight ? `${athlete.weight} kg` : null} />
          <Field label={m.foot} value={m.feet[athlete.dominantFoot] ?? athlete.dominantFoot} />
          <Field label={m.level} value={athlete.level} />
          {pretension && <Field label={m.pretension} value={pretension} />}
          <Field
            label={m.jersey}
            value={athlete.jerseyNumber != null ? String(athlete.jerseyNumber) : null}
          />
        </Grid>
      </Block>

      {seasons.length > 0 && (
        <Block title={m.seasons}>
          <Seasons seasons={seasons} head={m.seasonHead} />
        </Block>
      )}

      {media.length > 0 && (
        <Block title={m.media}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {media.map((item, index) => (
              <li
                key={item.id}
                style={{ borderTop: `1px solid ${colors.osso}`, padding: '10px 0' }}
              >
                <button
                  type="button"
                  onClick={() => setPlaying(index)}
                  style={{
                    background: 'transparent',
                    border: 0,
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    textDecoration: 'underline',
                    fontFamily: fonts.text,
                    fontSize: 14,
                    fontWeight: 500,
                    color: colors.tinta,
                  }}
                >
                  {item.title}
                </button>
                <Eyebrow size={9.5} style={{ letterSpacing: '0.12em', marginTop: 3 }}>
                  {[item.mediaType, String(item.year), item.gameInfo].filter(Boolean).join(' · ')}
                </Eyebrow>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {playing != null && (
        <MediaLightbox
          items={media}
          index={playing}
          onIndexChange={setPlaying}
          onClose={() => setPlaying(null)}
        />
      )}

      {athlete.additionalInfo && (
        <Block title={m.about}>
          <p style={{ fontFamily: fonts.text, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            {athlete.additionalInfo}
          </p>
        </Block>
      )}
    </div>
  )
}

function Avatar({ athlete }: { athlete: AthleteProfile }) {
  const jersey = athlete.jerseyNumber != null ? String(athlete.jerseyNumber).padStart(2, '0') : '--'

  return (
    <div
      aria-hidden="true"
      style={{
        width: 84,
        height: 84,
        borderRadius: 6,
        flexShrink: 0,
        background: colors.osso,
        color: colors.tinta,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 8px 4px',
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 34,
        lineHeight: 0.9,
        letterSpacing: '-0.04em',
        backgroundImage: athlete.avatarUrl ? `url(${athlete.avatarUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {athlete.avatarUrl ? '' : jersey}
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-4)', gap: 14, marginTop: 20 }}>
      {children}
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 28, paddingTop: 18, borderTop: `1.5px solid ${colors.tinta}` }}>
      <Eyebrow size={10} style={{ letterSpacing: '0.16em' }}>
        {title}
      </Eyebrow>
      {children}
    </section>
  )
}

function Stat({ value, label }: { value?: number | null; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 28,
          lineHeight: 1,
          color: colors.tinta,
        }}
      >
        {value ?? '—'}
      </div>
      <Eyebrow size={9.5} style={{ letterSpacing: '0.14em', marginTop: 5 }}>
        {label}
      </Eyebrow>
    </div>
  )
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <Eyebrow size={9.5} style={{ letterSpacing: '0.14em' }}>
        {label}
      </Eyebrow>
      <div
        style={{
          fontFamily: fonts.text,
          fontSize: 15,
          fontWeight: 500,
          color: colors.tinta,
          marginTop: 4,
        }}
      >
        {value ?? '—'}
      </div>
    </div>
  )
}

/** Temporadas em tabela — trilho próprio para não estourar no celular. */
function Seasons({ seasons, head }: { seasons: readonly SeasonStat[]; head: readonly string[] }) {
  return (
    <div className="empregol-scroll-x" style={{ overflowX: 'auto', marginTop: 14 }}>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          minWidth: 460,
          fontFamily: fonts.text,
          fontSize: 14,
        }}
      >
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                style={{
                  textAlign: 'left',
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: colors.cinza,
                  padding: '0 10px 8px 0',
                  borderBottom: `1px solid ${colors.osso}`,
                }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr key={season.id}>
              {[
                season.year,
                season.lastClub ?? '—',
                season.gamesPlayed,
                season.goals,
                season.assists,
                season.minutesPlayed,
              ].map((cell, index) => (
                <td
                  key={index}
                  style={{
                    padding: '10px 10px 10px 0',
                    borderBottom: `1px solid ${colors.osso}`,
                    color: index === 0 ? colors.tinta : colors.cinza,
                    fontWeight: index === 0 ? 500 : 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Tag({
  children,
  background,
  color,
}: {
  children: React.ReactNode
  background: string
  color: string
}) {
  return (
    <span
      style={{
        background,
        color,
        padding: '4px 8px',
        borderRadius: 2,
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 9.5,
        letterSpacing: '0.10em',
      }}
    >
      {children}
    </span>
  )
}
