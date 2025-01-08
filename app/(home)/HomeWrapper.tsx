'use client'

import { useCarousel } from 'hooks/carousel/useCarousel'
import { HomePage_1 } from './HomePage_1'
import { HomePage_2 } from './HomePage_2'

export default function HomeWrapper() {
  const { carouselRef } = useCarousel()
  return (
    // <div className="PAGE-CONTAINER h-dscreen overflow-auto hide-scrollbar">
    <div className="PAGE-CONTAINER h-dscreen overflow-auto hide-scrollbar" ref={carouselRef}>
      <HomePage_1 />
      <HomePage_2 />
    </div>
  )
}
