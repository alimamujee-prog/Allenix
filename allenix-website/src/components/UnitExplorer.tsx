export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      phase: 'Map',
      title: 'Business Brain Diagnostic',
      body: 'We work directly with you and your team. Every revenue workflow, every operational chokepoint, every place the business depends on your personal judgment. The output is an AI Opportunity Map: every high-ROI lever, dollar-quantified, ranked by what to build first.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
          <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      ),
    },
    {
      number: '02',
      phase: 'Build',
      title: 'OS Install',
      body: 'We build the agents: proposal automation, document processing, pipeline reporting, and CRM workflows. Built inside your stack, trained on your business, and running before we move to Phase 3.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
          <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      number: '03',
      phase: 'Train',
      title: 'Team Training',
      body: 'We train the people who have to run the work. In-person and virtual sessions built around your specific agents and workflows. Some clients come to us for training before any build work.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
          <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" style={{ padding: '120px 5%', background: 'var(--col-surface)' }} className="section-pad">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '96px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '20px',
          }}>
            How It Works
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: 'var(--col-text-1)',
            marginBottom: '16px',
          }}>
            Map. Build. Train.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '17px',
            color: 'var(--col-text-2)',
            lineHeight: 1.7,
          }}>
            Three phases. One firm. We don&apos;t leave until it works.
          </p>
        </div>

        {/* Process grid with shimmer line */}
        <div style={{ position: 'relative' }}>

          {/* Shimmer line — sits at icon level, hidden on mobile */}
          <div className="shimmer-track mob-shimmer-hide" style={{ top: '36px' }}>
            <div className="shimmer-glow" />
          </div>

          {/* 3-column process cards */}
          <div className="mob-grid-1 mob-gap-32" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px',
          }}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="process-card"
                style={{ animationDelay: `${i * 180}ms` }}
              >
                {/* Icon box */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'var(--col-accent-bg)',
                  border: '1px solid rgba(0,200,180,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0',
                  color: 'var(--col-accent)',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>

                {/* Phase label */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--col-accent)',
                  marginTop: '20px',
                  marginBottom: '12px',
                }}>
                  Phase {step.number} — {step.phase}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '24px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                  color: 'var(--col-text-1)',
                  marginBottom: '16px',
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--col-text-2)',
                }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
