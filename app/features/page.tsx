'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Globe, 
  Building, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  Users,
  Award,
  Clock,
  Database,
  Settings,
  BarChart3,
  CreditCard
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const FeaturesPage = () => {
  const { t } = useTranslation()

  const coreFeatures = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, multi-sig wallets, and SOC 2 Type II compliance. Your funds are always protected with military-grade security measures.',
      benefits: ['256-bit AES Encryption', 'Multi-signature Wallets', 'SOC 2 Type II Certified', 'Real-time Fraud Detection']
    },
    {
      icon: Zap,
      title: 'Instant Settlements',
      description: 'Sub-second transaction processing with automated reconciliation. No delays, no manual intervention required for your payment flow.',
      benefits: ['Sub-second Processing', 'Automated Reconciliation', 'Zero Manual Intervention', '99.9% Uptime SLA']
    },
    {
      icon: Globe,
      title: 'Multi-chain Support',
      description: 'BTC, ETH, TRON, BSC, Polygon, Lightning. Real addresses that actually receive funds across all major cryptocurrency networks.',
      benefits: ['50+ Cryptocurrencies', 'All Major Chains', 'Real Addresses', 'Global Coverage']
    },
    {
      icon: Building,
      title: 'White-label Infrastructure',
      description: 'Fully customizable payment experience that matches your brand. Complete control over the user journey and interface design.',
      benefits: ['Custom Branding', 'Complete UI Control', 'Flexible Integration', 'Brand Consistency']
    }
  ]

  const additionalFeatures = [
    {
      icon: Users,
      title: '24/7 Expert Support',
      description: 'Dedicated account manager and technical support team available around the clock for your operations.',
      category: 'Support'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'PCI DSS compliant with banking-grade security standards and regulatory compliance.',
      category: 'Compliance'
    },
    {
      icon: Clock,
      title: 'Real-time Monitoring',
      description: 'Live transaction monitoring with instant alerts and comprehensive reporting dashboard.',
      category: 'Monitoring'
    },
    {
      icon: Database,
      title: 'Advanced Analytics',
      description: 'Comprehensive transaction analytics with customizable reports and business insights.',
      category: 'Analytics'
    },
    {
      icon: Settings,
      title: 'API Integration',
      description: 'RESTful API with comprehensive documentation and SDKs for all major programming languages.',
      category: 'Integration'
    },
    {
      icon: BarChart3,
      title: 'Risk Management',
      description: 'Advanced risk controls with customizable rules and automated fraud prevention.',
      category: 'Security'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Support for multiple payment methods including crypto, fiat, and hybrid solutions.',
      category: 'Payments'
    },
    {
      icon: Lock,
      title: 'Compliance Tools',
      description: 'Built-in KYC/AML tools with automated compliance checks and reporting.',
      category: 'Compliance'
    }
  ]

  const categories = ['All', 'Security', 'Support', 'Compliance', 'Monitoring', 'Analytics', 'Integration', 'Payments']

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2 mb-8">
              <Award className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-semibold text-brand-light">Enterprise Features</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-light mb-6">
              Everything You Need for <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">Crypto Payments</span>
            </h1>
            
            <p className="text-xl text-brand-light/70 max-w-3xl mx-auto mb-12">
              Built for gaming operators, fintech companies, and enterprise businesses. 
              Discover the comprehensive features that make Coinfixi the most trusted crypto payment infrastructure.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Core Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
            Core Features
          </h2>
          <p className="text-xl text-brand-light/70 max-w-2xl mx-auto">
            The essential features that power your crypto payment infrastructure
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-3xl p-8 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-brand-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-brand-light mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-brand-light/70 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-brand-primary flex-shrink-0" />
                        <span className="text-sm text-brand-light/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-brand-dark/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
              Complete Feature Set
            </h2>
            <p className="text-xl text-brand-light/70 max-w-2xl mx-auto">
              Everything you need to build, manage, and scale your crypto payment infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-brand-teal/5 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/10 hover:border-brand-primary/30 hover:bg-brand-teal/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-primary/30 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-brand-primary" />
                </div>
                
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full mb-3">
                    {feature.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-brand-light mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-brand-light/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-primary/10 to-brand-teal/10 backdrop-blur-xl rounded-3xl p-12 border border-brand-primary/20 text-center"
        >
          <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
            Ready to Experience These Features?
          </h2>
          
          <p className="text-xl text-brand-light/70 mb-8 max-w-2xl mx-auto">
            See how Coinfixi's comprehensive feature set can transform your payment infrastructure. 
            Request a personalized demo today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-primary text-brand-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-primary/90 transition-all duration-200 flex items-center justify-center group"
              onClick={() => window.open('/demo-request', '_blank')}
            >
              Request Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-brand-primary text-brand-light rounded-2xl font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all duration-200"
              onClick={() => window.open('/docs', '_blank')}
            >
              View Documentation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FeaturesPage
