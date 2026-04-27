export default function IsThisYou() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: 'var(--col-accent)',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            Is this you?
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--col-text-1)',
            maxWidth: '640px',
          }}>
            Two people run every business. We work with both.
          </h2>
        </div>

        {/* Two-column cards */}
        <div className="mob-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {/* Founder card */}
          <div className="mob-pad-card" style={{
            background: 'var(--col-surface)',
            border: '1px solid var(--col-border)',
            borderTop: '3px solid var(--col-accent)',
            padding: '48px 40px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: 'var(--col-accent)',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              The Founder
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'var(--col-text-1)',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              You&apos;ve already made the decision. This page isn&apos;t here to convince you.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                'You want to rebuild your company around AI. Every workflow. Every output. Every bottleneck.',
                'You\u2019ve watched others spend money on tools and get nothing back. You\u2019re ready to go further.',
                'You\u2019re ready to commit. You need someone who matches it.',
              ].map((item, i, arr) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--col-border)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--col-accent)',
                    marginTop: '4px',
                    flexShrink: 0,
                  }}>✓</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: 'var(--col-text-2)',
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ops Lead card */}
          <div className="mob-pad-card" style={{
            background: 'var(--col-surface)',
            border: '1px solid var(--col-border)',
            borderTop: '3px solid var(--col-accent)',
            padding: '48px 40px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: 'var(--col-accent)',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              The Operator
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'var(--col-text-1)',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              You hold the company together. You&apos;ve been doing it for years.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                'Every gap. Every bottleneck. Every place the business leaks time. You know exactly where it lives.',
                'The last rollout landed in your lap with no training and a manual that didn\u2019t match reality.',
                'You want to learn. You want to level up. You need a team willing to show up and build alongside you.',
              ].map((item, i, arr) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--col-border)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--col-accent)',
                    marginTop: '4px',
                    flexShrink: 0,
                  }}>✓</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.75,
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
