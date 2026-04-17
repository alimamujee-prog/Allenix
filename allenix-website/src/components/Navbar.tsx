'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 5%',
      background: scrolled
        ? 'rgba(6,8,10,0.97)'
        : 'rgba(6,8,10,0.82)',
      borderBottom: scrolled ? '1px solid var(--col-border)' : '1px solid rgba(30,39,48,0.4)',
      backdropFilter: 'blur(12px)',
      transition: 'background 200ms ease-out, border-color 200ms ease-out',
    }}>
      <Link href="/" style={{ display: 'inline-block', lineHeight: 0 }}>
        <Image
          src="/logo.png"
          alt="Allenix"
          width={160}
          height={48}
          style={{ objectFit: 'contain', objectPosition: 'left center' }}
          priority
        />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <Link
          href="/"
          className="nav-link"
          style={{ fontSize: '15px', letterSpacing: '1px', color: pathname === '/' ? 'var(--col-accent)' : undefined }}
        >
          Home
        </Link>
        <Link
          href="/manifesto"
          className="nav-link"
          style={{ fontSize: '15px', letterSpacing: '1px', color: pathname === '/manifesto' ? 'var(--col-accent)' : undefined }}
        >
          Manifesto
        </Link>
        <Link
          href="/contact"
          className="nav-link"
          style={{ fontSize: '15px', letterSpacing: '1px', color: pathname === '/contact' ? 'var(--col-accent)' : undefined }}
        >
          Contact
        </Link>
      </nav>

      <a href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '13px 28px', fontSize: '13px' }}>
        Book a Call
      </a>
    </header>
  )
}
