import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import UnitExplorer from '@/components/UnitExplorer'
import CaseStudies from '@/components/CaseStudies'
import WhoItsFor from '@/components/WhoItsFor'
import FAQSection from '@/components/FAQSection'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <Hero />
      <ServicesGrid />
      <UnitExplorer />
      <CaseStudies />
      <WhoItsFor />
      <FAQSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
