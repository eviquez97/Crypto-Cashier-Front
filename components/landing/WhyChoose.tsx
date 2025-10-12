'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Building } from 'lucide-react'

const WhyChoose = () => {
  const features = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'AWS KMS encryption with ephemeral wallets. One address, one transaction. Maximum security for your operations.'
    },
    {
      icon: Zap,
      title: 'Instant Settlements',
      description: 'Real-time processing with instant confirmations. No waiting periods or delays in your payment flow.'
    },
    {
      icon: Globe,
      title: 'Multi-chain Support',
      description: 'BTC, ETH, TRON, BSC, Polygon, Lightning. Real addresses that actually receive funds across all major chains.'
    },
    {
      icon: Building,
      title: 'White-label Infrastructure',
      description: 'Fully customizable payment experience that matches your brand. Complete control over the user journey.'
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
                Why Choose Coinfixi
              </h2>
              <p className="text-body-lg text-brand-light/70 max-w-2xl mx-auto">
                Built for gaming operators who demand reliability, security, and transparency in their crypto payments.
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
