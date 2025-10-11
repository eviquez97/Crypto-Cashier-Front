'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  Activity,
  Globe,
  BarChart3,
  CheckCircle,
} from 'lucide-react'
import { Card, Chart, Badge, Button } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type { GlobalKPIs, RegionalData, TrendData, Client } from '@/lib/types'

export default function AdminDashboard() {
  const [kpis, setKpis] = useState<GlobalKPIs | null>(null)
  const [regionalData, setRegionalData] = useState<RegionalData[]>([])
  const [trends, setTrends] = useState<TrendData[]>([])
  const [topClients, setTopClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.dashboard.getData()
      const data = response.data

      setKpis(data.kpis)
      setRegionalData(data.regional_data)
      setTrends(data.trends)
      setTopClients(data.top_clients)
    } catch (error) {
      console.error('Failed to load admin dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(value)
  }

  const kpiCards = kpis
    ? [
        {
          title: 'Volume Today',
          value: formatCurrency(kpis.total_volume_today),
          icon: DollarSign,
          color: 'text-[#16F98A]',
          bgColor: 'bg-[#16F98A]/10',
        },
        {
          title: 'Volume This Month',
          value: formatCurrency(kpis.total_volume_month),
          icon: TrendingUp,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        },
        {
          title: 'Active Clients',
          value: kpis.active_clients,
          icon: Users,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
        },
        {
          title: 'New Integrations',
          value: kpis.new_integrations,
          icon: Activity,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        },
        {
          title: 'Active Alerts',
          value: kpis.active_alerts,
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
        },
        {
          title: 'System Health',
          value: kpis.system_health,
          icon: kpis.system_health === 'healthy' ? CheckCircle : AlertTriangle,
          color:
            kpis.system_health === 'healthy'
              ? 'text-green-600'
              : kpis.system_health === 'warning'
              ? 'text-yellow-600'
              : 'text-red-600',
          bgColor:
            kpis.system_health === 'healthy'
              ? 'bg-green-100'
              : kpis.system_health === 'warning'
              ? 'bg-yellow-100'
              : 'bg-red-100',
        },
      ]
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Global overview and control center</p>
          </div>

          <Button
            variant="primary"
            icon={<Activity className="w-4 h-4" />}
            onClick={loadData}
          >
            Refresh
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{card.title}</p>
                    <h3 className="text-2xl font-bold text-white">
                      {typeof card.value === 'string' ? card.value : card.value.toLocaleString()}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Trend */}
          <Card className="bg-gray-800 border-gray-700" title="Growth Trend">
            <Chart
              type="line"
              data={trends}
              dataKeys={['volume', 'clients']}
              xAxisKey="date"
              colors={['#16F98A', '#134338']}
              height={300}
              loading={loading}
            />
          </Card>

          {/* Deposits vs Withdrawals */}
          <Card className="bg-gray-800 border-gray-700" title="Deposits vs Withdrawals">
            <Chart
              type="area"
              data={trends}
              dataKeys={['deposits', 'withdrawals']}
              xAxisKey="date"
              colors={['#16F98A', '#FF6B6B']}
              height={300}
              loading={loading}
            />
          </Card>
        </div>

        {/* Regional Distribution */}
        <Card className="bg-gray-800 border-gray-700" title="Clients by Region">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regionalData.slice(0, 8).map((region) => (
              <div key={region.country} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-[#16F98A]" />
                  <span className="text-sm font-medium text-white">{region.country}</span>
                </div>
                <p className="text-2xl font-bold text-white">{region.clients_count}</p>
                <p className="text-sm text-gray-400">
                  {formatCurrency(region.volume)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Clients */}
        <Card className="bg-gray-800 border-gray-700" title="Top 5 Clients by Volume">
          <div className="space-y-3">
            {topClients.map((client, index) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#16F98A]/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[#16F98A]">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{client.business_name}</p>
                    <p className="text-sm text-gray-400">{client.country}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#16F98A]">
                    {formatCurrency(client.monthly_volume)}
                  </p>
                  <p className="text-sm text-gray-400">this month</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

