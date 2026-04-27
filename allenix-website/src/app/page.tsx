import Hero from '@/components/Hero'
import WhoItsFor from '@/components/WhoItsFor'
import LetterFromAli from '@/components/LetterFromAli'
import WhatChanges from '@/components/WhatChanges'
import HowWeWork from '@/components/HowWeWork'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <Hero />
      <LetterFromAli />
      <WhatChanges />
      <HowWeWork />
      <WhoItsFor />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
