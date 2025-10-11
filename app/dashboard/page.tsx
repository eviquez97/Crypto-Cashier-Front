'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  AlertCircle,
  Eye,
  EyeOff,
  Filter,
  Search,
  Download,
  RefreshCw,
  Zap,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  MoreHorizontal,
  Plus,
  Target,
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock3,
  Layers,
  Lock,
  Key,
  Monitor,
  Server,
  Cloud,
  Smartphone,
  CreditCard,
  Wallet,
  Banknote,
  Bitcoin,
  Ethereum
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [realTimeData, setRealTimeData] = useState(true)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(3)
  const { t } = useTranslation()

  // Real-time data simulation
  useEffect(() => {
    if (!realTimeData) return
    
    const interval = setInterval(() => {
      // Simulate real-time updates
      setRealTimeData(prev => !prev)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [realTimeData])

  const timeFrames = [
    { label: '1H', value: '1h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' }
  ]

  const advancedStats = [
    {
      title: 'Total Volume',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      subtitle: 'Last 24 hours',
      sparkline: [0, 45, 35, 65, 85, 95, 100],
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      subtitle: 'Currently online',
      sparkline: [0, 20, 40, 30, 60, 80, 90],
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Success Rate',
      value: '99.7%',
      change: '+0.3%',
      trend: 'up',
      icon: Shield,
      subtitle: 'Transaction success',
      sparkline: [0, 85, 90, 95, 98, 99, 100],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Avg. Response',
      value: '0.8s',
      change: '-15%',
      trend: 'up',
      icon: Activity,
      subtitle: 'API response time',
      sparkline: [0, 100, 80, 60, 40, 20, 10],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ]

  const cryptoAssets = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250', change: '+2.4%', volume: '$1.2B', icon: Bitcoin },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,680', change: '+1.8%', volume: '$890M', icon: Ethereum },
    { symbol: 'USDT', name: 'Tether', price: '$1.00', change: '+0.1%', volume: '$2.1B', icon: DollarSign },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '+0.1%', volume: '$1.5B', icon: DollarSign }
  ]

  const advancedTransactions = [
    {
      id: 'TXN-001',
      type: 'deposit',
      amount: '$12,450.00',
      currency: 'USDT',
      status: 'completed',
      time: '2 min ago',
      user: 'user_123',
      hash: '0x742d35Cc...',
      confirmations: 12,
      fee: '$2.50',
      network: 'TRON'
    },
    {
      id: 'TXN-002',
      type: 'withdrawal',
      amount: '$8,900.00',
      currency: 'BTC',
      status: 'processing',
      time: '5 min ago',
      user: 'user_456',
      hash: '0x1a2b3c4d...',
      confirmations: 3,
      fee: '$15.00',
      network: 'Bitcoin'
    },
    {
      id: 'TXN-003',
      type: 'deposit',
      amount: '$25,600.00',
      currency: 'ETH',
      status: 'completed',
      time: '8 min ago',
      user: 'user_789',
      hash: '0x9e8d7c6b...',
      confirmations: 18,
      fee: '$8.50',
      network: 'Ethereum'
    },
    {
      id: 'TXN-004',
      type: 'withdrawal',
      amount: '$3,200.00',
      currency: 'USDC',
      status: 'pending',
      time: '12 min ago',
      user: 'user_321',
      hash: '0x5f4e3d2c...',
      confirmations: 0,
      fee: '$1.20',
      network: 'Polygon'
    }
  ]

  const systemMetrics = [
    { name: 'CPU Usage', value: '23%', status: 'healthy', icon: Cpu },
    { name: 'Memory', value: '67%', status: 'warning', icon: HardDrive },
    { name: 'Network', value: '45%', status: 'healthy', icon: Wifi },
    { name: 'Storage', value: '34%', status: 'healthy', icon: Database }
  ]

  const alerts = [
    { type: 'info', message: 'System maintenance scheduled for 2:00 AM UTC', time: '1 hour ago' },
    { type: 'success', message: 'New security patch applied successfully', time: '3 hours ago' },
    { type: 'warning', message: 'High transaction volume detected', time: '5 hours ago' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
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
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      case 'processing':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'pending':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  const SparklineChart = ({ data, color }: { data: number[], color: string }) => (
    <div className="flex items-end space-x-1 h-8">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={`w-1 rounded-full ${color}`}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal">
      {/* Advanced Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-brand-teal/5 backdrop-blur-xl border-b border-brand-primary/10 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/25">
                  <span className="text-brand-dark font-bold text-xl">CF</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-brand-dark"></div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-brand-light">Coinfixi Dashboard</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-brand-light/70">Enterprise Payment Infrastructure</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-500 font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'transactions', label: 'Transactions', icon: Activity },
                { id: 'analytics', label: 'Analytics', icon: PieChart },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-brand-primary text-brand-dark shadow-lg shadow-brand-primary/25'
                      : 'text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Advanced Actions */}
            <div className="flex items-center space-x-3">
              {/* Timeframe Selector */}
              <div className="hidden md:flex items-center space-x-1 bg-brand-dark/50 rounded-xl p-1">
                {timeFrames.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setSelectedTimeframe(tf.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedTimeframe === tf.value
                        ? 'bg-brand-primary text-brand-dark'
                        : 'text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>

              {/* Real-time Toggle */}
              <button
                onClick={() => setRealTimeData(!realTimeData)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  realTimeData 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-brand-dark/50 text-brand-light/70 border border-brand-primary/20'
                }`}
              >
                {realTimeData ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline text-sm font-medium">Live</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="relative p-2 text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10 rounded-xl transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{notifications}</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Refresh */}
              <button className="p-2 text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10 rounded-xl transition-all duration-200">
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Profile */}
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 text-brand-light/70 hover:text-brand-light hover:bg-brand-primary/10 rounded-xl transition-all duration-200">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-brand-dark font-bold text-sm">EU</span>
                </div>
                <span className="hidden sm:inline text-sm font-medium">Enterprise User</span>
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Advanced Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-display font-bold text-brand-light mb-2">
                Welcome back, <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">Enterprise User</span>
              </h2>
              <p className="text-brand-light/70 text-lg">
                Here's your real-time payment infrastructure overview
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-brand-light/70">Last Updated</p>
                <p className="text-brand-primary font-mono text-sm">{new Date().toLocaleTimeString()}</p>
              </div>
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/20">
                <Activity className="w-6 h-6 text-brand-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {advancedStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`${stat.bgColor} backdrop-blur-xl rounded-3xl p-6 border ${stat.borderColor} hover:border-brand-primary/40 transition-all duration-300 cursor-pointer group`}
              onClick={() => setExpandedCard(expandedCard === stat.title ? null : stat.title)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-brand-light mb-1">{stat.value}</h3>
              <p className="text-brand-light/70 text-sm mb-3">{stat.title}</p>
              <p className="text-brand-light/50 text-xs mb-4">{stat.subtitle}</p>
              
              {/* Sparkline Chart */}
              <div className="mb-4">
                <SparklineChart data={stat.sparkline} color={stat.color.replace('text-', 'bg-')} />
              </div>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {expandedCard === stat.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-brand-primary/20 pt-4 mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-brand-light/50">Peak</p>
                        <p className="text-brand-light font-medium">$3.2M</p>
                      </div>
                      <div>
                        <p className="text-brand-light/50">Low</p>
                        <p className="text-brand-light font-medium">$1.8M</p>
                      </div>
                      <div>
                        <p className="text-brand-light/50">Avg</p>
                        <p className="text-brand-light font-medium">$2.6M</p>
                      </div>
                      <div>
                        <p className="text-brand-light/50">Growth</p>
                        <p className="text-emerald-500 font-medium">+24%</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Crypto Assets Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-brand-teal/5 backdrop-blur-xl rounded-3xl p-6 border border-brand-primary/10 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-bold text-brand-light">Crypto Assets</h3>
                <button className="p-2 text-brand-light/70 hover:text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all duration-200">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {cryptoAssets.map((asset, index) => (
                  <motion.div
                    key={asset.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-brand-dark/30 rounded-2xl border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <asset.icon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-light">{asset.symbol}</p>
                        <p className="text-xs text-brand-light/70">{asset.name}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-brand-light">{asset.price}</p>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-medium ${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                          {asset.change}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advanced Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="bg-brand-teal/5 backdrop-blur-xl rounded-3xl p-6 border border-brand-primary/10 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-display font-bold text-brand-light">Recent Transactions</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="p-2 text-brand-light/70 hover:text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all duration-200"
                    >
                      <Filter className="w-4 h-4" />
                    </button>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-light/50" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search transactions..."
                        className="pl-10 pr-4 py-2 bg-brand-dark/50 border border-brand-primary/20 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-brand-light/70 hover:text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all duration-200">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-brand-primary hover:text-brand-light transition-colors text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {advancedTransactions.map((txn, index) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-brand-dark/20 rounded-2xl border border-brand-primary/10 hover:border-brand-primary/30 hover:bg-brand-dark/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        txn.type === 'deposit' ? 'bg-emerald-500/20' : 'bg-blue-500/20'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        {txn.type === 'deposit' ? (
                          <ArrowDownLeft className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-light">{txn.id}</p>
                        <div className="flex items-center space-x-2 text-xs text-brand-light/70">
                          <span className="capitalize">{txn.type}</span>
                          <span>•</span>
                          <span>{txn.network}</span>
                          <span>•</span>
                          <span>{txn.confirmations} conf</span>
                        </div>
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
                      <div className="text-right text-xs text-brand-light/70">
                        <p>{txn.time}</p>
                        <p>Fee: {txn.fee}</p>
                      </div>
                      <button className="p-1 text-brand-light/50 hover:text-brand-light transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* System Metrics & Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* System Metrics */}
            <div className="bg-brand-teal/5 backdrop-blur-xl rounded-3xl p-6 border border-brand-primary/10">
              <h3 className="text-xl font-display font-bold text-brand-light mb-6">System Health</h3>
              
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-brand-dark/20 rounded-xl border border-brand-primary/10"
                  >
                    <div className="flex items-center space-x-3">
                      <metric.icon className="w-5 h-5 text-brand-primary" />
                      <span className="text-sm font-medium text-brand-light">{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-brand-light">{metric.value}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'healthy' ? 'bg-emerald-500' : 
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-brand-teal/5 backdrop-blur-xl rounded-3xl p-6 border border-brand-primary/10">
              <h3 className="text-xl font-display font-bold text-brand-light mb-6">System Alerts</h3>
              
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      alert.type === 'info' ? 'bg-blue-500/10 border-blue-500/20' :
                      alert.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20' :
                      'bg-yellow-500/10 border-yellow-500/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {alert.type === 'info' && <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />}
                      {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm text-brand-light">{alert.message}</p>
                        <p className="text-xs text-brand-light/70 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Advanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-brand-primary/5 to-brand-teal/5 backdrop-blur-xl rounded-3xl p-8 border border-brand-primary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold text-brand-light">Quick Actions</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-brand-light/70">Powered by AI</span>
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: Plus, label: 'Create Deposit', color: 'emerald' },
                { icon: ArrowUpRight, label: 'Process Withdrawal', color: 'blue' },
                { icon: Settings, label: 'API Settings', color: 'purple' },
                { icon: Shield, label: 'Security Center', color: 'red' },
                { icon: BarChart3, label: 'Analytics', color: 'yellow' },
                { icon: Download, label: 'Export Data', color: 'indigo' }
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 bg-brand-dark/30 hover:bg-brand-dark/50 rounded-2xl border border-brand-primary/10 hover:border-${action.color}-500/30 transition-all duration-200 group`}
                >
                  <div className={`w-12 h-12 bg-${action.color}-500/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-500`} />
                  </div>
                  <p className="text-sm font-medium text-brand-light text-center">{action.label}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default DashboardPage