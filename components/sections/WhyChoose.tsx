'use client'

import { motion } from 'framer-motion'
import { Shield, Globe, CheckCircle, BarChart3 } from 'lucide-react'

const WhyChoose = () => {
  const features = [
    {
      icon: Shield,
      title: 'Innovation at Core',
      description: 'Cutting-edge crypto infrastructure with real-time processing and advanced security protocols.'
    },
    {
      icon: Globe,
      title: 'Transparency & Trust',
      description: 'Full transparency in fees, real-time transaction tracking, and comprehensive audit trails.'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Ready',
      description: 'Built-in AML screening, KYB verification, and regulatory compliance for all jurisdictions.'
    },
    {
      icon: BarChart3,
      title: 'Enterprise Dashboard',
      description: 'Real-time analytics, multi-tenant management, and comprehensive reporting tools.'
    },
  ]

  return (
    <section className="py-20 bg-secondary-bg">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-accent-purple">Coinfixi</span>
          </h2>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            Built for gaming operators who demand reliability, security, and transparency in their crypto payments.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0 w-12 h-12 bg-accent-neon rounded-xl flex items-center justify-center"
                  >
                    <feature.icon className="w-6 h-6 text-primary-dark" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-text mb-3 group-hover:text-accent-purple transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
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
