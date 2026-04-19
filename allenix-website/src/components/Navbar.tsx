'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/manifesto', label: 'Manifesto' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 5%',
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
            width={140}
            height={42}
            style={{ objectFit: 'contain', objectPosition: 'left center', border: 'none', outline: 'none' }}
            priority
          />
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav className="mob-hide" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              style={{ fontSize: '13px', letterSpacing: '2px', color: pathname === href ? 'var(--col-accent)' : undefined }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA — hidden on mobile */}
        <a
          href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mob-hide"
          style={{ padding: '13px 28px', fontSize: '13px', display: 'inline-block' }}
        >
          Book a Strategy Call
        </a>

        {/* Hamburger — visible only on mobile via mob-show-flex */}
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
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(6,8,10,0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            paddingTop: '80px',
          }}
        >
          {navLinks.map(({ href, label }, i) => (
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
                borderBottom: i < navLinks.length - 1 ? '1px solid var(--col-border)' : 'none',
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
