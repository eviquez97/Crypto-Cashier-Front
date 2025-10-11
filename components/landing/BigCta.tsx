'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const BigCta = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section className="relative py-20 bg-cta overflow-hidden">
      {/* Borde superior curvo */}
      <div className="absolute top-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 fill-base-light"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>

      <div className="container pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* H2: "Ready to power your sportsbook with premium crypto payments?" */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-h2-mobile lg:text-h2 font-display font-semibold text-white mb-8"
          >
            Ready to power your sportsbook with premium crypto payments?
          </motion.h2>

          {/* Form mini: email + botón neon "Request Demo" */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-brand-neon text-base-dark rounded-xl font-semibold flex items-center justify-center group hover:shadow-fintech-hover transition-all duration-200 whitespace-nowrap"
            >
              Request Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-gray-400 text-sm mt-6"
          >
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default BigCta
