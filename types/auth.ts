import { User, Session } from '@supabase/supabase-js'
import { Database } from './database'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type NewsletterSubscription = Database['public']['Tables']['newsletter_subscriptions']['Row']
export type NewsletterSubscriptionInsert = Database['public']['Tables']['newsletter_subscriptions']['Insert']

export interface AuthUser extends User {
  profile?: Profile | null
}

export interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: ProfileUpdate) => Promise<{ error: any }>
}

export interface AuthFormData {
  email: string
  password: string
  fullName?: string
  confirmPassword?: string
}

export interface NewsletterFormData {
  email: string
}