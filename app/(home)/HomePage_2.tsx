import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Island_Post } from 'components/Island/Island_Post'
import { Island_Resume } from 'components/Island/Island_Resume'
import { Swiper } from 'components/swiper/Swiper'
import { notionContext } from 'providers/notionProvider'
import { useContext } from 'react'
import { SwiperSlide } from 'swiper/react'

export function HomePage_2() {
  const { database } = useContext(notionContext)
  console.log(database.results)
  return (
    <section className="CONTENT-CONTAINER h-dscreen py-4 bg-gray-400">
      <Swiper<PageObjectResponse>
        items={database.results}
        fc={Island_Post}
        swiperProps={{
          slidesPerView: 1,
          spaceBetween: 20,
          breakpoints: {
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          },
        }}
      >
        <SwiperSlide>
          <Island_Resume />
        </SwiperSlide>
      </Swiper>
      {/* {database?.results?.map((page) => (
        <Island_Post key={page.id} page={page} />
      ))} */}
    </section>
  )
}
