'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/contact', label: 'Contact' },
]

const CTA_HREF = 'https://calendly.com/d/cx2q-z3v-zxv/meet-allenix'

type CursorPos = { left: number; width: number; opacity: number }

function SlidingNav({ pathname }: { pathname: string }) {
  const [cursor, setCursor] = useState<CursorPos>({ left: 0, width: 0, opacity: 0 })

  return (
    <ul
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: '4px',
        gap: 0,
        border: '1px solid var(--col-border)',
        background: 'rgba(13,17,23,0.6)',
      }}
      onMouseLeave={() => setCursor(p => ({ ...p, opacity: 0 }))}
    >
      {NAV_LINKS.map(({ href, label }) => (
        <NavTab
          key={href}
          href={href}
          active={pathname === href}
          setPosition={setCursor}
        >
          {label}
        </NavTab>
      ))}

      {/* Divider before CTA */}
      <li aria-hidden style={{ width: '1px', height: '16px', background: 'var(--col-border)', margin: '0 4px', flexShrink: 0 }} />

      {/* CTA as final pill item */}
      <CtaTab setPosition={setCursor} />

      {/* Sliding teal pill */}
      <motion.li
        aria-hidden
        animate={cursor}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        style={{
          position: 'absolute',
          top: '4px',
          bottom: '4px',
          background: 'rgba(0,200,180,0.09)',
          border: '1px solid rgba(0,200,180,0.2)',
          zIndex: 0,
          listStyle: 'none',
          pointerEvents: 'none',
        }}
      />
    </ul>
  )
}

function NavTab({
  href,
  active,
  setPosition,
  children,
}: {
  href: string
  active: boolean
  setPosition: React.Dispatch<React.SetStateAction<CursorPos>>
  children: React.ReactNode
}) {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      style={{ position: 'relative', zIndex: 1, listStyle: 'none' }}
    >
      <Link
        href={href}
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          padding: '10px 20px',
          color: active ? 'var(--col-accent)' : 'var(--col-text-2)',
          transition: 'color 150ms ease-out',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          if (!active) e.currentTarget.style.color = 'var(--col-text-1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = active ? 'var(--col-accent)' : 'var(--col-text-2)'
        }}
      >
        {children}
      </Link>
    </li>
  )
}

function CtaTab({ setPosition }: { setPosition: React.Dispatch<React.SetStateAction<CursorPos>> }) {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      style={{ position: 'relative', zIndex: 1, listStyle: 'none' }}
    >
      <a
        href={CTA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          padding: '10px 20px',
          color: 'var(--col-accent)',
          transition: 'color 150ms ease-out',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--col-text-1)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--col-accent)' }}
      >
        Book a Strategy Call
      </a>
    </li>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 5%',
        background: scrolled || menuOpen ? 'rgba(6,8,10,0.97)' : 'rgba(6,8,10,0.82)',
        borderBottom: scrolled ? '1px solid var(--col-border)' : '1px solid transparent',
        backdropFilter: 'blur(12px)',
        transition: 'background 200ms ease-out, border-color 200ms ease-out',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'inline-block', lineHeight: 0, flexShrink: 0, outline: 'none' }}>
          <Image
            src="/logo.png"
            alt="Allenix"
            width={130}
            height={40}
            style={{ objectFit: 'contain', objectPosition: 'left center', border: 'none', outline: 'none' }}
            priority
          />
        </Link>

        {/* Desktop sliding nav (includes CTA) — hidden on mobile */}
        <nav className="mob-hide">
          <SlidingNav pathname={pathname} />
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="mob-show-flex"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--col-text-1)',
          }}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
          background: 'rgba(6,8,10,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
        }}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(36px, 10vw, 52px)',
                letterSpacing: '-1px',
                lineHeight: 1.15,
                color: pathname === href ? 'var(--col-accent)' : 'var(--col-text-1)',
                textDecoration: 'none',
                padding: '16px 0',
                width: '100%',
                textAlign: 'center',
                borderBottom: i < NAV_LINKS.length - 1 ? '1px solid var(--col-border)' : 'none',
                transition: 'color 150ms ease-out',
              }}
            >
              {label}
            </Link>
          ))}

          <a
            href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: '48px', fontSize: '13px', padding: '16px 48px' }}
          >
            Book a Strategy Call
          </a>

          <div style={{
            position: 'absolute',
            bottom: '40px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--col-text-3)',
          }}>
            Houston, TX · Ion District
          </div>
        </div>
      )}
    </>
  )
}
