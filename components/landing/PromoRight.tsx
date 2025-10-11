'use client'

import { motion } from 'framer-motion'
import { Check, Shield, Zap, ArrowRight } from 'lucide-react'

const PromoRight = () => {
  const features = [
    'Custom Branding',
    'Risk Controls', 
    'Real-time Webhooks'
  ]

  // Button handlers
  const handleGetStarted = () => {
    // Redirect to dashboard
    window.open('/dashboard', '_blank')
  }

  const handleViewDemo = () => {
    // Redirect to demo booking
    window.open('mailto:sales@coinfixi.com?subject=Demo Request&body=Hi, I would like to see a demo of Coinfixi.', '_blank')
  }

  return (
    <section className="section bg-brand-dark">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative lg:order-1"
          >
            {/* Mockup: phone app UI (placeholder dark) */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotateX: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative z-10 w-64 mx-auto"
            >
              <div className="bg-brand-teal/20 rounded-3xl p-4 shadow-fintech border border-brand-primary/30">
                {/* Phone header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-brand-dark font-bold text-xs">CF</span>
                    </div>
                    <span className="text-brand-light text-sm font-semibold">Coinfixi</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                </div>
                
                {/* Phone content */}
                <div className="space-y-3">
                  <div>
                    <p className="text-brand-light/70 text-xs">Available Balance</p>
                    <p className="text-xl font-bold text-brand-light">$1,234,567</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-brand-dark/50 rounded-lg p-2 border border-brand-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-brand-light/70">BTC</span>
                        <span className="text-xs text-brand-light font-semibold">0.0234</span>
                      </div>
                    </div>
                    <div className="bg-brand-dark/50 rounded-lg p-2 border border-brand-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-brand-light/70">ETH</span>
                        <span className="text-xs text-brand-light font-semibold">12.45</span>
                      </div>
                    </div>
                    <div className="bg-brand-dark/50 rounded-lg p-2 border border-brand-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-brand-light/70">USDT</span>
                        <span className="text-xs text-brand-light font-semibold">5,678</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-brand-primary/10 rounded-lg p-2 border border-brand-primary/30">
                    <p className="text-brand-primary text-xs">• Payment processed</p>
                    <p className="text-brand-light text-xs">2,500 USDT → User #1234</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Elementos decorativos */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -left-4 w-12 h-12 bg-brand-primary/10 rounded-full blur-xl"
            />
          </motion.div>

          {/* Right: Texto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8 lg:order-2"
          >
            {/* H2: "White-Label Checkout" */}
            <h2 className="text-h2-mobile lg:text-h2 font-display font-semibold text-brand-light">
              White-Label Checkout
            </h2>
            
            <p className="text-body-lg text-brand-light/70 leading-relaxed">
              Fully customizable payment experience that matches your brand. Integrate seamlessly with your existing systems while maintaining complete control over the user experience.
            </p>
            
            {/* Bullets: Custom Branding · Risk Controls · Real-time Webhooks */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    ease: 'cubic-bezier(.22,.61,.36,1)'
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-brand-primary rounded-full" />
                  <span className="text-body text-brand-light font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Botones */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-brand-dark px-6 py-3 rounded-xl font-semibold hover:bg-brand-primary/90 transition-all duration-300 flex items-center justify-center group cursor-pointer"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={handleViewDemo}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-brand-primary text-brand-light rounded-xl font-semibold hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 cursor-pointer"
              >
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PromoRight
