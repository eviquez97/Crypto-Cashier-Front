'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  ArrowUpCircle,
} from 'lucide-react'
import { Card, Table, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type { GlobalTransaction, GlobalTransactionFilters, TransactionAlert, Column } from '@/lib/types'

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<GlobalTransaction[]>([])
  const [alerts, setAlerts] = useState<TransactionAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTx, setSelectedTx] = useState<GlobalTransaction | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [filters, setFilters] = useState<GlobalTransactionFilters>({})
  const [adminNote, setAdminNote] = useState('')

  const toast = useToastActions()

  useEffect(() => {
    loadData()
  }, [filters])

  const loadData = async () => {
    try {
      setLoading(true)
      const [txRes, alertsRes] = await Promise.all([
        adminAPI.transactions.list(filters),
        adminAPI.transactions.getAlerts(),
      ])

      setTransactions(txRes.data)
      setAlerts(alertsRes.data)
    } catch (error) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (txId: string) => {
    try {
      await adminAPI.transactions.approve(txId)
      toast.success('Transaction approved')
      loadData()
    } catch (error) {
      toast.error('Failed to approve transaction')
    }
  }

  const handleReject = async (txId: string) => {
    try {
      await adminAPI.transactions.reject(txId, 'Rejected by admin')
      toast.success('Transaction rejected')
      loadData()
    } catch (error) {
      toast.error('Failed to reject transaction')
    }
  }

  const handleAddNote = async () => {
    try {
      if (!selectedTx) return
      await adminAPI.transactions.addNote(selectedTx.id, adminNote, true)
      toast.success('Note added')
      setAdminNote('')
      loadData()
    } catch (error) {
      toast.error('Failed to add note')
    }
  }

  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      await adminAPI.transactions.acknowledgeAlert(alertId)
      loadData()
    } catch (error) {
      toast.error('Failed to acknowledge alert')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const columns: Column<GlobalTransaction>[] = [
    {
      key: 'id',
      label: 'ID',
      width: '10%',
      render: (value) => (
        <span className="font-mono text-sm text-gray-400">{value.slice(0, 8)}...</span>
      ),
    },
    {
      key: 'client_name',
      label: 'Client',
      width: '15%',
      render: (value) => <span className="text-white font-medium">{value}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      width: '10%',
      render: (value) => <span className="text-gray-300 capitalize">{value}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      width: '15%',
      render: (value, row) => (
        <div>
          <p className="font-semibold text-white">
            {value.toFixed(8)} {row.currency}
          </p>
          {row.metadata?.usd_value && (
            <p className="text-sm text-gray-400">{formatCurrency(row.metadata.usd_value)}</p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '10%',
      render: (value) => {
        const variants = {
          completed: 'success',
          pending: 'warning',
          failed: 'error',
          confirming: 'info',
        } as const
        return <Badge variant={variants[value as keyof typeof variants] || 'default'}>{value}</Badge>
      },
    },
    {
      key: 'risk_score',
      label: 'Risk Score',
      width: '10%',
      render: (value) => (
        <span
          className={`font-medium ${
            value > 70 ? 'text-red-400' : value > 40 ? 'text-yellow-400' : 'text-green-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'aml_flags',
      label: 'AML Flags',
      width: '10%',
      render: (flags) => (
        <span className="text-gray-300">{flags.length > 0 ? flags.length : '-'}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      width: '12%',
      render: (value) => (
        <span className="text-sm text-gray-400">{new Date(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '8%',
      render: (_, row) => (
        <Button
          size="sm"
          variant="ghost"
          icon={<Eye className="w-4 h-4" />}
          onClick={() => {
            setSelectedTx(row)
            setShowDetailModal(true)
          }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Global Transactions</h1>
          <p className="text-gray-400 mt-1">Monitor and manage all platform transactions</p>
        </div>

        {/* Active Alerts */}
        {alerts.filter((a) => !a.acknowledged).length > 0 && (
          <Card className="bg-red-900/20 border-red-500">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-red-400">Active Alerts ({alerts.filter((a) => !a.acknowledged).length})</h3>
            </div>

            <div className="space-y-2">
              {alerts
                .filter((a) => !a.acknowledged)
                .slice(0, 3)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-3 bg-red-900/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{alert.description}</p>
                        <p className="text-xs text-gray-400">{alert.client_name}</p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Asset</label>
              <select
                onChange={(e) => setFilters({ ...filters, asset: e.target.value as any })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                <option value="all">All</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Approval</label>
              <select
                onChange={(e) =>
                  setFilters({ ...filters, requires_approval: e.target.value === 'true' })
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                <option value="">All</option>
                <option value="true">Requires Approval</option>
                <option value="false">Approved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">AML Flags</label>
              <select
                onChange={(e) =>
                  setFilters({ ...filters, has_aml_flags: e.target.value === 'true' })
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                <option value="">All</option>
                <option value="true">Has Flags</option>
                <option value="false">No Flags</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="ghost" fullWidth onClick={() => setFilters({})}>
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card className="bg-gray-800 border-gray-700">
          <Table
            data={transactions}
            columns={columns}
            loading={loading}
            searchable
            searchPlaceholder="Search by ID, client, hash..."
            emptyMessage="No transactions found"
          />
        </Card>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Transaction Details"
        size="xl"
      >
        {selectedTx && (
          <div className="space-y-6">
            {/* Actions for pending approval */}
            {selectedTx.requires_approval && selectedTx.status === 'pending' && (
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <p className="flex-1 text-sm text-yellow-800">
                  This transaction requires manual approval
                </p>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<CheckCircle className="w-4 h-4" />}
                    onClick={() => handleApprove(selectedTx.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    icon={<XCircle className="w-4 h-4" />}
                    onClick={() => handleReject(selectedTx.id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Client</label>
                <p className="font-medium text-gray-900 mt-1">{selectedTx.client_name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Risk Score</label>
                <p className="font-medium text-gray-900 mt-1">{selectedTx.risk_score}/100</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Amount</label>
                <p className="font-medium text-gray-900 mt-1">
                  {selectedTx.amount.toFixed(8)} {selectedTx.currency}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">USD Value</label>
                <p className="font-medium text-gray-900 mt-1">
                  {selectedTx.metadata?.usd_value
                    ? formatCurrency(selectedTx.metadata.usd_value)
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* AML Flags */}
            {selectedTx.aml_flags.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">AML Flags</h4>
                <div className="space-y-2">
                  {selectedTx.aml_flags.map((flag) => (
                    <div
                      key={flag.type}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-red-900">{flag.type.replace('_', ' ')}</p>
                          <p className="text-sm text-red-700 mt-1">{flag.description}</p>
                        </div>
                        <Badge
                          variant={
                            flag.severity === 'critical'
                              ? 'error'
                              : flag.severity === 'high'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {flag.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Admin Notes</h4>
              <div className="space-y-2 mb-3">
                {selectedTx.admin_notes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{note.note}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {note.created_by} on {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <Button
                  variant="primary"
                  icon={<FileText className="w-4 h-4" />}
                  onClick={handleAddNote}
                  disabled={!adminNote}
                >
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

