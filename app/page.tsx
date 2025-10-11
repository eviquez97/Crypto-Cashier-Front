'use client'

import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import KPIBand from '@/components/sections/KPIBand'
import WhyChoose from '@/components/sections/WhyChoose'
import AlternatingSection from '@/components/sections/AlternatingSection'
import Testimonials from '@/components/sections/Testimonials'
import BigCTA from '@/components/sections/BigCTA'
import Pricing from '@/components/sections/Pricing'
import Newsletter from '@/components/sections/Newsletter'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <KPIBand />
      <WhyChoose />
      
      <AlternatingSection
        title="Coinfixi for the Future"
        subtitle="Next-Generation Infrastructure"
        description="Built on cutting-edge blockchain technology with real-time processing capabilities. Our infrastructure scales with your business, ensuring seamless performance even during peak traffic."
        primaryButton="View API Docs"
        secondaryButton="Learn More"
        imageSide="right"
      />
      
      <AlternatingSection
        title="White-Label Checkout"
        subtitle="Complete Customization"
        description="Fully customizable payment experience that matches your brand. Integrate seamlessly with your existing systems while maintaining complete control over the user experience."
        primaryButton="Get Started"
        secondaryButton="View Demo"
        imageSide="left"
        features={['Custom Branding', 'Risk Controls', 'Real-time Webhooks']}
      />
      
      <Testimonials />
      <BigCTA />
      <Pricing />
      <Newsletter />
      <Footer />
    </div>
  )
}