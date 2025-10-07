'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating Crypto Icons */}
      <motion.div
        className="absolute top-20 left-10 text-white/20 text-4xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        ₿
      </motion.div>
      <motion.div
        className="absolute top-32 right-20 text-white/20 text-3xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        Ξ
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-white/20 text-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        T
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Coinfixi — Global Crypto Cashier for{' '}
            <span className="text-yellow-300">Sportbooks</span> &{' '}
            <span className="text-yellow-300">Casinos</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Integrate instant crypto deposits and withdrawals with one-time addresses, 
            ultra-low fees and enterprise dashboards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/register"
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <span>Get Started — Create Account</span>
              <ArrowRight size={20} />
            </Link>
            
            <button className="btn-outline text-lg px-8 py-4 flex items-center space-x-2 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-500">
              <Play size={20} />
              <span>Request Demo</span>
            </button>
          </div>

          {/* Stats Chips */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white/90 text-sm font-medium">
              Trusted by Sportbooks
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white/90 text-sm font-medium">
              2% fee (standard)
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white/90 text-sm font-medium">
              One-time QR / address per deposit
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Graphics */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-20">
        <motion.div
          className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white text-4xl font-bold">$</span>
        </motion.div>
        <motion.div
          className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <span className="text-white text-4xl font-bold">₿</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
