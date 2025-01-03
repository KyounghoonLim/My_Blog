import { NotionProvider } from 'providers/notionProvider'
import { PropsWithChildren } from 'react'
import { getDatabase } from 'services/notion/notion'

export async function NotionController({ children }: PropsWithChildren) {
  const database = await getDatabase()

  return (
    <>
      <NotionProvider database={database}>{children}</NotionProvider>
    </>
  )
}
