'use client'

import { ShinyButton } from '@/components/ui/ShinyButton'

export default function FinalCTA() {
  return (
    <section className="section-pad" style={{
      padding: '140px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
      }}>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: 'var(--col-text-1)',
        }}>
          If you&apos;ve already decided, let&apos;s build.
        </h2>

        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.2vw, 26px)',
          lineHeight: 1.6,
          color: 'var(--col-accent)',
          maxWidth: '600px',
        }}>
          One question before the call. If you took three weeks off tomorrow, what breaks first? That is where we start.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <ShinyButton href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix" target="_blank" rel="noopener noreferrer">
            Book a Strategy Call
          </ShinyButton>
          <a
            href="mailto:ali@allenix.com"
            className="about-secondary-link"
          >
            ali@allenix.com
          </a>
        </div>

      </div>
    </section>
  )
}
