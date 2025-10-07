'use client'

import { motion } from 'framer-motion'

const CryptoCards = () => {
  const cryptos = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '$16,048.40',
      change: '-1.26%',
      changeType: 'negative',
      icon: '₿',
      iconColor: 'bg-orange-500',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$1,122.44',
      change: '-1.55%',
      changeType: 'negative',
      icon: 'Ξ',
      iconColor: 'bg-blue-500',
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      price: '$1.00',
      change: '0.0099%',
      changeType: 'positive',
      icon: 'T',
      iconColor: 'bg-green-500',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cryptos.map((crypto, index) => (
            <motion.div
              key={crypto.symbol}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 ${crypto.iconColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {crypto.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{crypto.name}</h3>
                  <p className="text-sm text-gray-500">{crypto.symbol}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{crypto.price}</p>
                <p className="text-sm text-gray-500">Latest price</p>
                <p className={`text-sm font-medium ${
                  crypto.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {crypto.change} 24h change
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CryptoCards
