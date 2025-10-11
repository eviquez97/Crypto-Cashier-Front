'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero overflow-hidden">
      {/* Shape radial decorativo en verde según especificación */}
      <div 
        className="absolute inset-0 bg-hero-radial"
        style={{
          background: 'radial-gradient(600px circle at 70% 20%, rgba(182,255,0,.12), transparent 60%)'
        }}
      />
      
      <div className="container hero-section pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Texto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            className="space-y-6"
          >
            {/* H1: "Premium Crypto Payments for the Digital Era" */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="text-h1-mobile lg:text-h1 font-display font-semibold text-white leading-tight"
            >
              Premium Crypto Payments for the Digital Era
            </motion.h1>

            {/* Subcopy 2 líneas (beneficio, no técnico) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="text-body-lg text-gray-500 leading-relaxed"
              style={{ marginTop: '20px' }}
            >
              Process crypto deposits and withdrawals in seconds with enterprise-grade security and transparent pricing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="flex flex-col sm:flex-row gap-4"
              style={{ marginTop: '24px' }}
            >
              {/* Primario: "Start Now" (filled neon) */}
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center group"
              >
                Start Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              {/* Secundario: "Request Enterprise Demo" (outline) */}
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Request Enterprise Demo
              </motion.button>
            </motion.div>

            {/* Social proof: fila de 5 logos en gris */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="pt-8"
            >
              <p className="text-gray-500 text-sm mb-4">Trusted by leading gaming operators</p>
              <div className="flex items-center space-x-8 opacity-60">
                {/* 5 logos placeholder en gris */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-20 h-8 bg-gray-500 rounded" />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            className="relative"
          >
            {/* Mockup: tarjeta oscura con métricas y un toast "New deposit confirmed" (verde) */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative z-10 w-80 mx-auto"
            >
              <div className="bg-base-mid rounded-2xl p-6 shadow-fintech border border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-neon rounded-full flex items-center justify-center">
                      <span className="text-base-dark font-bold text-sm">CF</span>
                    </div>
                    <span className="text-white font-semibold">Coinfixi Dashboard</span>
                  </div>
                  <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
                </div>
                
                {/* Métricas */}
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Today's Activity</p>
                    <p className="text-3xl font-bold text-white">$284,590</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Deposits</p>
                      <p className="text-lg font-semibold text-white">142</p>
                      <p className="text-xs text-brand-neon">↗ 12%</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Withdrawals</p>
                      <p className="text-lg font-semibold text-white">89</p>
                      <p className="text-xs text-gray-500">→ Stable</p>
                    </div>
                  </div>
                  
                  {/* Toast "New deposit confirmed" (verde) */}
                  <div className="bg-brand-neon/10 border border-brand-neon/30 rounded-xl p-3">
                    <p className="text-brand-neon text-sm font-medium">• New deposit confirmed</p>
                    <p className="text-white text-sm">1,250 USDT • TRON</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Elementos flotantes decorativos */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-brand-neon/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-8 w-12 h-12 bg-brand-purple/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
