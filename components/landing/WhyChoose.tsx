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
    <section id="features" className="section bg-base-light">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2-mobile lg:text-h2 font-display font-semibold text-text-main mb-6">
            Why Choose <span className="text-brand-purple">Coinfixi</span>
          </h2>
          <p className="text-body-lg text-gray-500 max-w-2xl mx-auto">
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
              whileHover={{ y: -2 }}
              className="card p-8 group"
            >
              <div className="flex items-start space-x-4">
                {/* Ícono lineal verde */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 w-12 h-12 bg-brand-neon rounded-xl flex items-center justify-center"
                >
                  <feature.icon className="w-6 h-6 text-base-dark" />
                </motion.div>
                
                <div className="flex-1">
                  {/* Título H3 */}
                  <h3 className="text-h3 font-medium text-text-main mb-3 group-hover:text-brand-purple transition-colors">
                    {feature.title}
                  </h3>
                  {/* Texto 2–3 líneas */}
                  <p className="text-body text-gray-500 leading-relaxed">
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
