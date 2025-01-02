'use client'

import { useThrottle } from 'hooks/useThrottle'
import { useCallback, useEffect, useRef } from 'react'

type Direction = 'horizontal' | 'vertical'

export function useCarousel_Wheel(
  direction: Direction = 'vertical',
  threshold: number = 30,
  scrollAmount: number = visualViewport?.height ?? 0,
  delay: number = 500
) {
  const ref = useRef<HTMLElement | null>(null)

  const { throttling } = useThrottle()

  const wheelHandler = useCallback(
    (e: WheelEvent) => {
      // 기본 스크롤 동작 방지 //
      e.preventDefault()
      e.stopPropagation()

      if (!ref.current || Math.abs(e.deltaY) < threshold) return
      else {
        throttling(() => {
          const scrollOptions: ScrollToOptions = {
            behavior: 'smooth',
          }
          const scrollDirection = e.deltaY / Math.abs(e.deltaY)
          const scrollTo = scrollAmount * scrollDirection

          switch (direction) {
            case 'vertical': {
              scrollOptions.top = ref.current!.scrollTop + scrollTo
              break
            }
            case 'horizontal': {
              scrollOptions.left = ref.current!.scrollLeft + scrollTo
              break
            }
          }

          ref.current!.scrollTo(scrollOptions)

          return new Promise((resolve) => setTimeout(() => resolve(null), delay))
        })
      }
    },
    [direction, threshold, scrollAmount, delay, throttling]
  )

  const carouselRef = useCallback<React.RefCallback<HTMLElement>>(
    (ele: HTMLElement) => {
      if (!ele || ref.current) return
      else {
        ref.current = ele
        ref.current?.addEventListener('wheel', wheelHandler)
      }
    },
    [wheelHandler]
  )

  useEffect(() => {
    return () => {
      ref.current?.removeEventListener('wheel', wheelHandler)
    }
  }, [])

  return { carouselRef }
}
