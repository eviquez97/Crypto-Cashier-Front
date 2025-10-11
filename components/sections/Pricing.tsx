'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small gaming operators',
      features: ['Up to 100 transactions/month', 'Basic support', 'Standard processing'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'Ideal for growing platforms',
      features: ['Up to 10,000 transactions/month', 'Priority support', 'Advanced analytics', 'Custom branding'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$999',
      period: '/month',
      description: 'For large-scale operations',
      features: ['Unlimited transactions', 'Dedicated support', 'Custom integrations', 'White-label solution'],
      popular: false
    }
  ]

  const comparisonFeatures = [
    { name: 'Transactions per month', plans: ['100', '10,000', 'Unlimited'] },
    { name: 'Processing fees', plans: ['2.5%', '2.0%', '1.5%'] },
    { name: 'Support', plans: ['Email', 'Priority', 'Dedicated'] },
    { name: 'Analytics', plans: ['Basic', 'Advanced', 'Custom'] },
    { name: 'Branding', plans: ['Standard', 'Custom', 'White-label'] },
    { name: 'Integrations', plans: ['Standard', 'API', 'Custom'] },
    { name: 'Compliance', plans: ['Basic', 'Advanced', 'Enterprise'] },
    { name: 'SLA', plans: ['99.9%', '99.95%', '99.99%'] }
  ]

  return (
    <section id="pricing" className="py-20 bg-secondary-bg">
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
            Choose the Plan That Suits You Best
          </h2>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Scale as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 shadow-fintech ${
                plan.popular ? 'ring-2 ring-accent-neon shadow-neon-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent-neon text-primary-dark px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-accent-neon rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-lg">
                    {plan.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-text mb-2">{plan.name}</h3>
                <p className="text-gray-medium mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-text">{plan.price}</span>
                  {plan.period && <span className="text-gray-medium">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + featureIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-5 h-5 text-accent-neon flex-shrink-0" />
                    <span className="text-primary-text">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-accent-neon text-primary-dark hover:shadow-neon-glow'
                    : 'bg-primary-dark text-white hover:bg-primary-text'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-fintech overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-light">
                  <th className="text-left p-6 font-semibold text-primary-text">Features</th>
                  <th className="text-center p-6 font-semibold text-primary-text">Starter</th>
                  <th className="text-center p-6 font-semibold text-primary-text">Professional</th>
                  <th className="text-center p-6 font-semibold text-primary-text">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-light last:border-b-0"
                  >
                    <td className="p-6 font-medium text-primary-text">{feature.name}</td>
                    {feature.plans.map((value, planIndex) => (
                      <td
                        key={planIndex}
                        className={`p-6 text-center ${
                          planIndex === 1 ? 'bg-accent-neon/5 font-semibold' : 'text-gray-medium'
                        }`}
                      >
                        {value}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
