'use client'

import { useState } from 'react'
import Image from 'next/image'

const CALENDLY_URL = 'https://calendly.com/d/cx2q-z3v-zxv/meet-allenix'

const slides = [
  {
    src: '/magnolia-os-screenshots/screen-1.png',
    label: 'Mission Control',
    caption: 'The nerve center. Every agent, every signal, every pending decision — in one view.',
  },
  {
    src: '/magnolia-os-screenshots/screen-2.png',
    label: 'One-Page Strategy',
    caption: 'The single page every agent reads before it does anything. Your strategy, always in the room.',
  },
  {
    src: '/magnolia-os-screenshots/screen-3.png',
    label: 'Annual Goals',
    caption: 'Three goals. One stage each. Bound to Acquire, Activate, and Ascend. Chat with the OS about any of them.',
  },
  {
    src: '/magnolia-os-screenshots/screen-4.png',
    label: 'Monthly Metrics',
    caption: 'Every growth number tracked in real time. Revenue, pipeline, subscribers — all on pace.',
  },
]

export default function MagnoliaCarousel() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + slides.length) % slides.length)
  const next = () => setActive(i => (i + 1) % slides.length)

  const slide = slides[active]

  return (
    <div style={{ width: '100%' }}>

      {/* Slide */}
      <div
        style={{
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid var(--col-border-2)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,200,180,0.08)',
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            background: 'var(--col-surface-2)',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid var(--col-border)',
          }}
        >
          <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: 'var(--col-surface)',
              border: '1px solid var(--col-border)',
              borderRadius: '4px',
              padding: '3px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--col-text-3)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            app.magnolia-os.allenix.com
          </div>
        </div>

        {/* Screenshot */}
        <Image
          src={slide.src}
          alt={slide.label}
          width={1440}
          height={900}
          style={{ display: 'block', width: '100%', height: 'auto' }}
          priority={active === 0}
        />

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous screen"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(6,8,10,0.72)',
            border: '1px solid var(--col-border-2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--col-text-2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next screen"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(6,8,10,0.72)',
            border: '1px solid var(--col-border-2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--col-text-2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Label + caption */}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '6px',
          }}
        >
          {slide.label}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'var(--col-text-3)',
            margin: '0 auto',
            maxWidth: '320px',
          }}
        >
          {slide.caption}
        </p>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: i === active ? 'var(--col-accent)' : 'var(--col-border-2)',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 200ms ease-out, background 200ms ease-out',
            }}
          />
        ))}
      </div>

      {/* Open demo CTA */}
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <a
          href="/magnolia-os-demo.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            textDecoration: 'none',
            border: '1px solid var(--col-accent-dim)',
            background: 'var(--col-accent-bg)',
            padding: '12px 24px',
            borderRadius: '4px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Open interactive demo
        </a>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--col-text-3)',
            marginTop: '10px',
          }}
        >
          Best experienced on desktop
        </p>
      </div>

      {/* Book call CTA */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--col-text-2)',
            textDecoration: 'none',
          }}
        >
          Book a Live Demo →
        </a>
      </div>

    </div>
  )
}
