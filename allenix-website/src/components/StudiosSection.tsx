export default function CredibilityBar() {
  const stats = [
    { number: '95%', label: 'of AI pilots fail to deliver measurable P&L impact', source: 'MIT, 2025' },
    { number: '56%', label: 'of CEOs report zero revenue gains from AI investment', source: 'PwC, 2026' },
    { number: '5%', label: 'of firms achieve rapid AI revenue acceleration', source: 'MIT, 2025' },
  ]

  return (
    <section style={{
      borderTop: '1px solid var(--col-border)',
      borderBottom: '1px solid var(--col-border)',
      background: 'var(--col-surface)',
      padding: '56px 5%',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Framing line */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--col-text-3)',
            lineHeight: 1.7,
          }}>
            Most firms are stuck in the 95%. Allenix builds the system that gets you into the 5%.
          </p>
        </div>

        <div className="mob-grid-1 mob-stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {stats.map((s, i) => (
            <div key={i} className={i > 0 ? 'mob-stat-border' : ''} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 40px',
              borderLeft: i > 0 ? '1px solid var(--col-border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(36px, 4vw, 52px)',
                letterSpacing: '-1px',
                color: 'var(--col-accent)',
                marginBottom: '10px',
                lineHeight: 1,
              }}>
                {s.number}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'var(--col-text-2)',
                maxWidth: '200px',
                marginBottom: '10px',
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--col-text-3)',
              }}>
                {s.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
