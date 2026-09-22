import phoneMock from '@/assets/images/others/phone-mock.png'

/** Prévia do app — render do aparelho com a tela de login. */
export function PhoneMock() {
  return (
    <img
      src={phoneMock}
      alt="Tela de login do app empregol em um celular"
      style={{
        width: 'min(330px, 100%)',
        height: 'auto',
        display: 'block',
        filter: 'drop-shadow(0 -8px 60px rgba(0,0,0,0.4))',
      }}
    />
  )
}
