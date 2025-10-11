'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FileText, Download, Calendar, Filter, TrendingUp, DollarSign } from 'lucide-react'
import { Card, Table, Button, Badge, Chart, useToastActions } from '@/components/ui'
import { reportsAPI } from '@/lib/api'
import type { Report, ReportType, ReportPeriod, ReportFormat, Column } from '@/lib/types'

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month')
  const [chartData, setChartData] = useState<any[]>([])

  const toast = useToastActions()
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadReports()
    loadChartData()
  }, [selectedPeriod])

  const loadReports = async () => {
    try {
      setLoading(true)
      const response = await reportsAPI.list(tenantId)
      setReports(response.data)
    } catch (error) {
      toast.error('Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  const loadChartData = async () => {
    // Mock chart data
    setChartData([
      { date: '2025-10-01', volume: 45000, fees: 900, transactions: 120 },
      { date: '2025-10-02', volume: 52000, fees: 1040, transactions: 145 },
      { date: '2025-10-03', volume: 48000, fees: 960, transactions: 132 },
      { date: '2025-10-04', volume: 61000, fees: 1220, transactions: 167 },
      { date: '2025-10-05', volume: 58000, fees: 1160, transactions: 154 },
      { date: '2025-10-06', volume: 65000, fees: 1300, transactions: 178 },
      { date: '2025-10-07', volume: 72000, fees: 1440, transactions: 195 },
    ])
  }

  const handleGenerateReport = async (type: ReportType, format: ReportFormat) => {
    try {
      await reportsAPI.generate(tenantId, {
        type,
        period: selectedPeriod,
        format,
      })
      toast.success('Report generation started')
      loadReports()
    } catch (error) {
      toast.error('Failed to generate report')
    }
  }

  const columns: Column<Report>[] = [
    {
      key: 'type',
      label: 'Type',
      width: '20%',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-[#16F98A]" />
          <span className="font-medium text-gray-900 capitalize">{value}</span>
        </div>
      ),
    },
    {
      key: 'period',
      label: 'Period',
      width: '15%',
      render: (value) => <span className="text-gray-600 capitalize">{value}</span>,
    },
    {
      key: 'format',
      label: 'Format',
      width: '10%',
      render: (value) => <Badge variant="info">{value.toUpperCase()}</Badge>,
    },
    {
      key: 'created_at',
      label: 'Created',
      width: '20%',
      render: (value) => (
        <span className="text-sm text-gray-600">{new Date(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '15%',
      render: (value) => {
        const variants = {
          ready: 'success',
          generating: 'warning',
          failed: 'error',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '20%',
      render: (_, row) =>
        row.status === 'ready' ? (
          <Button
            variant="primary"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              window.open(reportsAPI.download(tenantId, row.id), '_blank')
            }}
          >
            Download
          </Button>
        ) : (
          <span className="text-sm text-gray-500">Processing...</span>
        ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download custom reports</p>
        </div>

        {/* Quick Generate */}
        <Card title="Quick Generate" subtitle="Generate reports instantly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['transactions', 'balance', 'fees'] as ReportType[]).map((type) => (
              <Card key={type} hover className="border-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 capitalize mb-3">{type} Report</h3>
                <div className="space-y-2">
                  {(['csv', 'pdf', 'excel'] as ReportFormat[]).map((format) => (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => handleGenerateReport(type, format)}
                    >
                      Download {format.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Interactive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Volume Trend" subtitle="Daily volume over time">
            <Chart
              type="line"
              data={chartData}
              dataKeys={['volume']}
              xAxisKey="date"
              colors={['#16F98A']}
              height={300}
            />
          </Card>

          <Card title="Fees Collected" subtitle="Platform fees by day">
            <Chart
              type="bar"
              data={chartData}
              dataKeys={['fees']}
              xAxisKey="date"
              colors={['#134338']}
              height={300}
            />
          </Card>
        </div>

        {/* Generated Reports */}
        <Card title="Generated Reports" subtitle="Your previously generated reports">
          <Table
            data={reports}
            columns={columns}
            loading={loading}
            emptyMessage="No reports generated yet"
          />
        </Card>
      </div>
    </div>
  )
}

