'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/components/LanguageSelector'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Button handlers
  const handleSignIn = () => {
    // Redirect to login page for existing users
    window.open('/login', '_blank')
  }

  const handleGetStarted = () => {
    // Redirect to demo/signup for new enterprise clients
    window.open('/demo-request', '_blank')
  }

  const navItems = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.docs'), href: '#docs' },
    { name: t('nav.resources'), href: '#resources' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-dark/70 backdrop-blur-2xl shadow-2xl border-b border-brand-primary/20' 
          : 'bg-transparent'
      }`}
      style={isScrolled ? {
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      } : {}}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Chip redondo brand.neon con "CF" + wordmark */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-brand-dark font-bold text-lg">CF</span>
            </div>
            <span className="text-brand-light font-display font-bold text-xl">Coinfixi</span>
          </motion.div>

          {/* Centro: Navigation links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -1 }}
                className="text-brand-light/70 hover:text-brand-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Derecha: Language Selector + Sign In (outline) + Get Started (neon) */}
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <motion.button
              onClick={handleSignIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 border-brand-primary text-brand-light rounded-xl font-semibold hover:bg-brand-primary hover:text-brand-dark transition-all duration-200 cursor-pointer"
            >
              {t('nav.signIn')}
            </motion.button>
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05, shadow: '0 14px 40px rgba(22,249,138,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-brand-primary text-brand-dark rounded-xl font-semibold hover:shadow-fintech-hover transition-all duration-200 cursor-pointer"
            >
              {t('nav.getStarted')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar