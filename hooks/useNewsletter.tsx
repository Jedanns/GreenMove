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
      // TODO: Temporarily simulate success for frontend demo
      // Replace this with actual database logic when backend is ready
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store email locally for now (optional - for demo purposes)
      const subscribedEmails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]')
      if (!subscribedEmails.includes(email.toLowerCase())) {
        subscribedEmails.push(email.toLowerCase())
        localStorage.setItem('newsletter_emails', JSON.stringify(subscribedEmails))
      }

      console.log('Newsletter subscription (demo):', email.toLowerCase())
      
      // Uncomment below when ready to use real database:
      /*
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
      */

      setSuccess(true)
      return { error: null }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const unsubscribe = async (email: string) => {
    setLoading(true)

    try {
      // TODO: Temporarily simulate success for frontend demo
      // Replace this with actual database logic when backend is ready
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove from local storage (demo purposes)
      const subscribedEmails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]')
      const updatedEmails = subscribedEmails.filter((e: string) => e !== email.toLowerCase())
      localStorage.setItem('newsletter_emails', JSON.stringify(updatedEmails))

      console.log('Newsletter unsubscription (demo):', email.toLowerCase())
      
      // Uncomment below when ready to use real database:
      /*
      const { error } = await supabase
        .from('users')
        .update({ newsletter_subscribed: false })
        .eq('email', email.toLowerCase())

      return { error }
      */

      return { error: null }
    } catch (error) {
      console.error('Newsletter unsubscription error:', error)
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