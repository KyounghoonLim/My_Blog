import { Island_Resume } from 'components/Island/Island_Resume'
import { notionContext } from 'providers/notionProvider'
import { useContext } from 'react'

export function HomePage_2() {
  const { database } = useContext(notionContext)
  console.log(database)
  return (
    <section className="CONTENT-CONTAINER h-dscreen py-4 bg-black">
      <Island_Resume />
    </section>
  )
}
