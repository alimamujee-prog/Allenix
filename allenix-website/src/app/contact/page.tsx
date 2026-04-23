'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#eef1f5',
    border: '1px solid #c8d0da',
    color: '#0d1117',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    lineHeight: 1.6,
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--col-text-2)',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <>
      <main className="mob-pt-80" style={{ minHeight: '100vh', paddingTop: '120px', background: 'var(--col-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5% 120px' }}>

          {/* Page title */}
          <div className="mob-w-full" style={{ maxWidth: '680px', marginBottom: '28px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-accent)',
              marginBottom: '20px',
            }}>
              Start here
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 58px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              color: 'var(--col-text-1)',
              marginBottom: '20px',
            }}>
              Tell us about yourself.
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--col-text-2)',
            }}>
              Fill out the form below and we will follow up immediately to schedule a 30-minute call.
            </p>
          </div>

          {/* Error banner */}
          {status === 'error' && (
            <div className="mob-w-full" style={{
              maxWidth: '680px',
              background: 'rgba(200,50,50,0.08)',
              border: '1px solid rgba(200,50,50,0.3)',
              padding: '16px 20px',
              marginBottom: '32px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#f87171',
            }}>
              Something went wrong. Email Ali directly at{' '}
              <a href="mailto:ali@allenix.com" style={{ color: 'var(--col-accent)' }}>ali@allenix.com</a>.
            </div>
          )}

          {/* Form / Success */}
          {status === 'sent' ? (
            <div className="mob-w-full mob-pad-card" style={{
              maxWidth: '600px',
              background: 'var(--col-accent-bg)',
              border: '1px solid var(--col-accent-dim)',
              padding: '56px 48px',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--col-accent)',
                marginBottom: '20px',
              }}>
                Message received
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '32px',
                letterSpacing: '-0.8px',
                color: 'var(--col-text-1)',
                marginBottom: '16px',
              }}>
                We&apos;ll be in touch shortly.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--col-text-2)',
              }}>
                In the meantime, the Manifesto is worth reading.
                It explains exactly what Allenix is building and why.
              </p>
              <a href="/manifesto" className="btn-primary" style={{ marginTop: '32px', display: 'inline-block' }}>
                Read the Manifesto
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mob-w-full" style={{ maxWidth: '680px' }}>
              <div className="mob-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Your name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--col-accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,180,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = '#c8d0da'; e.target.style.boxShadow = 'none' }}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--col-accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,180,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = '#c8d0da'; e.target.style.boxShadow = 'none' }}
                    placeholder="jane@firmname.com"
                  />
                </div>
              </div>

              <div className="mob-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label htmlFor="company" style={labelStyle}>Firm name</label>
                  <input
                    id="company" name="company" type="text" required
                    value={form.company} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--col-accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,180,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = '#c8d0da'; e.target.style.boxShadow = 'none' }}
                    placeholder="Smith Consulting"
                  />
                </div>
                <div>
                  <label htmlFor="revenue" style={labelStyle}>Annual revenue</label>
                  <select
                    id="revenue" name="revenue"
                    value={form.revenue} onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'light' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--col-accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,180,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = '#c8d0da'; e.target.style.boxShadow = 'none' }}
                  >
                    <option value="" disabled>Select range</option>
                    <option value="3-5M">$3M – $5M</option>
                    <option value="5-10M">$5M – $10M</option>
                    <option value="10-25M">$10M – $25M</option>
                    <option value="25-50M">$25M – $50M</option>
                    <option value="50M+">$50M+</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <label htmlFor="message" style={labelStyle}>What breaks first if you step away?</label>
                <textarea
                  id="message" name="message" rows={5} required
                  value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--col-accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--col-border)')}
                  placeholder="Tell us where the business depends on you..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{ opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'sending' ? 'Sending...' : 'Submit this form'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
