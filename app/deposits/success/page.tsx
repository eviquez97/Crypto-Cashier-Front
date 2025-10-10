'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Copy, Download, CheckCircle, ExternalLink, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://crypto-cashier-production.up.railway.app'

const DepositSuccess = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [depositData, setDepositData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    // Get deposit data from URL params or localStorage
    const address = searchParams.get('address')
    const chain = searchParams.get('chain')
    const currency = searchParams.get('currency')
    const amount = searchParams.get('amount')
    const qrCode = searchParams.get('qr_code')

    if (address) {
      setDepositData({
        address,
        chain,
        currency,
        amount,
        qr_code: qrCode,
        created_at: new Date().toISOString()
      })
    } else {
      // Try to get from localStorage if not in URL
      const savedDeposit = localStorage.getItem('lastDeposit')
      if (savedDeposit) {
        setDepositData(JSON.parse(savedDeposit))
      } else {
        router.push('/deposits')
      }
    }
  }, [router, searchParams])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const downloadQRCode = () => {
    // TODO: Implement QR code download
    alert('Funcionalidad de descarga de QR próximamente disponible')
  }

  const getExplorerUrl = (chain: string, address: string) => {
    const explorers = {
      'TRON': `https://tronscan.org/#/address/${address}`,
      'ETH': `https://etherscan.io/address/${address}`,
      'BEP20': `https://bscscan.com/address/${address}`,
      'BTC': `https://blockstream.info/address/${address}`
    }
    return explorers[chain as keyof typeof explorers] || '#'
  }

  if (!depositData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando detalles del depósito...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/deposits"
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600"
            >
              <ArrowLeft size={20} />
              <span>Volver a Depósitos</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Depósito Creado</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg mb-8"
        >
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Depósito Creado Exitosamente!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu dirección de depósito ha sido generada. Envía {depositData.currency} a esta dirección.
            </p>

            {/* Deposit Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Blockchain</h3>
                  <p className="text-lg font-semibold text-gray-900">{depositData.chain}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Criptomoneda</h3>
                  <p className="text-lg font-semibold text-gray-900">{depositData.currency}</p>
                </div>
                {depositData.amount && (
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Cantidad Esperada</h3>
                    <p className="text-lg font-semibold text-gray-900">{depositData.amount} {depositData.currency}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Address and QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Copy size={20} />
              Dirección de Depósito
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-mono break-all text-gray-800">
                {depositData.address}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(depositData.address)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              
              <a
                href={getExplorerUrl(depositData.chain, depositData.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ExternalLink size={16} />
                Ver en Explorer
              </a>
            </div>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <QrCode size={20} />
              Código QR
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              {depositData.qr_code ? (
                <img
                  src={depositData.qr_code}
                  alt="QR Code"
                  className="w-48 h-48 mx-auto rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            <button
              onClick={downloadQRCode}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Download size={16} />
              Descargar QR
            </button>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Instrucciones</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">1.</span>
              <span>Envía {depositData.currency} a la dirección mostrada arriba</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">2.</span>
              <span>Confirma que estás enviando a la red {depositData.chain}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">3.</span>
              <span>El depósito aparecerá en tu cuenta una vez confirmado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">4.</span>
              <span>Puedes rastrear el progreso en el explorador de blockchain</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <Link
            href="/deposits"
            className="flex-1 bg-primary-500 text-white text-center py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Crear Otro Depósito
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 bg-gray-500 text-white text-center py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver al Dashboard
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

export default DepositSuccess
