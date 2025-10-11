'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, CheckCircle, Shield, Zap, Users, Award, Clock, TrendingUp } from 'lucide-react'

const BigCta = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      console.log('Email submitted:', email)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  const benefits = [
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Zap, text: "Instant implementation" },
    { icon: Users, text: "Dedicated support team" },
    { icon: Award, text: "Industry certifications" }
  ]

  const urgencyStats = [
    { value: "48hr", label: "Implementation Time" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24/7", label: "Expert Support" }
  ]

  return (
    <section className="relative bg-gradient-to-br from-base-mid via-base-dark to-base-dark py-32 overflow-hidden">
      {/* Premium curved top border */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-base-light to-base-light transform -skew-y-1 origin-top-left" />
      
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(18,178,193,0.15), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(13,138,158,0.15), transparent 50%)
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18,178,193,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18,178,193,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating elements */}
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
          className="absolute top-20 right-20 w-32 h-32 bg-brand-neon/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: 'linear',
            delay: 5
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-accent-bright/10 rounded-full blur-2xl"
        />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-brand-neon/10 border border-brand-neon/20 rounded-full px-6 py-3 mb-8"
          >
            <Clock className="w-5 h-5 text-brand-neon" />
            <span className="text-sm font-semibold text-base-light">Limited Time: Free Enterprise Setup</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-display font-bold mb-8"
          >
            <span className="text-base-light">Ready to Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-brand-neon to-accent-bright bg-clip-text text-transparent">
              Payment Infrastructure?
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl text-base-light/80 mb-12 leading-relaxed"
          >
            <span className="text-brand-primary font-semibold">Join 500+ enterprise clients who trust Coinfixi for their crypto payment processing.</span> 
            <br />
            <span className="text-brand-primary font-semibold">Get started in 48 hours with zero setup fees.</span>
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-3 p-4 bg-base-light/5 rounded-2xl border border-accent-medium/20 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-brand-neon to-accent-bright rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-base-light" />
                </div>
                <span className="text-base-light text-sm font-medium text-center">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Urgency Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-8 mb-12"
          >
            {urgencyStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-brand-neon mb-1">{stat.value}</div>
                <div className="text-base-light/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="w-full px-6 py-4 bg-base-light/10 border border-accent-medium/30 text-base-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all duration-300 placeholder:text-base-light/50 backdrop-blur-sm"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(18,178,193,0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group bg-gradient-to-r from-brand-neon to-accent-bright text-base-light px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Request Sent!
                    </>
                  ) : (
                    <>
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-bright to-brand-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </form>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-base-light/60">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">$10B+ Processed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">500+ Clients</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-base-light/70 mb-4">Need immediate assistance?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 border-2 border-accent-medium text-accent-medium rounded-2xl font-semibold hover:bg-accent-medium hover:text-base-light transition-all duration-300"
            >
              Schedule Enterprise Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BigCta