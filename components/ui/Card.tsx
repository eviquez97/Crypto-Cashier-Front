'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  title,
  subtitle,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
        hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
      } ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  )
}

