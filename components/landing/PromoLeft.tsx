'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react'

const PromoLeft = () => {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Banking-grade encryption and compliance'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second transaction processing'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Support for 50+ cryptocurrencies'
    }
  ]

  return (
    <section className="section bg-base-light">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Texto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* H2: "Coinfixi for the Future" */}
            <h2 className="text-h2-mobile lg:text-h2 font-display font-semibold text-text-main">
              Coinfixi for the Future
            </h2>
            
            {/* 3 bullets con ícono */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 + index * 0.1,
                    ease: 'cubic-bezier(.22,.61,.36,1)'
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-neon rounded-xl flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-base-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-main mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-body text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botones: "View API Docs" (outline) + "Learn More" (ghost) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center justify-center group"
              >
                View API Docs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Mockup: stack de cards con sombra y leve rotación */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotateY: [0, 2, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative"
            >
              {/* Card principal */}
              <div className="bg-white rounded-2xl p-6 shadow-fintech relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-neon rounded-full flex items-center justify-center">
                        <span className="text-base-dark font-bold text-sm">CF</span>
                      </div>
                      <span className="font-semibold text-text-main">API Dashboard</span>
                    </div>
                    <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-brand-neon rounded w-2/3"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-300 rounded-lg h-16"></div>
                    <div className="bg-gray-300 rounded-lg h-16"></div>
                  </div>
                </div>
              </div>

              {/* Card secundaria con rotación */}
              <motion.div
                animate={{ 
                  y: [0, -4, 0],
                  rotateY: [0, -1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute -bottom-4 -right-4 bg-base-mid rounded-2xl p-4 shadow-fintech w-32 h-20 opacity-80"
              >
                <div className="space-y-2">
                  <div className="h-2 bg-white/20 rounded w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded w-1/2"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Elementos decorativos */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-brand-neon/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PromoLeft
