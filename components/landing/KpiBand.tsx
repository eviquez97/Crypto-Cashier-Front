'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const KpiBand = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  const kpis = [
    { value: '10B+', label: t('kpi.volume') },
    { value: '99.9%', label: t('kpi.uptime') },
    { value: '50+', label: 'Assets' },
    { value: '200K+', label: t('kpi.clients') },
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
    <section id="kpi-band" className="bg-info-500 py-16">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.1,
                ease: 'ease-out'
              }}
              className="text-center relative"
            >
              {/* Número con mejor tipografía */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.1 + 0.2,
                  ease: 'ease-out'
                }}
                className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2 drop-shadow-lg"
              >
                {kpi.value}
              </motion.div>
              
              {/* Label mejorado */}
              <div className="text-sm text-brand-light font-medium">
                {kpi.label}
              </div>
              
              {/* Separadores verticales */}
              {index < kpis.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-px h-12 bg-brand-primary/30 transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KpiBand
