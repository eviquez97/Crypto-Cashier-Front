/**
 * Coinfixi Landing Page - Premium Fintech Design
 * Optimized for conversion
 */

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, BarChart3, Check, Lock, Wallet, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <main className="bg-brand-light min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-dark overflow-hidden">
        {/* Hexagon Pattern Background */}
        <div className="absolute inset-0 bg-hexagon-pattern opacity-30"></div>
        
        {/* Header */}
        <header className="relative z-10 px-6 py-6">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-premium rounded-lg flex items-center justify-center">
                <Wallet className="text-dark-900" size={24} />
              </div>
              <span className="text-2xl font-display font-bold text-white">Coinfixi</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-white hover:text-success-400 font-medium transition-colors">
                Sign In
              </Link>
              <Button variant="neon" size="sm">
                Get Started
              </Button>
            </div>
          </nav>
        </header>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block bg-brand-purple/20 border border-brand-purple/30 rounded-full px-4 py-2 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-success-400 font-semibold text-sm">★ Trusted by Gaming Operators Worldwide</span>
              </motion.div>
              
              <h1 className="text-display-lg font-display font-bold text-white mb-6 leading-tight">
                The Premium Crypto Cashier for{' '}
                <span className="bg-gradient-premium bg-clip-text text-transparent">
                  Sportbooks & Casinos
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Process crypto deposits and withdrawals in seconds with banking-grade security and transparent pricing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button variant="neon" size="lg">
                  Create Account <ArrowRight size={20} />
                </Button>
                <Button variant="outline" size="lg">
                  Request Demo
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-success-400" />
                  <span>AWS KMS Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-success-400" />
                  <span>AML Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-success-400" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right: Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Animated Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-dark-500 font-medium">Total Volume (24h)</p>
                    <motion.p
                      className="text-3xl font-display font-bold text-dark-900"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      $284,590
                    </motion.p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-premium rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-dark-900" size={24} />
                  </div>
                </div>
                
                {/* Mini metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-light rounded-lg p-4">
                    <p className="text-xs text-dark-500 mb-1">Deposits</p>
                    <p className="text-xl font-bold text-dark-900">142</p>
                    <p className="text-xs text-success-400">↑ 12%</p>
                  </div>
                  <div className="bg-brand-light rounded-lg p-4">
                    <p className="text-xs text-dark-500 mb-1">Withdrawals</p>
                    <p className="text-xl font-bold text-dark-900">89</p>
                    <p className="text-xs text-brand-purple">→ Stable</p>
                  </div>
                </div>
                
                {/* Transaction animation */}
                <motion.div
                  className="mt-4 bg-success-400/10 border border-success-400/30 rounded-lg p-3 flex items-center gap-3"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-dark-900">New deposit confirmed</p>
                    <p className="text-xs text-dark-500">1,250 USDT • TRON</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-success-400 rounded-full blur-3xl opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-purple rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* SOCIAL PROOF */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-dark-500 font-medium mb-8">Trusted by gaming operators worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
            {/* Placeholder logos */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-dark-100 rounded-lg flex items-center justify-center">
                <span className="text-dark-400 font-semibold">OPERATOR {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FEATURES */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-dark-900 mb-4">
              Enterprise-Grade Crypto Infrastructure
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Everything you need to power your gaming platform with cryptocurrency payments
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl p-8 shadow-card hover:shadow-premium transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-dark-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* PRICING */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-md font-display font-bold text-dark-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-dark-600 mb-12">
              No hidden fees. No surprises. Enterprise-ready.
            </p>
            
            <div className="bg-gradient-dark rounded-2xl p-12 text-white shadow-premium">
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-6xl font-display font-bold">2%</span>
                <span className="text-2xl text-gray-300">per transaction</span>
              </div>
              <p className="text-gray-300 text-lg mb-8">
                Transparent, simple, enterprise-ready
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                {pricingFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-success-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="neon" size="lg" fullWidth>
                Start Now <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CLOSING CTA */}
      <section className="relative py-24 bg-gradient-to-br from-brand-purple via-primary-600 to-brand-purple overflow-hidden">
        <div className="absolute inset-0 bg-hexagon-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-md font-display font-bold mb-6">
              Ready to Power Your Sportsbook?
            </h2>
            <p className="text-xl mb-12 text-gray-200">
              Join leading operators using premium crypto payments
            </p>
            
            {/* Lead Form */}
            <div className="bg-white rounded-2xl p-8 shadow-premium max-w-2xl mx-auto">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none text-dark-900"
                  />
                  <input
                    type="email"
                    placeholder="Work Email"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none text-dark-900"
                  />
                </div>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none text-dark-900">
                  <option>Estimated Monthly Volume</option>
                  <option>$10K - $50K</option>
                  <option>$50K - $200K</option>
                  <option>$200K - $1M</option>
                  <option>$1M+</option>
                </select>
                <Button variant="neon" size="lg" fullWidth>
                  Request Enterprise Demo <ArrowRight size={20} />
                </Button>
                <p className="text-xs text-dark-500">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-premium rounded-lg"></div>
                <span className="text-xl font-display font-bold">Coinfixi</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium crypto cashier for sportbooks and casinos
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-success-400 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-success-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-success-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-success-400 transition-colors">API Reference</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-success-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-success-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-success-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-success-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Status</h4>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-success-400 font-medium">All systems operational</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Coinfixi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-success-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-success-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-success-400 transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Features data
const features = [
  {
    title: 'Custodia Segura',
    description: 'AWS KMS encryption with ephemeral wallets. One address, one transaction. Maximum security.',
    icon: <Shield className="text-white" size={28} />,
    gradient: 'from-brand-purple to-primary-600'
  },
  {
    title: 'Multichain Real',
    description: 'BTC, ETH, TRON, BSC, Polygon, Lightning. Real addresses that actually receive funds.',
    icon: <Globe className="text-white" size={28} />,
    gradient: 'from-success-400 to-success-600'
  },
  {
    title: 'Compliance Ready',
    description: 'Built-in AML screening, KYB verification, and Travel Rule compliance. Regulation-proof.',
    icon: <Lock className="text-white" size={28} />,
    gradient: 'from-primary-500 to-primary-700'
  },
  {
    title: 'Enterprise Dashboard',
    description: 'Real-time analytics, multi-tenant management, double-entry ledger, and reporting.',
    icon: <BarChart3 className="text-white" size={28} />,
    gradient: 'from-dark-700 to-dark-900'
  },
]

const pricingFeatures = [
  'Unlimited deposits & withdrawals',
  'Real-time confirmation webhooks',
  'Multi-tenant dashboard',
  'AML & KYB compliance',
  'Double-entry ledger',
  'API & SDKs included',
  'Priority support',
  'Custom integration',
  'White-label ready',
]
