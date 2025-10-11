'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const Testimonials = () => {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-white rounded-2xl p-8 lg:p-12 shadow-fintech">
              {/* Green Stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-neon rounded-l-2xl" />
              
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <blockquote className="text-2xl lg:text-3xl font-semibold text-primary-text leading-relaxed">
                  "Coinfixi has transformed our payment processing. The reliability and transparency are unmatched. We've seen a 40% increase in transaction volume since switching."
                </blockquote>
              </motion.div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center space-x-4 mb-6"
              >
                <div className="flex -space-x-2">
                  {/* Main Avatar */}
                  <div className="w-12 h-12 bg-accent-neon rounded-full flex items-center justify-center">
                    <span className="text-primary-dark font-bold text-sm">JD</span>
                  </div>
                  {/* Additional Avatars */}
                  <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SM</span>
                  </div>
                  <div className="w-12 h-12 bg-gray-medium rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AL</span>
                  </div>
                </div>
                
                <div className="text-left">
                  <p className="font-semibold text-primary-text">John Doe</p>
                  <p className="text-gray-medium text-sm">CTO, GamingCorp</p>
                </div>
              </motion.div>

              {/* Stars */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center justify-center space-x-1"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-5 h-5 fill-accent-neon text-accent-neon" />
                  </motion.div>
                ))}
                <span className="ml-2 text-gray-medium text-sm">5.0 rating</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
