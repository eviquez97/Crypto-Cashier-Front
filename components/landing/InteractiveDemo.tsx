'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Code, Terminal, Check, Copy, Play, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal' | 'webhook'>('deposit')
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const { t } = useTranslation()

  const codeExamples = {
    deposit: `// Create a deposit address
const deposit = await coinfixi.deposits.create({
  tenantId: 'your-tenant-id',
  chain: 'TRON',
  currency: 'USDT'
});

// Real address, immediate availability
console.log(deposit.address);
// => "TXvK2VG8HhJ3kR4zN9pQw5...`,
    withdrawal: `// Process instant withdrawal
const withdrawal = await coinfixi.withdrawals.create({
  tenantId: 'your-tenant-id',
  chain: 'ETH',
  currency: 'USDC',
  amount: '1000.00',
  toAddress: '0x742d35Cc6634C0...'
});

// Sub-second processing
console.log(withdrawal.status);
// => "processing" -> "completed"`,
    webhook: `// Real-time webhook notifications
app.post('/webhooks/coinfixi', (req, res) => {
  const { event, data } = req.body;
  
  if (event === 'deposit.confirmed') {
    // Credit user balance instantly
    await creditUserBalance(
      data.userId, 
      data.amount
    );
  }
  
  res.sendStatus(200);
});`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[activeTab])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      alert('Failed to copy code. Please try again.')
    }
  }

  const handleRun = () => {
    setIsRunning(true)
    console.log('Running code example:', activeTab)
    console.log(codeExamples[activeTab])
    
    // Simulate API call
    setTimeout(() => {
      setIsRunning(false)
      alert(`✓ Code executed successfully!\n\nTab: ${activeTab}\n\nIn production, this would execute the API call to Coinfixi.`)
    }, 1500)
  }

  return (
    <section className="section bg-brand-dark overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18,178,193,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18,178,193,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
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
          <div className="inline-flex items-center space-x-2 bg-accent-medium/10 border border-accent-medium/20 rounded-full px-4 py-2 mb-6">
            <Terminal className="w-4 h-4 text-accent-medium" />
            <span className="text-sm font-semibold text-brand-light">{t('interactiveDemo.badge')}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-light mb-6">
            {t('interactiveDemo.title')} <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">{t('interactiveDemo.titleHighlight')}</span>{t('interactiveDemo.titleEnd')}
          </h2>
          <p className="text-xl text-brand-light/70 max-w-3xl mx-auto">
            {t('interactiveDemo.subtitle')}
          </p>
        </motion.div>

        {/* Interactive Code Demo */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Code Editor */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-base-dark to-base-mid rounded-3xl overflow-hidden shadow-2xl border border-accent-medium/30"
            >
              {/* Editor Header */}
              <div className="bg-base-dark/50 backdrop-blur-sm px-6 py-4 border-b border-accent-medium/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center space-x-2 text-base-light/70 text-sm">
                      <Code className="w-4 h-4" />
                      <span>coinfixi-api.ts</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="p-2 hover:bg-base-light/10 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-brand-neon" />
                      ) : (
                        <Copy className="w-4 h-4 text-base-light/70" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: isRunning ? 1 : 1.1 }}
                      whileTap={{ scale: isRunning ? 1 : 0.9 }}
                      onClick={handleRun}
                      disabled={isRunning}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-300 ${
                        isRunning 
                          ? 'bg-brand-primary/30 text-brand-primary cursor-wait' 
                          : 'bg-brand-primary/20 text-brand-primary hover:bg-brand-primary/30'
                      }`}
                    >
                      <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                      <span className="text-sm font-medium">{isRunning ? t('interactiveDemo.running') : t('interactiveDemo.run')}</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center space-x-1 px-6 pt-4 bg-base-dark/30">
                {(['deposit', 'withdrawal', 'webhook'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-t-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-base-mid text-base-light'
                        : 'text-base-light/50 hover:text-base-light/80'
                    }`}
                  >
                    {t(`interactiveDemo.tabs.${tab}`)}
                  </button>
                ))}
              </div>

              {/* Code Display */}
              <div className="bg-base-mid p-6">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-base-light/90 font-mono leading-relaxed overflow-x-auto"
                  style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                >
                  <code>{codeExamples[activeTab]}</code>
                </motion.pre>
              </div>

              {/* Output/Console */}
              {isRunning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-base-dark/50 px-6 py-4 border-t border-accent-medium/20"
                >
                  <div className="flex items-center space-x-2 text-brand-neon text-sm">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span>✓ Request successful (142ms)</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  title: 'RESTful API',
                  description: 'Clean, predictable REST endpoints with JSON responses. No proprietary protocols or complex integrations.',
                  icon: Code,
                  color: 'from-brand-neon to-accent-bright'
                },
                {
                  title: 'Real-time Webhooks',
                  description: 'Instant notifications for deposits, withdrawals, and confirmations. Never poll for updates again.',
                  icon: Zap,
                  color: 'from-accent-bright to-accent-medium'
                },
                {
                  title: 'Comprehensive SDKs',
                  description: 'Official libraries for Node.js, Python, PHP, Ruby, and Go. Type-safe, well-documented, and maintained.',
                  icon: Terminal,
                  color: 'from-accent-medium to-brand-neon'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-br from-base-light/80 to-base-light backdrop-blur-xl rounded-2xl p-6 border border-accent-medium/20 shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-base-light" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-light mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-brand-light/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-base-mid to-base-dark rounded-2xl p-6 text-center"
              >
                <h3 className="text-2xl font-bold text-brand-light mb-4">
                  Ready to build?
                </h3>
                <p className="text-brand-light/70 mb-6">
                  Get your API keys and start integrating in minutes
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(18,178,193,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-brand-primary text-brand-dark px-8 py-3 rounded-xl font-bold shadow-xl w-full"
                >
                  View Documentation
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {[
            { value: '< 100ms', label: 'API Response Time' },
            { value: '99.99%', label: 'API Uptime' },
            { value: '5min', label: 'Average Integration' },
            { value: '24/7', label: 'Developer Support' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">{stat.value}</div>
              <div className="text-brand-light/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveDemo
