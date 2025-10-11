'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, Play, Award, TrendingUp, Shield, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Coinfixi has revolutionized our payment infrastructure. We've processed over $500M with zero downtime. The security and compliance features give our clients complete confidence.",
      author: "David Martinez",
      role: "CTO",
      company: "Global Gaming Corp",
      avatar: "DM",
      rating: 5,
      metric: "+300% Volume Growth",
      industry: "Gaming",
      verified: true
    },
    {
      quote: "The enterprise-grade security and real-time processing capabilities are unmatched. We've reduced payment processing time by 95% while maintaining the highest security standards.",
      author: "Jennifer Liu",
      role: "VP of Engineering",
      company: "Fintech Solutions Ltd",
      avatar: "JL",
      rating: 5,
      metric: "95% Faster Processing",
      industry: "Fintech",
      verified: true
    },
    {
      quote: "Implementation was seamless and the ROI was immediate. Our transaction success rate increased to 99.8% and customer satisfaction scores are at an all-time high.",
      author: "Robert Thompson",
      role: "Head of Operations",
      company: "Digital Sportsbook Inc",
      avatar: "RT",
      rating: 5,
      metric: "99.8% Success Rate",
      industry: "Sports Betting",
      verified: true
    },
    {
      quote: "The white-label solution allowed us to maintain our brand identity while leveraging enterprise-grade infrastructure. Our development team was up and running in 48 hours.",
      author: "Amanda Rodriguez",
      role: "Product Director",
      company: "Crypto Exchange Pro",
      avatar: "AR",
      rating: 5,
      metric: "48hr Implementation",
      industry: "Crypto Exchange",
      verified: true
    }
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section bg-gradient-to-b from-base-light to-base-light/80 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(18,178,193,0.1), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(13,138,158,0.1), transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(35,113,123,0.05), transparent 70%)
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18,178,193,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18,178,193,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-brand-neon/10 border border-brand-neon/20 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-brand-neon" />
            <span className="text-sm font-semibold text-text-primary">Verified Customer Stories</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6">
            Trusted by <span className="bg-gradient-to-r from-brand-neon to-accent-bright bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how leading companies are transforming their payment infrastructure 
            with Coinfixi's enterprise-grade solutions.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="bg-gradient-to-br from-base-light via-base-light to-accent-medium/5 rounded-3xl p-12 lg:p-16 shadow-2xl border border-accent-medium/20 backdrop-blur-sm relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div 
                  className="absolute top-0 right-0 w-96 h-96 opacity-5"
                  style={{
                    background: 'radial-gradient(circle, rgba(18,178,193,0.3), transparent 70%)'
                  }}
                />

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-brand-neon to-accent-bright rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                  >
                    <Quote className="w-8 h-8 text-base-light" />
                  </motion.div>

                  {/* Quote */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-2xl lg:text-3xl font-display font-semibold text-text-primary leading-relaxed mb-8"
                  >
                    "{testimonials[currentTestimonial].quote}"
                  </motion.blockquote>

                  {/* Author Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-6">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-neon to-accent-bright rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-base-light font-bold text-lg">
                            {testimonials[currentTestimonial].avatar}
                          </span>
                        </div>
                        {testimonials[currentTestimonial].verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-neon rounded-full flex items-center justify-center">
                            <Shield className="w-3 h-3 text-base-light" />
                          </div>
                        )}
                      </div>

                      {/* Author Details */}
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-xl font-bold text-text-primary">
                            {testimonials[currentTestimonial].author}
                          </h4>
                          {testimonials[currentTestimonial].verified && (
                            <div className="w-5 h-5 bg-brand-neon rounded-full flex items-center justify-center">
                              <Shield className="w-3 h-3 text-base-light" />
                            </div>
                          )}
                        </div>
                        <p className="text-text-secondary font-medium">
                          {testimonials[currentTestimonial].role}
                        </p>
                        <p className="text-accent-medium font-semibold">
                          {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </div>

                    {/* Industry Badge */}
                    <div className="hidden lg:block">
                      <div className="bg-accent-medium/10 border border-accent-medium/20 rounded-xl px-4 py-2">
                        <p className="text-accent-medium text-sm font-medium">
                          {testimonials[currentTestimonial].industry}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-8 pt-8 border-t border-accent-medium/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-brand-neon fill-current" />
                          ))}
                        </div>
                        <span className="text-text-secondary font-medium">5.0 Rating</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-brand-neon/10 border border-brand-neon/20 rounded-xl px-4 py-2">
                        <TrendingUp className="w-4 h-4 text-brand-neon" />
                        <span className="text-brand-neon font-semibold text-sm">
                          {testimonials[currentTestimonial].metric}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 bg-base-light border border-accent-medium/20 rounded-xl flex items-center justify-center hover:bg-accent-medium hover:text-base-light transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-brand-neon scale-125'
                        : 'bg-accent-medium/30 hover:bg-accent-medium/60'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 bg-base-light border border-accent-medium/20 rounded-xl flex items-center justify-center hover:bg-accent-medium hover:text-base-light transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-base-mid to-base-dark rounded-2xl p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-neon mb-2">500+</div>
                <div className="text-base-light/70 text-sm">Enterprise Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-neon mb-2">99.99%</div>
                <div className="text-base-light/70 text-sm">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-neon mb-2">$10B+</div>
                <div className="text-base-light/70 text-sm">Volume Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-neon mb-2">24/7</div>
                <div className="text-base-light/70 text-sm">Expert Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials