'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Copy } from 'lucide-react'

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
        setDeposits(data.deposits || [])
      } else {
        console.error('Failed to load deposits:', response.status)
        setDeposits([])
      }
    } catch (error) {
      console.error('Error loading deposits:', error)
      setDeposits([])
    }
  }

  const createDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Error: No estás autenticado. Por favor, inicia sesión nuevamente.')
        setLoading(false)
        return
      }
      
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
        localStorage.setItem('lastDeposit', JSON.stringify(depositData))
        router.push(`/deposits/success?address=${encodeURIComponent(depositData.address)}&chain=${encodeURIComponent(depositData.chain)}&currency=${encodeURIComponent(depositData.currency)}&amount=${encodeURIComponent(depositData.amount || '')}&qr_code=${encodeURIComponent(depositData.qr_code || '')}`)
      } else {
        alert('Error al crear el depósito. Inténtalo de nuevo.')
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

  const getCurrenciesForChain = (chain: string) => {
    switch (chain) {
      case 'TRON':
        return ['USDT', 'TRX', 'USDC']
      case 'BTC':
        return ['BTC']
      case 'ETH':
        return ['ETH', 'USDC', 'USDT']
      case 'BEP20':
        return ['BNB', 'USDT', 'USDC']
      default:
        return ['USDT']
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
                <label htmlFor="chain" className="block text-sm font-medium text-gray-700 mb-2">
                  Blockchain
                </label>
                <select
                  id="chain"
                  value={newDeposit.chain}
                  onChange={(e) => setNewDeposit({ ...newDeposit, chain: e.target.value, currency: '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="TRON">TRON</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                  <option value="BEP20">BEP20 (BSC)</option>
                </select>
              </div>

              {/* Currency Selection */}
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Criptomoneda
                </label>
                <select
                  id="currency"
                  value={newDeposit.currency}
                  onChange={(e) => setNewDeposit({ ...newDeposit, currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  {getCurrenciesForChain(newDeposit.chain).map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad Esperada (opcional)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={newDeposit.amount}
                  onChange={(e) => setNewDeposit({ ...newDeposit, amount: e.target.value })}
                  placeholder="0.00"
                  step="any"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Deja vacío para generar dirección sin cantidad específica.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Generar Dirección de Depósito
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Deposits */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Depósitos Recientes</h2>
          </div>
          <div className="p-6">
            {deposits.length === 0 ? (
              <p className="text-gray-500">No hay depósitos recientes. ¡Crea uno para empezar!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dirección
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cadena
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Moneda
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deposits.map((deposit) => (
                      <tr key={deposit.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {deposit.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[150px]">{deposit.address}</span>
                            <button
                              onClick={() => copyToClipboard(deposit.address)}
                              className="text-gray-400 hover:text-primary-500"
                              title="Copiar dirección"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deposit.chain}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deposit.currency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deposit.amount || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deposit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                          >
                            {deposit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(deposit.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => alert('Ver detalles del depósito')}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Deposits