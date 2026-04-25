export default function LetterFromAli() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase' as const,
          color: 'var(--col-accent)',
          marginBottom: '40px',
          fontWeight: 500,
        }}>
          A note from Ali
        </div>

        <div style={{
          borderLeft: '2px solid var(--col-accent)',
          paddingLeft: '40px',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '24px',
        }}>
          {[
            'We started Allenix for one reason: the companies that should win the AI era are the ones getting left out of it.',
            "Not because they don't believe in AI. Because they can't find anyone willing to build it with them.",
            "The founders we work with have already decided. They don't need convincing. They need a partner who shows up, sits with their team, and builds something that actually runs.",
            "Our team spent careers inside growth-stage companies where AI had to work or the business paid for it. We've seen what survives contact with a real operation and what costs $200K and gets quietly abandoned the moment the vendor leaves.",
            'Mid-market founders built real businesses. They deserve a real partner.',
            'We show up in person.',
          ].map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.85,
              color: i === 5 ? 'var(--col-text-1)' : 'var(--col-text-2)',
              fontWeight: i === 5 ? 600 : 400,
            }}>
              {para}
            </p>
          ))}

          <div style={{ marginTop: '16px' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'var(--col-text-1)',
              marginBottom: '4px',
            }}>
              Ali Mamujee
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              color: 'var(--col-text-3)',
            }}>
              Founder, Allenix. Houston.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
