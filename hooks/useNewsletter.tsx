'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useNewsletter() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const subscribe = async (email: string) => {
    setLoading(true)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email.toLowerCase(),
        })

      if (error) {
        // Si l'email existe déjà, on considère ça comme un succès
        if (error.code === '23505') {
          setSuccess(true)
          return { error: null }
        }
        return { error }
      }

      setSuccess(true)
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const unsubscribe = async (email: string) => {
    setLoading(true)

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ is_active: false })
        .eq('email', email.toLowerCase())

      return { error }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  return {
    subscribe,
    unsubscribe,
    loading,
    success,
  }
}