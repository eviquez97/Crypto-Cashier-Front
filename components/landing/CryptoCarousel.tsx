'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const CryptoCarousel = () => {
  const [cryptoPrices, setCryptoPrices] = useState([
    { symbol: 'BTC', name: 'Bitcoin', price: 45234.56, change: 5.23, logo: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 2834.12, change: 3.45, logo: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', price: 1.00, change: 0.01, logo: '₮' },
    { symbol: 'BNB', name: 'BNB', price: 412.34, change: 2.89, logo: 'B' },
    { symbol: 'SOL', name: 'Solana', price: 98.76, change: -1.23, logo: '◎' },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00, change: 0.00, logo: '$' },
    { symbol: 'XRP', name: 'Ripple', price: 0.5234, change: 4.56, logo: 'X' },
    { symbol: 'ADA', name: 'Cardano', price: 0.4567, change: 1.89, logo: '₳' },
  ])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
        change: crypto.change + (Math.random() - 0.5) * 0.5
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section bg-gradient-to-b from-base-light to-base-light overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6">
            Support for <span className="bg-gradient-to-r from-brand-neon to-accent-bright bg-clip-text text-transparent">50+ Cryptocurrencies</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Real-time pricing, instant settlements, and enterprise-grade security for all major digital assets.
          </p>
        </motion.div>

        {/* Crypto Cards Carousel */}
        <div className="relative">
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-base-light to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-base-light to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -2000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex space-x-6"
            >
              {/* Duplicate for seamless loop */}
              {[...cryptoPrices, ...cryptoPrices, ...cryptoPrices].map((crypto, index) => (
                <motion.div
                  key={`${crypto.symbol}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0 w-72 bg-gradient-to-br from-base-light/80 to-base-light backdrop-blur-xl rounded-3xl p-6 border border-accent-medium/20 shadow-2xl"
                  style={{
                    backdropFilter: 'blur(20px)',
                    background: 'linear-gradient(135deg, rgba(229,249,248,0.9) 0%, rgba(229,249,248,0.7) 100%)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {/* Logo Circle */}
                      <div className="w-14 h-14 bg-gradient-to-br from-brand-neon to-accent-bright rounded-2xl flex items-center justify-center shadow-lg text-2xl text-base-light font-bold">
                        {crypto.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">{crypto.symbol}</h3>
                        <p className="text-sm text-text-secondary">{crypto.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <motion.div
                      key={crypto.price}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold text-text-primary mb-2"
                    >
                      ${crypto.price.toFixed(2)}
                    </motion.div>
                    
                    {/* Change */}
                    <div className={`flex items-center space-x-2 ${crypto.change >= 0 ? 'text-brand-neon' : 'text-red-500'}`}>
                      {crypto.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold">
                        {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                      </span>
                      <span className="text-xs text-text-secondary">24h</span>
                    </div>
                  </div>

                  {/* Mini Chart (Visual representation) */}
                  <div className="h-16 relative">
                    <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                      <motion.path
                        d={`M 0,${30 + Math.sin(index) * 10} 
                           L 50,${25 + Math.sin(index + 1) * 8} 
                           L 100,${35 + Math.sin(index + 2) * 12} 
                           L 150,${20 + Math.sin(index + 3) * 15} 
                           L 200,${30 + Math.sin(index + 4) * 10}`}
                        fill="none"
                        stroke={crypto.change >= 0 ? '#12B2C1' : '#EF4444'}
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      {/* Gradient Fill */}
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={crypto.change >= 0 ? '#12B2C1' : '#EF4444'} stopOpacity="0.2" />
                          <stop offset="100%" stopColor={crypto.change >= 0 ? '#12B2C1' : '#EF4444'} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d={`M 0,${30 + Math.sin(index) * 10} 
                           L 50,${25 + Math.sin(index + 1) * 8} 
                           L 100,${35 + Math.sin(index + 2) * 12} 
                           L 150,${20 + Math.sin(index + 3) * 15} 
                           L 200,${30 + Math.sin(index + 4) * 10}
                           L 200,60 L 0,60 Z`}
                        fill={`url(#gradient-${index})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                  </div>

                  {/* Supported Badge */}
                  <div className="mt-4 pt-4 border-t border-accent-medium/20">
                    <div className="flex items-center justify-center space-x-2 text-brand-neon text-sm font-medium">
                      <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
                      <span>Supported</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-base-mid to-base-dark rounded-2xl px-12 py-6">
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-1">50+</div>
              <div className="text-base-light/70 text-sm">Cryptocurrencies</div>
            </div>
            <div className="w-px h-12 bg-accent-medium/30" />
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-1">6</div>
              <div className="text-base-light/70 text-sm">Blockchain Networks</div>
            </div>
            <div className="w-px h-12 bg-accent-medium/30" />
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-1">24/7</div>
              <div className="text-base-light/70 text-sm">Real-time Pricing</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CryptoCarousel
