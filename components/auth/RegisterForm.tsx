'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { useAuth } from '@/hooks'
import { Button, EmailInput, PasswordInput, NameInput, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { fadeInUp } from '@/lib/motion-variants'

interface RegisterFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export function RegisterForm({ onSuccess, redirectTo = '/account' }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
    fullName?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis'
    }

    if (!formData.email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
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
      const { error } = await signUp(formData.email, formData.password, formData.fullName)

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: 'Cette adresse email est déjà utilisée' })
        } else {
          setErrors({ general: error.message })
        }
      } else {
        onSuccess?.()
        // Afficher un message de succès pour confirmer l'email
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
            <UserPlus className="w-6 h-6 text-primary" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            Créer un compte
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Rejoignez la communauté Zypp
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
            <NameInput
              label="Nom complet"
              value={formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              error={errors.fullName}
              disabled={loading}
              required
            />

            <EmailInput
              label="Email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              error={errors.email}
              disabled={loading}
              required
            />

            <PasswordInput
              label="Mot de passe"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              error={errors.password}
              disabled={loading}
              required
            />

            <PasswordInput
              label="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              disabled={loading}
              required
            />

            <div className="text-xs text-muted-foreground">
              En créant un compte, vous acceptez nos{' '}
              <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                politique de confidentialité
              </Link>
              .
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer mon compte'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Déjà un compte ?{' '}
              <Link 
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}