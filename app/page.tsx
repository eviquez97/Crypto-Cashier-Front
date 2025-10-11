'use client'

import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import KpiBand from '@/components/landing/KpiBand'
import WhyChoose from '@/components/landing/WhyChoose'
import PromoLeft from '@/components/landing/PromoLeft'
import PromoRight from '@/components/landing/PromoRight'
import Testimonials from '@/components/landing/Testimonials'
import BigCta from '@/components/landing/BigCta'
import Pricing from '@/components/landing/Pricing'
import CompareTable from '@/components/landing/CompareTable'
import Newsletter from '@/components/landing/Newsletter'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <KpiBand />
      <WhyChoose />
      <PromoLeft />
      <PromoRight />
      <Testimonials />
      <BigCta />
      <Pricing />
      <CompareTable />
      <Newsletter />
      <Footer />
    </div>
  )
}