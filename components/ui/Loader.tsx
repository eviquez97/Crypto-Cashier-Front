'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'pulse'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

export default function Loader({ size = 'md', variant = 'spinner', className = '' }: LoaderProps) {
  if (variant === 'spinner') {
    return (
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-[#16F98A] ${className}`}
      />
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#16F98A] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-[#16F98A] rounded-full ${className}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    )
  }

  return null
}

// Skeleton loader for content placeholders
export interface SkeletonProps {
  width?: string
  height?: string
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'rectangular',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  }

  return (
    <div
      className={`bg-gray-200 animate-pulse ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  )
}

// Full page loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

