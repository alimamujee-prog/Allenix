const notFor = [
  'Founders still deciding whether AI is worth exploring',
  'Teams who want a strategy document without the implementation',
  'Companies looking for a marketing agency or SEO firm',
  'Teams who want to build it entirely on their own',
  'Anyone who wants a vendor instead of a partner',
]

const isYou = [
  'Founder-led B2B companies doing $5M to $50M in revenue',
  'You\u2019ve tried AI tools and watched nothing change in the business',
  'You\u2019ve hired consultants who left you with a deck and no momentum',
  'You\u2019re done experimenting and ready for something that actually runs',
  'You want a system built inside your business and trained into your team',
]

function IconCircle({ type }: { type: 'check' | 'cross' }) {
  const isCheck = type === 'check'
  return (
    <span style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      flexShrink: 0,
      marginTop: '2px',
      background: isCheck ? 'var(--col-accent-bg)' : 'rgba(180,50,50,0.12)',
      color: isCheck ? 'var(--col-accent)' : '#e07070',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      fontWeight: 600,
    }}>
      {isCheck ? '✓' : '×'}
    </span>
  )
}

export default function WhoItsFor() {
  return (
    <section className="section-pad" style={{ padding: '120px 5%', background: 'var(--col-bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: 'var(--col-accent)',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            Who it&apos;s for
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--col-text-1)',
            maxWidth: '560px',
          }}>
            We are not for everyone.
          </h2>
        </div>

        {/* Cards */}
        <div className="mob-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'start',
        }}>

          {/* LEFT — Not For You */}
          <div className="who-card mob-pad-card" style={{
            background: 'var(--col-surface)',
            border: '1px solid rgba(160,40,40,0.35)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Badge */}
            <div style={{ padding: '36px 40px 28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                background: 'rgba(160,40,40,0.15)',
                color: '#e07070',
                border: '1px solid rgba(160,40,40,0.25)',
                padding: '6px 14px',
                borderRadius: '999px',
                marginBottom: '28px',
              }}>
                Not for you
              </span>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                {notFor.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '14px 0',
                    borderBottom: i < notFor.length - 1 ? '1px solid var(--col-border)' : 'none',
                  }}>
                    <IconCircle type="cross" />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'var(--col-text-2)',
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer bar */}
            <div style={{
              background: 'var(--col-surface-2)',
              padding: '18px 40px',
              borderTop: '1px solid var(--col-border)',
              marginTop: 'auto',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '14px',
                color: 'var(--col-text-3)',
                textAlign: 'center' as const,
              }}>
                We&apos;ll tell you upfront if it&apos;s not the right fit.
              </p>
            </div>
          </div>

          {/* RIGHT — Right Fit */}
          <div className="who-card mob-pad-card" style={{
            background: 'var(--col-surface)',
            border: '1px solid var(--col-accent-dim)',
            boxShadow: '0 4px 24px rgba(0,125,116,0.12), 0 1px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Badge */}
            <div style={{ padding: '36px 40px 28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                background: 'var(--col-accent-bg)',
                color: 'var(--col-accent)',
                border: '1px solid var(--col-accent-dim)',
                padding: '6px 14px',
                borderRadius: '999px',
                marginBottom: '28px',
              }}>
                Right fit
              </span>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                {isYou.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '14px 0',
                    borderBottom: i < isYou.length - 1 ? '1px solid var(--col-border)' : 'none',
                  }}>
                    <IconCircle type="check" />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'var(--col-text-1)',
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer bar */}
            <div style={{
              background: 'var(--col-accent-bg)',
              padding: '18px 40px',
              borderTop: '1px solid var(--col-accent-dim)',
              marginTop: 'auto',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '14px',
                color: 'var(--col-accent)',
                textAlign: 'center' as const,
              }}>
                If this is you, let&apos;s get on a call.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
