'use client'

import { motion } from 'motion/react'
import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  border?: boolean
  onClick?: () => void
  href?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    hover = true, 
    gradient = false, 
    border = true,
    onClick,
    href,
    ...props 
  }, ref) => {
    
    const baseStyles = 'relative overflow-hidden rounded-2xl'
    
    const cardClass = cn(
      baseStyles,
      border && 'border border-border/50',
      gradient 
        ? 'bg-gradient-to-br from-background via-background to-accent/5' 
        : 'bg-background/50 backdrop-blur-sm',
      onClick && 'cursor-pointer',
      className
    )

    const initialState = hover ? { 
      scale: 1,
      y: 0,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    } : {}

    const hoverState = hover ? { 
      scale: 1.02,
      y: -4,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
    } : {}

    const tapState = hover ? {
      scale: 0.98,
      y: 0
    } : {}

    const hoverTransition = {
      duration: 0.3,
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    }

    const cardContent = (
      <>
        {/* Effet de brillance */}
        {hover && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{ x: '100%', opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
        
        {/* Bordure animée */}
        {hover && (
          <motion.div
            className="absolute inset-0 rounded-2xl border border-primary/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Contenu */}
        <div className="relative z-10">
          {children}
        </div>
      </>
    )

    if (href) {
      return (
        <motion.a
          ref={ref as any}
          href={href}
          className={cardClass}
          initial={initialState}
          whileHover={hoverState}
          whileTap={tapState}
          transition={hoverTransition}
          {...props}
        >
          {cardContent}
        </motion.a>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={cardClass}
        onClick={onClick}
        initial={initialState}
        whileHover={hoverState}
        whileTap={tapState}
        transition={hoverTransition}
        {...props}
      >
        {cardContent}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Composants complémentaires
const CardHeader = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight text-xl', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
}