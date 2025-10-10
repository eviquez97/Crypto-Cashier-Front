import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CryptoCards from '@/components/CryptoCards'
import WhyTrustUs from '@/components/WhyTrustUs'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  console.log('FRONTEND REBUILT:', new Date().toISOString())
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <CryptoCards />
      <WhyTrustUs />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
