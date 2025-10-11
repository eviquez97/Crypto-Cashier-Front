'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield, 
  Settings, 
  Bell, 
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const { t } = useTranslation()

  const stats = [
    {
      title: 'Total Volume',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Success Rate',
      value: '99.7%',
      change: '+0.3%',
      trend: 'up',
      icon: Shield
    },
    {
      title: 'Avg. Response',
      value: '0.8s',
      change: '-15%',
      trend: 'up',
      icon: Activity
    }
  ]

  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'deposit',
      amount: '$12,450.00',
      currency: 'USDT',
      status: 'completed',
      time: '2 min ago',
      user: 'user_123'
    },
    {
      id: 'TXN-002',
      type: 'withdrawal',
      amount: '$8,900.00',
      currency: 'BTC',
      status: 'processing',
      time: '5 min ago',
      user: 'user_456'
    },
    {
      id: 'TXN-003',
      type: 'deposit',
      amount: '$25,600.00',
      currency: 'ETH',
      status: 'completed',
      time: '8 min ago',
      user: 'user_789'
    },
    {
      id: 'TXN-004',
      type: 'withdrawal',
      amount: '$3,200.00',
      currency: 'USDC',
      status: 'pending',
      time: '12 min ago',
      user: 'user_321'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'processing':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'pending':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-brand-teal/10 backdrop-blur-xl border-b border-brand-primary/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-brand-dark font-bold text-lg">CF</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-brand-light">Coinfixi Dashboard</h1>
                <p className="text-sm text-brand-light/70">Enterprise Payment Infrastructure</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-brand-primary text-brand-dark'
                    : 'text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'transactions'
                    ? 'bg-brand-primary text-brand-dark'
                    : 'text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'analytics'
                    ? 'bg-brand-primary text-brand-dark'
                    : 'text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10'
                }`}
              >
                Analytics
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10 rounded-lg transition-all duration-200">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-brand-light mb-2">
            Welcome back, Enterprise User
          </h2>
          <p className="text-brand-light/70">
            Here's what's happening with your payment infrastructure today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-light mb-1">{stat.value}</h3>
              <p className="text-brand-light/70 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-brand-light">Recent Transactions</h3>
              <button className="text-brand-primary hover:text-brand-light transition-colors text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.map((txn, index) => (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-brand-dark/30 rounded-xl border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      txn.type === 'deposit' ? 'bg-green-500/20' : 'bg-blue-500/20'
                    }`}>
                      {txn.type === 'deposit' ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-light">{txn.id}</p>
                      <p className="text-sm text-brand-light/70 capitalize">{txn.type}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-brand-light">{txn.amount}</p>
                    <p className="text-sm text-brand-light/70">{txn.currency}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(txn.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(txn.status)}
                        <span className="capitalize">{txn.status}</span>
                      </div>
                    </div>
                    <div className="text-sm text-brand-light/70">
                      {txn.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Quick Actions Card */}
            <div className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20">
              <h3 className="text-xl font-display font-bold text-brand-light mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 p-4 bg-brand-primary/10 hover:bg-brand-primary/20 rounded-xl border border-brand-primary/20 transition-all duration-200">
                  <ArrowDownLeft className="w-5 h-5 text-brand-primary" />
                  <span className="font-medium text-brand-light">Create Deposit</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 bg-brand-primary/10 hover:bg-brand-primary/20 rounded-xl border border-brand-primary/20 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 text-brand-primary" />
                  <span className="font-medium text-brand-light">Process Withdrawal</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 bg-brand-primary/10 hover:bg-brand-primary/20 rounded-xl border border-brand-primary/20 transition-all duration-200">
                  <Settings className="w-5 h-5 text-brand-primary" />
                  <span className="font-medium text-brand-light">API Settings</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 bg-brand-primary/10 hover:bg-brand-primary/20 rounded-xl border border-brand-primary/20 transition-all duration-200">
                  <Shield className="w-5 h-5 text-brand-primary" />
                  <span className="font-medium text-brand-light">Security Center</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20">
              <h3 className="text-xl font-display font-bold text-brand-light mb-6">System Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-brand-light/80">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-medium">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-brand-light/80">Payment Processing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-medium">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-brand-light/80">Security Monitoring</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-medium">Secure</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-brand-light/80">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-medium">Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage