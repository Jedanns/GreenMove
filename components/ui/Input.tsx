'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User as UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ 
  label, 
  error, 
  icon, 
  className, 
  type = 'text',
  ...props 
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Icône à gauche */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        
        {/* Input */}
        <input
          type={inputType}
          className={cn(
            'w-full h-12 px-4 text-foreground bg-background border border-border rounded-xl',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'placeholder:text-muted-foreground',
            icon && 'pl-10',
            isPassword && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Bouton pour afficher/masquer le mot de passe */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isPasswordVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
        
        {/* Bordure animée */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {/* Message d'erreur */}
      {error && (
        <motion.p
          className="text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

// Composants pré-configurés
export function EmailInput(props: Omit<InputProps, 'type' | 'icon'>) {
  return (
    <Input
      type="email"
      icon={<Mail className="h-4 w-4" />}
      placeholder="exemple@email.com"
      {...props}
    />
  )
}

export function PasswordInput(props: Omit<InputProps, 'type' | 'icon'>) {
  return (
    <Input
      type="password"
      icon={<Lock className="h-4 w-4" />}
      placeholder="••••••••"
      {...props}
    />
  )
}

export function NameInput(props: Omit<InputProps, 'type' | 'icon'>) {
  return (
    <Input
      type="text"
      icon={<UserIcon className="h-4 w-4" />}
      placeholder="Votre nom complet"
      {...props}
    />
  )
}