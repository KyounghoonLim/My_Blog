import React, { PropsWithChildren } from 'react'
import { Swiper as SwiperComponent, SwiperProps, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselProps<T> {
  items: T[]
  fc: React.FC<T>
  propsKey?: string
  swiperProps?: SwiperProps
}

export function Swiper<T>({
  children,
  items,
  fc,
  propsKey,
  swiperProps,
}: PropsWithChildren<CarouselProps<T>>) {
  return (
    <SwiperComponent
      grabCursor
      mousewheel={{ thresholdDelta: 30, thresholdTime: 300 }}
      className="w-full p-4"
      initialSlide={0}
      slidesPerView={1}
      threshold={30}
      spaceBetween={30}
      {...swiperProps}
      modules={[Mousewheel]}
      data-ignore-carousel="true"
    >
      {children}
      {(items as T[]).map((item, idx) => (
        <SwiperSlide key={`swiper-${idx}`} id={`swiper-${idx}`}>
          {fc({ [propsKey ?? 'item']: item })}
        </SwiperSlide>
      ))}
    </SwiperComponent>
  )
}
