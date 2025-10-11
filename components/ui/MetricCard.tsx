'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
  }
  className?: string
  delay?: number
}

export function MetricCard({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  className,
  delay = 0 
}: MetricCardProps) {
  const changeColors = {
    increase: 'text-neon-green',
    decrease: 'text-error',
    neutral: 'text-gray-500'
  }
  
  const changeSymbols = {
    increase: '↗',
    decrease: '↘',
    neutral: '→'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'card group hover:scale-105 cursor-pointer',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-primary/10 rounded-xl group-hover:bg-purple-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-purple-primary" />
        </div>
        {change && (
          <span className={cn(
            'text-sm font-medium flex items-center space-x-1',
            changeColors[change.type]
          )}>
            <span>{changeSymbols[change.type]}</span>
            <span>{Math.abs(change.value)}%</span>
          </span>
        )}
      </div>
      
      <motion.div 
        className="text-3xl font-bold text-dark-base mb-1"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {value}
      </motion.div>
      
      <div className="text-sm text-gray-600 font-medium">
        {title}
      </div>
    </motion.div>
  )
}
