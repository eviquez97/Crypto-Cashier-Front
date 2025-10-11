'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-base-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-h2-mobile lg:text-h2 font-display font-semibold text-text-primary mb-4"
          >
            Subscribe Newsletter
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-body-lg text-text-secondary mb-8 max-w-md mx-auto"
          >
            Financial transactions, emails, mobile updates. Stay informed with the latest crypto payment trends.
          </motion.p>

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
                className="w-full px-6 py-4 bg-base-mid border border-gray-800 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-brand-neon text-base-dark rounded-xl font-semibold flex items-center justify-center group hover:shadow-fintech-hover transition-all duration-200 whitespace-nowrap"
            >
              Subscribe
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-text-muted text-sm mt-4"
          >
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
