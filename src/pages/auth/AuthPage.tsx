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
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

type Mode = 'login' | 'signup'
/** Qual conta está sendo criada — atleta, agência ou clube. */
type AccountType = 'atleta' | ContractorKind

const ACCOUNT_TYPES: readonly AccountType[] = ['atleta', 'club', 'agent']

const MODES: readonly Mode[] = ['login', 'signup']

const MESSAGES = defineMessages<{
  accountTypes: Record<AccountType, string>
  modes: Record<Mode, string>
  modesLabel: string
  title: Record<Mode, string>
  newHere: string
  signUp: string
  haveAccount: string
  signIn: string
  iAm: string
  consentBefore: string
  terms: string
  consentAnd: string
  privacy: string
}>({
  pt: {
    accountTypes: { atleta: 'Atleta', club: 'Clube', agent: 'Agência' },
    modes: { login: 'Entrar', signup: 'Cadastrar' },
    modesLabel: 'Entrar ou cadastrar',
    title: { login: 'Entre de novo', signup: 'Crie sua conta' },
    newHere: 'Novo aqui?',
    signUp: 'Cadastre-se ›',
    haveAccount: 'Já tem conta?',
    signIn: 'Entre ›',
    iAm: 'Eu sou',
    consentBefore: 'Ao continuar você aceita os',
    terms: 'termos',
    consentAnd: 'e a',
    privacy: 'política de privacidade',
  },
  en: {
    accountTypes: { atleta: 'Athlete', club: 'Club', agent: 'Agency' },
    modes: { login: 'Sign in', signup: 'Sign up' },
    modesLabel: 'Sign in or sign up',
    title: { login: 'Welcome back', signup: 'Create your account' },
    newHere: 'New here?',
    signUp: 'Sign up ›',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in ›',
    iAm: 'I am',
    consentBefore: 'By continuing you accept the',
    terms: 'terms',
    consentAnd: 'and the',
    privacy: 'privacy policy',
  },
  es: {
    accountTypes: { atleta: 'Atleta', club: 'Club', agent: 'Agencia' },
    modes: { login: 'Entrar', signup: 'Registrarse' },
    modesLabel: 'Entrar o registrarse',
    title: { login: 'Vuelve a entrar', signup: 'Crea tu cuenta' },
    newHere: '¿Nuevo aquí?',
    signUp: 'Regístrate ›',
    haveAccount: '¿Ya tienes cuenta?',
    signIn: 'Entra ›',
    iAm: 'Soy',
    consentBefore: 'Al continuar aceptas los',
    terms: 'términos',
    consentAnd: 'y la',
    privacy: 'política de privacidad',
  },
})

/**
 * Login e cadastro no mesmo split editorial.
 *
 * O modo vem da rota (/entrar ou /cadastro) em vez de viver só em estado: o
 * usuário pode chegar direto no cadastro por link, e alternar troca a URL.
 */
export default function AuthPage() {
  const m = useMessages(MESSAGES)
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
          aria-label={m.modesLabel}
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
          {MODES.map((id) => (
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
              {m.modes[id]}
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
          {m.title[mode]}
          <span style={{ color: colors.gramado }}>.</span>
        </h1>

        <p
          style={{ fontFamily: fonts.text, fontSize: 14, color: colors.cinza, margin: '0 0 28px' }}
        >
          {mode === 'login' ? (
            <>
              {m.newHere}{' '}
              <Link to={ROUTES.cadastro} replace style={{ color: colors.tinta, fontWeight: 500 }}>
                {m.signUp}
              </Link>
            </>
          ) : (
            <>
              {m.haveAccount}{' '}
              <Link to={ROUTES.entrar} replace style={{ color: colors.tinta, fontWeight: 500 }}>
                {m.signIn}
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
              {m.iAm}
            </legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {ACCOUNT_TYPES.map((id) => (
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
                  <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 15 }}>
                    {m.accountTypes[id]}
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
          {m.consentBefore}{' '}
          <a href="#" style={{ color: colors.tinta }}>
            {m.terms}
          </a>{' '}
          {m.consentAnd}{' '}
          <a href="#" style={{ color: colors.tinta }}>
            {m.privacy}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
