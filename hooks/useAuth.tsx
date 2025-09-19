'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AuthContextType, UserProfile, UserProfileUpdate } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Récupérer la session initiale
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erreur lors de la récupération de la session:', error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchProfile(session.user.id)
          }
        }
      } catch (error) {
        console.error('Erreur inattendue:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)

        // Redirection après connexion réussie
        if (event === 'SIGNED_IN' && session?.user) {
          // Attendre que le profil soit chargé avant de rediriger
          setTimeout(() => {
            router.push('/account')
          }, 100)
        }

        // Redirection après déconnexion
        if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erreur lors de la récupération du profil:', error)
      } else if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      })
      
      if (error) {
        console.error('Erreur de connexion:', error)
      }
      
      return { error }
    } catch (error) {
      console.error('Erreur inattendue lors de la connexion:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName?: string, wantsCharger?: boolean) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            full_name: fullName || 'Utilisateur',
            wants_charger: wantsCharger || false,
            newsletter_subscribed: false,
          },
        },
      })

      if (error) {
        console.error('Erreur d\'inscription:', error)
      }

      return { error }
    } catch (error) {
      console.error('Erreur inattendue lors de l\'inscription:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Erreur lors de la déconnexion:', error)
      } else {
        // Nettoyage local
        setUser(null)
        setSession(null)
        setProfile(null)
      }
    } catch (error) {
      console.error('Erreur inattendue lors de la déconnexion:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: UserProfileUpdate) => {
    if (!user) return { error: new Error('Aucun utilisateur connecté') }

    try {
      const { error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (!error) {
        await fetchProfile(user.id)
      }

      return { error }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      return { error }
    }
  }

  const value: AuthContextType = {
    user: user ? { ...user, profile } : null,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
}