export default function CTASection() {
  return (
    <section style={{
      padding: '140px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
      borderBottom: '1px solid var(--col-border)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost accent — large background question mark shape */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(300px, 35vw, 480px)',
        lineHeight: 1,
        color: 'rgba(0,200,180,0.025)',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-10px',
        whiteSpace: 'nowrap',
      }}>
        ?
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--col-accent)',
          marginBottom: '32px',
        }}>
          The Diagnostic Question
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 60px)',
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
          color: 'var(--col-text-1)',
          marginBottom: '28px',
        }}>
          If you took three weeks off tomorrow, what breaks first?
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          lineHeight: 1.8,
          color: 'var(--col-text-2)',
          marginBottom: '48px',
          maxWidth: '520px',
          margin: '0 auto 48px',
        }}>
          That question has one answer for most founders at your stage.
          It is also where Allenix starts.
          Book 30 minutes. No pitch. No deck.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a 30-Minute Call</a>
          <a href="mailto:hello@allenix.com" className="btn-ghost">hello@allenix.com</a>
        </div>
      </div>
    </section>
  )
}
