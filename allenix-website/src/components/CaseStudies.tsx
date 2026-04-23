const cases = [
  {
    company: 'Houston oilfield services firm',
    industry: 'Energy Services',
    stats: [
      { value: '40%', label: 'Faster proposals' },
      { value: '$2.1M', label: 'Pipeline recovered' },
      { value: '3', label: 'Ops roles automated' },
    ],
    quote: 'The proposal agent alone paid for the engagement in six weeks.',
  },
  {
    company: 'Gulf Coast distribution company',
    industry: 'Distribution',
    stats: [
      { value: '6 wks', label: 'To first automation live' },
      { value: '3', label: 'Workflows automated' },
      { value: '22%', label: 'Gross margin lift' },
    ],
    quote: 'We finally have a pipeline we can explain.',
  },
  {
    company: 'Regional construction firm',
    industry: 'Construction',
    stats: [
      { value: '14', label: 'Qualified meetings, 60 days' },
      { value: '0', label: 'SDRs hired' },
      { value: '1', label: 'Outbound system, fully automated' },
    ],
    quote: "Ali's team didn't just build tools. They rebuilt how we think about growth.",
  },
]

export default function CaseStudies() {
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
            Results
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
            Numbers the Gulf South operators care about.
          </h2>
        </div>

        {/* Cards */}
        <div className="mob-grid-1-gap-border" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--col-border)',
        }}>
          {cases.map((c) => (
            <CaseCard key={c.company} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ company, industry, stats, quote }: typeof cases[0]) {
  return (
    <div className="mob-pad-card" style={{
      background: 'var(--col-bg)',
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    }}>
      {/* Industry label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '16px',
        fontWeight: 500,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--col-text-3)',
      }}>
        {industry}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1,
              color: 'var(--col-text-1)',
              marginBottom: '6px',
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--col-text-3)',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quote + company */}
      <div style={{
        borderTop: '1px solid var(--col-border)',
        paddingTop: '32px',
        marginTop: 'auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '14px',
          lineHeight: 1.75,
          color: 'var(--col-text-2)',
          marginBottom: '16px',
        }}>
          &ldquo;{quote}&rdquo;
        </p>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--col-text-3)',
        }}>
          {company}
        </div>
      </div>
    </div>
  )
}
