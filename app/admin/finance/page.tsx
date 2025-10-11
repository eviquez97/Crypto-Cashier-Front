'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Card, Chart, Table, Button, Badge, useToastActions } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type { FinancialMetrics, CommissionReport, Invoice, Column } from '@/lib/types'

export default function FinancePage() {
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null)
  const [commissions, setCommissions] = useState<CommissionReport[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'month' | 'year'>('month')

  const toast = useToastActions()

  useEffect(() => {
    loadData()
  }, [selectedPeriod])

  const loadData = async () => {
    try {
      setLoading(true)
      const [metricsRes, commissionsRes, invoicesRes] = await Promise.all([
        adminAPI.finance.getMetrics(selectedPeriod),
        adminAPI.finance.listCommissions(),
        adminAPI.finance.listInvoices(),
      ])

      setMetrics(metricsRes.data)
      setCommissions(commissionsRes.data)
      setInvoices(invoicesRes.data)
    } catch (error) {
      toast.error('Failed to load financial data')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const commissionsColumns: Column<CommissionReport>[] = [
    {
      key: 'client_name',
      label: 'Client',
      width: '25%',
      render: (value) => <span className="font-medium text-white">{value}</span>,
    },
    {
      key: 'volume',
      label: 'Volume',
      width: '20%',
      render: (value) => <span className="text-gray-300">{formatCurrency(value)}</span>,
    },
    {
      key: 'fee_percentage',
      label: 'Fee %',
      width: '10%',
      render: (value) => <span className="text-gray-300">{value}%</span>,
    },
    {
      key: 'platform_fees',
      label: 'Platform Fees',
      width: '15%',
      render: (value) => (
        <span className="font-semibold text-[#16F98A]">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'payment_status',
      label: 'Status',
      width: '15%',
      render: (value) => {
        const variants = {
          paid: 'success',
          pending: 'warning',
          overdue: 'error',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'period',
      label: 'Period',
      width: '15%',
      render: (value) => <span className="text-sm text-gray-400">{value}</span>,
    },
  ]

  const invoicesColumns: Column<Invoice>[] = [
    {
      key: 'id',
      label: 'Invoice #',
      width: '15%',
      render: (value) => <span className="font-mono text-sm text-gray-400">{value.slice(0, 8)}</span>,
    },
    {
      key: 'client_name',
      label: 'Client',
      width: '25%',
      render: (value) => <span className="text-white">{value}</span>,
    },
    {
      key: 'total_amount',
      label: 'Amount',
      width: '15%',
      render: (value) => (
        <span className="font-semibold text-[#16F98A]">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '15%',
      render: (value) => {
        const variants = {
          paid: 'success',
          sent: 'info',
          draft: 'warning',
          overdue: 'error',
          cancelled: 'default',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'due_date',
      label: 'Due Date',
      width: '15%',
      render: (value) => (
        <span className="text-sm text-gray-400">{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '15%',
      render: (_, row) => (
        <Button
          size="sm"
          variant="outline"
          icon={<Download className="w-4 h-4" />}
          onClick={() => window.open(row.pdf_url, '_blank')}
        >
          Download
        </Button>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Finance & Revenue</h1>
            <p className="text-gray-400 mt-1">Track commissions and financial metrics</p>
          </div>

          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            {(['today', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                  selectedPeriod === period
                    ? 'bg-[#16F98A] text-[#05220B]'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue KPIs */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-[#16F98A]">
                    {formatCurrency(
                      selectedPeriod === 'today'
                        ? metrics.total_revenue_today
                        : selectedPeriod === 'month'
                        ? metrics.total_revenue_month
                        : metrics.total_revenue_year
                    )}
                  </h3>
                </div>
                <DollarSign className="w-10 h-10 text-[#16F98A]" />
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Projected Monthly</p>
                  <h3 className="text-3xl font-bold text-blue-400">
                    {formatCurrency(metrics.projected_monthly_revenue)}
                  </h3>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-400" />
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Fee %</p>
                  <h3 className="text-3xl font-bold text-purple-400">
                    {metrics.average_fee_percentage.toFixed(2)}%
                  </h3>
                </div>
                <PieChart className="w-10 h-10 text-purple-400" />
              </div>
            </Card>
          </div>
        )}

        {/* Revenue Charts */}
        {metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700" title="Revenue Trend">
              <Chart
                type="line"
                data={metrics.revenue_trend}
                dataKeys={['revenue']}
                xAxisKey="date"
                colors={['#16F98A']}
                height={300}
              />
            </Card>

            <Card className="bg-gray-800 border-gray-700" title="Revenue by Client">
              <Chart
                type="pie"
                data={metrics.revenue_by_client.slice(0, 5).map((r) => ({
                  name: r.client_name,
                  value: r.revenue,
                }))}
                colors={['#16F98A', '#134338', '#0D8A9E', '#05220B', '#FFFFFF']}
                height={300}
              />
            </Card>
          </div>
        )}

        {/* Commissions Table */}
        <Card className="bg-gray-800 border-gray-700" title="Commission Reports">
          <Table
            data={commissions}
            columns={commissionsColumns}
            loading={loading}
            searchable
            emptyMessage="No commission data"
          />
        </Card>

        {/* Invoices Table */}
        <Card className="bg-gray-800 border-gray-700" title="Invoices">
          <Table
            data={invoices}
            columns={invoicesColumns}
            loading={loading}
            searchable
            emptyMessage="No invoices"
          />
        </Card>
      </div>
    </div>
  )
}

