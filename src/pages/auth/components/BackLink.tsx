import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { colors, fonts } from '@/shared/config/theme'

/**
 * Volta para a página anterior.
 *
 * Se o login foi a primeira página aberta (link direto, aba nova), não há
 * histórico para onde voltar — nesse caso vai para a home, em vez de virar um
 * botão morto.
 */
export function BackLink() {
  const navigate = useNavigate()

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate(ROUTES.home)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        padding: '10px 12px 10px 0',
        marginBottom: 20,
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: colors.cinza,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1, color: colors.tinta }}>
        ‹
      </span>
      Voltar
    </button>
  )
}
