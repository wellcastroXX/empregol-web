import phoneMock from '@/assets/images/others/phone-mock.png'
import { defineMessages, useMessages } from '@/shared/i18n/locale-context'

const MESSAGES = defineMessages({
  pt: { alt: 'Tela de login do app empregol em um celular' },
  en: { alt: 'The empregol app sign-in screen on a phone' },
  es: { alt: 'Pantalla de inicio de sesión de la app empregol en un celular' },
})

/** Prévia do app — render do aparelho com a tela de login. */
export function PhoneMock() {
  const m = useMessages(MESSAGES)

  return (
    <img
      src={phoneMock}
      alt={m.alt}
      style={{
        width: 'min(330px, 100%)',
        height: 'auto',
        display: 'block',
        filter: 'drop-shadow(0 -8px 60px rgba(0,0,0,0.4))',
      }}
    />
  )
}
