import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'

import { AuthBrandPanel } from './components/AuthBrandPanel'
import { AuthField } from './components/AuthField'
import { AuthHeader } from './components/AuthHeader'

type Mode = 'login' | 'signup'
type Role = 'atleta' | 'clube' | 'agente'

const ROLES: ReadonlyArray<readonly [Role, string, string]> = [
  ['atleta', 'Atleta', '09'],
  ['clube', 'Clube', 'FL'],
  ['agente', 'Agente', 'R.'],
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
  const mode: Mode = pathname === ROUTES.cadastro ? 'signup' : 'login'
  const [role, setRole] = useState<Role>('atleta')

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
          maxWidth: 520,
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

        <form
          onSubmit={(event) => event.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
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
                {ROLES.map(([id, label, icon]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={role === id}
                    onClick={() => setRole(id)}
                    style={{
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 14,
                      background: role === id ? colors.tinta : colors.giz,
                      color: role === id ? colors.giz : colors.tinta,
                      border: `1px solid ${role === id ? colors.tinta : colors.osso}`,
                      borderRadius: 6,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontWeight: 500,
                        fontSize: 22,
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {icon}
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 15 }}>
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'signup' && (
              <AuthField
                label="Nome"
                placeholder={role === 'clube' ? 'Nome do clube' : 'Nome completo'}
                autoComplete="name"
              />
            )}
            <AuthField
              label="E-mail"
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
            />
            <AuthField
              label="Senha"
              placeholder="••••••••"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {mode === 'login' && (
              <a
                href="#"
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: colors.tinta,
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                Esqueci a senha ›
              </a>
            )}
          </div>

          <button
            type="submit"
            style={{
              marginTop: 22,
              background: colors.gramado,
              color: colors.giz,
              border: 0,
              padding: '16px 20px',
              borderRadius: 4,
              cursor: 'pointer',
              fontFamily: fonts.text,
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {mode === 'login' ? 'Entrar ›' : 'Criar conta ›'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: colors.osso }} />
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.16em',
              color: colors.cinza,
            }}
          >
            OU
          </span>
          <div style={{ flex: 1, height: 1, background: colors.osso }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {['Apple', 'Google'].map((provider) => (
            <button
              key={provider}
              type="button"
              style={{
                flex: 1,
                background: colors.giz,
                border: `1px solid ${colors.osso}`,
                borderRadius: 4,
                padding: '13px 16px',
                cursor: 'pointer',
                fontFamily: fonts.text,
                fontWeight: 500,
                fontSize: 14,
                color: colors.tinta,
              }}
            >
              {provider}
            </button>
          ))}
        </div>

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
