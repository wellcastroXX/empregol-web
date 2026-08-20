import { colors, fonts } from '@/shared/config/theme'
import { MediaPlaceholder } from '@/shared/ui/MediaPlaceholder'

/** O QUE É A EMPREGOL — declaração de posicionamento em tipo grande. */
export function SobreSection() {
  return (
    <section
      id="sobre"
      style={{
        background: colors.creme,
        padding: 'var(--section-y) var(--page-x)',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: colors.cinza,
          marginBottom: 40,
        }}
      >
        O · Q U E · É · A · E M P R E G O L
      </div>

      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(34px, 5vw, 76px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: colors.tinta,
          margin: '0 0 64px',
          maxWidth: 1240,
        }}
      >
        A plataforma mais completa e com maior cuidado pelo atleta do futebol brasileiro
        <span style={{ color: colors.gramado }}>.</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-2)',
          gap: 'var(--gap-lg)',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.6,
              color: colors.tinta,
              margin: '0 0 22px',
            }}
          >
            Conectamos jogadores da base e profissionais — homens e mulheres — a clubes, agentes e
            marcas, com um diferencial que ninguém mais oferece:{' '}
            <strong>o atleta continua na plataforma mesmo depois de contratado</strong>, com acesso
            contínuo a suporte jurídico, nutricional, psicológico, físico e financeiro.
          </p>
          <p
            style={{
              fontFamily: fonts.text,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.6,
              color: colors.tinta,
              margin: 0,
            }}
          >
            Não somos só uma vitrine de currículos. Somos rede de apoio, visibilidade e carreira —
            do primeiro teste até o topo.
          </p>
        </div>

        <MediaPlaceholder
          ratio="4 / 3"
          label="Atleta em treino · plano aberto · imagem horizontal"
        />
      </div>
    </section>
  )
}
