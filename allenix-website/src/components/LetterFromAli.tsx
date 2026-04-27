export default function LetterFromAli() {
  const paragraphs = [
    'Every mid-market founder we talk to says the same thing: \u201cWe know AI matters. We have no idea where to start.\u201d',
    'They\u2019re running $5M to $50M businesses. Real revenue. Real operations held together by manual workflows and overworked people who just got told to do their day job and figure out AI at the same time.',
    'They\u2019ve outgrown off-the-shelf tools. They\u2019re too lean for Big 4 consulting. A $400K AI hire isn\u2019t in the budget. Neither is a full-time CTO.',
    'That\u2019s the gap Allenix exists to close.',
    'The founders we work with don\u2019t need a pitch. They need a partner who shows up in person, sits with their team, and builds something that actually runs.',
    'We\u2019re pulling together people who believe AI belongs in the hands of the operators who actually run the economy. One mandate: systems that run inside real businesses, in real operations, every single day.',
    'Mid-market founders built real businesses. They deserve a real partner.',
  ]

  return (
    <section className="section-pad section-light" style={{
      padding: '120px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        <div className="reveal" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase' as const,
          color: 'var(--col-accent)',
          marginBottom: '40px',
          fontWeight: 500,
        }}>
          The Mission
        </div>

        <div className="reveal" data-delay="1" style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '24px',
        }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'var(--col-text-1)',
              fontWeight: i === 6 ? 600 : 400,
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
              Founder, Allenix.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
