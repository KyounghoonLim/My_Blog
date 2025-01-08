'use client'

import { useCallback, useRef } from 'react'

export function useCarouselException() {
  const { current: exceptSet } = useRef<WeakSet<Element>>(new WeakSet())

  const addExceptions = useCallback((element?: Element) => {
    // 재귀적 호출 (자식요소 전부 추가) //
    if (element) {
      exceptSet.add(element)
      for (const childElement of element.children) {
        addExceptions(childElement)
      }
    }
    // 일반적 호출 (인터벌에 의해) //
    else {
      const exceptElements = document.querySelectorAll('[data-ignore-carousel]')
      exceptElements?.forEach((element) => {
        if (exceptSet.has(element)) return
        else {
          addExceptions(element)
        }
      })
    }
  }, [])

  const isException = useCallback((element: Element) => {
    return exceptSet.has(element)
  }, [])

  return { addExceptions, isException }
}
