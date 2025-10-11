'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownLeft, CheckCircle, Clock, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'processing'
  timestamp: Date
  country: string
  flag: string
}

const LiveTransactionFeed = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Button handler
  const handleStartProcessing = () => {
    // Redirect to dashboard/signup
    window.open('/dashboard', '_blank')
  }
  
  const { t } = useTranslation()

  const currencies = ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'XRP']
  const countries = [
    { name: 'USA', flag: '🇺🇸' },
    { name: 'UK', flag: '🇬🇧' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Singapore', flag: '🇸🇬' },
  ]

  const generateTransaction = (): Transaction => {
    const type = Math.random() > 0.5 ? 'deposit' : 'withdrawal'
    const currency = currencies[Math.floor(Math.random() * currencies.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]
    const statusRandom = Math.random()
    let status: 'completed' | 'pending' | 'processing'
    
    if (statusRandom > 0.8) status = 'pending'
    else if (statusRandom > 0.6) status = 'processing'
    else status = 'completed'

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount: parseFloat((Math.random() * 10000 + 100).toFixed(2)),
      currency,
      status,
      timestamp: new Date(),
      country: country.name,
      flag: country.flag
    }
  }

  useEffect(() => {
    // Initial transactions
    const initial = Array.from({ length: 5 }, generateTransaction)
    setTransactions(initial)

    // Add new transactions every 3 seconds
    const interval = setInterval(() => {
      const newTransaction = generateTransaction()
      setTransactions(prev => [newTransaction, ...prev].slice(0, 8))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-brand-primary bg-brand-primary/10 border-brand-primary/30'
      case 'processing': return 'text-brand-teal bg-brand-teal/10 border-brand-teal/30'
      case 'pending': return 'text-brand-light/70 bg-brand-light/10 border-brand-light/30'
      default: return 'text-brand-light/70 bg-brand-light/10 border-brand-light/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'processing': return <Zap className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <section className="section bg-brand-dark overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 50%, rgba(18,178,193,0.1), transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(13,138,158,0.1), transparent 50%)
            `
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
          <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-brand-light">{t('liveTransactions.badge')}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-light mb-6">
            <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">{t('liveTransactions.title')}</span> {t('liveTransactions.titleHighlight')} {t('liveTransactions.titleEnd')}
          </h2>
          <p className="text-xl text-brand-light/70 max-w-3xl mx-auto">
            {t('liveTransactions.subtitle')}
          </p>
        </motion.div>

        {/* Transaction Feed */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-brand-teal/20 backdrop-blur-xl rounded-3xl p-8 border border-brand-primary/30 shadow-2xl"
            style={{
              backdropFilter: 'blur(20px)',
              background: 'linear-gradient(135deg, rgba(19,67,56,0.3) 0%, rgba(19,67,56,0.2) 100%)',
            }}
          >
            {/* Feed Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-brand-primary/20">
              <div>
                <h3 className="text-2xl font-bold text-brand-light mb-2">Live Activity Feed</h3>
                <p className="text-brand-light/70 text-sm">Real-time updates from our global network</p>
              </div>
              <div className="flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-xl px-4 py-2">
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                <span className="text-brand-primary font-semibold text-sm">Live</span>
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="bg-brand-teal/10 backdrop-blur-sm rounded-2xl p-5 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left: Type & Amount */}
                      <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transaction.type === 'deposit' 
                            ? 'bg-brand-primary/20 text-brand-primary' 
                            : 'bg-brand-teal/20 text-brand-teal'
                        }`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownLeft className="w-6 h-6" />
                          ) : (
                            <ArrowUpRight className="w-6 h-6" />
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-lg font-bold text-brand-light">
                              {transaction.amount.toLocaleString()} {transaction.currency}
                            </span>
                            <span className="text-2xl">{transaction.flag}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-brand-light/70">
                            <span className="capitalize font-medium">{transaction.type}</span>
                            <span>•</span>
                            <span>{transaction.country}</span>
                            <span>•</span>
                            <span>{transaction.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Status */}
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="text-sm font-semibold capitalize">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer Stats */}
            <div className="mt-8 pt-6 border-t border-brand-primary/20">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <motion.div
                    key={transactions.length}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-brand-primary mb-1"
                  >
                    {transactions.filter(t => t.status === 'completed').length}
                  </motion.div>
                  <div className="text-brand-light/70 text-sm">Completed</div>
                </div>
                <div className="text-center">
                  <motion.div
                    key={transactions.length}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-brand-teal mb-1"
                  >
                    {transactions.filter(t => t.status === 'processing').length}
                  </motion.div>
                  <div className="text-brand-light/70 text-sm">Processing</div>
                </div>
                <div className="text-center">
                  <motion.div
                    key={transactions.length}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-brand-light/70 mb-1"
                  >
                    {transactions.filter(t => t.status === 'pending').length}
                  </motion.div>
                  <div className="text-brand-light/70 text-sm">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-brand-light/70 mb-6 text-lg">
            {t('liveTransactions.description')}
          </p>
          <motion.button
            onClick={handleStartProcessing}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(22,249,138,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-primary text-brand-dark px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl cursor-pointer"
          >
            {t('liveTransactions.cta')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default LiveTransactionFeed
