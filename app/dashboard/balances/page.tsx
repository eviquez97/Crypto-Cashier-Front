'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
} from 'lucide-react'
import { Card, Chart, Button, Modal, Badge, useToastActions } from '@/components/ui'
import { balancesAPI, transactionsAPI, withdrawalsAPI } from '@/lib/api'
import type { Balance, Transaction } from '@/lib/types'

export default function BalancesPage() {
  const [balances, setBalances] = useState<Balance[]>([])
  const [recentMovements, setRecentMovements] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<string>('')
  const [hideBalances, setHideBalances] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawAddress, setWithdrawAddress] = useState('')

  const toast = useToastActions()
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [balancesRes, movementsRes] = await Promise.all([
        balancesAPI.list(tenantId),
        balancesAPI.getMovements(tenantId, undefined, 10),
      ])

      setBalances(balancesRes.data)
      setRecentMovements(movementsRes.data)
    } catch (error) {
      toast.error('Failed to load balances')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeposit = (asset: string) => {
    setSelectedAsset(asset)
    setShowDepositModal(true)
  }

  const handleWithdraw = (asset: string) => {
    setSelectedAsset(asset)
    setShowWithdrawModal(true)
  }

  const handleWithdrawSubmit = async () => {
    try {
      // TODO: Implement actual withdrawal
      toast.success('Withdrawal request submitted')
      setShowWithdrawModal(false)
      setWithdrawAmount('')
      setWithdrawAddress('')
    } catch (error) {
      toast.error('Failed to create withdrawal')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const getTotalBalance = () => {
    return balances.reduce((sum, b) => sum + b.usd_value, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Balances & Wallets</h1>
            <p className="text-gray-600 mt-1">Manage your cryptocurrency holdings</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              icon={hideBalances ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              onClick={() => setHideBalances(!hideBalances)}
            >
              {hideBalances ? 'Show' : 'Hide'} Balances
            </Button>
            <Button
              variant="outline"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={loadData}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Total Balance Card */}
        <Card className="bg-gradient-to-br from-[#134338] to-[#0D8A9E] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-2">Total Balance (USD)</p>
              <h2 className="text-4xl font-bold">
                {hideBalances ? '••••••' : formatCurrency(getTotalBalance())}
              </h2>
              <div className="flex items-center mt-3">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12.5% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white/10 rounded-full">
              <Wallet className="w-12 h-12" />
            </div>
          </div>
        </Card>

        {/* Balance Distribution */}
        <Card title="Balance Distribution" subtitle="Your assets by percentage">
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

        {/* Balances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {balances.map((balance) => (
            <motion.div
              key={balance.asset}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-[#16F98A]/10 rounded-lg">
                      <Wallet className="w-6 h-6 text-[#16F98A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{balance.asset}</h3>
                      <p className="text-sm text-gray-600">
                        {hideBalances ? '••••••' : balance.total.toFixed(8)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    Active
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-medium text-gray-900">
                      {hideBalances ? '••••••' : balance.available.toFixed(8)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reserved:</span>
                    <span className="font-medium text-gray-900">
                      {hideBalances ? '••••••' : balance.reserved.toFixed(8)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-gray-600">USD Value:</span>
                    <span className="font-bold text-[#16F98A]">
                      {hideBalances ? '••••••' : formatCurrency(balance.usd_value)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon={<ArrowUpCircle className="w-4 h-4" />}
                    onClick={() => handleDeposit(balance.asset)}
                  >
                    Deposit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<ArrowDownCircle className="w-4 h-4" />}
                    onClick={() => handleWithdraw(balance.asset)}
                  >
                    Withdraw
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Movements */}
        <Card title="Recent Movements" subtitle="Latest 10 transactions">
          <div className="space-y-3">
            {recentMovements.map((movement) => (
              <motion.div
                key={movement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      movement.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {movement.type === 'deposit' ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{movement.type}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(movement.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {movement.amount.toFixed(8)} {movement.currency}
                  </p>
                  {movement.metadata?.usd_value && (
                    <p className="text-sm text-gray-600">
                      {formatCurrency(movement.metadata.usd_value)}
                    </p>
                  )}
                </div>

                <Badge variant={movement.status === 'completed' ? 'success' : 'warning'}>
                  {movement.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Deposit Modal */}
      <Modal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        title={`Deposit ${selectedAsset}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-[#16F98A]/10 border border-[#16F98A] rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-2">
              Send {selectedAsset} to this address:
            </p>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <code className="text-sm font-mono text-gray-900">
                1A2B3C4D5E6F7G8H9I0J...
              </code>
              <Button size="sm" variant="ghost">
                Copy
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">QR Code</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Only send {selectedAsset} to this address. Sending other
              assets may result in permanent loss.
            </p>
          </div>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title={`Withdraw ${selectedAsset}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Withdrawal Address
            </label>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="Enter destination address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="0.00000000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A] focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Available: {balances.find((b) => b.asset === selectedAsset)?.available || 0}{' '}
              {selectedAsset}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{withdrawAmount || '0'} {selectedAsset}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Network Fee:</span>
              <span className="font-medium">~0.0001 {selectedAsset}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="font-medium text-gray-900">You will receive:</span>
              <span className="font-bold text-[#16F98A]">
                {parseFloat(withdrawAmount || '0') - 0.0001} {selectedAsset}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={handleWithdrawSubmit}
            disabled={!withdrawAmount || !withdrawAddress}
          >
            Confirm Withdrawal
          </Button>
        </div>
      </Modal>
    </div>
  )
}

