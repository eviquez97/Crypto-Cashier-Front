'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Bell,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
  Wallet,
  Shield,
  Zap,
  Activity,
  Users,
  CreditCard,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'

// Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'info', onClose: () => void }) => {
  const colors = {
    success: 'bg-success-50 border-success-200 text-success-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Activity className="w-5 h-5 text-blue-600" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.3 }}
      className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${colors[type]} p-4`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className="inline-flex text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Metric Card Component
const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  trend, 
  loading = false 
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down' | 'neutral'
  loading?: boolean
}) => {
  const trendColors = {
    up: 'text-success-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  }

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    neutral: <Activity className="w-4 h-4" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-brand-light rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
          {trendIcons[trend]}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <motion.p 
          className="text-3xl font-bold text-brand-dark"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? '...' : value}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Transaction Status Component
const TransactionStatus = ({ status }: { status: 'pending' | 'confirmed' | 'failed' }) => {
  const statusConfig = {
    pending: {
      color: 'text-warning-500',
      bg: 'bg-warning-50',
      icon: <Clock className="w-4 h-4" />,
      text: 'Pending'
    },
    confirmed: {
      color: 'text-success-400',
      bg: 'bg-success-50',
      icon: <CheckCircle className="w-4 h-4" />,
      text: 'Confirmed'
    },
    failed: {
      color: 'text-red-500',
      bg: 'bg-red-50',
      icon: <AlertCircle className="w-4 h-4" />,
      text: 'Failed'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      {config.icon}
      <span className="ml-1">{config.text}</span>
    </span>
  )
}

export default function Dashboard() {
  const [toasts, setToasts] = useState<Array<{ id: string, message: string, type: 'success' | 'error' | 'info' }>>([])
  const [loading, setLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Simulate new transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { message: 'New deposit confirmed: 1,250 USDT', type: 'success' as const },
        { message: 'Withdrawal processed: 500 BTC', type: 'success' as const },
        { message: 'High value transaction detected', type: 'info' as const }
      ]
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const newToast = {
        id: Date.now().toString(),
        ...randomMessage
      }
      
      setToasts(prev => [...prev, newToast])
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== newToast.id))
      }, 5000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const recentTransactions = [
    { id: 1, type: 'deposit', amount: '1,250 USDT', status: 'confirmed' as const, time: '2 min ago', hash: '0x1234...5678' },
    { id: 2, type: 'withdrawal', amount: '500 BTC', status: 'pending' as const, time: '5 min ago', hash: '0x9876...5432' },
    { id: 3, type: 'deposit', amount: '2,100 ETH', status: 'confirmed' as const, time: '12 min ago', hash: '0xabcd...efgh' },
    { id: 4, type: 'withdrawal', amount: '750 TRX', status: 'failed' as const, time: '18 min ago', hash: '0x5678...1234' },
  ]

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Toast Container */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-brand-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="text-xl font-display font-bold text-white">Coinfixi</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-white/80 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-neon rounded-full animate-pulse"></span>
              </button>
              
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-white text-sm">John Doe</span>
              </div>
              
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-brand-dark mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your crypto transactions and manage your operations
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Deposits Today"
            value="$284,590"
            change="+12%"
            icon={<ArrowUpCircle className="w-6 h-6 text-success-400" />}
            trend="up"
            loading={loading}
          />
          <MetricCard
            title="Withdrawals Today"
            value="$156,230"
            change="+5%"
            icon={<ArrowDownCircle className="w-6 h-6 text-brand-purple" />}
            trend="up"
            loading={loading}
          />
          <MetricCard
            title="Total Balance"
            value="$2,847,390"
            change="+8%"
            icon={<Wallet className="w-6 h-6 text-brand-purple" />}
            trend="up"
            loading={loading}
          />
          <MetricCard
            title="Transaction Fees"
            value="$8,920"
            change="-2%"
            icon={<DollarSign className="w-6 h-6 text-warning-500" />}
            trend="down"
            loading={loading}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brand-dark">Recent Transactions</h2>
                <button className="text-brand-purple hover:text-brand-purple/80 transition-colors text-sm font-medium">
                  View All
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-brand-light rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'deposit' 
                          ? 'bg-success-100 text-success-600' 
                          : 'bg-brand-purple/10 text-brand-purple'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowUpCircle className="w-5 h-5" />
                        ) : (
                          <ArrowDownCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </p>
                        <p className="text-sm text-gray-600">{transaction.amount}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <TransactionStatus status={transaction.status} />
                      <p className="text-xs text-gray-500 mt-1">{transaction.time}</p>
                      <p className="text-xs text-gray-400 font-mono">{transaction.hash}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-brand-light hover:bg-brand-purple/10 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-3">
                    <Plus className="w-5 h-5 text-brand-purple" />
                    <span className="font-medium text-brand-dark">Create Deposit</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-brand-light hover:bg-brand-purple/10 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-3">
                    <ArrowDownCircle className="w-5 h-5 text-brand-purple" />
                    <span className="font-medium text-brand-dark">Process Withdrawal</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-brand-light hover:bg-brand-purple/10 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-brand-purple" />
                    <span className="font-medium text-brand-dark">View Reports</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                </button>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-brand-dark mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-success-400">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-success-400">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blockchain</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-success-400">Synced</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-premium rounded-xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-2">Virtual Card</h3>
              <p className="text-white/80 text-sm mb-4">Issue branded virtual cards for your users</p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Coming Soon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}