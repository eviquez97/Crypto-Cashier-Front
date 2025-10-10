'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const Reports = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    
    // Load reports data
    loadReports()
  }, [router, dateRange])

  const loadReports = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      // Load summary
      const summaryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reports/summary?days=${dateRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json()
        setSummary(summaryData)
      }

      // Load transactions
      const transactionsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reports/transactions?days=${dateRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData)
      }
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600"
            >
              <ArrowLeft size={20} />
              <span>Volver al Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={24} />
              Reportes y Analytics
            </h1>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="1d">Último día</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando reportes...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Depósitos Totales</h3>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(summary.total_deposits || 0)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {summary.deposit_count || 0} transacciones
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Retiros Totales</h3>
                    <DollarSign className="h-8 w-8 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(summary.total_withdrawals || 0)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {summary.withdrawal_count || 0} transacciones
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Comisiones Generadas</h3>
                    <Activity className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(summary.total_fees || 0)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {summary.fee_count || 0} transacciones
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Balance Neto</h3>
                    <BarChart3 className="h-8 w-8 text-purple-500" />
                  </div>
                  <p className={`text-2xl font-bold ${(summary.net_balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(summary.net_balance || 0)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Depósitos - Retiros
                  </p>
                </motion.div>
              </div>
            )}

            {/* Transaction Details */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h2>
              </div>
              <div className="p-6">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No hay transacciones en el período seleccionado</p>
                    <p className="text-sm text-gray-400 mt-1">Las transacciones aparecerán aquí cuando se procesen</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Moneda
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cantidad
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction, index) => (
                          <motion.tr
                            key={transaction.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                transaction.type === 'deposit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.type === 'deposit' ? 'Depósito' : 'Retiro'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.currency} - {transaction.chain}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.amount} {transaction.currency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                transaction.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status === 'completed' ? 'Completado' :
                                 transaction.status === 'pending' ? 'Pendiente' :
                                 transaction.status || 'Desconocido'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(transaction.created_at || transaction.timestamp)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Reports
