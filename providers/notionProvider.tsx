'use client'

import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { createContext, PropsWithChildren } from 'react'

interface NotionContext {
  database: QueryDatabaseResponse
}

export const notionContext = createContext<NotionContext>({ database: undefined })

export function NotionProvider({
  children,
  database,
}: PropsWithChildren<{ database: QueryDatabaseResponse }>) {
  return <notionContext.Provider value={{ database }}>{children}</notionContext.Provider>
}
