'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, ArrowUpRight, Settings, BarChart3, Users, Shield, 
  Bell, Search, Filter, MoreVertical, ArrowDownLeft, LogOut,
  TrendingUp, TrendingDown, Activity, DollarSign
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [notifications] = useState(3)

  const timeFrames = [
    { label: '1H', value: '1h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' }
  ]

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Clean Minimalist Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-16 lg:w-64 bg-surface-primary border-r border-surface-border/30 flex flex-col items-center lg:items-start p-3 lg:p-4 sticky top-0 h-screen overflow-y-auto"
      >
        {/* Minimalist Logo */}
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-primary rounded-xl flex items-center justify-center">
            <span className="text-surface-primary font-bold text-sm lg:text-base">CF</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-base font-semibold text-text-primary">Coinfixi</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 w-full">
          <h3 className="hidden lg:block text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
            Quick Actions
          </h3>
          
          <div className="space-y-2">
            {[
              { icon: Plus, label: 'Create Deposit' },
              { icon: ArrowUpRight, label: 'Withdraw' },
              { icon: Settings, label: 'Settings' },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Users, label: 'Users' },
              { icon: Shield, label: 'Security' }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center lg:justify-start space-x-3 p-2 lg:p-3 hover:bg-surface-secondary rounded-lg transition-all duration-200 group"
              >
                <action.icon className="w-5 h-5 text-text-secondary group-hover:text-brand-primary transition-colors" />
                <span className="hidden lg:block text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Profile */}
        <div className="w-full flex items-center justify-center lg:justify-start space-x-3 p-2 lg:p-3 hover:bg-surface-secondary rounded-lg transition-all duration-200 group cursor-pointer">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="text-surface-primary font-bold text-sm">EU</span>
          </div>
          <div className="hidden lg:block flex-1 text-left">
            <p className="text-sm font-medium text-text-primary">Enterprise User</p>
            <p className="text-xs text-text-secondary">Admin</p>
          </div>
          <LogOut className="hidden lg:block w-4 h-4 text-text-secondary group-hover:text-brand-primary transition-colors" />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Clean Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-surface-primary border-b border-surface-border/30 sticky top-0 z-40"
        >
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              {/* Page Title */}
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Overview</h1>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 bg-surface-secondary border border-surface-border/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-error-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white text-[10px]">{notifications}</span>
                    </div>
                  )}
                </button>

                {/* Settings */}
                <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-all duration-200">
                  <Settings className="w-5 h-5" />
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                    <span className="text-surface-primary font-bold text-sm">EU</span>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-text-primary">Enterprise User</span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 overflow-y-auto bg-gray-50">
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Total Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-4"
            >
              <div className="bg-brand-primary rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Plus className="w-6 h-6 text-white/80" />
                </div>
                <h3 className="text-white/90 text-sm font-medium mb-2">Total Balance</h3>
                <h2 className="text-3xl font-bold text-white mb-6">$2,847,392</h2>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                    Deposit
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 border border-white/20">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Volume Graph Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Volume</h3>
                  <span className="text-sm font-medium text-success-500">+12.5%</span>
                </div>
                <div className="h-32 flex items-end space-x-2">
                  {[40, 60, 45, 80, 65, 90, 75].map((height, index) => (
                    <div
                      key={index}
                      className="bg-brand-primary/20 rounded-t-sm flex-1 hover:bg-brand-primary/30 transition-colors duration-200"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </motion.div>

            {/* Crypto Assets Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Crypto Assets</h3>
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">₿</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bitcoin</p>
                        <p className="text-sm text-gray-500">BTC</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">$43,250</p>
                      <p className="text-sm text-success-500">+2.4%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">Ξ</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Ethereum</p>
                        <p className="text-sm text-gray-500">ETH</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">$2,680</p>
                      <p className="text-sm text-success-500">+1.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Success Rate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-brand-primary"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="99.7, 100"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">99.7%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Transaction Success</p>
                </div>
              </div>
            </motion.div>

            {/* Active Users Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Users</h3>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-info-500"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="75, 100"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">75%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">1,247 Users Online</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Transfer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Transfer</h3>
                  <span className="text-sm text-brand-primary cursor-pointer">View all</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  {[
                    { name: 'GamingCorp', initial: 'G' },
                    { name: 'BetTech', initial: 'B' },
                    { name: 'CryptoBet', initial: 'C' },
                    { name: 'GameFlow', initial: 'G' },
                    { name: 'BetSecure', initial: 'B' }
                  ].map((user, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-gray-600 font-medium text-sm">{user.initial}</span>
                      </div>
                      <span className="text-xs text-gray-600">{user.name}</span>
                    </div>
                  ))}
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-brand-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">$2,760</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">USD</span>
                    <ArrowDownLeft className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Transactions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="lg:col-span-8"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'GamingCorp Deposit', amount: '$12,450', date: '14 Apr, 2024', status: 'Completed', statusColor: 'text-success-500' },
                    { name: 'BetTech Withdrawal', amount: '$8,900', date: '16 Apr, 2024', status: 'Processing', statusColor: 'text-warning-500' },
                    { name: 'CryptoBet Deposit', amount: '$14,000', date: '26 Apr, 2024', status: 'Completed', statusColor: 'text-success-500' },
                    { name: 'GameFlow Withdrawal', amount: '$28,000', date: '30 Apr, 2024', status: 'Pending', statusColor: 'text-info-500' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">{transaction.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.name}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{transaction.amount}</p>
                          <p className={`text-sm ${transaction.statusColor}`}>{transaction.status}</p>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* System Health Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
                <div className="space-y-4">
                  {[
                    { name: 'CPU Usage', value: '23%', color: 'text-success-500' },
                    { name: 'Memory', value: '67%', color: 'text-warning-500' },
                    { name: 'Network', value: '45%', color: 'text-success-500' }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{metric.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${metric.color}`}>{metric.value}</span>
                        <div className={`w-2 h-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}