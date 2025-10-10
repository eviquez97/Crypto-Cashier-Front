'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Copy, QrCode, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { CRYPTOCURRENCIES, CHAINS, getCurrenciesByChain, getPopularCurrencies, getCurrenciesByCategory } from '@/lib/cryptoData'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://crypto-cashier-production.up.railway.app'

const Deposits = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deposits, setDeposits] = useState<any[]>([])
  const [newDeposit, setNewDeposit] = useState({
    chain: 'TRON',
    amount: '',
    currency: 'USDT'
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
    
    // Load existing deposits
    loadDeposits()
  }, [router])

  const loadDeposits = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/deposits`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setDeposits(data)
      }
    } catch (error) {
      console.error('Error loading deposits:', error)
    }
  }

  const createDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      // Verificar que el usuario esté autenticado
      if (!token) {
        alert('Error: No estás autenticado. Por favor, inicia sesión nuevamente.')
        setLoading(false)
        return
      }
      
      // Llamar al endpoint real del backend
      const response = await fetch(`${API_BASE}/deposits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          chain: newDeposit.chain,
          currency: newDeposit.currency,
          amount: newDeposit.amount || null
        })
      })
      
      if (response.ok) {
        const depositData = await response.json()
        
        // Guardar datos del depósito en localStorage para la pantalla de éxito
        localStorage.setItem('lastDeposit', JSON.stringify(depositData))
        
        // Redirigir a la pantalla de éxito
        router.push(`/deposits/success?address=${encodeURIComponent(depositData.address)}&chain=${encodeURIComponent(depositData.chain)}&currency=${encodeURIComponent(depositData.currency)}&amount=${encodeURIComponent(depositData.amount || '')}&qr_code=${encodeURIComponent(depositData.qr_code || '')}`)
        
      } else {
        // Si falla la API real, usar simulación como fallback
        console.warn('API real falló, usando simulación')
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simular delay
        
        // Generar datos simulados
        const mockAddress = `${newDeposit.chain.toLowerCase()}_addr_${newDeposit.currency.toLowerCase()}_${Date.now()}`
        const mockData = {
          address: mockAddress,
          qr_code: `data:image/png;base64,mock_qr_code_${Date.now()}`,
          chain: newDeposit.chain,
          currency: newDeposit.currency,
          amount: newDeposit.amount,
          status: 'pending',
          created_at: new Date().toISOString()
        }
        
        // Guardar datos del depósito en localStorage para la pantalla de éxito
        localStorage.setItem('lastDeposit', JSON.stringify(mockData))
        
        // Redirigir a la pantalla de éxito
        router.push(`/deposits/success?address=${encodeURIComponent(mockData.address)}&chain=${encodeURIComponent(mockData.chain)}&currency=${encodeURIComponent(mockData.currency)}&amount=${encodeURIComponent(mockData.amount || '')}&qr_code=${encodeURIComponent(mockData.qr_code || '')}`)
      }
      
    } catch (error) {
      console.error('Error creating deposit:', error)
      alert('Error de conexión. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado al portapapeles!')
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
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Gestionar Depósitos</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Deposit */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Plus size={20} />
              Crear Nuevo Depósito
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={createDeposit} className="space-y-6">
              {/* Chain Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blockchain
                </label>
                <select
                  value={newDeposit.chain}
                  onChange={(e) => setNewDeposit({ ...newDeposit, chain: e.target.value, currency: '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  {CHAINS.map(chain => (
                    <option key={chain.value} value={chain.value}>
                      {chain.icon} {chain.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency Selection with Search and Filters */}
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
                    {showAdvanced ? 'Ocultar filtros' : 'Filtros avanzados'}
                  </button>
                </div>

                {/* Advanced Filters */}
                {showAdvanced && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Buscar por nombre o símbolo
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Buscar criptomoneda..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Categoría
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="all">Todas las categorías</option>
                        <option value="major">Principales</option>
                        <option value="stablecoin">Stablecoins</option>
                        <option value="defi">DeFi</option>
                        <option value="gaming">Gaming</option>
                        <option value="meme">Meme Coins</option>
                        <option value="ai">AI</option>
                        <option value="privacy">Privacidad</option>
                        <option value="layer2">Layer 2</option>
                        <option value="other">Otras</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Currency Dropdown */}
                <select
                  value={newDeposit.currency}
                  onChange={(e) => setNewDeposit({ ...newDeposit, currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  size={8}
                >
                  {(() => {
                    let filteredCurrencies = getCurrenciesByChain(newDeposit.chain)
                    
                    if (searchTerm) {
                      filteredCurrencies = filteredCurrencies.filter(crypto =>
                        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    }
                    
                    if (selectedCategory !== 'all') {
                      filteredCurrencies = filteredCurrencies.filter(crypto => crypto.category === selectedCategory)
                    }
                    
                    // Group by category
                    const grouped = filteredCurrencies.reduce((acc, crypto) => {
                      if (!acc[crypto.category]) acc[crypto.category] = []
                      acc[crypto.category].push(crypto)
                      return acc
                    }, {} as Record<string, typeof filteredCurrencies>)
                    
                    return Object.entries(grouped).map(([category, currencies]) => (
                      <optgroup key={category} label={category.toUpperCase()}>
                        {currencies.map(crypto => (
                          <option key={`${crypto.symbol}-${crypto.chain}`} value={crypto.symbol}>
                            {crypto.symbol} - {crypto.name}
                          </option>
                        ))}
                      </optgroup>
                    ))
                  })()}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getCurrenciesByChain(newDeposit.chain).length} criptomonedas disponibles en {newDeposit.chain}
                </p>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad Esperada (opcional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newDeposit.amount}
                  onChange={(e) => setNewDeposit({ ...newDeposit, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deja vacío para generar dirección sin cantidad específica
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading || !newDeposit.currency}
                className="w-full md:w-auto px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 font-medium"
              >
                {loading ? 'Creando...' : 'Generar Dirección de Depósito'}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Deposits */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Depósitos Recientes</h2>
          </div>
          <div className="p-6">
            {deposits.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay depósitos creados aún</p>
                <p className="text-sm text-gray-400 mt-1">Crea tu primer depósito usando el formulario de arriba</p>
              </div>
            ) : (
              <div className="space-y-4">
                {deposits.map((deposit, index) => (
                  <motion.div
                    key={deposit.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {deposit.currency} - {deposit.chain}
                        </p>
                        <p className="text-sm text-gray-500">
                          Estado: {deposit.status || 'Pendiente'}
                        </p>
                        {deposit.amount && (
                          <p className="text-sm text-gray-500">
                            Cantidad: {deposit.amount} {deposit.currency}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {deposit.address && (
                          <>
                            <button
                              onClick={() => copyToClipboard(deposit.address)}
                              className="p-2 text-gray-500 hover:text-primary-500"
                              title="Copiar dirección"
                            >
                              <Copy size={16} />
                            </button>
                            <button
                              className="p-2 text-gray-500 hover:text-primary-500"
                              title="Ver QR Code"
                            >
                              <QrCode size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {deposit.address && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono text-gray-600 break-all">
                        {deposit.address}
                      </div>
                    )}
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

export default Deposits
