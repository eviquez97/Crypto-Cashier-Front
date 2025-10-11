'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Users, Lock, Award } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-base-light via-base-light to-accent-medium/5 overflow-hidden">
      {/* Premium Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-brand-neon/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-accent-bright/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Premium grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18,178,193,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18,178,193,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <div className="container hero-section pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
          {/* Left: Premium Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            className="space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-neon/10 to-accent-bright/10 border border-brand-neon/20 rounded-full px-4 py-2"
            >
              <Award className="w-4 h-4 text-brand-neon" />
              <span className="text-sm font-semibold text-text-primary">Enterprise-Grade Infrastructure</span>
            </motion.div>

            {/* Premium H1 with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-display font-bold leading-[0.9]"
            >
              <span className="bg-gradient-to-r from-text-primary via-accent-medium to-brand-neon bg-clip-text text-transparent">
                Premium Crypto
              </span>
              <br />
              <span className="text-text-primary">
                Payments
              </span>
              <br />
              <span className="text-4xl lg:text-5xl text-text-secondary font-medium">
                for the Digital Era
              </span>
            </motion.h1>

            {/* Enhanced subcopy with benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              <p className="text-xl text-text-secondary leading-relaxed">
                The world's most trusted crypto payment infrastructure for gaming operators, 
                fintech companies, and enterprise businesses.
              </p>
              
              {/* Key benefits with icons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 bg-base-light/50 rounded-xl border border-accent-medium/20"
                >
                  <Shield className="w-5 h-5 text-brand-neon" />
                  <span className="text-sm font-medium text-text-primary">Bank-Grade Security</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 bg-base-light/50 rounded-xl border border-accent-medium/20"
                >
                  <Zap className="w-5 h-5 text-brand-neon" />
                  <span className="text-sm font-medium text-text-primary">Sub-Second Processing</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 bg-base-light/50 rounded-xl border border-accent-medium/20"
                >
                  <Globe className="w-5 h-5 text-brand-neon" />
                  <span className="text-sm font-medium text-text-primary">Global Coverage</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 bg-base-light/50 rounded-xl border border-accent-medium/20"
                >
                  <TrendingUp className="w-5 h-5 text-brand-neon" />
                  <span className="text-sm font-medium text-text-primary">99.99% Uptime</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Premium CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              {/* Primary CTA with premium styling */}
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(18,178,193,0.3)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group bg-gradient-to-r from-brand-neon to-accent-bright text-base-light px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-bright to-brand-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              {/* Secondary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  borderColor: "rgba(18,178,193,0.8)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-accent-medium text-accent-medium rounded-2xl font-bold text-lg hover:bg-accent-medium hover:text-base-light transition-all duration-300"
              >
                Request Enterprise Demo
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center space-x-6 pt-6"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-brand-neon" />
                <span className="text-sm font-medium text-text-primary">500+ Active Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-brand-neon" />
                <span className="text-sm font-medium text-text-primary">SOC 2 Compliant</span>
              </div>
            </motion.div>

            {/* Social proof: logos de partners reales */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="pt-8"
            >
              <p className="text-text-muted text-sm mb-4 font-medium">Trusted by leading gaming operators</p>
              <div className="flex items-center justify-center space-x-6 opacity-60">
                {/* Logos de partners - más realistas */}
                <div className="text-text-muted text-sm font-semibold">Bet365</div>
                <div className="text-text-muted text-sm font-semibold">Pinnacle</div>
                <div className="text-text-muted text-sm font-semibold">Betway</div>
                <div className="text-text-muted text-sm font-semibold">1xBet</div>
                <div className="text-text-muted text-sm font-semibold">DraftKings</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Premium 3D Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
            style={{ y, opacity }}
          >
            {/* Main Dashboard Card */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotateX: [0, 2, 0],
                rotateY: [0, 1, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative z-20 w-96 mx-auto"
            >
              <div className="bg-gradient-to-br from-base-mid via-base-mid to-base-dark rounded-3xl p-8 shadow-2xl border border-accent-medium/30 backdrop-blur-sm">
                {/* Premium Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-neon to-accent-bright rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-base-light font-bold text-lg">CF</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-neon rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-base-light font-bold text-lg">Coinfixi Dashboard</h3>
                      <p className="text-base-light/70 text-sm">Live Operations Center</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
                    <span className="text-brand-neon text-xs font-medium">Live</span>
                  </div>
                </div>
                
                {/* Real-time Metrics */}
                <div className="space-y-6">
                  {/* Main KPI */}
                  <div className="text-center">
                    <p className="text-base-light/70 text-sm mb-2">Today's Volume</p>
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl font-bold text-brand-neon"
                    >
                      $284,590
                    </motion.div>
                    <p className="text-brand-neon text-sm font-medium mt-1">↗ +12.4% vs yesterday</p>
                  </div>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-base-dark/50 rounded-2xl p-4 border border-accent-medium/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-base-light/70 text-xs">Deposits</p>
                        <TrendingUp className="w-4 h-4 text-brand-neon" />
                      </div>
                      <p className="text-2xl font-bold text-base-light">142</p>
                      <p className="text-brand-neon text-xs">↗ 12%</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-base-dark/50 rounded-2xl p-4 border border-accent-medium/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-base-light/70 text-xs">Withdrawals</p>
                        <Zap className="w-4 h-4 text-accent-bright" />
                      </div>
                      <p className="text-2xl font-bold text-base-light">89</p>
                      <p className="text-accent-bright text-xs">→ Stable</p>
                    </motion.div>
                  </div>
                  
                  {/* Live Activity Feed */}
                  <div className="bg-base-dark/30 rounded-2xl p-4 border border-brand-neon/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
                      <p className="text-brand-neon text-sm font-medium">Live Activity</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base-light text-sm">New deposit confirmed</span>
                        <span className="text-brand-neon text-xs font-medium">1,250 USDT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base-light text-sm">Withdrawal processed</span>
                        <span className="text-accent-bright text-xs font-medium">0.5 BTC</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-brand-neon/20 to-accent-bright/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1.1, 1, 1.1]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: 'linear',
                delay: 2
              }}
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-accent-bright/20 to-brand-neon/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
