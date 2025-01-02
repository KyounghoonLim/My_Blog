'use client'

import { ReactNode, useCallback, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'

/**
 * jsx 가 아닌 함수 내에서 포탈을 사용
 * @param target id or tagName
 * @returns
 */
export function usePortal(target: string) {
  const rootRef = useRef<Root>(null)

  const attach = useCallback(
    (children: ReactNode) => {
      try {
        const root =
          rootRef.current ||
          (() => {
            const container = document.getElementById(target) as HTMLElement
            const portalRoot = createRoot(container)
            rootRef.current = portalRoot
            return portalRoot
          })()

        if (!root) return
        else {
          root?.render(children)
        }
      } catch {
        /// pass
      }
    },
    [target]
  )

  const detach = useCallback(() => {
    try {
      const root =
        rootRef.current ||
        (() => {
          const container = document.getElementById(target) as HTMLElement
          const portalRoot = createRoot(container)
          rootRef.current = portalRoot
          return portalRoot
        })()

      if (!root) return
      else {
        root?.unmount()
      }
    } catch {
      /// pass
    }
  }, [target])

  return { attach, detach }
}
