const outcomes = [
  {
    n: '01',
    text: "You\u2019ve weaponized your team with new AI superpowers.",
  },
  {
    n: '02',
    text: 'Revenue grows. More customers close. Margins improve. We put a number on every result before we build and measure it after.',
  },
  {
    n: '03',
    text: "Your ops lead\u2019s institutional knowledge is inside the system. The company stops being fragile.",
  },
]

export default function WhatChanges() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div className="reveal" style={{
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

        <h2 className="reveal" data-delay="1" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: 'var(--col-text-1)',
          maxWidth: '640px',
          marginBottom: '72px',
        }}>
          What changes when you get this right.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {outcomes.map((item, i) => (
            <div key={i} className="reveal" data-delay={String(i + 1) as '1' | '2' | '3'} style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'flex-start',
              padding: '40px 0',
              borderBottom: i < outcomes.length - 1 ? '1px solid var(--col-border)' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 900,
                lineHeight: 1,
                color: 'var(--col-accent)',
                opacity: 0.9,
                flexShrink: 0,
                minWidth: '100px',
                userSelect: 'none',
              }}>
                {item.n}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(18px, 2vw, 24px)',
                lineHeight: 1.6,
                color: 'var(--col-text-1)',
                fontWeight: 400,
                paddingTop: '16px',
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
