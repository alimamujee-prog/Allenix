'use client'

import { flywheelData } from '@/data/flywheel'

const services = [
  // GTM track
  ...((flywheelData.labs.gtm ?? []).map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    name: s.name,
    desc: s.desc,
  }))),
  // Ops track
  ...((flywheelData.labs.ops ?? []).map((s, i) => ({
    num: String((flywheelData.labs.gtm?.length ?? 0) + i + 1).padStart(2, '0'),
    name: s.name,
    desc: s.desc,
  }))),
]

// Prepend the two concept services
const conceptServices = (flywheelData.labs.concepts ?? []).map((s, i) => ({
  num: String(i + 1).padStart(2, '0'),
  name: s.name,
  desc: s.desc,
}))

const allServices = [
  ...conceptServices,
  ...(flywheelData.labs.gtm ?? []).map((s, i) => ({
    num: String(conceptServices.length + i + 1).padStart(2, '0'),
    name: s.name,
    desc: s.desc,
  })),
  ...(flywheelData.labs.ops ?? []).map((s, i) => ({
    num: String(conceptServices.length + (flywheelData.labs.gtm?.length ?? 0) + i + 1).padStart(2, '0'),
    name: s.name,
    desc: s.desc,
  })),
]

export default function ServicesGrid() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-bg)',
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
            What We Build
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
            Every engagement is a system, not a project.
          </h2>
        </div>

        {/* Grid */}
        <div className="mob-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          borderTop: '1px solid var(--col-border)',
          borderLeft: '1px solid var(--col-border)',
        }}>
          {allServices.map((svc) => (
            <ServiceCard key={svc.num} {...svc} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ num, name, desc }: { num: string; name: string; desc: string }) {
  return (
    <div className="mob-pad-card" style={{
      borderRight: '1px solid var(--col-border)',
      borderBottom: '1px solid var(--col-border)',
      padding: '36px 40px',
      transition: 'background 150ms ease-out, border-left-color 150ms ease-out',
      position: 'relative',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.background = 'var(--col-surface)'
        el.style.borderLeftColor = 'var(--col-accent)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.background = 'transparent'
        el.style.borderLeftColor = 'var(--col-border)'
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '20px',
        fontWeight: 500,
        color: 'var(--col-accent)',
        marginBottom: '14px',
        letterSpacing: '1px',
      }}>
        {num}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: '24px',
        color: 'var(--col-text-1)',
        marginBottom: '12px',
        letterSpacing: '-0.5px',
      }}>
        {name}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
        lineHeight: 1.75,
        color: 'var(--col-text-2)',
      }}>
        {desc}
      </div>
    </div>
  )
}
