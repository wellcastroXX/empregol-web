import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import type { ContractorKind } from '@/features/auth/model/auth.types'
import { useAuth } from '@/features/auth/ui/auth-context'
import { colors, fonts } from '@/shared/config/theme'

import { AthleteSignUpForm } from './components/AthleteSignUpForm'
import { AuthBrandPanel } from './components/AuthBrandPanel'
import { AuthHeader } from './components/AuthHeader'
import { ContractorSignUpForm } from './components/ContractorSignUpForm'
import { LoginForm } from './components/LoginForm'

type Mode = 'login' | 'signup'
/** Qual conta está sendo criada — atleta, agente ou clube. */
type AccountType = 'atleta' | ContractorKind

const ACCOUNT_TYPES: ReadonlyArray<readonly [AccountType, string, string]> = [
  ['atleta', 'Atleta', '09'],
  ['club', 'Clube', 'FL'],
  ['agent', 'Agente', 'R.'],
]

const MODES: ReadonlyArray<readonly [Mode, string]> = [
  ['login', 'Entrar'],
  ['signup', 'Cadastrar'],
]

/**
 * Login e cadastro no mesmo split editorial.
 *
 * O modo vem da rota (/entrar ou /cadastro) em vez de viver só em estado: o
 * usuário pode chegar direto no cadastro por link, e alternar troca a URL.
 */
export default function AuthPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { status } = useAuth()
  const mode: Mode = pathname === ROUTES.cadastro ? 'signup' : 'login'
  const [accountType, setAccountType] = useState<AccountType>('atleta')

  // Já autenticado não tem o que fazer aqui.
  if (status === 'authenticated') {
    return <Navigate to={ROUTES.painel} replace />
  }

  const goTo = (next: Mode) =>
    navigate(next === 'signup' ? ROUTES.cadastro : ROUTES.entrar, { replace: true })

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'var(--cols-auth)',
        background: colors.creme,
      }}
    >
      <AuthBrandPanel mode={mode} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // Centralizar sobra espaço no topo quando o conteúdo é menor que a
          // tela — no celular, sem o painel ao lado, o formulário começa em cima.
          justifyContent: 'var(--auth-justify)',
          padding: 'var(--auth-pad-y) var(--page-x)',
          maxWidth: 560,
          width: '100%',
        }}
      >
        <AuthHeader />

        <div
          role="tablist"
          aria-label="Entrar ou cadastrar"
          style={{
            display: 'flex',
            gap: 4,
            background: colors.osso,
            padding: 4,
            borderRadius: 999,
            marginBottom: 32,
            width: 'fit-content',
          }}
        >
          {MODES.map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => goTo(id)}
              style={{
                border: 0,
                cursor: 'pointer',
                padding: '9px 22px',
                borderRadius: 999,
                background: mode === id ? colors.giz : 'transparent',
                color: mode === id ? colors.tinta : colors.cinza,
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                boxShadow: mode === id ? `0 1px 2px ${colors.tinta12}` : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 36,
            letterSpacing: '-0.025em',
            color: colors.tinta,
            margin: '0 0 6px',
          }}
        >
          {mode === 'login' ? 'Entra de novo' : 'Cria tua conta'}
          <span style={{ color: colors.gramado }}>.</span>
        </h1>

        <p
          style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: '0 0 28px' }}
        >
          {mode === 'login' ? (
            <>
              Novo aqui?{' '}
              <Link to={ROUTES.cadastro} replace style={{ color: colors.tinta, fontWeight: 500 }}>
                Cadastra-te ›
              </Link>
            </>
          ) : (
            <>
              Já tem conta?{' '}
              <Link to={ROUTES.entrar} replace style={{ color: colors.tinta, fontWeight: 500 }}>
                Entra ›
              </Link>
            </>
          )}
        </p>

        {mode === 'signup' && (
          <fieldset style={{ border: 0, padding: 0, margin: '0 0 22px' }}>
            <legend
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: colors.tinta,
                marginBottom: 10,
                padding: 0,
              }}
            >
              Eu sou
            </legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {ACCOUNT_TYPES.map(([id, label, icon]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={accountType === id}
                  onClick={() => setAccountType(id)}
                  style={{
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 14,
                    background: accountType === id ? colors.tinta : colors.giz,
                    color: accountType === id ? colors.giz : colors.tinta,
                    border: `1px solid ${accountType === id ? colors.tinta : colors.osso}`,
                    borderRadius: 6,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: fonts.mono,
                      fontWeight: 500,
                      fontSize: 22,
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {icon}
                  </span>
                  <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 15 }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {mode === 'login' ? (
          <LoginForm />
        ) : accountType === 'atleta' ? (
          <AthleteSignUpForm />
        ) : (
          // Remontar por tipo limpa o formulário ao alternar entre agente e
          // clube — os campos obrigatórios (CPF/CNPJ) são diferentes.
          <ContractorSignUpForm key={accountType} kind={accountType} />
        )}

        <p
          style={{
            fontFamily: fonts.text,
            fontSize: 11,
            color: colors.cinza,
            margin: '24px 0 0',
            lineHeight: 1.5,
          }}
        >
          Ao continuar você aceita os{' '}
          <a href="#" style={{ color: colors.tinta }}>
            termos
          </a>{' '}
          e a{' '}
          <a href="#" style={{ color: colors.tinta }}>
            política de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  )
}
