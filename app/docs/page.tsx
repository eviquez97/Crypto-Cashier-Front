'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Book, 
  Code, 
  Play, 
  Download, 
  Copy, 
  Check,
  ArrowRight,
  ExternalLink,
  FileText,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started')
  const [copied, setCopied] = useState<string | null>(null)
  const { t } = useTranslation()

  const codeExamples = {
    'getting-started': `// Install the Coinfixi SDK
npm install @coinfixi/sdk

// Initialize the client
import { CoinfixiClient } from '@coinfixi/sdk'

const client = new CoinfixiClient({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
})

// Create your first deposit address
const deposit = await client.deposits.create({
  tenantId: 'your-tenant-id',
  chain: 'TRON',
  currency: 'USDT'
})

console.log('Deposit address:', deposit.address)`,
    
    'deposits': `// Create a deposit address
const deposit = await client.deposits.create({
  tenantId: 'your-tenant-id',
  chain: 'TRON',
  currency: 'USDT',
  metadata: {
    userId: 'user_123',
    orderId: 'order_456'
  }
})

// Get deposit status
const status = await client.deposits.getStatus(deposit.id)

// List all deposits
const deposits = await client.deposits.list({
  tenantId: 'your-tenant-id',
  limit: 50,
  offset: 0
})`,
    
    'withdrawals': `// Process a withdrawal
const withdrawal = await client.withdrawals.create({
  tenantId: 'your-tenant-id',
  chain: 'ETH',
  currency: 'USDC',
  amount: '1000.00',
  toAddress: '0x742d35Cc6634C0...',
  metadata: {
    userId: 'user_123',
    orderId: 'order_456'
  }
})

// Get withdrawal status
const status = await client.withdrawals.getStatus(withdrawal.id)

// Cancel a withdrawal (if pending)
await client.withdrawals.cancel(withdrawal.id)`,
    
    'webhooks': `// Webhook endpoint example (Express.js)
app.post('/webhooks/coinfixi', (req, res) => {
  const { event, data } = req.body
  
  switch (event) {
    case 'deposit.confirmed':
      console.log('Deposit confirmed:', data)
      // Update user balance
      break
      
    case 'withdrawal.completed':
      console.log('Withdrawal completed:', data)
      // Send confirmation email
      break
      
    case 'withdrawal.failed':
      console.log('Withdrawal failed:', data)
      // Handle failure
      break
  }
  
  res.status(200).send('OK')
})`
  }

  const docsSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      description: 'Quick setup and first steps with Coinfixi'
    },
    {
      id: 'deposits',
      title: 'Deposits',
      icon: Zap,
      description: 'Create and manage deposit addresses'
    },
    {
      id: 'withdrawals',
      title: 'Withdrawals',
      icon: Shield,
      description: 'Process crypto withdrawals securely'
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      icon: Globe,
      description: 'Real-time event notifications'
    }
  ]

  const handleCopy = async (code: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(sectionId)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2 mb-8">
              <Code className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-semibold text-brand-light">Developer Documentation</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-light mb-6">
              Build with <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">Coinfixi</span>
            </h1>
            
            <p className="text-xl text-brand-light/70 max-w-3xl mx-auto mb-12">
              Comprehensive API documentation, code examples, and SDKs to integrate 
              Coinfixi into your application in minutes, not months.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-brand-dark px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Quick Start</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-brand-primary text-brand-light rounded-xl font-semibold flex items-center space-x-2 hover:bg-brand-primary hover:text-brand-dark transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download SDK</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 sticky top-8">
              <h3 className="text-lg font-semibold text-brand-light mb-4">Documentation</h3>
              
              <nav className="space-y-2">
                {docsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === section.id
                        ? 'bg-brand-primary text-brand-dark'
                        : 'text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs opacity-70">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-8 border border-brand-primary/20">
              {/* Section Header */}
              <div className="mb-8">
                {(() => {
                  const section = docsSections.find(s => s.id === activeTab)
                  if (!section) return null
                  
                  return (
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-display font-bold text-brand-light">
                          {section.title}
                        </h2>
                        <p className="text-brand-light/70">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Code Example */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-brand-light">Code Example</h3>
                  <button
                    onClick={() => handleCopy(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                    className="flex items-center space-x-2 px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-lg hover:bg-brand-primary/30 transition-colors"
                  >
                    {copied === activeTab ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-brand-dark rounded-xl p-6 border border-brand-primary/20 overflow-x-auto">
                  <pre className="text-brand-light text-sm">
                    <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
                  </pre>
                </div>
              </div>

              {/* Section-specific Content */}
              {activeTab === 'getting-started' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-brand-light mb-3">Prerequisites</h4>
                    <ul className="space-y-2 text-brand-light/70">
                      <li>• Node.js 16+ or Python 3.8+</li>
                      <li>• Coinfixi API key (get from dashboard)</li>
                      <li>• Basic understanding of REST APIs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-brand-light mb-3">Next Steps</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-brand-dark/50 rounded-xl p-4 border border-brand-primary/20">
                        <h5 className="font-semibold text-brand-light mb-2">1. Create Deposit</h5>
                        <p className="text-brand-light/70 text-sm">Set up your first deposit address</p>
                      </div>
                      <div className="bg-brand-dark/50 rounded-xl p-4 border border-brand-primary/20">
                        <h5 className="font-semibold text-brand-light mb-2">2. Configure Webhooks</h5>
                        <p className="text-brand-light/70 text-sm">Set up real-time notifications</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'deposits' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-brand-light mb-3">Supported Chains</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Bitcoin', 'Ethereum', 'Tron', 'BSC', 'Polygon', 'Solana', 'Avalanche', 'Arbitrum'].map((chain) => (
                        <div key={chain} className="bg-brand-dark/50 rounded-lg p-3 text-center border border-brand-primary/20">
                          <span className="text-brand-light text-sm">{chain}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'withdrawals' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-brand-light mb-3">Security Features</h4>
                    <ul className="space-y-2 text-brand-light/70">
                      <li>• Multi-signature wallet protection</li>
                      <li>• Automated fraud detection</li>
                      <li>• Rate limiting and velocity checks</li>
                      <li>• Real-time transaction monitoring</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'webhooks' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-brand-light mb-3">Available Events</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-brand-light">Deposit Events</h5>
                        <ul className="space-y-1 text-brand-light/70 text-sm">
                          <li>• deposit.created</li>
                          <li>• deposit.confirmed</li>
                          <li>• deposit.failed</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-brand-light">Withdrawal Events</h5>
                        <ul className="space-y-1 text-brand-light/70 text-sm">
                          <li>• withdrawal.created</li>
                          <li>• withdrawal.completed</li>
                          <li>• withdrawal.failed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-brand-dark/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-brand-light/70 max-w-2xl mx-auto">
              Everything you need to build amazing crypto payment experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-light mb-2">API Reference</h3>
              <p className="text-brand-light/70 text-sm mb-4">Complete API documentation with all endpoints and parameters.</p>
              <button className="text-brand-primary hover:text-brand-light transition-colors text-sm font-medium flex items-center space-x-1">
                <span>View Reference</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-light mb-2">SDKs & Libraries</h3>
              <p className="text-brand-light/70 text-sm mb-4">Official SDKs for Node.js, Python, PHP, and more.</p>
              <button className="text-brand-primary hover:text-brand-light transition-colors text-sm font-medium flex items-center space-x-1">
                <span>Browse SDKs</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-light mb-2">Code Examples</h3>
              <p className="text-brand-light/70 text-sm mb-4">Ready-to-use code examples and integration guides.</p>
              <button className="text-brand-primary hover:text-brand-light transition-colors text-sm font-medium flex items-center space-x-1">
                <span>View Examples</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-primary/10 to-brand-teal/10 backdrop-blur-xl rounded-3xl p-12 border border-brand-primary/20 text-center"
        >
          <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
            Ready to Start Building?
          </h2>
          
          <p className="text-xl text-brand-light/70 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future of crypto payments with Coinfixi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-primary text-brand-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-primary/90 transition-all duration-200 flex items-center justify-center group"
              onClick={() => window.open('/demo-request', '_blank')}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-brand-primary text-brand-light rounded-2xl font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all duration-200"
              onClick={() => window.open('/login', '_blank')}
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DocsPage
