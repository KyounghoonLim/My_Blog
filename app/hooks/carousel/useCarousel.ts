'use client'

import { useCarousel_Touch } from './useCarousel_Touch'
import { useCarousel_Wheel } from './useCarousel_Wheel'
import { isDesktop } from 'react-device-detect'

type Direction = 'horizontal' | 'vertical'

export function useCarousel(
  direction: Direction = 'vertical',
  threshold: number = 10,
  scrollAmount: number = visualViewport?.height ?? 0,
  delay: number = 1000
) {
  const { carouselRef: carouselRef_Wheel } = useCarousel_Wheel(
    direction,
    threshold,
    scrollAmount,
    delay
  )
  const { carouselRef: carouselRef_Touch } = useCarousel_Touch(
    direction,
    threshold,
    scrollAmount,
    delay
  )

  return { carouselRef: isDesktop ? carouselRef_Wheel : carouselRef_Touch }
}
