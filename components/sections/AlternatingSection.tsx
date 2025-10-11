'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface AlternatingSectionProps {
  title: string
  subtitle: string
  description: string
  primaryButton: string
  secondaryButton: string
  imageSide: 'left' | 'right'
  features?: string[]
}

const AlternatingSection = ({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  imageSide,
  features = []
}: AlternatingSectionProps) => {
  return (
    <section className="py-20 bg-secondary-bg">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${
          imageSide === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: imageSide === 'right' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`space-y-8 ${imageSide === 'left' ? 'lg:col-start-2' : ''}`}
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-accent-purple font-semibold text-sm uppercase tracking-wide mb-4"
              >
                {subtitle}
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-6"
              >
                {title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-medium text-lg leading-relaxed mb-8"
              >
                {description}
              </motion.p>
            </div>

            {/* Features List */}
            {features.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-3 mb-8"
              >
                {features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-accent-neon rounded-full" />
                    <span className="text-primary-text">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-accent-neon text-primary-dark rounded-xl font-semibold flex items-center justify-center group"
              >
                {primaryButton}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-primary-text text-primary-text rounded-xl font-semibold flex items-center justify-center group hover:bg-primary-text hover:text-white transition-all duration-200"
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                {secondaryButton}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: imageSide === 'left' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${imageSide === 'left' ? 'lg:col-start-1' : ''}`}
          >
            <div className="relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white rounded-2xl shadow-fintech p-6"
              >
                <div className="bg-primary-dark rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-neon rounded-full flex items-center justify-center">
                        <span className="text-primary-dark font-bold text-sm">CF</span>
                      </div>
                      <span className="font-semibold">Coinfixi</span>
                    </div>
                    <div className="w-2 h-2 bg-accent-neon rounded-full animate-pulse" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-medium text-sm">Available Balance</p>
                      <p className="text-2xl font-bold">$1,234,567</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-medium">Today</p>
                        <p className="text-lg font-semibold">$45,678</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-medium">This Month</p>
                        <p className="text-lg font-semibold">$234,567</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="bg-accent-neon/10 rounded-lg p-3">
                        <p className="text-xs text-accent-neon">• Payment processed</p>
                        <p className="text-sm text-white">2,500 USDT → User #1234</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-medium">• Deposit confirmed</p>
                        <p className="text-sm text-white">1,000 BTC → Wallet ABC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-accent-neon/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent-purple/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AlternatingSection
