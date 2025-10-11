'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from 'lucide-react'
import { Card, Chart, Loader } from '@/components/ui'
import { dashboardAPI, balancesAPI } from '@/lib/api'
import type { DashboardMetrics, Balance, TimeSeriesData } from '@/lib/types'

export default function DashboardHome() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [balances, setBalances] = useState<Balance[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d'>('30d')

  // TODO: Get tenant_id from auth context
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadData()
  }, [selectedPeriod])

  const loadData = async () => {
    try {
      setLoading(true)

      const [metricsRes, balancesRes, timeSeriesRes] = await Promise.all([
        dashboardAPI.getMetrics(tenantId, selectedPeriod),
        balancesAPI.list(tenantId),
        dashboardAPI.getTimeSeriesData(
          tenantId,
          getDateRange(selectedPeriod).from,
          getDateRange(selectedPeriod).to
        ),
      ])

      setMetrics(metricsRes.data)
      setBalances(balancesRes.data)
      setTimeSeriesData(timeSeriesRes.data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDateRange = (period: '7d' | '30d') => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - (period === '7d' ? 7 : 30))

    return {
      from: from.toISOString(),
      to: to.toISOString(),
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  // KPI Cards Data
  const kpiCards = metrics
    ? [
        {
          title: 'Volume Processed',
          value: formatCurrency(
            selectedPeriod === '7d' ? metrics.volumeProcessed7d : metrics.volumeProcessed30d
          ),
          change: 12.5,
          trend: 'up' as const,
          icon: DollarSign,
          color: 'text-[#16F98A]',
          bgColor: 'bg-[#16F98A]/10',
        },
        {
          title: 'Total Deposits',
          value: formatCurrency(metrics.totalDeposits),
          change: 8.3,
          trend: 'up' as const,
          icon: ArrowUpCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        },
        {
          title: 'Total Withdrawals',
          value: formatCurrency(metrics.totalWithdrawals),
          change: -3.2,
          trend: 'down' as const,
          icon: ArrowDownCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
        },
        {
          title: 'Success Rate',
          value: `${metrics.successRate.toFixed(2)}%`,
          change: 2.1,
          trend: 'up' as const,
          icon: Activity,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        },
      ]
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setSelectedPeriod('7d')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === '7d'
                  ? 'bg-[#16F98A] text-[#05220B]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setSelectedPeriod('30d')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === '30d'
                  ? 'bg-[#16F98A] text-[#05220B]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                      <div className="flex items-center mt-2">
                        {card.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {formatPercentage(card.change)}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Chart */}
          <Card title="Volume Trend" subtitle="Deposits vs Withdrawals over time">
            <Chart
              type="area"
              data={timeSeriesData}
              dataKeys={['deposits', 'withdrawals']}
              xAxisKey="date"
              colors={['#16F98A', '#134338']}
              height={300}
              loading={loading}
            />
          </Card>

          {/* Balance Distribution */}
          <Card title="Balance Distribution" subtitle="Current balance by asset">
            <Chart
              type="donut"
              data={balances.map((b) => ({
                name: b.asset,
                value: b.usd_value,
              }))}
              colors={['#16F98A', '#134338', '#0D8A9E', '#05220B']}
              height={300}
              loading={loading}
            />
          </Card>
        </div>

        {/* Balances Table */}
        <Card title="Current Balances" subtitle="Your cryptocurrency holdings">
          {loading ? (
            <Loader size="lg" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#134338] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Asset</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Available</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Reserved</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">USD Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {balances.map((balance) => (
                    <motion.tr
                      key={balance.asset}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Wallet className="w-5 h-5 text-[#16F98A] mr-2" />
                          <span className="font-medium text-gray-900">{balance.asset}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        {balance.available.toFixed(8)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {balance.reserved.toFixed(8)}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        {balance.total.toFixed(8)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#16F98A]">
                        {formatCurrency(balance.usd_value)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
