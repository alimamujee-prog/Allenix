'use client'

import Link from 'next/link'

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
        {/* Wordmark + tagline */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '20px',
            letterSpacing: '-0.3px',
            color: 'var(--col-text-1)',
            marginBottom: '10px',
          }}>
            Allenix
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'var(--col-text-3)',
            lineHeight: 1.6,
            maxWidth: '260px',
          }}>
            We slingshot your firm into the new AI era.
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/manifesto" className="nav-link">Manifesto</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Contact */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--col-text-3)',
            marginBottom: '8px',
          }}>
            Get in touch
          </div>
          <a href="mailto:hello@allenix.com" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--col-text-2)',
            textDecoration: 'none',
            transition: 'color 150ms ease-out',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--col-accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--col-text-2)')}
          >
            hello@allenix.com
          </a>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--col-text-3)',
            marginTop: '6px',
          }}>
            Houston, TX
          </div>
        </div>
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
