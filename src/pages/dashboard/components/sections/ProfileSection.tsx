import { useContractorProfile } from '@/features/scout/lib/queries'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'
import { maskCnpj, maskCpf, maskPhone } from '@/shared/lib/masks'

import { PanelError, PanelLoading } from '../PanelState'

const MESSAGES = defineMessages({
  pt: {
    type: 'Tipo',
    types: {
      AGENT: 'Agência',
      CLUB: 'Clube',
    },
    name: 'Nome',
    phone: 'Telefone',
    companyName: 'Razão social',
    socialMedia: 'Rede social',
    eyebrow: 'M E U · P E R F I L',
    editNoteBefore: 'A edição do perfil ainda não está na web — a API tem',
    editNoteAfter: ', mas a tela de edição só existe no app.',
  },
  en: {
    type: 'Type',
    types: {
      AGENT: 'Agency',
      CLUB: 'Club',
    },
    name: 'Name',
    phone: 'Phone',
    companyName: 'Legal company name',
    socialMedia: 'Social media',
    eyebrow: 'M Y · P R O F I L E',
    editNoteBefore: 'Profile editing is not on the web yet — the API has',
    editNoteAfter: ', but the editing screen only exists in the app.',
  },
  es: {
    type: 'Tipo',
    types: {
      AGENT: 'Agencia',
      CLUB: 'Club',
    },
    name: 'Nombre',
    phone: 'Teléfono',
    companyName: 'Razón social',
    socialMedia: 'Red social',
    eyebrow: 'M I · P E R F I L',
    editNoteBefore: 'La edición del perfil todavía no está en la web — la API tiene',
    editNoteAfter: ', pero la pantalla de edición solo existe en la app.',
  },
})

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

/** Perfil do contratante logado, lido de `/contractors/me`. */
export function ProfileSection() {
  const m = useMessages(MESSAGES)
  const profile = useContractorProfile()

  if (profile.isLoading) return <PanelLoading />
  if (profile.isError) return <PanelError error={profile.error} onRetry={() => profile.refetch()} />
  if (!profile.data) return null

  const p = profile.data
  const rows: ReadonlyArray<readonly [string, string | null | undefined]> = [
    [m.type, m.types[p.type]],
    [m.name, p.name],
    [m.phone, p.phone ? maskPhone(p.phone) : null],
    ['CPF', p.cpf ? maskCpf(p.cpf) : null],
    ['CNPJ', p.cnpj ? maskCnpj(p.cnpj) : null],
    [m.companyName, p.companyName],
    [m.socialMedia, p.socialMedia],
  ]

  return (
    <section style={cardStyle}>
      <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 4 }}>
        {m.eyebrow}
      </Eyebrow>
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: '-0.015em',
          color: colors.tinta,
          margin: '0 0 18px',
        }}
      >
        {p.companyName ?? p.name}
      </h2>

      <dl style={{ margin: 0 }}>
        {rows
          .filter(([, value]) => Boolean(value))
          .map(([label, value]) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 16,
                padding: '13px 0',
                borderTop: `1px solid ${colors.osso}`,
              }}
            >
              <dt
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: colors.cinza,
                }}
              >
                {label}
              </dt>
              <dd
                style={{
                  fontFamily: fonts.text,
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.tinta,
                  margin: 0,
                  textAlign: 'right',
                  overflowWrap: 'anywhere',
                }}
              >
                {value}
              </dd>
            </div>
          ))}
      </dl>

      <p
        style={{
          fontFamily: fonts.text,
          fontSize: 12,
          color: colors.cinza,
          margin: '18px 0 0',
          lineHeight: 1.5,
        }}
      >
        {m.editNoteBefore} <code>PUT /contractors/me</code>
        {m.editNoteAfter}
      </p>
    </section>
  )
}
