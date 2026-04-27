const signals = [
  'Houston-based',
  '$5M–$50M operators',
  'Hands-on implementation',
  'No decks. No handoffs.',
]

export default function CredibilityBar() {
  return (
    <div style={{
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
      borderBottom: '1px solid var(--col-border)',
      padding: '20px 5%',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px 0',
      }}>
        {signals.map((signal, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              color: 'var(--col-text-3)',
              whiteSpace: 'nowrap' as const,
              padding: '0 24px',
            }}>
              {signal}
            </span>
            {i < signals.length - 1 && (
              <span style={{
                width: '1px',
                height: '14px',
                background: 'var(--col-border-2)',
                flexShrink: 0,
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
