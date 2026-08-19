import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import DownloadPage from './DownloadPage'

describe('DownloadPage', () => {
  it('abre com a manchete do app', () => {
    render(<DownloadPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tua vitrine.*no bolso/s)
  })

  it('lista os quatro usos do app', () => {
    render(<DownloadPage />)

    for (const title of [
      'Monta tua vitrine',
      'Vê quem te olhou',
      'Recebe propostas',
      'Sobe vídeo do treino',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('troca os requisitos ao alternar a plataforma', async () => {
    const user = userEvent.setup()
    render(<DownloadPage />)

    expect(screen.getByText('iOS 16 ou superior')).toBeInTheDocument()
    expect(screen.getByText('48 MB')).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Android' }))

    expect(screen.getByText('Android 10 ou superior')).toBeInTheDocument()
    expect(screen.getByText('42 MB')).toBeInTheDocument()
    expect(screen.queryByText('iOS 16 ou superior')).not.toBeInTheDocument()
  })

  it('deixa claro que o QR ainda é um espaço reservado', () => {
    render(<DownloadPage />)

    expect(screen.getByRole('img', { name: /Espaço reservado para o QR code/ })).toBeInTheDocument()
  })
})
