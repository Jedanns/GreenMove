'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { useNewsletter } from '@/hooks'
import { Button, EmailInput, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { fadeInUp } from '@/lib/motion-variants'

interface NewsletterFormProps {
  title?: string
  description?: string
  className?: string
  compact?: boolean
}

export function NewsletterForm({ 
  title = "Restez informé",
  description = "Recevez les dernières actualités et offres de Zypp",
  className = "",
  compact = false 
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { subscribe, loading, success } = useNewsletter()

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('L\'email est requis')
      return
    }

    if (!validateEmail(email)) {
      setError('L\'email n\'est pas valide')
      return
    }

    setError('')
    const { error: subscribeError } = await subscribe(email)

    if (subscribeError) {
      setError('Une erreur s\'est produite. Veuillez réessayer.')
    } else {
      setEmail('')
    }
  }

  if (success) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className={`w-full max-w-md mx-auto ${className}`}
      >
        <Card className="text-center">
          <CardContent className="p-6">
            <motion.div
              className="mx-auto w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Check className="w-6 h-6 text-green-600" />
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Inscription réussie !
            </h3>
            <p className="text-muted-foreground text-sm">
              Merci de votre intérêt pour Zypp. Vous recevrez bientôt nos actualités.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (compact) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className={`w-full ${className}`}
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              disabled={loading}
              placeholder="votre@email.com"
            />
          </div>
          <Button
            type="submit"
            loading={loading}
            disabled={loading || !email.trim()}
          >
            S'inscrire
          </Button>
        </form>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={`w-full max-w-md mx-auto ${className}`}
    >
      <Card className="overflow-hidden">
        <CardHeader className="text-center pb-4">
          <motion.div
            className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="w-6 h-6 text-primary" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            {title}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <EmailInput
              label="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              disabled={loading}
              required
              placeholder="votre@email.com"
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              disabled={loading || !email.trim()}
            >
              {loading ? 'Inscription...' : 'S\'inscrire à la newsletter'}
            </Button>
          </form>

          <div className="text-xs text-muted-foreground text-center">
            Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}