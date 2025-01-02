'use client'

import React, { useCallback, useRef } from 'react'
import { usePortal } from './usePortal'

export function useThrottle(overlay?: boolean) {
  const throttle = useRef<boolean>(false)
  const { attach, detach } = usePortal('overlay')

  const throttling = useCallback(
    async (fn: () => any | Promise<any>) => {
      if (throttle.current) return
      else {
        try {
          overlay && attach(<div className="loading-overlay" />)
          throttle.current = true
          await fn()
        } finally {
          overlay && detach()
          throttle.current = false
        }
      }
    },
    [overlay, attach, detach]
  )

  return { throttling }
}
