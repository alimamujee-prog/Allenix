const testimonials = [
  {
    quote: 'The proposal agent alone paid for the engagement in six weeks.',
    name: 'COO',
    company: 'MEP Contractor',
    context: '$18M revenue · Houston, TX',
  },
  {
    quote: 'We finally have a pipeline we can explain. The clarity of the diagnostic was worth it.',
    name: 'CEO',
    company: 'Distribution Company',
    context: '$32M revenue · Gulf Coast',
  },
  {
    quote: "Ali's team didn't just build tools. They rebuilt how we think about growth.",
    name: 'Founder',
    company: 'Professional Services Firm',
    context: '$9M revenue · Southeast',
  },
]

export default function Testimonials() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '72px' }}>
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

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.company} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, name, company, context }: typeof testimonials[0]) {
  return (
    <div style={{
      background: 'var(--col-bg)',
      border: '1px solid var(--col-border)',
      padding: '40px 36px',
      borderLeft: '2px solid var(--col-accent)',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontStyle: 'italic',
        fontSize: '16px',
        lineHeight: 1.8,
        color: 'var(--col-text-1)',
        flex: 1,
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '16px',
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
          fontSize: '13px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--col-text-2)',
          marginBottom: '4px',
        }}>
          {company}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '0.5px',
          color: 'var(--col-text-3)',
        }}>
          {context}
        </div>
      </div>
    </div>
  )
}
