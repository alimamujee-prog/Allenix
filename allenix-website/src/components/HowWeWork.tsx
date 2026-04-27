'use client'

import { motion } from 'framer-motion'
import {
  BarChart2,
  Briefcase,
  FileText,
  Layers,
  RefreshCw,
  TrendingUp,
} from 'lucide-react'

const phases = [
  {
    dot: '#00c8b4',
    name: 'Onsite',
    badge: 'Start here',
    duration: '1 day at your office',
    description:
      'We sit with you and the person who runs your business. Using your real context, we build the foundation every AI system needs and show you what it can do with your data before we leave the room.',
    featured: true,
    features: [
      { label: 'Knowledge base', detail: 'Your business context structured for AI: services, customers, SOPs, brand voice' },
      { label: 'Process documentation', detail: 'Core workflows captured, mapped, and digitized' },
      { label: 'AI training', detail: 'Tools installed on your equipment, team hands-on and using AI before we leave' },
      { label: 'Live demonstration', detail: 'AI applied to your actual business data so you see the impact firsthand' },
      { label: 'Workflow ROI ranking', detail: 'Every AI opportunity ranked by impact and speed' },
      { label: 'Sprint scope', detail: 'The first 30-day build defined, priced, ready' },
    ],
    tags: null,
    callout: 'You leave with assets most companies spend months building, AI running on your machines, and firsthand proof of what it can do with your data.',
    cta: 'Book the Onsite',
    ctaNote: 'Flat fee. No MSA. No commitment beyond the day.',
  },
  {
    dot: '#378ADD',
    name: 'Go',
    badge: null,
    badgeLabel: 'Scoped in Onsite',
    duration: '30 days, one production workflow',
    description:
      'We build the top-priority workflow, launch it into production, and train the person who owns it. Weekly scorecards measure what changed.',
    featured: false,
    features: null,
    tags: ['Production deployment', 'Team enablement', 'Weekly scorecard', 'ROI validation'],
    callout: 'Your team runs a live AI workflow daily and you have a measured result to show anyone who asks.',
    cta: null,
    ctaNote: null,
  },
  {
    dot: '#D85A30',
    name: 'Scale',
    badge: null,
    badgeLabel: 'Earned in Go',
    duration: 'Monthly retainer',
    description:
      "What's live gets faster. Your team learns to own it. Each month we optimize, upskill, and scope the next build. Quarterly reviews put a number on the distance between you and your competitors.",
    featured: false,
    features: null,
    tags: ['Workflow optimization', 'Team independence', 'Next-build scoping', 'Quarterly review'],
    callout: 'Your AI advantage compounds quarterly while your competitors are still deciding where to start.',
    cta: null,
    ctaNote: null,
  },
]

const whatWeBuild = [
  { icon: <TrendingUp size={15} />, title: 'Revenue operations', detail: 'Lead gen, speed-to-lead, CRM automation, pipeline visibility' },
  { icon: <Briefcase size={15} />, title: 'Operational workflows', detail: 'Dispatch, scheduling, approvals, job costing, field ops' },
  { icon: <RefreshCw size={15} />, title: 'Customer reactivation', detail: 'Dormant leads, win-back campaigns, LTV optimization' },
  { icon: <FileText size={15} />, title: 'Document processing', detail: 'Contract extraction, onboarding, compliance automation' },
  { icon: <BarChart2 size={15} />, title: 'Internal reporting', detail: 'KPI dashboards, anomaly detection, proactive alerts' },
  { icon: <Layers size={15} />, title: 'Acquisition integration', detail: 'Multi-entity reporting, stack unification, rollup intelligence' },
]

