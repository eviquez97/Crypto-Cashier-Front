'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Building, Users, Globe, CheckCircle, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const DemoRequestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    industry: '',
    monthlyVolume: '',
    message: '',
    newsletter: true
  })
  const { t } = useTranslation()

  const industries = [
    'Gaming & Sports Betting',
    'E-commerce',
    'Fintech',
    'Cryptocurrency Exchange',
    'Online Casino',
    'Digital Banking',
    'Other'
  ]

  const volumeRanges = [
    'Less than $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $10M',
    '$10M - $50M',
    'More than $50M'
  ]

  const roles = [
    'CEO/Founder',
    'CTO',
    'Head of Payments',
    'Business Development',
    'Operations Manager',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Send email to sales team
      const subject = 'New Demo Request from Landing Page'
      const body = `New demo request details:
      
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}
Role: ${formData.role}
Phone: ${formData.phone}
Industry: ${formData.industry}
Monthly Volume: ${formData.monthlyVolume}
Message: ${formData.message}

Newsletter: ${formData.newsletter ? 'Yes' : 'No'}

Please follow up within 24 hours.`
      
      window.open(`mailto:sales@coinfixi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          role: '',
          phone: '',
          industry: '',
          monthlyVolume: '',
          message: '',
          newsletter: true
        })
      }, 5000)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-brand-teal/10 backdrop-blur-xl rounded-3xl p-8 border border-brand-primary/20 shadow-2xl text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-brand-dark" />
          </motion.div>
          
          <h2 className="text-3xl font-display font-bold text-brand-light mb-4">
            Demo Request Sent!
          </h2>
          
          <p className="text-brand-light/70 mb-6">
            Thank you for your interest in Coinfixi. Our sales team will contact you within 24 hours to schedule your personalized demo.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-brand-light/80">
              <Shield className="w-4 h-4 text-brand-primary" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-brand-light/80">
              <Zap className="w-4 h-4 text-brand-primary" />
              <span>48-hour implementation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-brand-light/80">
              <Users className="w-4 h-4 text-brand-primary" />
              <span>Dedicated support team</span>
            </div>
          </div>
          
          <Link href="/" className="inline-block mt-6 text-brand-primary hover:text-brand-light transition-colors">
            Return to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal py-12 p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-brand-light/70 hover:text-brand-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-light mb-4">
            Request Your <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">Enterprise Demo</span>
          </h1>
          <p className="text-xl text-brand-light/70 max-w-2xl mx-auto">
            See how Coinfixi can transform your payment infrastructure. Get a personalized demo tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20">
              <h3 className="text-2xl font-display font-bold text-brand-light mb-6">
                What You'll Get
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-2">Security Deep Dive</h4>
                    <p className="text-brand-light/70 text-sm">See our enterprise-grade security measures and compliance certifications in action.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-2">Live Integration</h4>
                    <p className="text-brand-light/70 text-sm">Watch real-time payment processing and API integration demonstrations.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-2">Expert Consultation</h4>
                    <p className="text-brand-light/70 text-sm">Get personalized recommendations from our payment infrastructure experts.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-2">Custom Solution</h4>
                    <p className="text-brand-light/70 text-sm">Explore how Coinfixi can be tailored to your specific business requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-brand-dark/50 rounded-2xl p-6 border border-brand-primary/20">
              <h4 className="font-semibold text-brand-light mb-4">Trusted by Industry Leaders</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-brand-light/70">
                <div>✓ 500+ Enterprise Clients</div>
                <div>✓ SOC 2 Type II Certified</div>
                <div>✓ 99.9% Uptime SLA</div>
                <div>✓ 24/7 Expert Support</div>
              </div>
            </div>
          </motion.div>

          {/* Demo Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-brand-teal/10 backdrop-blur-xl rounded-3xl p-8 border border-brand-primary/20 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-light mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-light mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-brand-light mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                  placeholder="john.doe@company.com"
                />
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-light mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-light mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select your role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone & Industry */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-light mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-light mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Monthly Volume */}
              <div>
                <label className="block text-sm font-semibold text-brand-light mb-2">
                  Monthly Payment Volume
                </label>
                <select
                  name="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select volume range</option>
                  {volumeRanges.map(volume => (
                    <option key={volume} value={volume}>{volume}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-brand-light mb-2">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your current payment infrastructure, specific requirements, or any questions you have..."
                />
              </div>

              {/* Newsletter */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-brand-dark/50 border border-brand-primary/30 rounded text-brand-primary focus:ring-brand-primary focus:ring-2"
                />
                <span className="text-sm text-brand-light/80">
                  Subscribe to our newsletter for industry insights and product updates
                </span>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-primary text-brand-dark py-4 rounded-xl font-bold text-lg hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin mr-2" />
                    Submitting Request...
                  </div>
                ) : (
                  'Request Demo'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DemoRequestPage
