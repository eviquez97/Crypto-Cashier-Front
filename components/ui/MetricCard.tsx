/**
 * Premium Metric Card
 * Animated metric display with count-up effect
 */

'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  animated?: boolean
  currency?: string
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  animated = true,
  currency
}: MetricCardProps) {
  
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  
  useEffect(() => {
    if (animated && typeof value === 'number') {
      const animation = animate(count, value, {
        duration: 1.5,
        ease: 'easeOut'
      })
      
      return animation.stop
    }
  }, [value, animated, count])
  
  const trendColors = {
    up: 'text-success-400',
    down: 'text-danger-500',
    neutral: 'text-dark-400'
  }
  
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-premium border border-gray-100 hover:border-brand-purple transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(125, 83, 255, 0.1)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-dark-500 text-sm font-medium mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            {currency && <span className="text-2xl font-display text-dark-400">{currency}</span>}
            {animated && typeof value === 'number' ? (
              <motion.p className="text-4xl font-display font-bold text-dark-900 animate-count-up">
                {rounded}
              </motion.p>
            ) : (
              <p className="text-4xl font-display font-bold text-dark-900">{value}</p>
            )}
          </div>
          {subtitle && (
            <p className="text-dark-400 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className="bg-gradient-to-br from-brand-purple to-primary-600 p-3 rounded-lg text-white">
            {icon}
          </div>
        )}
      </div>
      
      {trend && trendValue && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColors[trend]}`}>
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {trend === 'neutral' && '→'}
          <span>{trendValue}</span>
          <span className="text-dark-400 font-normal">vs yesterday</span>
        </div>
      )}
    </motion.div>
  )
}

