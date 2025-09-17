'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/hooks'
import { Button, EmailInput, PasswordInput, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { fadeInUp } from '@/lib/motion-variants'

interface LoginFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export function LoginForm({ onSuccess, redirectTo = '/account' }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    try {
      const { error } = await signIn(email, password)

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ general: 'Email ou mot de passe incorrect' })
        } else {
          setErrors({ general: error.message })
        }
      } else {
        onSuccess?.()
        // Redirection gérée par le AuthProvider
      }
    } catch (error) {
      setErrors({ general: 'Une erreur inattendue s\'est produite' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden">
        <CardHeader className="text-center pb-4">
          <motion.div
            className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <LogIn className="w-6 h-6 text-primary" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            Connexion
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Connectez-vous à votre compte Zypp
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
            >
              {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <EmailInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={loading}
              required
            />

            <PasswordInput
              label="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              disabled={loading}
              required
            />

            <div className="flex justify-end">
              <Link 
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link 
                href="/register"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}