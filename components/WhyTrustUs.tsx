'use client'

import { motion } from 'framer-motion'
import { DollarSign, Zap, Shield, Key, BarChart3, Headphones } from 'lucide-react'

const WhyTrustUs = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: '2% net fee, passthrough gas.',
    },
    {
      icon: Zap,
      title: 'Fast Integrations',
      description: 'Hosted Checkout, Widget, API Keys, Webhooks.',
    },
    {
      icon: Shield,
      title: 'Secure Custody',
      description: 'KMS (AWS) + HD derivation + cold storage policies.',
    },
    {
      icon: Key,
      title: 'One-time Addresses',
      description: 'Unique address & QR per deposit, reduces fraud.',
    },
    {
      icon: BarChart3,
      title: 'Enterprise Dashboard',
      description: 'Per-tenant analytics, ledger reports, audit logs.',
    },
    {
      icon: Headphones,
      title: '24/7 Support & SLAs',
      description: 'Priority for enterprise customers.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Coinfixi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trust comes from experience. Many of the pleased customers may function as a guide for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyTrustUs
