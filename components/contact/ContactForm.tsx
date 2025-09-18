'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, User, Mail, MessageSquare } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const subjectOptions = [
  { value: 'support', label: 'Support & Aide technique' },
  { value: 'billing', label: 'Facturation & Paiements' },
  { value: 'charger', label: 'Devenir rechargeur Zypp' },
  { value: 'business', label: 'Partenariat & Entreprises' },
  { value: 'incident', label: 'Signaler un incident' },
  { value: 'suggestion', label: 'Suggestions & Feedback' },
  { value: 'press', label: 'Presse & Médias' },
  { value: 'other', label: 'Autre demande' }
]

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }

    // Validation du sujet
    if (!formData.subject) {
      newErrors.subject = 'Veuillez sélectionner un sujet'
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulation d'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Formulaire envoyé:', formData)
      setIsSubmitted(true)
      
      // Reset du formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setErrors({})
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      // Gérer l'erreur ici
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Supprimer l'erreur si le champ devient valide
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <motion.div
          className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Check className="h-8 w-8 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-4">Message envoyé !</h3>
        <p className="text-muted-foreground mb-6">
          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
        >
          Envoyer un autre message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Nom */}
        <motion.div variants={staggerItem}>
          <Input
            label="Nom complet"
            icon={<User className="h-4 w-4" />}
            placeholder="Votre nom complet"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={staggerItem}>
          <Input
            label="Email"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
        </motion.div>
      </div>

      {/* Sujet */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Sujet *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className={`w-full h-12 pl-10 pr-4 text-foreground bg-background border border-border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
              errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
            }`}
            required
          >
            <option value="">Sélectionnez un sujet</option>
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <AnimatePresence>
          {errors.subject && (
            <motion.p
              className="text-sm text-red-500 mt-2 flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-3 w-3" />
              {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Message *
        </label>
        <div className="relative">
          <textarea
            placeholder="Décrivez votre demande en détail..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={6}
            className={`w-full p-4 text-foreground bg-background border border-border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none ${
              errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
            }`}
            required
          />
        </div>
        <AnimatePresence>
          {errors.message && (
            <motion.p
              className="text-sm text-red-500 mt-2 flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-3 w-3" />
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
        <p className="text-xs text-muted-foreground mt-2">
          {formData.message.length}/500 caractères
        </p>
      </motion.div>

      {/* Notice RGPD */}
      <motion.div 
        variants={staggerItem}
        className="bg-accent/5 border border-border/50 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              En soumettant ce formulaire, vous acceptez que vos données personnelles soient 
              utilisées pour traiter votre demande. Elles ne seront pas transmises à des tiers 
              et vous pouvez demander leur suppression à tout moment.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bouton d'envoi */}
      <motion.div variants={staggerItem} className="pt-4">
        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto text-lg px-8 py-4"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          <Send className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.form>
  )
}