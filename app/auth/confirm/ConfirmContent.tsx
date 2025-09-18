'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token = searchParams.get('token')
        const type = searchParams.get('type')

        if (!token || !type) {
          setError('Lien de confirmation invalide')
          setLoading(false)
          return
        }

        if (type === 'signup') {
          const { error: confirmError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          })

          if (confirmError) {
            setError('Erreur lors de la confirmation : ' + confirmError.message)
          } else {
            setConfirmed(true)
            // Rediriger vers la page de connexion après 3 secondes
            setTimeout(() => {
              router.push('/login?message=Votre compte a été confirmé avec succès')
            }, 3000)
          }
        }
      } catch (err) {
        setError('Une erreur inattendue s\'est produite')
      } finally {
        setLoading(false)
      }
    }

    confirmEmail()
  }, [searchParams, router])

  if (loading) {
    return (
      <div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Confirmation en cours...</p>
      </div>
    )
  }

  if (confirmed) {
    return (
      <div>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Email confirmé !</h1>
        <p className="text-muted-foreground mb-4">
          Votre compte a été confirmé avec succès. Vous allez être redirigé vers la page de connexion.
        </p>
        <div className="text-sm text-muted-foreground">
          Redirection automatique dans quelques secondes...
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Erreur de confirmation</h1>
      <p className="text-red-600 mb-4">{error}</p>
      <button
        onClick={() => router.push('/login')}
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
      >
        Retour à la connexion
      </button>
    </div>
  )
}