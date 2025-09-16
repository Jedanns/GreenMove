'use client'

import { motion } from 'framer-motion'
import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { buttonHover } from '@/lib/motion-variants'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className, 
    disabled = false, 
    loading = false, 
    onClick,
    href,
    type = 'button',
    ...props 
  }, ref) => {
    
    // Styles de base
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group'
    
    // Variants de style
    const variants = {
      primary: 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-red-500 text-white hover:bg-red-600'
    }
    
    // Tailles
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-13 px-8 text-lg'
    }

    const buttonClass = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      disabled && 'cursor-not-allowed',
      className
    )

    const MotionButton = motion.button
    const MotionLink = motion.a

    const buttonContent = (
      <>
        {/* Effet de brillance au hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-current/10 backdrop-blur-sm rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
        
        {/* Contenu du bouton */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </>
    )

    if (href) {
      return (
        <MotionLink
          ref={ref as any}
          href={href}
          className={buttonClass}
          variants={buttonHover}
          initial="initial"
          whileHover="whileHover"
          whileTap="whileTap"
          {...props}
        >
          {buttonContent}
        </MotionLink>
      )
    }

    return (
      <MotionButton
        ref={ref as any}
        type={type}
        className={buttonClass}
        disabled={disabled || loading}
        onClick={onClick}
        variants={buttonHover}
        initial="initial"
        whileHover="whileHover"
        whileTap="whileTap"
        {...props}
      >
        {buttonContent}
      </MotionButton>
    )
  }
)

Button.displayName = 'Button'

export { Button }