import { useState } from 'react'

import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import type { AthleteProfile, SeasonStat } from '../model/athlete-profile.types'
import { MediaLightbox } from './MediaLightbox'

/**
 * Quem está olhando.
 *
 * `public` é a vitrine aberta: ficha esportiva e vídeos, sem pretensão salarial
 * nem contato. `contractor` é o clube ou agente autenticado, que vê a ficha
 * completa para decidir se aborda o atleta.
 */
export type ProfileAudience = 'public' | 'contractor'

const AVAILABILITY_LABEL = { FREE: 'LIVRE', EMPLOYED: 'EMPREGADO' } as const
const AVAILABILITY_BG = { FREE: colors.gramado, EMPLOYED: colors.statusEmpregado } as const
const AGENCY_LABEL = { REPRESENTED: 'COM AGENTE', UNREPRESENTED: 'SEM AGENTE' } as const

const FOOT_LABEL: Record<string, string> = {
  RIGHT: 'Destro',
  LEFT: 'Canhoto',
  BOTH: 'Ambidestro',
}

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

function salary(value?: string | number | null): string | null {
  if (value == null || value === '') return null
  const amount = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(amount)) return null
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
  const years = athlete.age ?? age(athlete.birthDate)
  const pretension = audience === 'contractor' ? salary(athlete.expectedSalary) : null
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
              {AVAILABILITY_LABEL[athlete.availability]}
            </Tag>
            <Tag background={colors.osso} color={colors.tinta}>
              {AGENCY_LABEL[athlete.agencyStatus]}
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
              years != null ? `${years} anos` : null,
              athlete.naturalidade,
              athlete.lastClub ? `Últ. clube: ${athlete.lastClub}` : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Eyebrow>
        </div>
      </header>

      <Grid>
        <Stat value={athlete.goals} label="gols" />
        <Stat value={athlete.assists} label="assistências" />
        <Stat value={athlete.gamesThisSeason} label="jogos" />
        <Stat value={athlete.minutesPlayed} label="minutos" />
      </Grid>

      <Block title="F I C H A">
        <Grid>
          <Field label="Altura" value={athlete.height ? `${athlete.height} m` : null} />
          <Field label="Peso" value={athlete.weight ? `${athlete.weight} kg` : null} />
          <Field label="Pé" value={FOOT_LABEL[athlete.dominantFoot] ?? athlete.dominantFoot} />
          <Field label="Nível" value={athlete.level} />
          {pretension && <Field label="Pretensão" value={pretension} />}
          <Field
            label="Camisa"
            value={athlete.jerseyNumber != null ? String(athlete.jerseyNumber) : null}
          />
        </Grid>
      </Block>

      {seasons.length > 0 && (
        <Block title="T E M P O R A D A S">
          <Seasons seasons={seasons} />
        </Block>
      )}

      {media.length > 0 && (
        <Block title="M Í D I A">
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
        <Block title="S O B R E">
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
function Seasons({ seasons }: { seasons: readonly SeasonStat[] }) {
  const head = ['Ano', 'Clube', 'Jogos', 'Gols', 'Assist.', 'Min.']

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
