'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  ExternalLink,
  Calendar,
  RefreshCw,
} from 'lucide-react'
import { Card, Table, Modal, Badge, Button, useToastActions } from '@/components/ui'
import { transactionsAPI } from '@/lib/api'
import type { Transaction, TransactionFilters, Column } from '@/lib/types'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all',
    status: 'all',
    currency: 'all',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const toast = useToastActions()
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadTransactions()
  }, [filters, currentPage])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      const response = await transactionsAPI.list(tenantId, filters, currentPage, 25)
      setTransactions(response.data)
      setTotalPages(response.pagination.pages)
    } catch (error) {
      toast.error('Failed to load transactions')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    loadTransactions()
    toast.info('Transactions refreshed')
  }

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowDetailModal(true)
  }

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    toast.success('Transaction hash copied!')
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success('Address copied!')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'success',
      pending: 'warning',
      confirming: 'info',
      failed: 'error',
      expired: 'default',
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>
  }

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toFixed(8)} ${currency}`
  }

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  const columns: Column<Transaction>[] = [
    {
      key: 'id',
      label: 'ID',
      width: '10%',
      render: (value) => (
        <span className="font-mono text-sm text-gray-600">{value.slice(0, 8)}...</span>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      width: '10%',
      render: (value) => (
        <span className="capitalize font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'chain',
      label: 'Chain',
      width: '8%',
      render: (value) => (
        <Badge variant="info" size="sm">
          {value}
        </Badge>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      width: '15%',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">
            {formatAmount(value, row.currency)}
          </div>
          {row.metadata?.usd_value && (
            <div className="text-sm text-gray-500">
              {formatUSD(row.metadata.usd_value)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'confirmations',
      label: 'Confirmations',
      width: '12%',
      render: (value, row) => (
        <span className="text-sm text-gray-600">
          {value}/{row.required_confirmations}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      width: '15%',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '8%',
      render: (_, row) => (
        <Button
          variant="ghost"
          size="sm"
          icon={<Eye className="w-4 h-4" />}
          onClick={() => handleViewDetails(row)}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-1">View and manage all your transactions</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
            <Button
              variant="secondary"
              icon={<Download className="w-4 h-4" />}
              onClick={() => toast.info('Export feature coming soon')}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="fee">Fee</option>
                <option value="conversion">Conversion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirming">Confirming</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={filters.currency}
                onChange={(e) => setFilters({ ...filters, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A] focus:border-transparent"
              >
                <option value="all">All Currencies</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="TRX">Tron (TRX)</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="ghost"
                fullWidth
                onClick={() =>
                  setFilters({ type: 'all', status: 'all', currency: 'all' })
                }
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card>
          <Table
            data={transactions}
            columns={columns}
            loading={loading}
            searchable
            searchPlaceholder="Search by ID, hash, or address..."
            emptyMessage="No transactions found"
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Transaction Details"
        size="lg"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedTransaction.type.toUpperCase()}
              </h3>
              {getStatusBadge(selectedTransaction.status)}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Transaction ID</label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm font-mono text-gray-900">
                    {selectedTransaction.id}
                  </code>
                  <button onClick={() => handleCopyHash(selectedTransaction.id)}>
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Chain</label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {selectedTransaction.chain}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Amount</label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
                </p>
                {selectedTransaction.metadata?.usd_value && (
                  <p className="text-sm text-gray-500">
                    {formatUSD(selectedTransaction.metadata.usd_value)}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600">Network Fee</label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {selectedTransaction.fee
                    ? formatAmount(selectedTransaction.fee, selectedTransaction.currency)
                    : 'N/A'}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Confirmations</label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {selectedTransaction.confirmations}/{selectedTransaction.required_confirmations}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Created</label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {formatDate(selectedTransaction.created_at)}
                </p>
              </div>
            </div>

            {/* Addresses */}
            {selectedTransaction.from_address && (
              <div>
                <label className="text-sm text-gray-600">From Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm font-mono text-gray-900 break-all">
                    {selectedTransaction.from_address}
                  </code>
                  <button onClick={() => handleCopyAddress(selectedTransaction.from_address!)}>
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600">To Address</label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="text-sm font-mono text-gray-900 break-all">
                  {selectedTransaction.to_address}
                </code>
                <button onClick={() => handleCopyAddress(selectedTransaction.to_address)}>
                  <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Transaction Hash */}
            {selectedTransaction.tx_hash && (
              <div>
                <label className="text-sm text-gray-600">Transaction Hash</label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm font-mono text-gray-900 break-all">
                    {selectedTransaction.tx_hash}
                  </code>
                  <button onClick={() => handleCopyHash(selectedTransaction.tx_hash!)}>
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                  <a
                    href={`https://blockchain.info/tx/${selectedTransaction.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#16F98A] hover:text-[#13D978]" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

