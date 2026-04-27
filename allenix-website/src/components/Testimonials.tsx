const testimonials = [
  {
    quote: 'Before Allenix, quoting took two days. Now it takes 15 minutes. They built it inside our stack and trained my ops manager in a week. She runs it herself.',
    name: 'COO',
    company: 'MEP Contractor',
    context: '$18M · Houston',
  },
  {
    quote: 'Three consultants told me to clean my data first. Allenix came in, mapped what we had, and shipped something in the first month.',
    name: 'CEO',
    company: 'Distribution Company',
    context: '$32M · Texas',
  },
  {
    quote: "I wasn't looking for a vendor. I needed someone accountable to the result. That's what this felt like.",
    name: 'Founder',
    company: 'B2B Services Firm',
    context: '$9M · Houston',
  },
]

export default function Testimonials() {
  return (
    <section className="section-pad section-light" style={{
      padding: '120px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div className="reveal" style={{ marginBottom: '72px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '20px',
          }}>
            From the Operators
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: 'var(--col-text-1)',
            maxWidth: '600px',
          }}>
            The people who hired us. In their words.
          </h2>
        </div>

        <div className="mob-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {testimonials.map((t, i) => (
            <div key={t.company} className="reveal" data-delay={String(i + 1) as '1' | '2' | '3'}>
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, name, company, context }: typeof testimonials[0]) {
  return (
    <div className="mob-pad-card" style={{
      background: 'var(--col-surface)',
      border: '1px solid var(--col-border)',
      padding: '40px 36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Large decorative quote mark */}
      <span style={{
        position: 'absolute',
        top: '16px',
        left: '28px',
        fontFamily: 'var(--font-display)',
        fontSize: '96px',
        lineHeight: 1,
        color: 'var(--col-accent)',
        opacity: 0.12,
        userSelect: 'none',
        pointerEvents: 'none',
        fontWeight: 900,
      }}>
        &ldquo;
      </span>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontStyle: 'italic',
        fontSize: '16px',
        lineHeight: 1.8,
        color: 'var(--col-text-1)',
        flex: 1,
        position: 'relative',
        zIndex: 1,
        paddingTop: '16px',
      }}>
        &ldquo;{quote}&rdquo;
      </p>

      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--col-text-1)',
          marginBottom: '4px',
        }}>
          {name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--col-text-2)',
          marginBottom: '4px',
        }}>
          {company}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.5px',
          color: 'var(--col-text-3)',
        }}>
          {context}
        </div>
      </div>
    </div>
  )
}
