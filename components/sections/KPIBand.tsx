'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const KPIBand = () => {
  const [isVisible, setIsVisible] = useState(false)

  const kpis = [
    { value: '10B+', label: 'Processed' },
    { value: '99.9%', label: 'Uptime' },
    { value: '50+', label: 'Assets' },
    { value: '200K+', label: 'Customers' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('kpi-band')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="kpi-band" className="bg-primary-dark py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center relative"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isVisible ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-2"
              >
                {kpi.value}
              </motion.div>
              <div className="text-gray-medium text-sm lg:text-base">
                {kpi.label}
              </div>
              
              {/* Vertical separator */}
              {index < kpis.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-px h-12 bg-gray-dark transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KPIBand