export default function HowWeWork() {
  return (
    <section className="section-light" style={{
      padding: '120px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '72px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            How we work
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--col-text-1)',
            marginBottom: '16px',
            maxWidth: '640px',
          }}>
            Onsite. Go. Scale.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 1.75,
            color: 'var(--col-text-3)',
            maxWidth: '480px',
          }}>
            We fly to your office, build with you for a day, and ship your first AI workflow in 30 days. Each phase earns the next.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '36px' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '7px',
            top: '22px',
            bottom: '22px',
            width: '1px',
            background: 'var(--col-border-2)',
          }} />

          {phases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.45, ease: 'easeOut' as const }}
              style={{ position: 'relative', marginBottom: i < phases.length - 1 ? '28px' : '0' }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-36px',
                top: '28px',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                border: `1.5px solid var(--col-border-2)`,
                background: 'var(--col-surface)',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: phase.dot,
                }} />
              </div>

              {/* Card */}
              <div style={{
                background: phase.featured ? 'var(--col-surface-2)' : 'var(--col-bg)',
                border: phase.featured
                  ? '1.5px solid var(--col-accent)'
                  : '1px solid var(--col-border)',
                borderRadius: '10px',
                padding: '32px 36px',
                position: 'relative',
                boxShadow: phase.featured ? '0 0 32px -8px rgba(0,200,180,0.15)' : 'none',
                transition: 'border-color 150ms ease-out',
              }}>

                {/* "Start here" badge */}
                {phase.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '32px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    background: 'var(--col-accent)',
                    color: 'var(--col-bg)',
                    padding: '4px 14px',
                    borderRadius: '100px',
                  }}>
                    {phase.badge}
                  </div>
                )}

                {/* Card header row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '8px',
                  marginTop: phase.badge ? '8px' : '0',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(22px, 2.4vw, 30px)',
                    letterSpacing: '-0.4px',
                    color: phase.featured ? 'var(--col-accent)' : 'var(--col-text-1)',
                  }}>
                    {phase.name}
                  </h3>
                  {!phase.badge && phase.badgeLabel && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--col-text-3)',
                      background: 'var(--col-surface)',
                      border: '1px solid var(--col-border)',
                      padding: '3px 10px',
                      borderRadius: '4px',
                    }}>
                      {phase.badgeLabel}
                    </span>
                  )}
                </div>

                {/* Duration */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--col-text-3)',
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                }}>
                  {phase.duration}
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  lineHeight: 1.8,
                  color: 'var(--col-text-2)',
                  maxWidth: '680px',
                  marginBottom: '24px',
                }}>
                  {phase.description}
                </p>

                {/* Feature grid — Onsite only */}
                {phase.features && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginBottom: '24px',
                  }}
                    className="how-feat-grid"
                  >
                    {phase.features.map((f) => (
                      <div key={f.label} style={{
                        background: 'var(--col-bg)',
                        border: '1px solid var(--col-border)',
                        borderRadius: '6px',
                        padding: '12px 14px',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--col-text-1)',
                          marginBottom: '4px',
                        }}>
                          {f.label}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--col-text-3)',
                          lineHeight: 1.6,
                        }}>
                          {f.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags — Go / Scale */}
                {phase.tags && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {phase.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.5px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'var(--col-surface)',
                        color: 'var(--col-text-3)',
                        border: '1px solid var(--col-border)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Callout */}
                <div style={{
                  background: phase.featured ? 'var(--col-accent-bg)' : 'var(--col-surface)',
                  borderLeft: `2px solid ${phase.featured ? 'var(--col-accent)' : 'var(--col-border-2)'}`,
                  borderRadius: '0 6px 6px 0',
                  padding: '14px 18px',
                  marginBottom: phase.cta ? '24px' : '0',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: phase.featured ? 'var(--col-accent)' : 'var(--col-text-2)',
                  }}>
                    {phase.callout}
                  </p>
                </div>

                {/* CTA — Onsite only */}
                {phase.cta && (
                  <div style={{ borderTop: '1px solid var(--col-border)', paddingTop: '24px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                    <a
                      href="https://calendly.com/ali-allenix/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        padding: '13px 28px',
                        background: 'var(--col-accent)',
                        color: 'var(--col-bg)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'opacity 150ms ease-out',
                        display: 'inline-block',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {phase.cta}
                    </a>
                    {phase.ctaNote && (
                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--col-text-3)',
                        letterSpacing: '0.5px',
                      }}>
                        {phase.ctaNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* What we build */}
        <div style={{ marginTop: '80px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-text-3)',
            marginBottom: '28px',
            fontWeight: 500,
          }}>
            What we build
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}
            className="what-we-build-grid"
          >
            {whatWeBuild.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: 'easeOut' as const }}
              >
                <div
                  style={{
                    background: 'var(--col-bg)',
                    border: '1px solid var(--col-border)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    transition: 'border-color 150ms ease-out',
                    height: '100%',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--col-border-2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--col-border)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <span style={{ color: 'var(--col-accent)', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--col-text-1)',
                    }}>
                      {item.title}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'var(--col-text-3)',
                    paddingLeft: '23px',
                  }}>
                    {item.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: 'easeOut' as const }}
          style={{
            marginTop: '56px',
            padding: '40px 36px',
            textAlign: 'center',
            border: '1px solid var(--col-border)',
            borderRadius: '10px',
            background: 'var(--col-bg)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 1.7,
            color: 'var(--col-text-2)',
            maxWidth: '440px',
            margin: '0 auto 24px',
          }}>
            Houston operators who ship live AI in 30 days. If it doesn&apos;t work, you don&apos;t pay.
          </p>
          <a
            href="https://calendly.com/ali-allenix/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '13px 32px',
              background: 'var(--col-text-1)',
              color: 'var(--col-bg)',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'opacity 150ms ease-out',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Book the Onsite
          </a>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--col-text-3)',
            marginTop: '12px',
            letterSpacing: '0.5px',
          }}>
            Flat fee. No long-term commitment.
          </p>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 720px) {
          .how-feat-grid { grid-template-columns: 1fr 1fr !important; }
          .what-we-build-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .how-feat-grid { grid-template-columns: 1fr !important; }
          .what-we-build-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
