import AllenixHero from '@/components/AllenixHero'
import Link from 'next/link'
import { CyanPixelTrail } from '@/components/ui/pixel-trail'

export default function Home() {
  return (
    <main className="bg-bg-main text-text-primary relative">

      <CyanPixelTrail />

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: '18px 40px',
          background: 'linear-gradient(180deg, rgba(6,8,10,0.95) 0%, rgba(6,8,10,0) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '31px',
            letterSpacing: '0.5px',
            color: 'rgba(240,242,244,0.92)',
          }}
        >
          Allenix
        </span>
        <Link
          href="/manifesto"
          className="nav-manifesto-link"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          The Manifesto
        </Link>
      </header>

      {/* Hero: Orbital Diagram */}
      <section id="solution">
        <AllenixHero />
      </section>

    </main>
  )
}
