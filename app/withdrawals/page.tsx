'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Calculator, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { CRYPTOCURRENCIES, CHAINS, getCurrenciesByChain } from '@/lib/cryptoData'

const Withdrawals = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [quote, setQuote] = useState<any>(null)
  const [newWithdrawal, setNewWithdrawal] = useState({
    chain: 'TRON',
    amount: '',
    currency: 'USDT',
    to_address: '',
    memo: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    
    // Load existing withdrawals
    loadWithdrawals()
  }, [router])

  const loadWithdrawals = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/withdrawals`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setWithdrawals(data)
      }
    } catch (error) {
      console.error('Error loading withdrawals:', error)
    }
  }

  const getQuote = async () => {
    if (!newWithdrawal.amount || !newWithdrawal.to_address) {
      alert('Por favor completa la cantidad y dirección de destino')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/withdrawals/quote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chain: newWithdrawal.chain,
          amount: parseFloat(newWithdrawal.amount),
          currency: newWithdrawal.currency,
          to_address: newWithdrawal.to_address
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setQuote(data)
      } else {
        const error = await response.json()
        alert(`Error: ${error.detail || 'Error al obtener cotización'}`)
      }
    } catch (error) {
      console.error('Error getting quote:', error)
      alert('Error de conexión')
    }
  }

  const processWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/withdrawals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chain: newWithdrawal.chain,
          amount: parseFloat(newWithdrawal.amount),
          currency: newWithdrawal.currency,
          to_address: newWithdrawal.to_address,
          memo: newWithdrawal.memo || undefined
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        alert(`Retiro procesado exitosamente!\nID de transacción: ${data.id}\nEstado: ${data.status}`)
        setNewWithdrawal({ chain: 'TRON', amount: '', currency: 'USDT', to_address: '', memo: '' })
        setQuote(null)
        loadWithdrawals()
      } else {
        const error = await response.json()
        alert(`Error: ${error.detail || 'Error al procesar retiro'}`)
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error)
      alert('Error de conexión')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Procesar Retiros</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Process New Withdrawal */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Send size={20} />
              Procesar Nuevo Retiro
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={processWithdrawal} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blockchain
                  </label>
                  <select
                    value={newWithdrawal.chain}
                    onChange={(e) => setNewWithdrawal({ ...newWithdrawal, chain: e.target.value, currency: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    {CHAINS.map(chain => (
                      <option key={chain.value} value={chain.value}>
                        {chain.icon} {chain.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Criptomoneda
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600"
                    >
                      <Filter size={14} />
                      {showAdvanced ? 'Ocultar' : 'Filtros'}
                    </button>
                  </div>
                  
                  {/* Advanced Filters */}
                  {showAdvanced && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Buscar
                        </label>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Buscar..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Categoría
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="all">Todas</option>
                          <option value="major">Principales</option>
                          <option value="stablecoin">Stablecoins</option>
                          <option value="defi">DeFi</option>
                          <option value="gaming">Gaming</option>
                          <option value="meme">Meme</option>
                          <option value="other">Otras</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  <select
                    value={newWithdrawal.currency}
                    onChange={(e) => setNewWithdrawal({ ...newWithdrawal, currency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    size={6}
                  >
                    {(() => {
                      let filteredCurrencies = getCurrenciesByChain(newWithdrawal.chain)
                      
                      if (searchTerm) {
                        filteredCurrencies = filteredCurrencies.filter(crypto =>
                          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                      }
                      
                      if (selectedCategory !== 'all') {
                        filteredCurrencies = filteredCurrencies.filter(crypto => crypto.category === selectedCategory)
                      }
                      
                      return filteredCurrencies.map(crypto => (
                        <option key={`${crypto.symbol}-${crypto.chain}`} value={crypto.symbol}>
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))
                    })()}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {getCurrenciesByChain(newWithdrawal.chain).length} disponibles
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newWithdrawal.amount}
                  onChange={(e) => setNewWithdrawal({ ...newWithdrawal, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección de Destino
                </label>
                <input
                  type="text"
                  value={newWithdrawal.to_address}
                  onChange={(e) => setNewWithdrawal({ ...newWithdrawal, to_address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ingresa la dirección de la wallet de destino"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memo (opcional)
                </label>
                <input
                  type="text"
                  value={newWithdrawal.memo}
                  onChange={(e) => setNewWithdrawal({ ...newWithdrawal, memo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Memo o etiqueta para el retiro"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={getQuote}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                >
                  <Calculator size={16} />
                  Obtener Cotización
                </button>
                
                <button
                  type="submit"
                  disabled={loading || !quote}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Procesando...' : 'Procesar Retiro'}
                </button>
              </div>
            </form>

            {/* Quote Display */}
            {quote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <h3 className="font-semibold text-blue-900 mb-2">Cotización de Retiro</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700">Cantidad a enviar:</p>
                    <p className="font-semibold text-blue-900">{quote.amount} {quote.currency}</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Comisión de red:</p>
                    <p className="font-semibold text-blue-900">{quote.network_fee} {quote.currency}</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Comisión de plataforma (2%):</p>
                    <p className="font-semibold text-blue-900">{quote.platform_fee} {quote.currency}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <p className="text-blue-700">Total a descontar:</p>
                  <p className="font-bold text-lg text-blue-900">{quote.total_fee} {quote.currency}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Existing Withdrawals */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Retiros Recientes</h2>
          </div>
          <div className="p-6">
            {withdrawals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay retiros procesados aún</p>
                <p className="text-sm text-gray-400 mt-1">Procesa tu primer retiro usando el formulario de arriba</p>
              </div>
            ) : (
              <div className="space-y-4">
                {withdrawals.map((withdrawal, index) => (
                  <motion.div
                    key={withdrawal.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {withdrawal.currency} - {withdrawal.chain}
                        </p>
                        <p className="text-sm text-gray-500">
                          Cantidad: {withdrawal.amount} {withdrawal.currency}
                        </p>
                        <p className="text-sm text-gray-500">
                          Estado: <span className={`font-medium ${
                            withdrawal.status === 'completed' ? 'text-green-600' :
                            withdrawal.status === 'pending' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>{withdrawal.status || 'Pendiente'}</span>
                        </p>
                        {withdrawal.to_address && (
                          <p className="text-xs text-gray-400 mt-1 break-all">
                            A: {withdrawal.to_address}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {withdrawal.created_at ? new Date(withdrawal.created_at).toLocaleDateString() : 'Fecha N/A'}
                        </p>
                        {withdrawal.tx_hash && (
                          <p className="text-xs text-gray-400 mt-1 break-all">
                            TX: {withdrawal.tx_hash}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Withdrawals
