'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-secondary-bg overflow-hidden">
      {/* Background Gradient Shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-neon/10 via-accent-purple/5 to-transparent" />
      
      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Eyebrow Chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gray-light rounded-full"
            >
              <div className="w-2 h-2 bg-accent-neon rounded-full mr-2" />
              <span className="text-primary-text text-sm font-medium">
                Trusted by Gaming Operators Worldwide
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              Premium Crypto Payments for the{' '}
              <span className="text-accent-neon">Digital Era</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-medium leading-relaxed max-w-lg"
            >
              Experience seamless, secure, and real-time crypto processing for your gaming platform with banking-grade security.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(182, 255, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent-neon text-primary-dark rounded-xl font-semibold flex items-center justify-center group"
              >
                Open Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary-text text-primary-text rounded-xl font-semibold flex items-center justify-center group hover:bg-primary-text hover:text-white transition-all duration-200"
              >
                <Play className="mr-2 w-5 h-5" />
                Learn More
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-8"
            >
              <p className="text-sm text-gray-medium mb-4">Trusted by leading businesses</p>
              <div className="flex items-center space-x-8 opacity-60">
                {/* Placeholder logos */}
                <div className="w-20 h-8 bg-gray-light rounded" />
                <div className="w-20 h-8 bg-gray-light rounded" />
                <div className="w-20 h-8 bg-gray-light rounded" />
                <div className="w-20 h-8 bg-gray-light rounded" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Phone Mockup */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-64 mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-fintech p-4">
                <div className="bg-primary-dark rounded-2xl p-6 text-white">
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
                      <p className="text-gray-medium text-sm">Total Balance</p>
                      <p className="text-2xl font-bold">$284,590</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-gray-medium">Deposits</p>
                        <p className="text-lg font-semibold">142</p>
                        <p className="text-xs text-accent-neon">↗ 12%</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-gray-medium">Withdrawals</p>
                        <p className="text-lg font-semibold">89</p>
                        <p className="text-xs text-gray-medium">→ Stable</p>
                      </div>
                    </div>
                    
                    <div className="bg-accent-neon/10 rounded-xl p-3">
                      <p className="text-xs text-accent-neon">• New deposit confirmed</p>
                      <p className="text-sm text-white">1,250 USDT • TRON</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary Phone Mockup */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-4 w-48 opacity-60"
            >
              <div className="bg-white rounded-2xl shadow-fintech p-3">
                <div className="bg-gradient-to-br from-accent-purple to-accent-neon rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-sm">Quick Stats</span>
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Volume</span>
                      <span className="font-semibold">$2.4M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-semibold">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-accent-neon/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-8 w-12 h-12 bg-accent-purple/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
