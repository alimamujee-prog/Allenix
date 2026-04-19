'use client'

import HeroWave from '@/components/ui/HeroWave'
import { ShinyButton } from '@/components/ui/ShinyButton'

export default function Hero() {

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
      {/* Animated teal wave canvas — behind everything */}
      <HeroWave />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
        zIndex: 1,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Content — above canvas and grid */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5.2vw, 68px)',
          lineHeight: 1.08,
          letterSpacing: '-0.5px',
          color: 'var(--col-text-1)',
          maxWidth: '820px',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          We slingshot your company into the{' '}
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
          textAlign: 'center',
        }}>
          Allenix maps your workflows, builds your agents, trains your team, and runs the system until it works.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ShinyButton href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix" target="_blank" rel="noopener noreferrer">
            Book a Strategy Call
          </ShinyButton>
          <a href="#how-it-works" className="btn-ghost">
            See How It Works
          </a>
        </div>
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
