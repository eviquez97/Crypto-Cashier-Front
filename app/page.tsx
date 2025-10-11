'use client'

import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import KpiBand from '@/components/landing/KpiBand'
import WhyChoose from '@/components/landing/WhyChoose'
import TrustIndicators from '@/components/landing/TrustIndicators'
import PromoLeft from '@/components/landing/PromoLeft'
import PromoRight from '@/components/landing/PromoRight'
import Testimonials from '@/components/landing/Testimonials'
import BigCta from '@/components/landing/BigCta'
import Newsletter from '@/components/landing/Newsletter'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <KpiBand />
      <WhyChoose />
      <TrustIndicators />
      <PromoLeft />
      <PromoRight />
      <Testimonials />
      <BigCta />
      <Newsletter />
      <Footer />
    </div>
  )
}