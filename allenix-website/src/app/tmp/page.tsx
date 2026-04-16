'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { flywheelData } from '@/data/flywheel'

/* ════════════════════════════════════════════════════════════════════════════════
   Allenix Homepage — /tmp preview
   ════════════════════════════════════════════════════════════════════════════════ */

export default function TmpPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null)

  // Load Calendly widget
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      // Calendly script loaded — popup widget available for CTA buttons
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup Calendly badge on unmount
      const badge = document.querySelector('.calendly-badge-widget')
      if (badge) badge.remove()
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <Hero />
      <WhatWeDo activeUnit={activeUnit} setActiveUnit={setActiveUnit} />
      <HowItWorks />
      <Newsletter />
      <CTASection />
      <Footer />
    </div>
  )
}

/* ─── Header ────────────────────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-200 ${
        scrolled ? 'bg-bg-main/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <Image
        src="/logo.png"
        alt="Allenix"
        width={240}
        height={66}
        className="h-14 md:h-16 w-auto mix-blend-multiply"
        priority
      />
      <button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const w = window as any
          if (w.Calendly) {
            w.Calendly.initPopupWidget({ url: 'https://calendly.com/dustin-allenix/30min' })
          } else {
            window.open('https://calendly.com/dustin-allenix/30min', '_blank')
          }
        }}
        className="font-mono text-[11px] tracking-[2px] uppercase text-accent hover:text-accent-hover transition-colors duration-150 hidden sm:block cursor-pointer"
      >
        Book a Discovery Call
      </button>
    </header>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="pt-36 pb-20 md:pt-48 md:pb-28 px-6">
      <div className="max-w-content mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-muted mb-6">
          Houston · Gulf South · AI Era
        </p>

        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-8xl tracking-tight text-text-primary leading-none mb-8">
          Allenix
        </h1>

        <p className="font-body text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto mb-12">
          We sit down with you. We find the constraint costing you the most time or money. We fix it in 90 days.
        </p>

        <a
          href="#book-a-call"
          className="inline-block bg-accent text-text-primary font-body font-bold text-sm tracking-wide px-8 py-3.5 rounded hover:bg-accent-hover transition-colors duration-150"
        >
          Book a Discovery Call
        </a>
      </div>
    </section>
  )
}

/* ─── What We Do ────────────────────────────────────────────────────────────── */
function WhatWeDo({
  activeUnit,
  setActiveUnit,
}: {
  activeUnit: string | null
  setActiveUnit: (u: string | null) => void
}) {
  const units = [
    { key: 'labs', ...flywheelData.labs },
    { key: 'studios', ...flywheelData.studios },
    { key: 'capital', ...flywheelData.capital },
  ]

  return (
    <section className="py-20 md:py-32 px-6 bg-bg-card">
      <div className="max-w-content mx-auto">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-muted mb-3">
          What We Do
        </p>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-text-primary leading-tight mb-4">
          Three units. One machine.
        </h2>
        <p className="font-body text-text-secondary leading-relaxed max-w-2xl mb-10 md:mb-12">
          Each unit feeds the next. Studios builds the audience. Labs sells into it and delivers. Capital acquires what Labs has proven. The wheel spins faster every quarter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {units.map((unit) => (
            <UnitCard
              key={unit.key}
              unitKey={unit.key}
              name={unit.name}
              desc={unit.desc}
              forming={unit.forming}
              isActive={activeUnit === unit.key}
              onClick={() => setActiveUnit(activeUnit === unit.key ? null : unit.key)}
            />
          ))}
        </div>

        {/* Animated expand panel */}
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: activeUnit ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="mt-6 bg-bg-main border border-border-col rounded-lg p-6 md:p-10">
              {activeUnit && <UnitPanel unitKey={activeUnit} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Unit Card ─────────────────────────────────────────────────────────────── */
function UnitCard({
  unitKey,
  name,
  desc,
  forming,
  isActive,
  onClick,
}: {
  unitKey: string
  name: string
  desc: string
  forming: boolean
  isActive: boolean
  onClick: () => void
}) {
  const roleLabels: Record<string, string> = {
    labs: 'The Engine',
    studios: 'The Audience',
    capital: 'The Compounder',
  }

  return (
    <button
      onClick={onClick}
      className={`text-left p-6 md:p-8 rounded-lg border transition-all duration-150 cursor-pointer min-h-[180px] ${
        isActive
          ? 'bg-accent-wash border-accent'
          : 'bg-bg-main border-border-col hover:border-accent-hover hover:-translate-y-0.5'
      }`}
    >
      <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted mb-4">
        {roleLabels[unitKey]}
        {forming && ' · Forming'}
      </p>
      <h3 className="font-display font-semibold italic text-xl md:text-2xl text-text-primary mb-3">
        {name}
      </h3>
      <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-3">
        {desc}
      </p>
    </button>
  )
}

/* ─── Unit Panel ────────────────────────────────────────────────────────────── */
function UnitPanel({ unitKey }: { unitKey: string }) {
  const unit = flywheelData[unitKey]
  if (!unit) return null

  const roleLabels: Record<string, string> = {
    labs: 'The Engine',
    studios: 'The Audience',
    capital: 'The Compounder',
  }

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted mb-2">
        {roleLabels[unitKey]}
        {unit.forming && ' · Forming'}
      </p>
      <h3 className="font-display font-black text-2xl md:text-3xl text-text-primary mb-4">
        {unit.name}
      </h3>
      <p className="font-body text-text-secondary leading-relaxed max-w-2xl mb-8">
        {unit.desc}
      </p>

      {unit.concepts && unit.concepts.length > 0 && (
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted mb-4">Core</p>
          <div className="flex flex-wrap gap-2">
            {unit.concepts.map((c) => (
              <span key={c.key} className="px-3 py-1.5 border border-border-col rounded text-xs font-body font-bold tracking-wide uppercase text-text-secondary bg-bg-card">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {unit.gtm && unit.gtm.length > 0 && (
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted mb-4">Growth</p>
          <p className="font-mono text-[10px] tracking-[1px] uppercase text-text-muted mb-3">Go-to-Market</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {unit.gtm.map((item) => (
              <span key={item.key} className="px-3 py-1.5 border border-border-col rounded text-xs font-body tracking-wide uppercase text-text-secondary bg-bg-card">
                {item.name}
              </span>
            ))}
          </div>
          {unit.ops && unit.ops.length > 0 && (
            <>
              <p className="font-mono text-[10px] tracking-[1px] uppercase text-text-muted mb-3">Operations</p>
              <div className="flex flex-wrap gap-2">
                {unit.ops.map((item) => (
                  <span key={item.key} className="px-3 py-1.5 border border-border-col rounded text-xs font-body tracking-wide uppercase text-text-secondary bg-bg-card">
                    {item.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {unit.items && unit.items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unit.items.map((item) => (
            <span key={item.key} className="px-3 py-1.5 border border-border-col rounded text-xs font-body tracking-wide uppercase text-text-secondary bg-bg-card">
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── How It Works ──────────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Deep Discovery',
      body: 'We sit down with you and your team. We map every revenue workflow, every bottleneck, every place time or money is leaking. Two to four weeks. The output is a single document: every opportunity ranked by ROI, each with a dollar number attached.',
    },
    {
      num: '02',
      title: 'Identify the Constraint',
      body: 'Not ten problems. One. The single constraint that, if removed, unlocks the most growth. We quantify it. We prove it. Then we agree on the fix.',
    },
    {
      num: '03',
      title: 'Resolve It',
      body: 'We build the solution using the latest AI tools and workflows. We train your team. We stay until it runs without us. Then we move to the next constraint.',
    },
  ]

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-content mx-auto">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-muted mb-3">
          How It Works
        </p>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-text-primary leading-tight mb-12 md:mb-16">
          From first call to first result.
        </h2>

        <div className="space-y-12 md:space-y-16 mb-16">
          {steps.map((step) => (
            <div key={step.num} className="md:flex md:gap-12">
              <div className="md:w-20 shrink-0 mb-2 md:mb-0">
                <span className="font-mono text-sm tracking-widest text-accent">{step.num}</span>
              </div>
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-text-secondary leading-relaxed max-w-xl text-sm md:text-base">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body font-bold text-text-primary text-base md:text-lg mb-8 max-w-xl">
          This is not a transformation roadmap. It is one problem, one fix, one result. Then the next one.
        </p>

        <a
          href="#book-a-call"
          className="inline-block border-2 border-accent text-accent font-body font-bold text-sm tracking-wide px-8 py-3 rounded hover:bg-accent-wash transition-colors duration-150"
        >
          Ready to find your constraint? Book a Discovery Call
        </a>
      </div>
    </section>
  )
}

/* ─── Newsletter ────────────────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <section className="py-20 md:py-32 px-6 bg-bg-card">
      <div className="max-w-content mx-auto">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-muted mb-3">
          Stay Ahead
        </p>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-text-primary leading-tight mb-4">
          Stay in the loop.
        </h2>
        <p className="font-body text-text-secondary leading-relaxed max-w-lg mb-8 text-sm md:text-base">
          Updates from Allenix. What we are building, what we are learning, and what is coming next. No spam. No fluff. Just a note when there is something worth sharing.
        </p>

        {status === 'success' ? (
          <p className="font-body font-bold text-accent">You are on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 bg-bg-main border border-border-col rounded font-body text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors duration-150"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-accent text-text-primary font-body font-bold text-sm tracking-wide rounded hover:bg-accent-hover transition-colors duration-150 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && errorMsg && (
          <p className="font-body text-sm text-red-600 mt-3">{errorMsg}</p>
        )}
      </div>
    </section>
  )
}

/* ─── CTA Section ───────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="book-a-call" className="py-20 md:py-32 px-6">
      <div className="max-w-content mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-muted mb-3">
          Next Step
        </p>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-text-primary leading-tight mb-6">
          See if Labs is right for your business.
        </h2>
        <p className="font-body text-text-secondary leading-relaxed max-w-lg mx-auto mb-10 text-sm md:text-base">
          One hour. No pitch deck. No commitment. Just a conversation about where your business is today, where the biggest constraint is hiding, and whether Allenix is the right team to remove it.
        </p>

        <div className="bg-bg-card border border-border-col rounded-lg p-8 md:p-12 max-w-md mx-auto mb-6">
          <a
            href="https://calendly.com/dustin-allenix/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-text-primary font-body font-bold text-sm tracking-wide px-8 py-3.5 rounded hover:bg-accent-hover transition-colors duration-150"
            onClick={(e) => {
              e.preventDefault()
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const w = window as any
              if (w.Calendly) {
                w.Calendly.initPopupWidget({ url: 'https://calendly.com/dustin-allenix/30min' })
              } else {
                window.open('https://calendly.com/dustin-allenix/30min', '_blank')
              }
            }}
          >
            Book a Discovery Call
          </a>
        </div>

        <p className="font-body text-sm text-text-muted">
          Prefer LinkedIn? <a href="#linkedin" className="text-accent hover:text-accent-hover transition-colors duration-150">Reach out on LinkedIn</a>
        </p>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border-col py-10 md:py-12 px-6">
      <div className="max-w-content mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="font-display font-black text-lg text-text-primary">Allenix</span>
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted">Houston, Texas</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/manifesto" className="font-body text-sm text-text-muted hover:text-accent transition-colors duration-150">
            The Manifesto
          </Link>
          <a href="#linkedin" className="font-body text-sm text-text-muted hover:text-accent transition-colors duration-150">
            LinkedIn
          </a>
          <a href="#email" className="font-body text-sm text-text-muted hover:text-accent transition-colors duration-150">
            Email
          </a>
        </div>
        <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted">
          &copy; 2026 Allenix. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
