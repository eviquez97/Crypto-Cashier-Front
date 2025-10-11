'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Menu, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft,
  Activity,
  DollarSign,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MetricCard } from '@/components/ui/MetricCard'
import { Toast, ToastContainer } from '@/components/ui/Toast'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: string
  currency: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: string
  hash?: string
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  // Simular transacciones en tiempo real
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: '1,250',
      currency: 'USDT',
      status: 'confirmed',
      timestamp: '2 min ago',
      hash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: '850',
      currency: 'BTC',
      status: 'pending',
      timestamp: '5 min ago'
    },
    {
      id: '3',
      type: 'deposit',
      amount: '5,000',
      currency: 'ETH',
      status: 'confirmed',
      timestamp: '12 min ago',
      hash: '0xabcd...efgh'
    }
  ])

  // Simular notificaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const newToast: Toast = {
        id: Date.now().toString(),
        type: 'success',
        title: 'New deposit confirmed',
        description: '1,250 USDT received on TRON',
        duration: 5000
      }
      
      setToasts(prev => [...prev, newToast])
      
      // Auto remove after duration
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id))
      }, newToast.duration)
    }, 15000) // Cada 15 segundos

    return () => clearInterval(interval)
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', active: true },
    { icon: ArrowUpRight, label: 'Deposits' },
    { icon: ArrowDownLeft, label: 'Withdrawals' },
    { icon: Wallet, label: 'Wallets' },
    { icon: CreditCard, label: 'Virtual Cards', badge: 'Soon' },
    { icon: Settings, label: 'Settings' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-neon-green" />
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-error" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed'
      case 'pending':
        return 'status-pending'
      case 'failed':
        return 'status-failed'
      default:
        return 'status-pending'
    }
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
                  <span className="text-dark-base font-bold text-sm">CF</span>
                </div>
                <span className="text-xl font-display font-bold text-dark-base">Coinfixi</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/10"
                />
              </div>
              
              <Button variant="secondary" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
              </Button>
              
              <Button variant="secondary" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 lg:relative lg:translate-x-0"
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {sidebarItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        item.active 
                          ? 'bg-purple-primary/10 text-purple-primary' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-neon-green text-dark-base text-xs px-2 py-1 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-dark-base mb-2">Dashboard</h1>
              <p className="text-gray-600">Monitor your crypto transactions and performance</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={TrendingUp}
                title="Today's Deposits"
                value="$284,590"
                change={{ value: 12, type: 'increase' }}
                delay={0}
              />
              <MetricCard
                icon={TrendingDown}
                title="Today's Withdrawals"
                value="$156,230"
                change={{ value: 8, type: 'increase' }}
                delay={0.1}
              />
              <MetricCard
                icon={DollarSign}
                title="Total Balance"
                value="$1,847,320"
                change={{ value: 15, type: 'increase' }}
                delay={0.2}
              />
              <MetricCard
                icon={Shield}
                title="Fees Collected"
                value="$8,817"
                change={{ value: 3, type: 'neutral' }}
                delay={0.3}
              />
            </div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark-base">Recent Transactions</h2>
                <Button variant="secondary" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        tx.type === 'deposit' ? 'bg-neon-green/10' : 'bg-purple-primary/10'
                      }`}>
                        {tx.type === 'deposit' ? (
                          <ArrowUpRight className="w-5 h-5 text-neon-green-dark" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-purple-primary" />
                        )}
                      </div>
                      
                      <div>
                        <div className="font-semibold text-dark-base">
                          {tx.amount} {tx.currency}
                        </div>
                        <div className="text-sm text-gray-600">
                          {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'} • {tx.timestamp}
                        </div>
                        {tx.hash && (
                          <div className="text-xs text-gray-400 font-mono">
                            {tx.hash}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getStatusIcon(tx.status)}
                      <span className={getStatusClass(tx.status)}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-2 gap-6 mt-8"
            >
              <div className="card">
                <h3 className="text-lg font-semibold text-dark-base mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="neon" className="w-full justify-start">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Process Deposit
                  </Button>
                  <Button variant="primary" className="w-full justify-start">
                    <ArrowDownLeft className="w-4 h-4 mr-2" />
                    Process Withdrawal
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Settings
                  </Button>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-dark-base mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                      <span className="text-neon-green-dark text-sm font-medium">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Blockchain</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                      <span className="text-neon-green-dark text-sm font-medium">Synced</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Security</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                      <span className="text-neon-green-dark text-sm font-medium">Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Overlay para mobile sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
