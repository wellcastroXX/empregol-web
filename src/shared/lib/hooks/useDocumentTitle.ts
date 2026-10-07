import { useEffect } from 'react'

/** Escreve o título da aba. Só isso — quem decide o texto é o DocumentTitle. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title
  }, [title])
}
