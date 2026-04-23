'use client'

export default function ProblemSection() {
  const truths = [
    {
      number: '01',
      heading: 'The tools are real. The results aren\'t.',
      body: 'ChatGPT is open on screens across your office. Your proposal turnaround hasn\'t moved. Your pipeline conversion hasn\'t moved. Your team is individually faster. The business is not.',
    },
    {
      number: '02',
      heading: 'Every consultant left you with a deck.',
      body: 'You paid for strategy. You got a prioritized roadmap, a handshake, and a follow-up email six weeks later. Nothing was built. The people who wrote the recommendation did not build the system.',
    },
    {
      number: '03',
      heading: 'The business runs on your calendar.',
      body: 'Every proposal, every close, every client escalation routes to one desk. You built a firm that cannot run without you. You know what breaks first if you stop showing up. So do your clients.',
    },
    {
      number: '04',
      heading: 'You\'re managing vendors instead of growing.',
      body: 'Marketing agency. SEO firm. CRM consultant. Automation specialist. Five invoices. Five status calls. Nobody accountable to your revenue number. You became the project manager for all of them.',
    },
  ]

  return (
    <section className="section-pad" style={{ padding: '120px 5%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '80px', maxWidth: '600px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '24px',
          }}>
            The Problem
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: 'var(--col-text-1)',
          }}>
            You know exactly what&apos;s wrong.
          </h2>
        </div>

        {/* Truth grid */}
        <div className="mob-grid-1-gap-border" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'var(--col-border)',
          border: '1px solid var(--col-border)',
        }}>
          {truths.map((t) => (
            <div key={t.number} className="mob-pad-card" style={{
              background: 'var(--col-bg)',
              padding: '48px 40px',
              transition: 'background 150ms ease-out',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--col-surface)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--col-bg)')}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                letterSpacing: '2px',
                color: 'var(--col-text-3)',
                marginBottom: '20px',
              }}>
                {t.number}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '22px',
                lineHeight: 1.25,
                letterSpacing: '-0.4px',
                color: 'var(--col-text-1)',
                marginBottom: '16px',
              }}>
                {t.heading}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--col-text-2)',
              }}>
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
