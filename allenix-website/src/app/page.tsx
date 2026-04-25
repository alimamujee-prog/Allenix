import Hero from '@/components/Hero'
import LetterFromAli from '@/components/LetterFromAli'
import IsThisYou from '@/components/IsThisYou'
import ServicesGrid from '@/components/ServicesGrid'
import UnitExplorer from '@/components/UnitExplorer'
import WhatChanges from '@/components/WhatChanges'
import WhoItsFor from '@/components/WhoItsFor'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <Hero />
      <LetterFromAli />
      <IsThisYou />
      <ServicesGrid />
      <UnitExplorer />
      <WhatChanges />
      <WhoItsFor />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
