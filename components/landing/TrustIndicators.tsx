'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Lock, Users, CheckCircle, Globe, Zap, TrendingUp } from 'lucide-react'

const TrustIndicators = () => {
  const trustItems = [
    {
      icon: Shield,
      title: 'SOC 2 Type II Certified',
      description: 'Bank-grade security compliance',
      badge: 'Certified'
    },
    {
      icon: Lock,
      title: '256-bit AES Encryption',
      description: 'Military-grade data protection',
      badge: 'Secure'
    },
    {
      icon: Users,
      title: '500+ Enterprise Clients',
      description: 'Trusted by leading companies',
      badge: 'Trusted'
    },
    {
      icon: Award,
      title: 'PCI DSS Compliant',
      description: 'Payment card industry standard',
      badge: 'Compliant'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: '200+ countries supported',
      badge: 'Global'
    },
    {
      icon: Zap,
      title: '99.99% Uptime SLA',
      description: 'Enterprise reliability guarantee',
      badge: 'Reliable'
    }
  ]

  const stats = [
    { value: '$10B+', label: 'Processed Volume', icon: TrendingUp },
    { value: '50M+', label: 'Transactions', icon: Zap },
    { value: '200+', label: 'Supported Countries', icon: Globe },
    { value: '24/7', label: 'Support', icon: Users }
  ]

  return (
    <section className="section bg-brand-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-light mb-6">
            Trusted by <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">Enterprise Leaders</span>
          </h2>
          <p className="text-xl text-brand-light/70 max-w-3xl mx-auto">
            Join the world's most trusted crypto payment infrastructure. 
            Built for enterprise-grade security, compliance, and reliability.
          </p>
        </motion.div>

        {/* Trust Indicators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-brand-teal/10 rounded-2xl p-8 shadow-lg hover:shadow-xl border border-brand-primary/20 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <item.icon className="w-7 h-7 text-brand-dark" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-brand-light">{item.title}</h3>
                      <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full border border-brand-primary/20">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-brand-light/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-base-mid to-base-dark rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(18,178,193,0.3), transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(13,138,158,0.3), transparent 50%)
              `
            }}
          />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-base-light mb-4">
                Powering the Future of Digital Payments
              </h3>
              <p className="text-base-light/70 text-lg">
                Real-time metrics from our global infrastructure
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-neon/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-brand-neon" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-brand-neon mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-base-light/70 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Industry Certifications & Compliance
            </h3>
            <p className="text-text-secondary">
              Meeting the highest standards of security and regulatory compliance
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['SOC 2', 'PCI DSS', 'ISO 27001', 'GDPR', 'CCPA', 'AML/KYC'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 px-4 py-2 bg-base-light rounded-xl border border-accent-medium/20"
              >
                <CheckCircle className="w-4 h-4 text-brand-neon" />
                <span className="text-text-primary font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustIndicators
