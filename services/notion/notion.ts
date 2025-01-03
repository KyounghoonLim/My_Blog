import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_AUTH_TOKEN })

export async function getDatabase() {
  return await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  })
}

export function getPage(pageId: string) {
  notion.pages.retrieve({ page_id: pageId }).then((res) => console.log(res))
}
