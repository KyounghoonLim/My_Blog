import { PropsWithoutRef } from 'react'
import { Island } from './Island'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export function Island_Post({ item }: PropsWithoutRef<{ item: PageObjectResponse }>) {
  console.log(item)
  return (
    <Island>
      <div>
        {/* <Image src={page.cover} /> */}
        <span>{item.properties['이름'].title[0].plain_text}</span>
      </div>
    </Island>
  )
}
