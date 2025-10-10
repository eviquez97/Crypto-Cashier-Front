'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Dashboard = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      // Not logged in, redirect to login
      router.push('/login')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Coinfixi Dashboard</h1>
            <p className="text-sm text-gray-500">Crypto Cashier SaaS</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Usuario'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta!</h2>
          <p className="text-primary-100">Gestiona tus transacciones crypto de forma segura y eficiente</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Depósitos Hoy</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$0.00</p>
            <p className="text-xs text-gray-500 mt-1">0 transacciones</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Retiros Hoy</h3>
              <span className="text-2xl">💸</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$0.00</p>
            <p className="text-xs text-gray-500 mt-1">0 transacciones</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Balance Total</h3>
              <span className="text-2xl">💎</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$0.00</p>
            <p className="text-xs text-gray-500 mt-1">En todas las wallets</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Comisiones</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">2%</p>
            <p className="text-xs text-gray-500 mt-1">Fee estándar</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/deposits"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
              >
                <span className="text-3xl">➕</span>
                <div>
                  <p className="font-semibold text-gray-900">Crear Depósito</p>
                  <p className="text-sm text-gray-500">Generar nueva dirección</p>
                </div>
              </Link>

              <Link
                href="/withdrawals"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
              >
                <span className="text-3xl">💸</span>
                <div>
                  <p className="font-semibold text-gray-900">Procesar Retiro</p>
                  <p className="text-sm text-gray-500">Enviar crypto a usuarios</p>
                </div>
              </Link>

              <Link
                href="/reports"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
              >
                <span className="text-3xl">📊</span>
                <div>
                  <p className="font-semibold text-gray-900">Ver Reportes</p>
                  <p className="text-sm text-gray-500">Analytics y estadísticas</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* API Documentation Link */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Documentación de la API</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              Accede a la documentación completa de la API para integrar Coinfixi en tu plataforma.
            </p>
            <div className="flex gap-4">
              <a
                href="https://crypto-cashier-production.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Ver Documentación (Swagger)
              </a>
              <a
                href="https://crypto-cashier-production.up.railway.app/redoc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Ver ReDoc
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
