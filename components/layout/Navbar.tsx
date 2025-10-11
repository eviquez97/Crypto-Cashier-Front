'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Docs', href: '#docs' },
    { name: 'Resources', href: '#resources' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-mid/75 backdrop-blur-md shadow-fintech' 
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Chip redondo brand.neon con "CF" + wordmark */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-brand-neon rounded-full flex items-center justify-center">
              <span className="text-base-dark font-bold text-lg">CF</span>
            </div>
            <span className="text-text-main font-display font-bold text-xl">Coinfixi</span>
          </motion.div>

          {/* Centro: Home · Features · Pricing · Docs · Resources */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -1 }}
                className="text-text-main hover:text-brand-purple transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Derecha: Sign In (outline oscuro) + Get Started (filled brand.neon) */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 border-text-main text-text-main rounded-xl font-semibold hover:bg-text-main hover:text-base-light transition-all duration-200"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, shadow: '0 14px 40px rgba(182,255,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-brand-neon text-base-dark rounded-xl font-semibold hover:shadow-fintech-hover transition-all duration-200"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar