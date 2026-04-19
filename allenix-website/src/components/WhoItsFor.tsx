const isYou = [
  'You run a professional services firm between $5M and $50M in revenue',
  'You built it yourself and are still the person clients trust most',
  'You have tried AI tools and seen nothing move in the business',
  'You have hired consultants who gave you a deck and disappeared',
  'You want a system built inside your business, not handed to you',
]

const notFor = [
  'Your firm is below $5M in revenue',
  'You want to manage the implementation yourself',
  'You need a marketing agency or SEO service',
  'You want a strategy document with no execution',
]

export default function WhoItsFor() {
  return (
    <section className="section-pad" style={{ padding: '120px 5%', background: 'var(--col-bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="mob-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--col-border)',
        }}>
          {/* Left — who it's for */}
          <div className="mob-pad-cell" style={{
            background: 'var(--col-accent-bg)',
            padding: '64px 56px',
            borderLeft: '3px solid var(--col-accent)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-accent)',
              marginBottom: '24px',
              fontWeight: 500,
            }}>
              The Right Client
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              color: 'var(--col-text-1)',
              marginBottom: '40px',
            }}>
              Is this you?
            </h2>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '40px' }}>
              {isYou.map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < isYou.length - 1 ? '1px solid rgba(0,200,180,0.15)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--col-accent)',
                    marginTop: '3px',
                    flexShrink: 0,
                    lineHeight: 1,
                  }}>
                    ✓
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: 'var(--col-text-1)',
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--col-text-2)',
              borderLeft: '2px solid var(--col-accent)',
              paddingLeft: '20px',
            }}>
              Allenix works with a small number of firms at a time.
              If your revenue ceiling is operational, not market-driven, we should talk.
            </div>
          </div>

          {/* Right — wrong client */}
          <div className="mob-pad-cell" style={{
            background: 'var(--col-surface)',
            padding: '64px 56px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-text-3)',
              marginBottom: '24px',
              fontWeight: 500,
            }}>
              The Wrong Client
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              color: 'var(--col-text-2)',
              marginBottom: '40px',
            }}>
              This isn&apos;t for everyone.
            </h2>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {notFor.map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  padding: '20px 0',
                  borderBottom: i < notFor.length - 1 ? '1px solid var(--col-border)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    letterSpacing: '1px',
                    color: 'var(--col-text-3)',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}>
                    ×
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: 'var(--col-text-2)',
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
