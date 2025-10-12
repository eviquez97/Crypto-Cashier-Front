'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>, 
  'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDragEnd' | 'onDrag'
> {
  variant?: 'primary' | 'secondary' | 'neon' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, isLoading, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out transform focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
        const variants = {
          primary: 'bg-brand-primary text-brand-light shadow-lg hover:shadow-xl focus:ring-brand-primary/50',
          secondary: 'bg-transparent text-brand-teal border-2 border-brand-teal hover:bg-brand-teal hover:text-brand-light focus:ring-brand-teal/50',
          neon: 'bg-brand-primary text-brand-light shadow-lg hover:shadow-xl focus:ring-brand-primary/50',
          outline: 'bg-transparent text-text-primary border-2 border-brand-teal hover:bg-brand-teal hover:text-brand-light focus:ring-brand-teal/50',
          ghost: 'bg-transparent text-text-primary hover:bg-brand-teal/10 focus:ring-brand-teal/50'
        }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
