'use client'

import { motion } from 'framer-motion'
import { CreditCard, Code, Play } from 'lucide-react'
import { useState } from 'react'

const Features = () => {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hosted Checkout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Hosted Checkout
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Provide your customers with a seamless checkout experience. Our hosted solution 
              handles all the complexity while you focus on your business.
            </p>
            <button
              onClick={() => setShowDemo(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Play size={20} />
              <span>Try Hosted Checkout</span>
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-gray-100 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Checkout Preview</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Drop-in Widget & API */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1">
            <div className="bg-gray-900 rounded-xl p-6 text-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">JavaScript</span>
                <button className="text-gray-400 hover:text-white">
                  Copy
                </button>
              </div>
              <pre className="text-green-400 overflow-x-auto">
{`Coinfixi.init({
  apiKey: 'pk_live_...',
  tenantId: 'tenant_123',
  onSuccess: (tx) => {
    console.log('Payment received:', tx);
  }
});`}
              </pre>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Drop-in Widget & API
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Integrate crypto payments directly into your application with our 
              powerful API and customizable widgets.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600">Easy integration with 3 lines of code</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600">Real-time webhooks and notifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600">Comprehensive documentation</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Demo Modal */}
        {showDemo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Hosted Checkout Demo</h4>
                <button
                  onClick={() => setShowDemo(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Demo Checkout Interface</p>
                  <p className="text-sm text-gray-400 mt-2">
                    This would show the actual checkout flow
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Features
