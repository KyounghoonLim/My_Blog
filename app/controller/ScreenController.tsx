'use client'

import { useLayoutEffect } from 'react'

export function ScreenController() {
  useLayoutEffect(() => {
    let resizeDebounce, resizeHandler

    if (!globalThis['window']) return
    else {
      resizeHandler = () => {
        clearTimeout(resizeDebounce)
        resizeDebounce = setTimeout(() => {
          document.documentElement.style.setProperty(
            '--vh',
            `${window.visualViewport!.height * 0.01}px`
          )
        }, 16.7)
      }

      resizeHandler()
      window.visualViewport!.addEventListener('resize', resizeHandler)
    }

    return () => {
      if (!globalThis['window']) return
      else {
        clearTimeout(resizeDebounce)
        window.visualViewport!.removeEventListener('resize', resizeHandler)
      }
    }
  }, [])

  return <></>
}
