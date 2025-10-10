/**
 * Coinfixi Dashboard - Premium Interactive Design
 * Real-time metrics with animations
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  TrendingUp, ArrowDownCircle, ArrowUpCircle, DollarSign, Activity,
  Bell, Settings, LogOut, Plus, ChevronRight, Wallet, Shield, Zap
} from 'lucide-react'
import MetricCard from '@/components/ui/MetricCard'
import Button from '@/components/ui/Button'
import Toast, { useToast } from '@/components/ui/Toast'

export default function DashboardPremium() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const { showToast, success, toasts, removeToast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      router.push('/login')
      return
    }
    
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    setLoading(false)
    
    // Simulate real-time notification
    setTimeout(() => {
      success('New deposit confirmed: 1,250 USDT on TRON')
    }, 2000)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }
  
  if (loading) {
  return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
      <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-600 font-medium">Loading dashboard...</p>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Toast Container */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          visible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      
      {/* Header Premium */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-premium rounded-lg flex items-center justify-center">
                <Wallet className="text-dark-900" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-white">Coinfixi</h1>
                <p className="text-xs text-gray-400">Enterprise Dashboard</p>
              </div>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-dark-800 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-400" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-success-400 text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <Link href="/settings" className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-400" />
              </Link>
              
              <div className="w-px h-6 bg-dark-700"></div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                  <p className="text-xs text-gray-400">{user?.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-premium rounded-full flex items-center justify-center font-bold text-dark-900">
                  {user?.email?.[0].toUpperCase()}
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors text-gray-400 hover:text-danger-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-dark-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]} 👋
          </h2>
          <p className="text-dark-600">Here's what's happening with your crypto operations today</p>
        </motion.div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Volume (24h)"
            value={284590}
            currency="$"
            subtitle="USD equivalent"
            icon={<TrendingUp size={24} />}
            trend="up"
            trendValue="+12.5%"
            animated={true}
          />
          
          <MetricCard
            title="Deposits Today"
            value={142}
            subtitle="89 confirmed"
            icon={<ArrowDownCircle size={24} />}
            trend="up"
            trendValue="+8.2%"
            animated={true}
          />
          
          <MetricCard
            title="Withdrawals Today"
            value={89}
            subtitle="82 completed"
            icon={<ArrowUpCircle size={24} />}
            trend="neutral"
            trendValue="Stable"
            animated={true}
          />
          
          <MetricCard
            title="Fees Collected"
            value={5691}
            currency="$"
            subtitle="2% per transaction"
            icon={<DollarSign size={24} />}
            trend="up"
            trendValue="+15.3%"
            animated={true}
          />
        </div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-premium border border-gray-100 mb-8 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-brand-purple/5 to-transparent">
            <h3 className="text-lg font-display font-semibold text-dark-900">Quick Actions</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/deposits">
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(125, 83, 255, 0.15)' }}
                  className="bg-gradient-dark rounded-lg p-6 text-white cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <ArrowDownCircle size={32} className="text-success-400" />
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-success-400 transition-colors" />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-1">Create Deposit</h4>
                  <p className="text-sm text-gray-300">Generate crypto address instantly</p>
                </motion.div>
              </Link>
              
              <Link href="/withdrawals">
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(182, 255, 0, 0.15)' }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer group hover:border-success-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <ArrowUpCircle size={32} className="text-brand-purple group-hover:text-success-400 transition-colors" />
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-success-400 transition-colors" />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-1 text-dark-900">Process Withdrawal</h4>
                  <p className="text-sm text-dark-600">Send crypto with fee quotes</p>
                </motion.div>
              </Link>
              
              <Link href="/reports">
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(125, 83, 255, 0.15)' }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer group hover:border-brand-purple transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Activity size={32} className="text-brand-purple" />
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-brand-purple transition-colors" />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-1 text-dark-900">View Reports</h4>
                  <p className="text-sm text-dark-600">Analytics and reconciliation</p>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-premium border border-gray-100"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-display font-semibold text-dark-900">Recent Transactions</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {mockTransactions.map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="px-6 py-4 hover:bg-brand-light transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-success-400/20' : 'bg-brand-purple/20'
                    }`}>
                      {tx.type === 'deposit' ? (
                        <ArrowDownCircle className="text-success-400" size={20} />
                      ) : (
                        <ArrowUpCircle className="text-brand-purple" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-dark-900">{tx.amount} {tx.currency}</p>
                      <p className="text-sm text-dark-500">{tx.chain} • {tx.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.status === 'confirmed' 
                        ? 'bg-success-400/20 text-success-600'
                        : tx.status === 'pending'
                        ? 'bg-warning-500/20 text-warning-600'
                        : 'bg-gray-200 text-dark-600'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200">
            <Link href="/transactions" className="text-brand-purple hover:text-primary-600 font-medium text-sm flex items-center gap-2 justify-center">
              View All Transactions
              <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
        
        {/* Coming Soon Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-premium rounded-xl p-8 text-dark-900 relative overflow-hidden"
        >
          <motion.div
            className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-xs font-semibold mb-4">
              COMING SOON
            </div>
            <h3 className="text-2xl font-display font-bold mb-2">Virtual Card Integration</h3>
            <p className="text-dark-800 mb-6 max-w-2xl">
              Convert crypto to fiat instantly with virtual cards. Perfect for operational expenses and team payments.
            </p>
            <button className="bg-white text-dark-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Join Waitlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Mock data
const mockTransactions = [
  {
    type: 'deposit',
    amount: '1,250',
    currency: 'USDT',
    chain: 'TRON',
    status: 'confirmed',
    time: '2 minutes ago'
  },
  {
    type: 'withdrawal',
    amount: '0.05',
    currency: 'BTC',
    chain: 'Bitcoin',
    status: 'processing',
    time: '15 minutes ago'
  },
  {
    type: 'deposit',
    amount: '500',
    currency: 'USDC',
    chain: 'Polygon',
    status: 'pending',
    time: '1 hour ago'
  },
  {
    type: 'withdrawal',
    amount: '2,000',
    currency: 'USDT',
    chain: 'BSC',
    status: 'confirmed',
    time: '3 hours ago'
  },
]
