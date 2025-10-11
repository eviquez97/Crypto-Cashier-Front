'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "Coinfixi has transformed our payment processing. The reliability and transparency are unmatched. We've seen a 40% increase in transaction volume since switching.",
      author: "John Doe",
      role: "CTO, GamingCorp",
      avatar: "JD",
      rating: 5
    },
    {
      quote: "The white-label solution is incredible. We can customize everything to match our brand while maintaining enterprise-grade security. Our users love the seamless experience.",
      author: "Sarah Chen",
      role: "VP of Operations, CasinoMax",
      avatar: "SC",
      rating: 5
    },
    {
      quote: "Real-time settlements have been a game-changer for our business. We can process withdrawals instantly, which significantly improved our customer satisfaction scores.",
      author: "Michael Rodriguez",
      role: "Head of Payments, SportsBet Pro",
      avatar: "MR",
      rating: 5
    }
  ]

  // Auto-slider cada 6s con fade 400ms
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="section bg-base-light relative overflow-hidden">
      {/* Fondo con patrón radial tenue */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(18,178,193,0.1), transparent 60%)'
        }}
      />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          {/* Tarjeta blanca centrada rounded-2xl */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-base-light rounded-2xl p-8 lg:p-12 shadow-fintech relative border border-accent-medium"
              >
                {/* Quote */}
                <motion.blockquote
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl lg:text-3xl font-display font-semibold text-text-primary leading-relaxed mb-8"
                >
                  "{testimonials[currentTestimonial].quote}"
                </motion.blockquote>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center justify-center space-x-4 mb-6"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-brand-neon rounded-full flex items-center justify-center">
                    <span className="text-base-dark font-bold text-sm">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>
                  
                  <div className="text-left">
                    <p className="font-semibold text-text-primary">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </motion.div>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center justify-center space-x-1"
                >
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-brand-neon text-brand-neon" />
                    </motion.div>
                  ))}
                  <span className="ml-2 text-text-secondary text-sm">
                    {testimonials[currentTestimonial].rating}.0 rating
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slider indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center justify-center space-x-3 mt-8"
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-brand-neon scale-125' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
