import { User, Session } from '@supabase/supabase-js'
import { Database } from './database'

// Types pour les utilisateurs
export type UserProfile = Database['public']['Tables']['users']['Row']
export type UserProfileUpdate = Database['public']['Tables']['users']['Update']
export type UserType = 'regular' | 'charger' | 'admin'

// Types pour les trottinettes
export type Scooter = Database['public']['Tables']['scooters']['Row']
export type ScooterStatus = 'available' | 'in_use' | 'maintenance' | 'charging' | 'offline'

// Types pour les trajets
export type Trip = Database['public']['Tables']['trips']['Row']
export type TripStatus = 'active' | 'completed' | 'cancelled'
export type TripCreate = Database['public']['Tables']['trips']['Insert']

// Types pour les sessions de recharge
export type ChargingSession = Database['public']['Tables']['charging_sessions']['Row']
export type ChargingStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

// Types pour les transactions
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type PaymentMethod = Database['public']['Tables']['payment_methods']['Row']

// Types pour les notifications
export type Notification = Database['public']['Tables']['notifications']['Row']

// Types pour les zones
export type Zone = Database['public']['Tables']['zones']['Row']

// Types étendus pour l'authentification
export interface AuthUser extends User {
  profile?: UserProfile | null
}

export interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string, wantsCharger?: boolean) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: UserProfileUpdate) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
}

// Types pour les formulaires
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone?: string
  acceptTerms: boolean
  wantsCharger?: boolean
  newsletterSubscribed?: boolean
}

export interface ProfileFormData {
  full_name: string
  phone?: string
  date_of_birth?: string
  address_street?: string
  address_city?: string
  address_postal_code?: string
  newsletter_subscribed?: boolean
  notifications_enabled?: boolean
}

export interface ChargerApplicationData {
  hourly_rate: number
  address_street: string
  address_city: string
  address_postal_code: string
  phone: string
}

// Types pour les statistiques utilisateur
export interface UserStats {
  totalTrips: number
  totalDistance: number
  totalSpent: number
  averageTripDuration: number
  favoriteZone: string | null
}

export interface ChargerStats {
  totalSessions: number
  totalEarnings: number
  averageRating: number
  totalHoursWorked: number
  scootersCharged: number
}

// Types pour les erreurs
export interface AuthError {
  message: string
  field?: string
}

// Types pour les réponses API
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  success: boolean
}

// Types pour la géolocalisation
export interface Location {
  latitude: number
  longitude: number
  name?: string
}

// Types pour les filtres et recherches
export interface TripFilters {
  status?: TripStatus
  startDate?: string
  endDate?: string
  minCost?: number
  maxCost?: number
}

export interface ScooterFilters {
  status?: ScooterStatus
  zone?: string
  minBattery?: number
  nearLocation?: Location
  radius?: number
}

// Types pour les préférences utilisateur
export interface UserPreferences {
  preferred_language: string
  notifications_enabled: boolean
  newsletter_subscribed: boolean
}

// Types legacy pour la newsletter (à supprimer plus tard)
export type NewsletterSubscription = {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
}

export interface NewsletterFormData {
  email: string
}