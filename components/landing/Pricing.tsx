'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small gaming operators',
      features: [
        'Up to 100 transactions/month',
        'Basic support',
        'Standard processing'
      ],
      popular: false
    },
    {
      name: 'Growth',
      price: '$299',
      period: '/month',
      description: 'Ideal for growing platforms',
      features: [
        'Up to 10,000 transactions/month',
        'Priority support',
        'Advanced analytics',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$999',
      period: '/month',
      description: 'For large-scale operations',
      features: [
        'Unlimited transactions',
        'Dedicated support',
        'Custom integrations',
        'White-label solution'
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="section bg-base-light">
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
            Choose the Plan That Suits You Best
          </h2>
          <p className="text-body-lg text-gray-500 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Scale as you grow.
          </p>
        </motion.div>

        {/* 3 cards (Starter / Growth / Enterprise) */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: 'cubic-bezier(.22,.61,.36,1)'
              }}
              viewport={{ once: true, amount: 0.3 }}
              className={`relative card p-8 ${
                plan.popular ? 'ring-2 ring-brand-neon shadow-fintech-hover' : ''
              }`}
            >
              {/* Card central destacada: borde/halo neon muy sutil */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-neon text-base-dark px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-brand-neon rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-base-dark font-bold text-lg">
                    {plan.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-h3 font-medium text-text-main mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-text-main">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + featureIndex * 0.1,
                      ease: 'cubic-bezier(.22,.61,.36,1)'
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-5 h-5 text-brand-neon flex-shrink-0" />
                    <span className="text-body text-text-main">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-brand-neon text-base-dark hover:shadow-fintech-hover'
                    : 'bg-text-main text-base-light hover:bg-gray-700'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
