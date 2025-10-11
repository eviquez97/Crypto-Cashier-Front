'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Users,
  Pause,
  Play,
  Edit,
  Eye,
  Download,
  Filter,
  UserCog,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { Card, Table, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type { Client, ClientFilters, ClientLimits, Column } from '@/lib/types'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showLimitsModal, setShowLimitsModal] = useState(false)
  const [limits, setLimits] = useState<ClientLimits | null>(null)
  const [filters, setFilters] = useState<ClientFilters>({})

  const toast = useToastActions()

  useEffect(() => {
    loadClients()
  }, [filters])

  const loadClients = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.clients.list(filters)
      setClients(response.data)
    } catch (error) {
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  const handleSuspend = async (clientId: string) => {
    try {
      await adminAPI.clients.suspend(clientId, 'Suspended by admin')
      toast.success('Client suspended')
      loadClients()
    } catch (error) {
      toast.error('Failed to suspend client')
    }
  }

  const handleResume = async (clientId: string) => {
    try {
      await adminAPI.clients.resume(clientId)
      toast.success('Client resumed')
      loadClients()
    } catch (error) {
      toast.error('Failed to resume client')
    }
  }

  const handleEditLimits = (client: Client) => {
    setSelectedClient(client)
    setLimits(client.custom_limits)
    setShowLimitsModal(true)
  }

  const handleSaveLimits = async () => {
    try {
      if (!selectedClient || !limits) return
      await adminAPI.clients.updateLimits(selectedClient.id, limits)
      toast.success('Limits updated')
      setShowLimitsModal(false)
      loadClients()
    } catch (error) {
      toast.error('Failed to update limits')
    }
  }

  const handleImpersonate = async (clientId: string) => {
    try {
      const res = await adminAPI.clients.impersonate(clientId)
      // Set the impersonation token and redirect to client dashboard
      toast.success('Impersonating client...')
      // TODO: Implement actual impersonation
    } catch (error) {
      toast.error('Failed to impersonate client')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const columns: Column<Client>[] = [
    {
      key: 'business_name',
      label: 'Business',
      width: '20%',
      render: (value, row) => (
        <div>
          <p className="font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'country',
      label: 'Country',
      width: '10%',
      render: (value) => <span className="text-gray-300">{value}</span>,
    },
    {
      key: 'monthly_volume',
      label: 'Monthly Volume',
      width: '15%',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-[#16F98A]">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'account_status',
      label: 'Status',
      width: '10%',
      render: (value) => {
        const variants = {
          active: 'success',
          suspended: 'error',
          pending: 'warning',
          closed: 'default',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'kyc_status',
      label: 'KYC',
      width: '10%',
      render: (value) => {
        const variants = {
          verified: 'success',
          pending: 'warning',
          rejected: 'error',
          not_started: 'default',
        } as const
        return (
          <Badge variant={variants[value as keyof typeof variants]}>
            {value.replace('_', ' ')}
          </Badge>
        )
      },
    },
    {
      key: 'risk_level',
      label: 'Risk',
      width: '10%',
      render: (value) => {
        const variants = {
          low: 'success',
          medium: 'warning',
          high: 'error',
          critical: 'error',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'last_activity',
      label: 'Last Activity',
      width: '15%',
      render: (value) => (
        <span className="text-sm text-gray-400">{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '10%',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          {row.account_status === 'active' ? (
            <button
              onClick={() => handleSuspend(row.id)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Suspend"
            >
              <Pause className="w-4 h-4 text-red-400" />
            </button>
          ) : (
            <button
              onClick={() => handleResume(row.id)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Resume"
            >
              <Play className="w-4 h-4 text-green-400" />
            </button>
          )}
          <button
            onClick={() => handleEditLimits(row)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Edit Limits"
          >
            <Edit className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => handleImpersonate(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Impersonate"
          >
            <UserCog className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Client Management</h1>
            <p className="text-gray-400 mt-1">Manage all sportsbooks and casinos</p>
          </div>

          <Button variant="primary" icon={<Download className="w-4 h-4" />}>
            Export All
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Clients</p>
                <h3 className="text-2xl font-bold text-white">{clients.length}</h3>
              </div>
              <Users className="w-8 h-8 text-[#16F98A]" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <h3 className="text-2xl font-bold text-green-400">
                  {clients.filter((c) => c.account_status === 'active').length}
                </h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending KYC</p>
                <h3 className="text-2xl font-bold text-yellow-400">
                  {clients.filter((c) => c.kyc_status === 'pending').length}
                </h3>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Risk</p>
                <h3 className="text-2xl font-bold text-red-400">
                  {clients.filter((c) => c.risk_level === 'high' || c.risk_level === 'critical').length}
                </h3>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#16F98A]"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">KYC Status</label>
              <select
                onChange={(e) => setFilters({ ...filters, kyc_status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#16F98A]"
              >
                <option value="">All</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Risk Level</label>
              <select
                onChange={(e) => setFilters({ ...filters, risk_level: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#16F98A]"
              >
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="ghost" fullWidth onClick={() => setFilters({})}>
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Clients Table */}
        <Card className="bg-gray-800 border-gray-700">
          <Table
            data={clients}
            columns={columns}
            loading={loading}
            searchable
            searchPlaceholder="Search clients..."
            emptyMessage="No clients found"
          />
        </Card>
      </div>

      {/* Edit Limits Modal */}
      <Modal
        isOpen={showLimitsModal}
        onClose={() => setShowLimitsModal(false)}
        title="Edit Client Limits"
        size="md"
      >
        {limits && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Withdrawal Limit
              </label>
              <input
                type="number"
                value={limits.daily_withdrawal_limit}
                onChange={(e) =>
                  setLimits({ ...limits, daily_withdrawal_limit: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Volume Limit
              </label>
              <input
                type="number"
                value={limits.monthly_volume_limit}
                onChange={(e) =>
                  setLimits({ ...limits, monthly_volume_limit: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Single Transaction Max
              </label>
              <input
                type="number"
                value={limits.single_transaction_max}
                onChange={(e) =>
                  setLimits({ ...limits, single_transaction_max: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button variant="ghost" fullWidth onClick={() => setShowLimitsModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth onClick={handleSaveLimits}>
                Save Limits
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

