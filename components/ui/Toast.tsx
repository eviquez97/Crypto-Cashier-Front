/**
 * Premium Toast Notification
 * Animated notifications for transactions
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose: () => void
  visible: boolean
}

export default function Toast({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  visible
}: ToastProps) {
  
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])
  
  const typeConfig = {
    success: {
      bg: 'bg-success-400',
      icon: <CheckCircle size={20} />,
      text: 'text-dark-900'
    },
    error: {
      bg: 'bg-danger-500',
      icon: <AlertCircle size={20} />,
      text: 'text-white'
    },
    warning: {
      bg: 'bg-warning-500',
      icon: <AlertCircle size={20} />,
      text: 'text-white'
    },
    info: {
      bg: 'bg-brand-purple',
      icon: <Info size={20} />,
      text: 'text-white'
    }
  }
  
  const config = typeConfig[type]
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className={`
            fixed top-4 right-4 z-50
            ${config.bg} ${config.text}
            px-6 py-4 rounded-lg shadow-premium
            flex items-center gap-3 min-w-[300px] max-w-md
          `}
        >
          <div className="flex-shrink-0">
            {config.icon}
          </div>
          <p className="flex-1 font-medium">{message}</p>
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


/**
 * Toast Container Hook
 */
import { useState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }>>([])
  
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    const id = Math.random().toString(36)
    setToasts(prev => [...prev, { id, message, type }])
  }
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }
  
  return {
    toasts,
    showToast,
    removeToast,
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    info: (msg: string) => showToast(msg, 'info'),
    warning: (msg: string) => showToast(msg, 'warning'),
  }
}

