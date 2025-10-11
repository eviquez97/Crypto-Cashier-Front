'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Users, Lock, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const { t } = useTranslation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // CTA Handlers
  const handleStartFreeTrial = () => {
    // Redirect to signup/dashboard
    window.open('/dashboard', '_blank')
  }

  const handleRequestDemo = () => {
    // Redirect to contact/demo booking
    window.open('mailto:sales@coinfixi.com?subject=Enterprise Demo Request&body=Hi, I would like to schedule an enterprise demo for Coinfixi.', '_blank')
  }

  return (
    <section className="relative min-h-screen bg-brand-dark overflow-hidden">
      {/* DRAMATIC BACKGROUND - Dark Mode Premium */}
      <div className="absolute inset-0">
        {/* Massive green glow effect */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-brand-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary glow */}
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(22,249,138,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(22,249,138,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
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
            {/* DRAMATIC Badge with Green Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-brand-primary/20 border border-brand-primary/50 rounded-full px-4 py-2 shadow-lg shadow-brand-primary/25"
            >
              <Award className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-semibold text-brand-light">{t('hero.badge')}</span>
            </motion.div>

            {/* DRAMATIC H1 with Massive Impact */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl lg:text-8xl font-display font-bold leading-[0.8]"
            >
              <span className="bg-gradient-to-r from-brand-primary via-brand-primary to-brand-light bg-clip-text text-transparent drop-shadow-lg">
                {t('hero.title').split(' ').slice(0, 2).join(' ')}
              </span>
              <br />
              <span className="text-brand-light drop-shadow-lg">
                {t('hero.title').split(' ').slice(2, 4).join(' ')}
              </span>
              <br />
              <span className="text-5xl lg:text-6xl text-info-500 font-medium">
                {t('hero.title').split(' ').slice(4).join(' ')}
              </span>
            </motion.h1>

            {/* Enhanced subcopy with benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              <p className="text-xl text-brand-light/80 leading-relaxed">
                The world's most trusted crypto payment infrastructure for gaming operators, 
                fintech companies, and enterprise businesses.
              </p>
              
              {/* DRAMATIC benefits with Dark Mode */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-3 p-4 bg-info-500/10 rounded-xl border border-brand-primary/30 backdrop-blur-sm hover:bg-brand-primary/10 transition-all duration-300"
                >
                  <Shield className="w-6 h-6 text-brand-primary" />
                  <span className="text-sm font-medium text-brand-light">Bank-Grade Security</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-3 p-4 bg-info-500/10 rounded-xl border border-brand-primary/30 backdrop-blur-sm hover:bg-brand-primary/10 transition-all duration-300"
                >
                  <Zap className="w-6 h-6 text-brand-primary" />
                  <span className="text-sm font-medium text-brand-light">Sub-Second Processing</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-3 p-4 bg-info-500/10 rounded-xl border border-brand-primary/30 backdrop-blur-sm hover:bg-brand-primary/10 transition-all duration-300"
                >
                  <Globe className="w-6 h-6 text-brand-primary" />
                  <span className="text-sm font-medium text-brand-light">Global Coverage</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-3 p-4 bg-info-500/10 rounded-xl border border-brand-primary/30 backdrop-blur-sm hover:bg-brand-primary/10 transition-all duration-300"
                >
                  <TrendingUp className="w-6 h-6 text-brand-primary" />
                  <span className="text-sm font-medium text-brand-light">99.99% Uptime</span>
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
              {/* MEGA IMPACT CTA with Green Glow */}
              <motion.button
                onClick={handleStartFreeTrial}
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: "0 30px 60px rgba(22,249,138,0.5)",
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-brand-primary text-brand-dark px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-brand-primary/50 overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-brand-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              {/* DRAMATIC Secondary CTA */}
              <motion.button
                onClick={handleRequestDemo}
                whileHover={{ 
                  scale: 1.08, 
                  y: -3,
                  borderColor: "#16F98A",
                  boxShadow: "0 20px 40px rgba(22,249,138,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-brand-primary text-brand-light rounded-2xl font-bold text-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-lg cursor-pointer"
              >
                {t('hero.ctaSecondary')}
              </motion.button>
            </motion.div>

            {/* Trust indicators with strategic colors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center space-x-6 pt-6"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-brand-light">500+ {t('hero.trust.clients')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-brand-light">{t('hero.trust.compliant')}</span>
              </div>
            </motion.div>

            {/* Social proof: logos de partners reales */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="pt-8"
            >
              <p className="text-brand-light/70 text-sm mb-4 font-medium">{t('hero.trustedBy')}</p>
              <div className="flex items-center justify-center space-x-6 opacity-60">
                {/* Logos de partners - nombres genéricos para evitar problemas legales */}
                <div className="text-brand-light/70 text-sm font-semibold">GamingCorp</div>
                <div className="text-brand-light/70 text-sm font-semibold">BetTech</div>
                <div className="text-brand-light/70 text-sm font-semibold">CryptoBet</div>
                <div className="text-brand-light/70 text-sm font-semibold">GameFlow</div>
                <div className="text-brand-light/70 text-sm font-semibold">BetSecure</div>
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
              <div className="bg-gradient-to-br from-surfaceDark via-surfaceDark to-surface rounded-3xl p-8 shadow-2xl border border-brand-primary/20 backdrop-blur-sm">
                {/* Premium Header with Strategic Colors */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-brand-light font-bold text-lg">CF</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-brand-light font-bold text-lg">Coinfixi Dashboard</h3>
                      <p className="text-brand-light/70 text-sm">Live Operations Center</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                    <span className="text-brand-primary text-xs font-medium">Live</span>
                  </div>
                </div>
                
                {/* Real-time Metrics */}
                <div className="space-y-6">
                  {/* Main KPI with Strategic Colors */}
                  <div className="text-center">
                    <p className="text-brand-light/70 text-sm mb-2">Today's Volume</p>
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl font-bold text-brand-primary"
                    >
                      $284,590
                    </motion.div>
                    <p className="text-brand-primary text-sm font-medium mt-1">↗ +12.4% vs yesterday</p>
                  </div>
                  
                  {/* Metrics Grid with Strategic Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-surfaceDark/50 rounded-2xl p-4 border border-brand-primary/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-brand-light/70 text-xs">Deposits</p>
                        <TrendingUp className="w-4 h-4 text-brand-primary" />
                      </div>
                      <p className="text-2xl font-bold text-brand-light">142</p>
                      <p className="text-brand-primary text-xs">↗ 12%</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-surfaceDark/50 rounded-2xl p-4 border border-brand-primary/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-brand-light/70 text-xs">Withdrawals</p>
                        <Zap className="w-4 h-4 text-info-500" />
                      </div>
                      <p className="text-2xl font-bold text-brand-light">89</p>
                      <p className="text-info-500 text-xs">→ Stable</p>
                    </motion.div>
                  </div>
                  
                  {/* Live Activity Feed with Strategic Colors */}
                  <div className="bg-surfaceDark/30 rounded-2xl p-4 border border-brand-primary/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                      <p className="text-brand-primary text-sm font-medium">Live Activity</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-brand-light text-sm">New deposit confirmed</span>
                        <span className="text-brand-primary text-xs font-medium">1,250 USDT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-light text-sm">Withdrawal processed</span>
                        <span className="text-info-500 text-xs font-medium">0.5 BTC</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements with Strategic Colors */}
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
              className="absolute -top-8 -right-8 w-20 h-20 bg-brand-primary/20 rounded-full blur-xl"
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
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-info-500/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
