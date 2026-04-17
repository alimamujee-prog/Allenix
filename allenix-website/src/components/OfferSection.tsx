const phases = [
  {
    number: '01',
    name: 'Business Brain Diagnostic',
    phase: 'Map',
    items: [
      'Full workflow mapping — every revenue process documented',
      'AI Opportunity Map with every lever ranked by ROI, dollar-quantified',
      'Clear answer to what to build first, and why',
      'Diagnostic fee applies toward Phase 2 if you proceed',
    ],
  },
  {
    number: '02',
    name: 'OS Install',
    phase: 'Build',
    items: [
      '3 to 5 agents built and running inside your business',
      'Proposal automation — turnaround from days to hours',
      'Document processing — contracts, RFPs, submittals handled without a human in the loop',
      'Pipeline reporting your leadership team actually reads',
      'CRM workflow automation — follow-up that runs without a reminder',
    ],
  },
  {
    number: '03',
    name: 'Platform Subscription',
    phase: 'Run',
    items: [
      'Ongoing agent development and system optimization',
      'Access to every new agent Allenix builds',
      'A system that compounds — each new agent faster to deploy than the last',
      'The founder becomes the conductor, not the constraint',
    ],
  },
]

export default function OfferSection() {
  return (
    <section style={{ padding: '120px 5%', background: 'var(--col-surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '72px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '24px',
          }}>
            The Offer
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: 'var(--col-text-1)',
          }}>
            What you get.
          </h2>
        </div>

        {/* Phase cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--col-border)' }}>
          {phases.map((phase) => (
            <div key={phase.number} style={{
              background: 'var(--col-bg)',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Phase label */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '28px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: 'var(--col-text-3)',
                }}>
                  {phase.number}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--col-accent)',
                  background: 'var(--col-accent-bg)',
                  border: '1px solid var(--col-accent-dim)',
                  padding: '4px 10px',
                }}>
                  {phase.phase}
                </span>
              </div>

              {/* Phase name */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.4px',
                color: 'var(--col-text-1)',
                marginBottom: '28px',
              }}>
                {phase.name}
              </h3>

              {/* Items */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                {phase.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--col-accent)',
                      marginTop: '9px',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: 'var(--col-text-2)',
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
