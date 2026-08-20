import { colors, fonts } from '@/shared/config/theme'
import { MediaPlaceholder } from '@/shared/ui/MediaPlaceholder'

/** POR QUE A EMPREGOL NASCEU — a origem, contada pelos fundadores. */
export function OrigemSection() {
  return (
    <section
      id="origem"
      style={{
        background: colors.creme,
        padding: 'var(--section-y) var(--page-x)',
        borderTop: `1px solid ${colors.osso}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--cols-split-r)',
          gap: 'var(--gap-lg)',
          alignItems: 'start',
        }}
      >
        {/* Mídia à esquerda — inverte o ritmo da seção anterior */}
        <div style={{ position: 'sticky', top: 108 }}>
          <MediaPlaceholder
            ratio="4 / 5"
            label="Retrato dos fundadores · vertical · preto e branco"
          />
        </div>

        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.cinza,
              marginBottom: 28,
            }}
          >
            P O R · Q U E · A · E M P R E G O L · N A S C E U
          </div>

          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 'clamp(32px, 4.4vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              color: colors.tinta,
              margin: '0 0 40px',
            }}
          >
            Sentimos o silêncio depois que o telefone para de tocar
            <span style={{ color: colors.gramado }}>.</span>
          </h2>

          <div style={{ maxWidth: 640 }}>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                lineHeight: 1.6,
                color: colors.tinta,
                margin: '0 0 22px',
              }}
            >
              O futebol brasileiro forma milhares de talentos todos os anos. Mas forma também
              milhares de histórias que terminam cedo demais — não por falta de talento, e sim por
              falta de oportunidade, de visibilidade, de alguém que ajude a abrir a próxima porta.
            </p>
            <p
              style={{
                fontFamily: fonts.text,
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                lineHeight: 1.6,
                color: colors.tinta,
                margin: '0 0 22px',
              }}
            >
              Nós vivemos isso. <strong>Os fundadores da Empregol foram atletas.</strong> Sentimos
              na pele o que é estar sem contrato, sem clube, sem saber para onde ligar. Sentimos o
              silêncio depois que o telefone para de tocar.
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
              Foi ali que nasceu a Empregol: da certeza de que nenhum atleta deveria ficar invisível
              só porque está entre um contrato e outro.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
