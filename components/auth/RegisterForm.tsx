'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, 
  ArrowRight, AlertCircle, Loader2, Battery
} from 'lucide-react'
import Link from 'next/link'
import { Button, Input, Card, CardContent, Logo } from '@/components/ui'
import { useAuth } from '@/hooks'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

interface RegisterFormData {
  email: string
  password: string
  fullName: string
  phone: string
  isCharger: boolean
  acceptTerms: boolean
}

interface RegisterFormErrors {
  email?: string
  password?: string
  fullName?: string
  phone?: string
  acceptTerms?: string
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    isCharger: false,
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const { signUp, loading } = useAuth()

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {}

    if (!formData.email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Au moins 8 caractères requis'
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Le nom complet est requis'
    }

    if (!formData.phone) {
      newErrors.phone = 'Le numéro de téléphone est requis'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || loading) return

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.isCharger)
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
    }
  }

  const handleInputChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-0 shadow-xl bg-background/95 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center py-8 px-8 pb-4">
          <motion.div
            variants={staggerItem}
            className="mx-auto mb-6"
          >
            <Logo size="md" />
          </motion.div>
          
          <motion.div variants={staggerItem}>
            <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
            <p className="text-muted-foreground">
              Rejoignez la mobilité électrique
            </p>
          </motion.div>
        </div>

        <CardContent className="px-8 pb-8">
          <motion.form onSubmit={handleSubmit} className="space-y-5" variants={staggerContainer}>
            
            {/* Full Name */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  className={`pl-10 h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              <AnimatePresence mode="wait">
                {errors.fullName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.fullName}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              <AnimatePresence mode="wait">
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Phone */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  className={`pl-10 h-12 ${errors.phone ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              <AnimatePresence mode="wait">
                {errors.phone && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.phone}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  className={`pl-10 pr-12 h-12 ${errors.password ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <AnimatePresence mode="wait">
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Charger Option */}
            <motion.div variants={staggerItem} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/20 transition-colors">
                <input
                  id="isCharger"
                  type="checkbox"
                  checked={formData.isCharger}
                  onChange={handleInputChange('isCharger')}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  disabled={loading}
                />
                <div className="flex-1">
                  <label htmlFor="isCharger" className="text-sm font-medium cursor-pointer">
                    Programme Rechargeur
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Gagnez de l'argent en rechargeant nos trottinettes
                  </p>
                </div>
                <Battery className="h-5 w-5 text-primary" />
              </div>
            </motion.div>

            {/* Terms */}
            <motion.div variants={staggerItem} className="space-y-2">
              <div className="flex items-start space-x-3">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange('acceptTerms')}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  disabled={loading}
                />
                <div className="flex-1">
                  <label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                    J'accepte les{' '}
                    <Link href="/legal" className="text-primary hover:text-primary/80 underline">
                      conditions d'utilisation
                    </Link>
                  </label>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {errors.acceptTerms && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.acceptTerms}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={staggerItem}>
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création du compte...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>

      {/* Login Link */}
      <motion.div
        variants={fadeInUp}
        className="text-center mt-6"
      >
        <p className="text-muted-foreground">
          Déjà un compte ?{' '}
          <Link 
            href="/login" 
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Se connecter
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}