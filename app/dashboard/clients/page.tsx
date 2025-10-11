'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Users, Plus, MoreHorizontal, Pause, Play, Download, TrendingUp } from 'lucide-react'
import { Card, Table, Modal, Button, Badge, useToastActions } from '@/components/ui'
import { subAccountsAPI } from '@/lib/api'
import type { SubAccount, Column } from '@/lib/types'

export default function ClientsPage() {
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'sala' as 'sala' | 'usuario_final',
    daily_limit: 10000,
    weekly_limit: 50000,
  })

  const toast = useToastActions()
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadSubAccounts()
  }, [])

  const loadSubAccounts = async () => {
    try {
      setLoading(true)
      const response = await subAccountsAPI.list(tenantId)
      setSubAccounts(response.data)
    } catch (error) {
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSubAccount = async () => {
    try {
      await subAccountsAPI.create(tenantId, newAccount)
      toast.success('Client created successfully')
      setShowCreateModal(false)
      loadSubAccounts()
      setNewAccount({ name: '', type: 'sala', daily_limit: 10000, weekly_limit: 50000 })
    } catch (error) {
      toast.error('Failed to create client')
    }
  }

  const handleSuspend = async (id: string) => {
    try {
      await subAccountsAPI.suspend(tenantId, id)
      toast.success('Client suspended')
      loadSubAccounts()
    } catch (error) {
      toast.error('Failed to suspend client')
    }
  }

  const handleResume = async (id: string) => {
    try {
      await subAccountsAPI.resume(tenantId, id)
      toast.success('Client resumed')
      loadSubAccounts()
    } catch (error) {
      toast.error('Failed to resume client')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const columns: Column<SubAccount>[] = [
    {
      key: 'name',
      label: 'Name',
      width: '20%',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#16F98A]/10 rounded-lg">
            <Users className="w-5 h-5 text-[#16F98A]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 capitalize">{row.type.replace('_', ' ')}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'daily_limit',
      label: 'Daily Limit',
      width: '15%',
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{formatCurrency(value)}</p>
          <p className="text-sm text-gray-500">
            Used: {formatCurrency(row.current_daily_usage)}
          </p>
        </div>
      ),
    },
    {
      key: 'weekly_limit',
      label: 'Weekly Limit',
      width: '15%',
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{formatCurrency(value)}</p>
          <p className="text-sm text-gray-500">
            Used: {formatCurrency(row.current_weekly_usage)}
          </p>
        </div>
      ),
    },
    {
      key: 'balances',
      label: 'Total Balance',
      width: '15%',
      render: (balances) => {
        const total = balances.reduce((sum: number, b: any) => sum + b.usd_value, 0)
        return <span className="font-bold text-[#16F98A]">{formatCurrency(total)}</span>
      },
    },
    {
      key: 'status',
      label: 'Status',
      width: '10%',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>{value}</Badge>
      ),
    },
    {
      key: 'last_activity',
      label: 'Last Activity',
      width: '15%',
      render: (value) => (
        <span className="text-sm text-gray-600">
          {value ? new Date(value).toLocaleDateString() : 'Never'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '12%',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          {row.status === 'active' ? (
            <button
              onClick={() => handleSuspend(row.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Suspend"
            >
              <Pause className="w-4 h-4 text-red-600" />
            </button>
          ) : (
            <button
              onClick={() => handleResume(row.id)}
              className="p-2 hover:bg-green-50 rounded-lg transition-colors"
              title="Resume"
            >
              <Play className="w-4 h-4 text-green-600" />
            </button>
          )}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="More actions"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients & Sub-Accounts</h1>
            <p className="text-gray-600 mt-1">Manage rooms and end users</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              icon={<Download className="w-4 h-4" />}
              onClick={() => toast.info('Export feature coming soon')}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowCreateModal(true)}
            >
              Create Client
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <h3 className="text-2xl font-bold text-gray-900">{subAccounts.length}</h3>
              </div>
              <Users className="w-8 h-8 text-[#16F98A]" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {subAccounts.filter((a) => a.status === 'active').length}
                </h3>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <h3 className="text-2xl font-bold text-red-600">
                  {subAccounts.filter((a) => a.status === 'suspended').length}
                </h3>
              </div>
              <Pause className="w-8 h-8 text-red-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <h3 className="text-2xl font-bold text-[#16F98A]">
                  {formatCurrency(
                    subAccounts.reduce(
                      (sum, a) =>
                        sum + a.balances.reduce((s, b) => s + b.usd_value, 0),
                      0
                    )
                  )}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <Table
            data={subAccounts}
            columns={columns}
            loading={loading}
            searchable
            searchPlaceholder="Search clients..."
            emptyMessage="No clients found. Create your first client to get started."
          />
        </Card>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Client"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              placeholder="e.g., VIP Room 1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newAccount.type}
              onChange={(e) =>
                setNewAccount({ ...newAccount, type: e.target.value as any })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            >
              <option value="sala">Sala</option>
              <option value="usuario_final">Usuario Final</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Limit</label>
            <input
              type="number"
              value={newAccount.daily_limit}
              onChange={(e) =>
                setNewAccount({ ...newAccount, daily_limit: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Limit</label>
            <input
              type="number"
              value={newAccount.weekly_limit}
              onChange={(e) =>
                setNewAccount({ ...newAccount, weekly_limit: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            />
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <Button variant="ghost" fullWidth onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleCreateSubAccount}
              disabled={!newAccount.name}
            >
              Create Client
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

