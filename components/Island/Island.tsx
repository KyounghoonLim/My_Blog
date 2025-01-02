import React from 'react'
import clsx from 'clsx'

interface IslandProps {
  children: React.ReactNode
  className?: string
}

export function Island({ children, className }: IslandProps) {
  return <article className={clsx('ISLAND-CONTAINER', className)}>{children}</article>
}
