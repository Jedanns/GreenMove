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
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id, newsletter_subscribed')
        .eq('email', email.toLowerCase())
        .single()

      if (existingUser) {
        // User exists, update their newsletter subscription
        const { error } = await supabase
          .from('users')
          .update({ newsletter_subscribed: true })
          .eq('email', email.toLowerCase())

        if (error) {
          return { error }
        }
      } else {
        // User doesn't exist, create a minimal user record for newsletter
        const { error } = await supabase
          .from('users')
          .insert({
            id: crypto.randomUUID(),
            email: email.toLowerCase(),
            full_name: '', // Will be filled when they register
            newsletter_subscribed: true,
            user_type: 'regular',
            address_country: 'FR', // Default country
          })

        if (error) {
          // Si l'email existe déjà, on considère ça comme un succès
          if (error.code === '23505') {
            setSuccess(true)
            return { error: null }
          }
          return { error }
        }
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
        .from('users')
        .update({ newsletter_subscribed: false })
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