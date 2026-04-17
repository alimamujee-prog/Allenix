'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How long does an engagement take?',
    a: 'The Business Brain Diagnostic is four weeks. A full Map/Build/Run engagement runs three to six months depending on scope. We move fast because we work alongside your team, not around them.',
  },
  {
    q: 'Do we need to hire anyone to run this?',
    a: 'No. That is the point. We build systems your existing team can operate. If anything, a successful engagement reduces your headcount needs, not increases them.',
  },
  {
    q: 'What does the system actually do?',
    a: 'The operating system we build inside your business handles proposal generation, reporting, document processing, and workflow automation. It runs underneath your existing tools without replacing them. Think of it as the operational backbone your firm never had.',
  },
  {
    q: 'What size company is right for Allenix?',
    a: 'We work with American mid-market professional services firms doing $5M to $50M in revenue. You need enough operational complexity to make the system worth building and enough margin to fund it. If you are below that threshold, the Business Brain Diagnostic alone may be the right starting point.',
  },
  {
    q: 'What happens after the initial build?',
    a: 'We run it until it works, then hand it over. Every engagement ends with your team trained, your systems documented, and a clear playbook for what happens next. We do not disappear after launch.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

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
            FAQ
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
            Questions operators ask before they book a call.
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderTop: '1px solid var(--col-border)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '28px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '24px',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  letterSpacing: '-0.3px',
                  color: open === i ? 'var(--col-accent)' : 'var(--col-text-1)',
                  transition: 'color 150ms ease-out',
                  lineHeight: 1.3,
                }}>
                  {faq.q}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    flexShrink: 0,
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 150ms ease-out',
                  }}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="var(--col-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className="expand-grid"
                data-open={open === i ? 'true' : 'false'}
              >
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--col-text-2)',
                    paddingBottom: '32px',
                    maxWidth: '720px',
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--col-border)' }} />
        </div>
      </div>
    </section>
  )
}
