'use client'

import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { useThrottle } from './useThrottle'

interface IntersectionObserverInit {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
}

type cb = () => void | Promise<void>

export function useIntersection(
  onEnter: cb = () => console.log('enter'),
  onLeave: cb = () => console.log('leave'),
  delay: number = 0,
  options: IntersectionObserverInit = { threshold: [0, 1] }
) {
  const ref = useRef<HTMLElement | null>(null)
  const isEntered = useRef<boolean>(false)

  const { throttling } = useThrottle()

  const observer = useMemo<IntersectionObserver>(() => {
    return new IntersectionObserver(([entry]) => {
      throttling(() => {
        switch (entry.isIntersecting) {
          case true: {
            if (isEntered.current) return
            else {
              isEntered.current = true
              onEnter()
            }
            break
          }
          case false: {
            if (!isEntered.current) return
            else {
              isEntered.current = false
              onLeave()
            }
            break
          }
        }

        return new Promise((resolve) => setTimeout(() => resolve(null), delay))
      })
    }, options)
  }, [onEnter, onLeave, delay, options, throttling])

  const intersectionRef = useCallback<React.RefCallback<HTMLElement>>(
    (element: HTMLElement) => {
      if (!element) return
      else {
        ref.current = element
        observer?.observe(ref.current)
      }
    },
    [observer]
  )

  useLayoutEffect(() => {
    return () => {
      observer.disconnect()
    }
  }, [observer])

  return { intersectionRef, observer }
}
