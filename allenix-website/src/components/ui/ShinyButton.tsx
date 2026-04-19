'use client'

import type React from 'react'

interface ShinyButtonProps {
  children: React.ReactNode
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, href, target, rel, onClick, className = '' }: ShinyButtonProps) {
  const inner = <span>{children}</span>

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`shiny-cta ${className}`}>
        {inner}
      </a>
    )
  }

  return (
    <button className={`shiny-cta ${className}`} onClick={onClick}>
      {inner}
    </button>
  )
}
