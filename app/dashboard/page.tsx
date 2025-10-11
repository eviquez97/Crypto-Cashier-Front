'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Bell, User, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Filter, Download, MoreHorizontal } from 'lucide-react'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Deposits', value: '$2,847,392', change: '+12.5%', trend: 'up' },
    { label: 'Total Withdrawals', value: '$1,923,847', change: '+8.2%', trend: 'up' },
    { label: 'Net Balance', value: '$923,545', change: '+15.3%', trend: 'up' },
    { label: 'Transaction Fees', value: '$28,473', change: '-2.1%', trend: 'down' }
  ]

  const recentTransactions = [
    { id: 'TXN-001', type: 'Deposit', amount: '2,500 USDT', status: 'Confirmed', time: '2 min ago', hash: '0x1234...5678' },
    { id: 'TXN-002', type: 'Withdrawal', amount: '1,000 BTC', status: 'Pending', time: '5 min ago', hash: '0x2345...6789' },
    { id: 'TXN-003', type: 'Deposit', amount: '5,000 ETH', status: 'Confirmed', time: '12 min ago', hash: '0x3456...7890' },
    { id: 'TXN-004', type: 'Withdrawal', amount: '500 USDC', status: 'Failed', time: '18 min ago', hash: '0x4567...8901' },
    { id: 'TXN-005', type: 'Deposit', amount: '3,200 TRX', status: 'Confirmed', time: '25 min ago', hash: '0x5678...9012' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-secondary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-neon rounded-full flex items-center justify-center">
                <span className="text-primary-dark font-bold text-sm">CF</span>
              </div>
              <span className="text-primary-text font-bold text-xl">Coinfixi Dashboard</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-medium w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions, addresses..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-light rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-accent-neon"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-medium hover:text-primary-text transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-neon rounded-full" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-primary-text font-medium">John Doe</span>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-fintech hover:shadow-fintech-hover transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-medium text-sm font-medium">{stat.label}</h3>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-primary-text">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transactions Table */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-fintech"
            >
              {/* Table Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-light">
                <h2 className="text-xl font-semibold text-primary-text">Recent Transactions</h2>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-light rounded-xl text-primary-text hover:bg-gray-medium hover:text-white transition-all duration-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-accent-neon rounded-xl text-primary-dark hover:shadow-neon-glow transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </motion.button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-light">
                    <tr>
                      <th className="text-left p-4 text-primary-text font-medium">ID</th>
                      <th className="text-left p-4 text-primary-text font-medium">Type</th>
                      <th className="text-left p-4 text-primary-text font-medium">Amount</th>
                      <th className="text-left p-4 text-primary-text font-medium">Status</th>
                      <th className="text-left p-4 text-primary-text font-medium">Time</th>
                      <th className="text-left p-4 text-primary-text font-medium">Hash</th>
                      <th className="text-left p-4 text-primary-text font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx, index) => (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                        className="border-b border-gray-light last:border-b-0 hover:bg-gray-light/50 transition-colors duration-200"
                      >
                        <td className="p-4 text-primary-text font-medium">{tx.id}</td>
                        <td className="p-4">
                          <span className={`flex items-center space-x-2 ${
                            tx.type === 'Deposit' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {tx.type === 'Deposit' ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            <span>{tx.type}</span>
                          </span>
                        </td>
                        <td className="p-4 text-primary-text font-medium">{tx.amount}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-medium">{tx.time}</td>
                        <td className="p-4 text-gray-medium font-mono text-sm">{tx.hash}</td>
                        <td className="p-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-medium hover:text-primary-text transition-colors"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-fintech"
            >
              <h3 className="text-lg font-semibold text-primary-text mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-accent-neon rounded-xl text-primary-dark font-medium hover:shadow-neon-glow transition-all duration-200"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  <span>New Deposit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-primary-dark rounded-xl text-white font-medium hover:bg-primary-text transition-all duration-200"
                >
                  <ArrowDownRight className="w-5 h-5" />
                  <span>New Withdrawal</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 border-2 border-accent-purple rounded-xl text-accent-purple font-medium hover:bg-accent-purple hover:text-white transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  <span>Generate Report</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-fintech"
            >
              <h3 className="text-lg font-semibold text-primary-text mb-4">Activity Feed</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-primary-text">New deposit confirmed</p>
                    <p className="text-xs text-gray-medium">2,500 USDT from User #1234</p>
                    <p className="text-xs text-gray-medium">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-primary-text">Withdrawal pending approval</p>
                    <p className="text-xs text-gray-medium">1,000 BTC to Wallet ABC</p>
                    <p className="text-xs text-gray-medium">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-primary-text">API key updated</p>
                    <p className="text-xs text-gray-medium">New permissions granted</p>
                    <p className="text-xs text-gray-medium">1 hour ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard