'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Shield, Globe, CheckCircle, BarChart3, Zap, Users, TrendingUp, Lock, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Componentes de la Landing Page
const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    volume: ''
  })

  return (
    <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
      {/* Pattern de fondo */}
      <div className="absolute inset-0 bg-pattern opacity-10" />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center">
              <span className="text-dark-base font-bold text-xl">CF</span>
            </div>
            <span className="text-2xl font-display font-bold text-white">Coinfixi</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="neon" size="sm">
              Get Started
            </Button>
          </div>
        </nav>
      </header>
      
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">Trusted by Gaming Operators Worldwide</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              The Premium Crypto Cashier for{' '}
              <span className="text-gradient">Sportbooks &</span>{' '}
              <span className="text-neon-green">Casinos</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Process crypto deposits and withdrawals in seconds with banking-grade security and transparent pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="neon" size="lg" className="group">
                Create Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Request Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-gray-300">
              <span className="text-sm">Trusted by leading businesses</span>
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">B{i}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Dashboard</h3>
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
              </div>
              
              <div className="text-white mb-4">
                <div className="text-3xl font-bold">$284,590</div>
                <div className="text-sm text-gray-300">Today's Activity</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-white font-semibold">142</div>
                  <div className="text-xs text-gray-300">Deposits</div>
                  <div className="text-neon-green text-xs">↗ 12%</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-white font-semibold">89</div>
                  <div className="text-xs text-gray-300">Withdrawals</div>
                  <div className="text-gray-400 text-xs">→ Stable</div>
                </div>
              </div>
              
              <div className="bg-neon-green/20 rounded-xl p-3 border border-neon-green/30">
                <div className="text-neon-green text-sm font-medium">• New deposit confirmed</div>
                <div className="text-gray-300 text-xs">• 1,250 USDT • TRON</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Custodia Segura",
      description: "AWS KMS encryption with ephemeral wallets. One address, one transaction. Maximum security."
    },
    {
      icon: Globe,
      title: "Multichain Real",
      description: "BTC, ETH, TRON, BSC, Polygon, Lightning. Real addresses that actually receive funds."
    },
    {
      icon: CheckCircle,
      title: "Compliance Ready",
      description: "Built-in AML screening, KYB verification, and Travel Rule compliance. Regulation-proof."
    },
    {
      icon: BarChart3,
      title: "Enterprise Dashboard",
      description: "Real-time analytics, multi-tenant management, double-entry ledger, and reporting."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-dark-base mb-6">
            Enterprise-Grade Crypto Infrastructure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to power your gaming platform with cryptocurrency payments
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:scale-105"
            >
              <div className="p-4 bg-purple-primary/10 rounded-2xl w-fit mb-6 group-hover:bg-purple-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-purple-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark-base mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Pricing = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-dark-base mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            No hidden fees. No surprises. Enterprise-ready.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="gradient-purple rounded-3xl p-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-10" />
          <div className="relative z-10">
            <div className="text-6xl font-bold mb-4">2%</div>
            <div className="text-xl text-white/80 mb-8">per transaction</div>
            <div className="text-lg mb-12 text-white/90">
              Transparent, simple, enterprise-ready
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>Unlimited deposits & withdrawals</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>AML & KYB compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>Priority support</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>Real-time confirmation webhooks</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>Double-entry ledger</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>Custom integration</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>Multi-tenant dashboard</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>API & SDKs included</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span>White-label ready</span>
                </div>
              </div>
            </div>
            
            <Button variant="neon" size="lg" className="text-dark-base">
              Start Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    volume: ''
  })

  return (
    <section className="py-20 gradient-purple">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to power your sportsbook with premium crypto payments?
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Work Email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <select
                className="input-field"
                value={formData.volume}
                onChange={(e) => setFormData({...formData, volume: e.target.value})}
              >
                <option value="">Estimated Monthly Volume</option>
                <option value="0-10k">$0 - $10K</option>
                <option value="10k-100k">$10K - $100K</option>
                <option value="100k-1m">$100K - $1M</option>
                <option value="1m+">$1M+</option>
              </select>
            </div>
            
            <Button variant="neon" size="lg" className="w-full md:w-auto">
              Request Enterprise Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-white/60 text-sm mt-4">
              By submitting, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-dark-base text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center">
                <span className="text-dark-base font-bold text-xl">CF</span>
              </div>
              <span className="text-2xl font-display font-bold">Coinfixi</span>
            </div>
            <p className="text-gray-400">
              Premium crypto cashier for sportbooks and casinos
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-gray-400">All systems operational</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Coinfixi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
