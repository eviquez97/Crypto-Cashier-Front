'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const BigCTA = () => {
  return (
    <section className="py-20 bg-accent-neon">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-primary-dark mb-6"
            >
              Your Future in Payments Starts Here
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-primary-text/80 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Join thousands of gaming operators who trust Coinfixi for their crypto payment infrastructure.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-dark text-white rounded-xl font-semibold flex items-center justify-center group hover:bg-primary-text transition-colors duration-200"
              >
                Open an Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary-dark text-primary-dark rounded-xl font-semibold flex items-center justify-center group hover:bg-primary-dark hover:text-white transition-all duration-200"
              >
                <Play className="mr-2 w-5 h-5" />
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              {/* Laptop Frame */}
              <div className="bg-gray-medium rounded-2xl p-4 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden">
                  {/* Screen */}
                  <div className="bg-primary-dark p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent-neon rounded-full flex items-center justify-center">
                          <span className="text-primary-dark font-bold text-sm">CF</span>
                        </div>
                        <span className="text-white font-semibold">Coinfixi Dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent-neon rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-gray-medium rounded-full" />
                        <div className="w-2 h-2 bg-gray-medium rounded-full" />
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="space-y-4">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-medium">Volume</p>
                          <p className="text-lg font-bold text-white">$2.4M</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-medium">Transactions</p>
                          <p className="text-lg font-bold text-white">1,234</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-medium">Success Rate</p>
                          <p className="text-lg font-bold text-accent-neon">99.9%</p>
                        </div>
                      </div>

                      {/* Chart Placeholder */}
                      <div className="bg-white/10 rounded-lg p-4 h-20 flex items-center justify-center">
                        <div className="flex items-end space-x-1">
                          {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [`${height}%`, `${height + 10}%`, `${height}%`] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                              className="w-3 bg-accent-neon rounded-t"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Recent Transactions */}
                      <div className="space-y-2">
                        <div className="bg-accent-neon/10 rounded-lg p-2">
                          <p className="text-xs text-accent-neon">• New deposit confirmed</p>
                          <p className="text-sm text-white">2,500 USDT from User #1234</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2">
                          <p className="text-xs text-gray-medium">• Withdrawal processed</p>
                          <p className="text-sm text-white">1,000 BTC to Wallet ABC</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-primary-dark/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-8 w-12 h-12 bg-white/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BigCTA
