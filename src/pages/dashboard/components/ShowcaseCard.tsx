import { useState } from 'react'

import { useMyAthleteProfile, useSetPublicProfile } from '@/features/athlete-dashboard/lib/queries'
import { perfilPublicoDe } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'
import { Eyebrow } from '@/shared/ui/Eyebrow'

const MESSAGES = defineMessages({
  pt: {
    eyebrow: 'V I T R I N E · P Ú B L I C A',
    publicBody:
      'Sua ficha está aberta: qualquer pessoa com o link vê suas temporadas e seus vídeos. Pretensão salarial e dados de contato continuam fora dela.',
    privateBody:
      'Sua vitrine está fechada — seu perfil continua aparecendo normalmente para clubes e agências aprovadas, só não tem link aberto na internet. Reabrir devolve o mesmo endereço de antes.',
    copy: 'Copiar',
    copied: 'Copiado',
    failed: 'Não foi possível alterar a vitrine.',
    saving: 'Salvando...',
    close: 'Fechar vitrine',
    open: 'Abrir vitrine pública',
  },
  en: {
    eyebrow: 'P U B L I C · S H O W C A S E',
    publicBody:
      'Your profile is open: anyone with the link can see your seasons and your videos. Salary expectations and contact details stay out of it.',
    privateBody:
      'Your showcase is closed — your profile still shows up as usual for approved clubs and agencies, it just has no open link on the internet. Reopening brings back the same address as before.',
    copy: 'Copy',
    copied: 'Copied',
    failed: 'Could not change the showcase.',
    saving: 'Saving...',
    close: 'Close showcase',
    open: 'Open public showcase',
  },
  es: {
    eyebrow: 'V I T R I N A · P Ú B L I C A',
    publicBody:
      'Tu ficha está abierta: cualquier persona con el enlace ve tus temporadas y tus videos. Las pretensiones salariales y los datos de contacto quedan fuera.',
    privateBody:
      'Tu vitrina está cerrada — tu perfil sigue apareciendo normalmente para clubes y agencias aprobados, solo que no tiene un enlace abierto en internet. Al reabrirla vuelve la misma dirección de antes.',
    copy: 'Copiar',
    copied: 'Copiado',
    failed: 'No se pudo cambiar la vitrina.',
    saving: 'Guardando...',
    close: 'Cerrar vitrina',
    open: 'Abrir vitrina pública',
  },
})

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

/**
 * Liga e desliga a vitrine pública do atleta (empregol.co/p/<slug>).
 *
 * Nasce desligada: o perfil só sai da área logada se o atleta mandar. Menor de
 * 18 recebe 403 da API — a mensagem dela é exibida como está, porque explica a
 * regra melhor do que um texto genérico aqui.
 */
export function ShowcaseCard() {
  const m = useMessages(MESSAGES)
  const profile = useMyAthleteProfile()
  const setPublic = useSetPublicProfile()
  const [copied, setCopied] = useState(false)

  const isPublic = profile.data?.publicProfile ?? false
  const slug = profile.data?.slug
  const url = slug ? `${globalThis.location.origin}${perfilPublicoDe(slug)}` : null

  async function copy() {
    if (!url) return
    try {
      await globalThis.navigator.clipboard.writeText(url)
      setCopied(true)
      globalThis.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Sem permissão de área de transferência: o link está à vista para copiar à mão.
    }
  }

  return (
    <section style={{ ...cardStyle, marginBottom: 16 }}>
      <Eyebrow size={10} style={{ letterSpacing: '0.16em', marginBottom: 12 }}>
        {m.eyebrow}
      </Eyebrow>

      <p
        style={{
          fontFamily: fonts.text,
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.tinta,
          margin: '0 0 16px',
        }}
      >
        {isPublic ? m.publicBody : m.privateBody}
      </p>

      {isPublic && url && (
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: 16,
          }}
        >
          <code
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              background: colors.creme,
              border: `1px solid ${colors.osso}`,
              borderRadius: 4,
              padding: '9px 12px',
              wordBreak: 'break-all',
            }}
          >
            {url}
          </code>
          <button type="button" onClick={() => void copy()} style={ghostButton}>
            {copied ? m.copied : m.copy}
          </button>
        </div>
      )}

      {setPublic.isError && (
        <p
          role="alert"
          style={{
            fontFamily: fonts.text,
            fontSize: 14,
            lineHeight: 1.5,
            color: colors.statusEmpregado,
            margin: '0 0 14px',
          }}
        >
          {setPublic.error instanceof Error ? setPublic.error.message : m.failed}
        </p>
      )}

      <button
        type="button"
        onClick={() => setPublic.mutate(!isPublic)}
        disabled={profile.isLoading || setPublic.isPending}
        style={{
          background: isPublic ? 'transparent' : colors.gramado,
          color: isPublic ? colors.tinta : colors.giz,
          border: isPublic ? `1.5px solid ${colors.tinta}` : 0,
          borderRadius: 30,
          padding: '12px 20px',
          cursor: setPublic.isPending ? 'progress' : 'pointer',
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {setPublic.isPending ? m.saving : isPublic ? m.close : m.open}
      </button>
    </section>
  )
}

const ghostButton = {
  background: 'transparent',
  color: colors.tinta,
  border: `1px solid ${colors.tinta}`,
  borderRadius: 30,
  padding: '9px 16px',
  cursor: 'pointer',
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
} as const
