'use client'

import { useCallback, useLayoutEffect, useRef } from 'react'
import { useThrottle } from '../useThrottle'
import { useCarouselException } from './useCarouselException'

type Direction = 'horizontal' | 'vertical'

export function useCarousel(
  direction: Direction = 'vertical',
  threshold: number = 30,
  scrollAmount: number = visualViewport?.height ?? 0,
  delay: number = 500
) {
  const ref = useRef<HTMLElement | null>(null)
  const touchStarted = useRef<number>(0)
  const touchMoveDelta = useRef<number>(0)

  const { throttling } = useThrottle()
  const { addExceptions, isException } = useCarouselException()

  // mobile touch //
  const touchstartHandler = useCallback(
    (e: TouchEvent) => {
      switch (direction) {
        case 'vertical': {
          touchStarted.current = e.touches[0].clientY
          break
        }
        case 'horizontal': {
          touchStarted.current = e.touches[0].clientX
          break
        }
      }
    },
    [direction]
  )

  const touchmoveHandler = useCallback((e: TouchEvent) => {
    // 제외 목록에 있으면 해당 로직 수행하지 않음 //
    if (isException(e.target as Element)) return

    // 기본 스크롤 동작 방지 //
    e.preventDefault()

    // touchmove delta 값 기록하고, 스크롤링 제한 //
    switch (direction) {
      case 'vertical': {
        touchMoveDelta.current = touchStarted.current - e.touches[0].clientY
        break
      }
      case 'horizontal': {
        touchMoveDelta.current = touchStarted.current - e.touches[0].clientX
        break
      }
    }
  }, [])

  const touchendHandler = useCallback(() => {
    if (!ref.current || Math.abs(touchMoveDelta.current) < threshold) return
    else {
      throttling(() => {
        const scrollOptions: ScrollToOptions = {
          behavior: 'smooth',
        }
        const scrollDirection = touchMoveDelta.current / Math.abs(touchMoveDelta.current)
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

        touchStarted.current = 0
        touchMoveDelta.current = 0

        return new Promise((resolve) => setTimeout(() => resolve(null), delay))
      })
    }
  }, [direction, threshold, scrollAmount, delay, throttling])

  // mouse wheel //
  const wheelHandler = useCallback(
    (e: WheelEvent) => {
      // 제외 목록에 있으면 해당 로직 수행하지 않음 //
      if (isException(e.target as Element)) return

      // 기본 스크롤 동작 방지 //
      e.preventDefault()

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
        ref.current?.addEventListener('touchstart', touchstartHandler, { passive: false })
        ref.current?.addEventListener('touchmove', touchmoveHandler, { passive: false })
        ref.current?.addEventListener('touchend', touchendHandler, { passive: false })
        ref.current?.addEventListener('wheel', wheelHandler, { passive: false })
      }
    },
    [touchstartHandler, touchendHandler, touchmoveHandler, wheelHandler]
  )

  // exception 추가 로직, cleanup //
  useLayoutEffect(() => {
    addExceptions()

    const interval = setInterval(() => {
      addExceptions()
    }, 5000)

    return () => {
      ref.current?.removeEventListener('touchstart', touchstartHandler)
      ref.current?.removeEventListener('touchend', touchendHandler)
      ref.current?.removeEventListener('touchmove', touchmoveHandler)
      ref.current?.removeEventListener('wheel', wheelHandler)

      clearInterval(interval)
    }
  }, [])

  return { carouselRef }
}
