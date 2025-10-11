'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const CompareTable = () => {
  const comparisonFeatures = [
    { name: 'Transactions per month', plans: ['100', '10,000', 'Unlimited'] },
    { name: 'Processing fees', plans: ['2.5%', '2.0%', '1.5%'] },
    { name: 'Support', plans: ['Email', 'Priority', 'Dedicated'] },
    { name: 'Analytics', plans: ['Basic', 'Advanced', 'Custom'] },
    { name: 'Branding', plans: ['Standard', 'Custom', 'White-label'] },
    { name: 'Integrations', plans: ['Standard', 'API', 'Custom'] },
    { name: 'Webhooks', plans: ['Basic', 'Real-time', 'Custom'] },
    { name: 'Multi-tenant', plans: ['❌', '✅', '✅'] },
    { name: 'Real-time confirmation', plans: ['❌', '✅', '✅'] },
    { name: 'Double-entry ledger', plans: ['❌', '✅', '✅'] },
    { name: 'Reporting', plans: ['Basic', 'Advanced', 'Custom'] },
    { name: 'SLA', plans: ['99.9%', '99.95%', '99.99%'] }
  ]

  const planNames = ['Starter', 'Growth', 'Enterprise']

  return (
    <section className="pb-16 bg-base-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-2xl shadow-fintech overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-300">
                  <th className="text-left p-6 font-display font-semibold text-text-main">Features</th>
                  {planNames.map((plan, index) => (
                    <th 
                      key={plan}
                      className={`text-center p-6 font-display font-semibold text-text-main ${
                        index === 1 ? 'bg-brand-neon/5' : ''
                      }`}
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      ease: 'cubic-bezier(.22,.61,.36,1)'
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="border-b border-gray-300 last:border-b-0 hover:bg-gray-300/20 transition-colors duration-200"
                  >
                    <td className="p-6 font-medium text-text-main">{feature.name}</td>
                    {feature.plans.map((value, planIndex) => (
                      <td
                        key={planIndex}
                        className={`p-6 text-center ${
                          planIndex === 1 ? 'bg-brand-neon/5 font-semibold' : 'text-gray-500'
                        }`}
                      >
                        {value === '✅' ? (
                          <Check className="w-5 h-5 text-brand-neon mx-auto" />
                        ) : value === '❌' ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          value
                        )}
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

export default CompareTable
