'use client'

import { useState, useEffect } from 'react'

const carouselPhrases = [
  'Generate more qualified pipeline',
  'Cut proposal time from hours to minutes',
  'Run leaner with fewer hires',
  'Win deals your competitors cannot explain',
  'AI-powered. Operator-built. Results-backed.',
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % carouselPhrases.length)
        setVisible(true)
      }, 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '140px 5% 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '560px',
        background: 'radial-gradient(ellipse, rgba(0,200,180,0.11) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Eyebrow */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--col-accent)',
        marginBottom: '44px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <span style={{ width: '28px', height: '1px', background: 'var(--col-accent)', display: 'inline-block', opacity: 0.4 }} />
        AI Operating Partner · Houston, TX
        <span style={{ width: '28px', height: '1px', background: 'var(--col-accent)', display: 'inline-block', opacity: 0.4 }} />
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(41px, 6.4vw, 82px)',
        lineHeight: 1.04,
        letterSpacing: '-2.5px',
        color: 'var(--col-text-1)',
        maxWidth: '960px',
        marginBottom: '32px',
      }}>
        We slingshot your firm into the{' '}
        <em style={{ color: 'var(--col-accent)', fontStyle: 'italic' }}>new AI era.</em>
      </h1>

      {/* Subheadline */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'clamp(20px, 2.3vw, 24px)',
        lineHeight: 1.65,
        color: 'var(--col-text-2)',
        maxWidth: '600px',
        marginBottom: '60px',
      }}>
        Allenix maps your workflows, builds your agents, and runs the system
        until it works.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix" target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a 30-Minute Call
        </a>
        <a href="#how-it-works" className="btn-ghost">
          See How It Works
        </a>
      </div>

      {/* Rotating tagline carousel */}
      <div style={{
        marginTop: '56px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}>
        <span style={{ width: '20px', height: '1px', background: 'var(--col-accent)', opacity: 0.35, display: 'inline-block' }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--col-accent)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          whiteSpace: 'nowrap',
        }}>
          {carouselPhrases[index]}
        </span>
        <span style={{ width: '20px', height: '1px', background: 'var(--col-accent)', opacity: 0.35, display: 'inline-block' }} />
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.6,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--col-text-3)',
        }}>
          Scroll
        </div>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: 'scrollBounce 1.8s ease-in-out infinite' }}>
          <rect x="6.5" y="0.5" width="3" height="5" rx="1.5" fill="var(--col-text-3)" />
          <rect x="0.5" y="0.5" width="15" height="23" rx="7.5" stroke="var(--col-text-3)" strokeOpacity="0.5" />
          <path d="M8 16l-3 3m3-3l3 3" stroke="var(--col-text-3)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '120px',
        background: 'linear-gradient(0deg, var(--col-bg) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
