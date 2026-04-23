import Footer from '@/components/Footer'
import { ShinyButton } from '@/components/ui/ShinyButton'
import MagnoliaCarousel from '@/components/MagnoliaCarousel'

const CALENDLY_URL = 'https://calendly.com/d/cx2q-z3v-zxv/meet-allenix'

export const metadata = {
  title: 'Magnolia OS — Agentic Operating System by Allenix',
  description:
    'Magnolia is the agentic operating system connecting CEO and executive teams to AI agents managing Acquire, Activate, and Ascend — the three growth drivers of every high-performing business.',
}

const pillars = [
  {
    key: 'Acquire',
    title: 'Are you closing new business?',
    desc: 'Outbound running. Pipeline tracked. New logos surfaced before you ask.',
  },
  {
    key: 'Activate',
    title: 'Are you delivering the wow?',
    desc: 'Client health scored at every milestone. Agents flag delivery risk before the client does.',
  },
  {
    key: 'Ascend',
    title: 'Are you growing what you have?',
    desc: 'Expansion revenue surfaced automatically. Your best clients become your next case studies.',
  },
]

export default function MagnoliaOSPage() {
  return (
    <main style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)', minHeight: '100vh' }}>

      <a href="#magnolia-content" className="sr-only focus:not-sr-only">Skip to content</a>

      {/* ── Hero ── */}
      <section
        id="magnolia-content"
        className="magnolia-hero-section"
        style={{
          paddingTop: '120px',
          paddingBottom: '48px',
          paddingLeft: '5%',
          paddingRight: '5%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '24px',
          }}
        >
          Magnolia OS · Powered by Allenix
        </div>

        <h1
          className="font-display magnolia-hero-h1"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 1.02,
            letterSpacing: '-2px',
            color: 'var(--col-text-1)',
            maxWidth: '760px',
            margin: '0 auto 20px',
          }}
        >
          Run Your Business on Agents.
        </h1>

        <p
          className="font-body"
          style={{
            fontSize: '18px',
            color: 'var(--col-text-3)',
            margin: '0 auto 36px',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          The agentic operating system Allenix deploys inside every company we work with. Built with our earliest clients. Refined with every engagement.{' '}
          <span style={{ color: 'var(--col-accent)' }}>Explore the interactive prototype below.</span>
        </p>

        <ShinyButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Book a Live Demo
        </ShinyButton>
      </section>

      {/* ── Demo — flows directly from hero ── */}
      <section style={{ padding: '0 5% 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Mobile carousel */}
          <div className="magnolia-mobile-carousel">
            <MagnoliaCarousel />
          </div>

          {/* Desktop: browser chrome + iframe */}
          <div className="magnolia-desktop-demo">
            <div
              style={{
                border: '1px solid var(--col-border-2)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow:
                  '0 0 0 1px rgba(0,200,180,0.12), 0 48px 120px rgba(0,0,0,0.7), 0 24px 56px rgba(0,0,0,0.45), 0 8px 24px rgba(0,200,180,0.1)',
              }}
            >
              {/* Fake browser bar */}
              <div
                style={{
                  background: 'var(--col-surface-2)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderBottom: '1px solid var(--col-border)',
                }}
              >
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: 'var(--col-surface)',
                    border: '1px solid var(--col-border)',
                    borderRadius: '6px',
                    padding: '5px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--col-text-3)',
                    letterSpacing: '0.3px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  app.magnolia-os.allenix.com
                </div>
              </div>

              {/* Navigation guide */}
              <div
                style={{
                  background: 'var(--col-accent-bg)',
                  borderBottom: '1px solid var(--col-accent-dim)',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="var(--col-accent)" strokeWidth="1.4" />
                  <path d="M8 7v5M8 5v1" stroke="var(--col-accent)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--col-accent)',
                  }}
                >
                  Opens on Mission Control — use the left sidebar to explore all sections
                </span>
              </div>

              <iframe
                src="/magnolia-os-demo.html"
                title="Magnolia OS Interactive Demo"
                className="magnolia-demo-iframe"
                style={{ display: 'block', width: '100%', border: 'none' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Post-demo CTA */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <ShinyButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Live Demo
            </ShinyButton>
          </div>
        </div>
      </section>

      {/* ── Three Growth Pillars ── */}
      <section style={{ padding: '64px 5%', borderTop: '1px solid var(--col-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-text-3)',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            The Three Growth Factors
          </div>

          <div
            className="mob-grid-1"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {pillars.map((p, i) => (
              <div
                key={p.key}
                style={{
                  background: 'var(--col-surface)',
                  border: '1px solid var(--col-border)',
                  borderRadius: '8px',
                  padding: '28px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, var(--col-accent) ${i * 33}%, transparent)`,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--col-accent)',
                    marginBottom: '12px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} · {p.key}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 600,
                    fontStyle: 'italic',
                    fontSize: '20px',
                    lineHeight: 1.25,
                    color: 'var(--col-text-1)',
                    marginBottom: '10px',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--col-text-3)' }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          padding: '64px 5% 100px',
          textAlign: 'center',
          borderTop: '1px solid var(--col-border)',
          background: 'var(--col-surface)',
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.08,
              color: 'var(--col-text-1)',
              marginBottom: '32px',
            }}
          >
            The circulatory system of your business.
          </h2>
          <ShinyButton
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shiny-cta-lg"
          >
            Book a Live Demo
          </ShinyButton>
        </div>
      </section>

      <Footer />
    </main>
  )
}
