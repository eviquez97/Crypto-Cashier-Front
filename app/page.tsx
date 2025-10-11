'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Shield, 
  Globe, 
  CheckCircle, 
  BarChart3, 
  ArrowRight,
  Star,
  DollarSign,
  Zap,
  Users,
  TrendingUp,
  Lock,
  Clock
} from 'lucide-react'

// Componentes UI Premium
type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-brand-neon text-brand-dark hover:shadow-glow-neon focus:ring-brand-neon',
    secondary: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white focus:ring-brand-purple',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-brand-dark focus:ring-white'
  }
  
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  value: string
  label: string
  trend?: number
  className?: string
}

const MetricCard = ({ icon, value, label, trend, className = '' }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-brand-light rounded-lg">
        {icon}
      </div>
      {trend && (
        <span className={`text-sm font-medium ${trend > 0 ? 'text-success-400' : 'text-gray-500'}`}>
          {trend > 0 ? '↑' : '→'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-brand-dark mb-1">{value}</div>
    <div className="text-gray-600 text-sm">{label}</div>
  </motion.div>
)

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    volume: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Header */}
      <header className="relative z-50 bg-brand-dark/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="text-xl font-display font-bold">Coinfixi</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <button className="text-white/80 hover:text-white transition-colors">Sign In</button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-dark opacity-70"></div>
        <div className="absolute inset-0 bg-hexagon-pattern opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-brand-purple/20 border border-brand-purple/30 rounded-full text-sm mb-8"
              >
                <Star className="w-4 h-4 text-brand-neon mr-2" />
                Trusted by Gaming Operators Worldwide
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
              >
                The Premium Crypto Cashier for{' '}
                <span className="bg-gradient-premium bg-clip-text text-transparent">
                  Sportbooks & Casinos
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl text-white/80 mb-8 max-w-2xl"
              >
                Process crypto deposits and withdrawals in seconds with banking-grade security and transparent pricing.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Button size="lg" className="group">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="secondary" size="lg">
                  Request Demo
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center justify-center lg:justify-start space-x-6 text-white/60"
              >
                <span className="text-sm">Trusted by leading businesses</span>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-brand-purple/20 rounded flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-brand-neon" />
                  </div>
                  <div className="w-8 h-8 bg-brand-purple/20 rounded flex items-center justify-center">
                    <span className="text-brand-neon font-bold text-sm">B</span>
                  </div>
                  <div className="w-8 h-8 bg-brand-purple/20 rounded flex items-center justify-center">
                    <span className="text-brand-neon font-bold text-sm">B</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-white rounded-xl p-6 shadow-premium">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-brand-dark">Dashboard</h3>
                    <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Today's Activity */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Today's Activity</p>
                    <p className="text-3xl font-bold text-brand-dark">$284,590</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-brand-light rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Deposits</span>
                        <TrendingUp className="w-3 h-3 text-success-400" />
                      </div>
                      <p className="text-lg font-semibold text-brand-dark">142</p>
                      <p className="text-xs text-success-400">↑ 12%</p>
                    </div>
                    <div className="bg-brand-light rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Withdrawals</span>
                        <Clock className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-lg font-semibold text-brand-dark">89</p>
                      <p className="text-xs text-gray-500">→ Stable</p>
                    </div>
                  </div>

                  {/* Recent Transaction */}
                  <div className="bg-success-50 border border-success-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-success-700">New deposit confirmed</span>
                    </div>
                    <p className="text-xs text-success-600 mt-1">• 1,250 USDT • TRON</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 mb-8"
          >
            Trusted by gaming operators worldwide
          </motion.p>
          <div className="flex justify-center space-x-12 opacity-60">
            {['OPERATOR 1', 'OPERATOR 2', 'OPERATOR 3', 'OPERATOR 4'].map((operator, index) => (
              <motion.div
                key={operator}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-gray-400 font-medium"
              >
                {operator}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">
              Enterprise-Grade Crypto Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to power your gaming platform with cryptocurrency payments
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-brand-purple" />,
                title: 'Custodia Segura',
                description: 'AWS KMS encryption with ephemeral wallets. One address, one transaction. Maximum security.'
              },
              {
                icon: <Globe className="w-8 h-8 text-brand-neon" />,
                title: 'Multichain Real',
                description: 'BTC, ETH, TRON, BSC, Polygon, Lightning. Real addresses that actually receive funds.'
              },
              {
                icon: <Lock className="w-8 h-8 text-brand-purple" />,
                title: 'Compliance Ready',
                description: 'Built-in AML screening, KYB verification, and Travel Rule compliance. Regulation-proof.'
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-purple" />,
                title: 'Enterprise Dashboard',
                description: 'Real-time analytics, multi-tenant management, double-entry ledger, and reporting.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-brand-light rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-dark mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees. No surprises. Enterprise-ready.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-premium rounded-2xl p-8 text-center text-white">
              <div className="text-6xl font-bold mb-4">2%</div>
              <div className="text-xl mb-2">per transaction</div>
              <div className="text-lg opacity-90 mb-8">Transparent, simple, enterprise-ready</div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>Unlimited deposits & withdrawals</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>AML & KYB compliance</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>Real-time confirmation webhooks</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>Double-entry ledger</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>Custom integration</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>Multi-tenant dashboard</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>API & SDKs included</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-neon mr-2" />
                      <span>White-label ready</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button size="lg" className="bg-brand-neon text-brand-dark hover:shadow-glow-neon">
                Start Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gradient-premium">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to power your sportsbook with premium crypto payments?
            </h2>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-4 py-3 rounded-lg border-0 text-brand-dark placeholder-gray-500 focus:ring-2 focus:ring-brand-neon"
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="px-4 py-3 rounded-lg border-0 text-brand-dark placeholder-gray-500 focus:ring-2 focus:ring-brand-neon"
                />
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: e.target.value})}
                  className="px-4 py-3 rounded-lg border-0 text-brand-dark focus:ring-2 focus:ring-brand-neon"
                >
                  <option value="">Estimated Monthly Volume</option>
                  <option value="0-10k">$0 - $10K</option>
                  <option value="10k-100k">$10K - $100K</option>
                  <option value="100k-1m">$100K - $1M</option>
                  <option value="1m+">$1M+</option>
                </select>
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="bg-brand-neon text-brand-dark hover:shadow-glow-neon"
              >
                Request Enterprise Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-white/80 text-sm mt-4">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="text-xl font-display font-bold">Coinfixi</span>
              </div>
              <p className="text-white/60">
                Premium crypto cashier for sportbooks and casinos
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Status</h3>
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span>• All systems operational</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 Coinfixi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}