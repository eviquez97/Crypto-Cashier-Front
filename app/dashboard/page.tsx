'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Bell, User, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Filter, Download, MoreHorizontal, Calendar } from 'lucide-react'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Deposits', value: '$2,847,392', change: '+12.5%', trend: 'up' },
    { label: 'Withdrawals', value: '$1,923,847', change: '+8.2%', trend: 'up' },
    { label: 'Net Balance', value: '$923,545', change: '+15.3%', trend: 'up' },
    { label: 'Fees', value: '$28,473', change: '-2.1%', trend: 'down' }
  ]

  const recentTransactions = [
    { id: 'TXN-001', type: 'Deposit', amount: '2,500 USDT', status: 'Confirmed', time: '2 min ago', hash: '0x1234...5678' },
    { id: 'TXN-002', type: 'Withdrawal', amount: '1,000 BTC', status: 'Pending', time: '5 min ago', hash: '0x2345...6789' },
    { id: 'TXN-003', type: 'Deposit', amount: '5,000 ETH', status: 'Confirmed', time: '12 min ago', hash: '0x3456...7890' },
    { id: 'TXN-004', type: 'Withdrawal', amount: '500 USDC', status: 'Failed', time: '18 min ago', hash: '0x4567...8901' },
    { id: 'TXN-005', type: 'Deposit', amount: '3,200 TRX', status: 'Confirmed', time: '25 min ago', hash: '0x5678...9012' }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-brand-neon text-base-dark'
      case 'Pending':
        return 'bg-yellow-500 text-white animate-pulse'
      case 'Failed':
        return 'bg-state-error text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="min-h-screen bg-base-dark">
      {/* Header base.mid con buscador, notifs, avatar */}
      <header className="bg-base-mid border-b border-gray-700">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-neon rounded-full flex items-center justify-center">
                <span className="text-base-dark font-bold text-sm">CF</span>
              </div>
              <span className="text-white font-display font-bold text-xl">Coinfixi Dashboard</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions, addresses..."
                  className="w-full pl-10 pr-4 py-2 bg-base-dark border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-neon rounded-full" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">John Doe</span>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Sección "Today's Activity" con filtro Fecha */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-display font-semibold text-white mb-2">Today's Activity</h1>
            <p className="text-gray-400">Monitor your crypto payment transactions in real-time</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-base-mid border border-gray-600 rounded-xl text-gray-300 hover:text-white transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </motion.button>
        </motion.div>

        {/* 4 KPI Cards con sparklines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="bg-base-mid rounded-2xl p-6 shadow-fintech hover:shadow-fintech-hover transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-3">{stat.value}</p>
              {/* Sparkline placeholder */}
              <div className="flex items-end space-x-1 h-8">
                {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${height}%`, `${height + 10}%`, `${height}%`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="w-2 bg-brand-neon rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabla de transacciones */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="bg-base-mid rounded-2xl shadow-fintech"
            >
              {/* Table Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-display font-semibold text-white">Recent Transactions</h2>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-base-dark border border-gray-600 rounded-xl text-gray-300 hover:text-white transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-brand-neon rounded-xl text-base-dark hover:shadow-fintech-hover transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </motion.button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-base-dark">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-medium">ID</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Time</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Hash</th>
                      <th className="text-left p-4 text-gray-400 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx, index) => (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                        className="border-b border-gray-700 last:border-b-0 hover:bg-base-dark/50 transition-colors duration-200"
                      >
                        <td className="p-4 text-white font-medium">{tx.id}</td>
                        <td className="p-4">
                          <span className={`flex items-center space-x-2 ${
                            tx.type === 'Deposit' ? 'text-green-400' : 'text-blue-400'
                          }`}>
                            {tx.type === 'Deposit' ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            <span>{tx.type}</span>
                          </span>
                        </td>
                        <td className="p-4 text-white font-medium">{tx.amount}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">{tx.time}</td>
                        <td className="p-4 text-gray-400 font-mono text-sm">{tx.hash}</td>
                        <td className="p-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="bg-base-mid rounded-2xl p-6 shadow-fintech"
            >
              <h3 className="text-lg font-display font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-brand-neon rounded-xl text-base-dark font-medium hover:shadow-fintech-hover transition-all duration-200"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  <span>New Deposit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-base-dark border border-gray-600 rounded-xl text-white font-medium hover:bg-gray-700 transition-all duration-200"
                >
                  <ArrowDownRight className="w-5 h-5" />
                  <span>New Withdrawal</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 border-2 border-brand-purple rounded-xl text-brand-purple font-medium hover:bg-brand-purple hover:text-white transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  <span>Generate Report</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'cubic-bezier(.22,.61,.36,1)' }}
              className="bg-base-mid rounded-2xl p-6 shadow-fintech"
            >
              <h3 className="text-lg font-display font-semibold text-white mb-4">Activity Feed</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-white">New deposit confirmed</p>
                    <p className="text-xs text-gray-400">2,500 USDT from User #1234</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 animate-pulse" />
                  <div>
                    <p className="text-sm text-white">Withdrawal pending approval</p>
                    <p className="text-xs text-gray-400">1,000 BTC to Wallet ABC</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-white">API key updated</p>
                    <p className="text-xs text-gray-400">New permissions granted</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toast en esquina superior derecha al simular un depósito (auto-dismiss 4s) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
        className="fixed top-20 right-6 z-50 bg-brand-neon text-base-dark px-6 py-4 rounded-xl shadow-fintech flex items-center space-x-3"
      >
        <div className="w-2 h-2 bg-base-dark rounded-full animate-pulse" />
        <div>
          <p className="font-semibold">New deposit confirmed!</p>
          <p className="text-sm">2,500 USDT received</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard