import { useState, type FormEvent } from 'react'

import { scoutApi } from '@/features/scout/api/scout-api'
import { useConversations, useMessages, useSendMessage } from '@/features/scout/lib/queries'
import type { Conversation } from '@/features/scout/model/scout.types'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'
import { Eyebrow } from '@/shared/ui/Eyebrow'

import { PanelEmpty, PanelError, PanelLoading } from '../PanelState'

const cardStyle = {
  background: colors.giz,
  border: `1px solid ${colors.osso}`,
  borderRadius: 10,
  padding: '22px 24px',
} as const

function peerName(conversation: Conversation): string {
  return conversation.athlete?.fullName ?? conversation.contractor?.name ?? 'Conversa'
}

function timeLabel(iso?: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

/** Conversas do contratante: lista à esquerda, thread à direita. */
export function ConversationsSection() {
  const conversations = useConversations()
  const [activeId, setActiveId] = useState<string | null>(null)
  const list = conversations.data ?? []

  // Sem seleção explícita, abre a primeira — evita um painel vazio ao entrar.
  const currentId = activeId ?? list[0]?.id ?? null
  const current = list.find((c) => c.id === currentId) ?? null

  async function select(conversation: Conversation) {
    setActiveId(conversation.id)
    if (conversation.contractorUnreadCount > 0) {
      // Melhor esforço: falhar aqui não deve impedir a leitura da conversa.
      await scoutApi.markConversationRead(conversation.id).catch(() => undefined)
      void conversations.refetch()
    }
  }

  if (conversations.isLoading) return <PanelLoading />
  if (conversations.isError) {
    return <PanelError error={conversations.error} onRetry={() => conversations.refetch()} />
  }

  if (list.length === 0) {
    return (
      <PanelEmpty
        title="Nenhuma conversa ainda"
        description="Abra uma conversa a partir da busca de atletas — o botão Conversar fica em cada linha."
      />
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-dash-main)', gap: 16 }}>
      <section style={{ ...cardStyle, padding: '22px 0 8px' }}>
        <Eyebrow size={10} style={{ letterSpacing: '0.16em', padding: '0 24px', marginBottom: 14 }}>
          C O N V E R S A S
        </Eyebrow>
        {list.map((conversation) => {
          const active = conversation.id === currentId
          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => void select(conversation)}
              aria-current={active ? 'true' : undefined}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '14px 24px',
                border: 0,
                borderTop: `1px solid ${colors.osso}`,
                background: active ? colors.osso : 'transparent',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    fontSize: 15,
                    color: colors.tinta,
                  }}
                >
                  {peerName(conversation)}
                </span>
                {conversation.contractorUnreadCount > 0 && (
                  <span
                    style={{
                      background: colors.gramado,
                      color: colors.giz,
                      borderRadius: 999,
                      padding: '2px 7px',
                      fontFamily: fonts.mono,
                      fontWeight: 500,
                      fontSize: 9,
                    }}
                  >
                    {conversation.contractorUnreadCount}
                  </span>
                )}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: fonts.mono,
                    fontSize: 9,
                    color: colors.cinza,
                  }}
                >
                  {timeLabel(conversation.lastMessageAt)}
                </span>
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: fonts.text,
                  fontSize: 13,
                  color: colors.cinza,
                  marginTop: 4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {conversation.lastMessagePreview ?? 'Sem mensagens'}
              </span>
            </button>
          )
        })}
      </section>

      {current && <Thread conversation={current} />}
    </div>
  )
}

function Thread({ conversation }: { conversation: Conversation }) {
  const { user } = useAuth()
  const messages = useMessages(conversation.id)
  const send = useSendMessage(conversation.id)
  const [draft, setDraft] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const content = draft.trim()
    if (!content || send.isPending) return
    send.mutate(content, { onSuccess: () => setDraft('') })
  }

  // A API devolve do mais novo para o mais antigo; a leitura é o inverso.
  const ordered = [...(messages.data ?? [])].reverse()

  return (
    <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', minHeight: 420 }}>
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: '-0.015em',
          color: colors.tinta,
          margin: '0 0 4px',
        }}
      >
        {peerName(conversation)}
      </h2>
      <Eyebrow size={9.5} style={{ letterSpacing: '0.14em', marginBottom: 16 }}>
        {conversation.athlete?.position ?? ''}
      </Eyebrow>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.isLoading && <PanelLoading />}
        {messages.isError && (
          <PanelError error={messages.error} onRetry={() => messages.refetch()} />
        )}
        {!messages.isLoading && ordered.length === 0 && (
          <p style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: 0 }}>
            Nenhuma mensagem ainda. Escreve a primeira.
          </p>
        )}
        {ordered.map((message) => {
          const mine = message.senderUserId === user?.id
          return (
            <div
              key={message.id}
              style={{
                alignSelf: mine ? 'flex-end' : 'flex-start',
                maxWidth: '78%',
                background: mine ? colors.tinta : colors.osso,
                color: mine ? colors.giz : colors.tinta,
                borderRadius: 10,
                padding: '10px 14px',
                fontFamily: fonts.text,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {message.content ?? `[${message.type.toLowerCase()}]`}
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escreve uma mensagem"
          aria-label="Mensagem"
          style={{
            flex: 1,
            minWidth: 0,
            background: colors.creme,
            border: `1px solid ${colors.osso}`,
            borderRadius: 30,
            padding: '12px 16px',
            fontFamily: fonts.text,
            fontSize: 14,
            color: colors.tinta,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={send.isPending || !draft.trim()}
          style={{
            background: colors.gramado,
            color: colors.giz,
            border: 0,
            borderRadius: 30,
            padding: '12px 20px',
            cursor: send.isPending ? 'progress' : 'pointer',
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: draft.trim() ? 1 : 0.5,
          }}
        >
          {send.isPending ? 'Enviando' : 'Enviar'}
        </button>
      </form>
    </section>
  )
}
