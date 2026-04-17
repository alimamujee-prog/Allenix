export default function GuaranteeSection() {
  return (
    <section style={{ padding: '0 5% 120px', background: 'var(--col-surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--col-accent-bg)',
          border: '1px solid var(--col-accent-dim)',
          padding: '56px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle accent line left */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: '3px',
            background: 'var(--col-accent)',
          }} />

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '24px',
          }}>
            The Guarantee
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--col-text-1)',
            marginBottom: '24px',
            maxWidth: '680px',
          }}>
            If the Diagnostic doesn&apos;t find the money, you don&apos;t pay for the build.
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            lineHeight: 1.8,
            color: 'var(--col-text-2)',
            maxWidth: '600px',
          }}>
            If the Business Brain Diagnostic does not identify a clear, dollar-quantified path
            to measurable ROI inside your business, Allenix returns your diagnostic fee.
            No conditions. No questions. We only take Phase 2 engagements we can stand behind.
            The Diagnostic is how we know before we build.
          </p>
        </div>
      </div>
    </section>
  )
}
