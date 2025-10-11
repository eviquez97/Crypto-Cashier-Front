'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Building } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const WhyChoose = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: Shield,
      title: t('whyChoose.features.security.title'),
      description: t('whyChoose.features.security.desc')
    },
    {
      icon: Zap,
      title: t('whyChoose.features.settlements.title'),
      description: t('whyChoose.features.settlements.desc')
    },
    {
      icon: Globe,
      title: t('whyChoose.features.whiteLabel.title'),
      description: t('whyChoose.features.whiteLabel.desc')
    },
    {
      icon: Building,
      title: t('whyChoose.features.support.title'),
      description: t('whyChoose.features.support.desc')
    }
  ]

  return (
    <section id="features" className="section bg-brand-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
              <h2 className="text-h2-mobile lg:text-h2 font-display font-semibold text-brand-light mb-6">
                {t('whyChoose.title')}
              </h2>
              <p className="text-body-lg text-brand-light/70 max-w-2xl mx-auto">
                {t('whyChoose.subtitle')}
              </p>
        </motion.div>

        {/* 4 cards 2x2 */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: 'cubic-bezier(.22,.61,.36,1)'
              }}
              viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-brand-teal/10 rounded-2xl p-8 group border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    {/* DRAMATIC icon with glow */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="flex-shrink-0 w-14 h-14 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/25"
                    >
                      <feature.icon className="w-7 h-7 text-brand-dark" />
                    </motion.div>
                    
                    <div className="flex-1">
                      {/* Título H3 */}
                      <h3 className="text-h3 font-medium text-brand-light mb-3 group-hover:text-brand-primary transition-colors">
                        {feature.title}
                      </h3>
                      {/* Texto 2–3 líneas */}
                      <p className="text-body text-brand-light/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
