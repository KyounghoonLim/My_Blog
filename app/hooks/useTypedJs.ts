'use client'

import { useIntersection } from 'hooks/useIntersection'
import { useCallback, useRef } from 'react'
import Typed, { TypedOptions } from 'typed.js'

export function useTypedJs(options: TypedOptions) {
  const typedJs = useRef<Typed | null>(null)
  const { intersectionRef } = useIntersection(
    () => typedJs.current?.start(),
    () => typedJs.current?.stop()
  )

  const typedJsRef = useCallback<React.RefCallback<HTMLElement>>(
    (element: HTMLElement) => {
      intersectionRef(element)

      typedJs.current = new Typed(element, {
        ...options,
        typeSpeed: options.typeSpeed || 70,
        backSpeed: 10,
        startDelay: 300,
        loop: false,
        showCursor: false,
        onBegin: () => {
          element.dataset.typeState = 'true'
        },
        onComplete: () => {
          setTimeout(() => {
            element.dataset.typeState = 'false'
          }, 200)
        },
        onTypingPaused: () => {
          setTimeout(() => {
            element.dataset.typeState = 'false'
          }, 200)
        },
        onTypingResumed: () => {
          element.dataset.typeState = 'true'
        },
      })

      return () => {
        typedJs.current?.destroy()
      }
    },
    [options]
  )

  return { typedJsRef }
}
