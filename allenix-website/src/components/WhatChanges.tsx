const outcomes = [
  'Revenue grows. Headcount stays flat.',
  "The business runs when you step out of it.",
  "Your ops lead's institutional knowledge is inside the system. The company stops being fragile.",
  'You walk into every partner conversation with a number that\'s real.',
  'Three years from now, you\'re the one your peers are calling.',
]

export default function WhatChanges() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase' as const,
          color: 'var(--col-accent)',
          marginBottom: '24px',
          fontWeight: 500,
        }}>
          What changes
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: 'var(--col-text-1)',
          maxWidth: '640px',
          marginBottom: '64px',
        }}>
          What changes when you get this right.
        </h2>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '760px' }}>
          {outcomes.map((item, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              padding: '24px 0',
              borderBottom: i < outcomes.length - 1 ? '1px solid var(--col-border)' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--col-accent)',
                marginTop: '3px',
                flexShrink: 0,
              }}>→</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                lineHeight: 1.75,
                color: 'var(--col-text-1)',
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
