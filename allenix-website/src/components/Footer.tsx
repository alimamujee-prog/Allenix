'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--col-border)',
      padding: '56px 5%',
      background: 'var(--col-bg)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '40px',
      }}>
        {/* Logo */}
        <div>
          <Link href="/" style={{ display: 'inline-block', lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="Allenix"
              width={120}
              height={72}
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="mob-flex-col mob-gap-24" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/manifesto" className="nav-link">Manifesto</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1100px',
        margin: '48px auto 0',
        paddingTop: '24px',
        borderTop: '1px solid var(--col-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--col-text-3)',
        }}>
          © {new Date().getFullYear()} Allenix. Houston, TX.
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--col-text-3)',
        }}>
          Built in the Ion District.
        </div>
      </div>
    </footer>
  )
}
