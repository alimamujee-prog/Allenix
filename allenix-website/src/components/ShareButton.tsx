'use client'

import { useState, useRef, useEffect } from 'react'

interface ShareButtonProps {
  ariaLabel?: string
}

export default function ShareButton({ ariaLabel = 'Copy link to this page' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  async function handleCopy() {
    if (copied) return
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      const el = document.createElement('textarea')
      el.value = window.location.href
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    if (timerRef.current) clearTimeout(timerRef.current)
    setCopied(true)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="font-mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: copied ? 'var(--col-accent)' : 'var(--col-text-3)',
        border: '1px solid',
        borderColor: copied ? 'var(--col-accent)' : 'var(--col-border)',
        borderRadius: '3px',
        background: 'transparent',
        cursor: copied ? 'default' : 'pointer',
        transition: 'color 150ms ease-out, border-color 150ms ease-out',
        whiteSpace: 'nowrap',
      }}
      aria-label={ariaLabel}
    >
      <svg
        width="12" height="12" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      {copied ? 'Copied' : 'Copy link'}
    </button>
  )
}
