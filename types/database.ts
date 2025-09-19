export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          avatar_url: string | null
          user_type: 'regular' | 'charger' | 'admin'
          date_of_birth: string | null
          address_street: string | null
          address_city: string | null
          address_postal_code: string | null
          address_country: string
          is_charger_approved: boolean
          charger_application_date: string | null
          charger_approval_date: string | null
          charger_hourly_rate: number | null
          charger_rating: number
          charger_total_earnings: number
          newsletter_subscribed: boolean
          notifications_enabled: boolean
          preferred_language: string
          last_active_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone?: string | null
          avatar_url?: string | null
          user_type?: 'regular' | 'charger' | 'admin'
          date_of_birth?: string | null
          address_street?: string | null
          address_city?: string | null
          address_postal_code?: string | null
          address_country?: string
          is_charger_approved?: boolean
          charger_application_date?: string | null
          charger_approval_date?: string | null
          charger_hourly_rate?: number | null
          charger_rating?: number
          charger_total_earnings?: number
          newsletter_subscribed?: boolean
          notifications_enabled?: boolean
          preferred_language?: string
          last_active_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          avatar_url?: string | null
          user_type?: 'regular' | 'charger' | 'admin'
          date_of_birth?: string | null
          address_street?: string | null
          address_city?: string | null
          address_postal_code?: string | null
          address_country?: string
          is_charger_approved?: boolean
          charger_application_date?: string | null
          charger_approval_date?: string | null
          charger_hourly_rate?: number | null
          charger_rating?: number
          charger_total_earnings?: number
          newsletter_subscribed?: boolean
          notifications_enabled?: boolean
          preferred_language?: string
          last_active_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      scooters: {
        Row: {
          id: string
          code: string
          model: string
          battery_level: number
          status: 'available' | 'in_use' | 'maintenance' | 'charging' | 'offline'
          latitude: number | null
          longitude: number | null
          location_name: string | null
          location_zone: string | null
          total_distance_km: number
          total_trips: number
          last_maintenance_date: string | null
          next_maintenance_km: number | null
          assigned_charger_id: string | null
          assignment_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          model?: string
          battery_level?: number
          status?: 'available' | 'in_use' | 'maintenance' | 'charging' | 'offline'
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          location_zone?: string | null
          total_distance_km?: number
          total_trips?: number
          last_maintenance_date?: string | null
          next_maintenance_km?: number | null
          assigned_charger_id?: string | null
          assignment_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          model?: string
          battery_level?: number
          status?: 'available' | 'in_use' | 'maintenance' | 'charging' | 'offline'
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          location_zone?: string | null
          total_distance_km?: number
          total_trips?: number
          last_maintenance_date?: string | null
          next_maintenance_km?: number | null
          assigned_charger_id?: string | null
          assignment_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scooters_assigned_charger_id_fkey"
            columns: ["assigned_charger_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      trips: {
        Row: {
          id: string
          user_id: string
          scooter_id: string
          status: 'active' | 'completed' | 'cancelled'
          start_time: string
          end_time: string | null
          duration_minutes: number | null
          start_latitude: number
          start_longitude: number
          start_location_name: string | null
          end_latitude: number | null
          end_longitude: number | null
          end_location_name: string | null
          distance_km: number | null
          max_speed_kmh: number | null
          avg_speed_kmh: number | null
          base_cost: number
          per_minute_cost: number
          total_cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          scooter_id: string
          status?: 'active' | 'completed' | 'cancelled'
          start_time?: string
          end_time?: string | null
          duration_minutes?: number | null
          start_latitude: number
          start_longitude: number
          start_location_name?: string | null
          end_latitude?: number | null
          end_longitude?: number | null
          end_location_name?: string | null
          distance_km?: number | null
          max_speed_kmh?: number | null
          avg_speed_kmh?: number | null
          base_cost?: number
          per_minute_cost?: number
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          scooter_id?: string
          status?: 'active' | 'completed' | 'cancelled'
          start_time?: string
          end_time?: string | null
          duration_minutes?: number | null
          start_latitude?: number
          start_longitude?: number
          start_location_name?: string | null
          end_latitude?: number | null
          end_longitude?: number | null
          end_location_name?: string | null
          distance_km?: number | null
          max_speed_kmh?: number | null
          avg_speed_kmh?: number | null
          base_cost?: number
          per_minute_cost?: number
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_scooter_id_fkey"
            columns: ["scooter_id"]
            isOneToOne: false
            referencedRelation: "scooters"
            referencedColumns: ["id"]
          }
        ]
      }
      charging_sessions: {
        Row: {
          id: string
          scooter_id: string
          charger_id: string
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          pickup_time: string | null
          return_time: string | null
          duration_hours: number | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          pickup_location_name: string | null
          return_latitude: number | null
          return_longitude: number | null
          return_location_name: string | null
          battery_level_start: number | null
          battery_level_end: number | null
          battery_gained: number | null
          hourly_rate: number | null
          total_earnings: number | null
          payment_status: string
          charger_rating: number | null
          charger_comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          scooter_id: string
          charger_id: string
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          pickup_time?: string | null
          return_time?: string | null
          duration_hours?: number | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          pickup_location_name?: string | null
          return_latitude?: number | null
          return_longitude?: number | null
          return_location_name?: string | null
          battery_level_start?: number | null
          battery_level_end?: number | null
          battery_gained?: number | null
          hourly_rate?: number | null
          total_earnings?: number | null
          payment_status?: string
          charger_rating?: number | null
          charger_comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          scooter_id?: string
          charger_id?: string
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          pickup_time?: string | null
          return_time?: string | null
          duration_hours?: number | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          pickup_location_name?: string | null
          return_latitude?: number | null
          return_longitude?: number | null
          return_location_name?: string | null
          battery_level_start?: number | null
          battery_level_end?: number | null
          battery_gained?: number | null
          hourly_rate?: number | null
          total_earnings?: number | null
          payment_status?: string
          charger_rating?: number | null
          charger_comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "charging_sessions_scooter_id_fkey"
            columns: ["scooter_id"]
            isOneToOne: false
            referencedRelation: "scooters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charging_sessions_charger_id_fkey"
            columns: ["charger_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string
          type: string
          is_default: boolean
          card_last_four: string | null
          card_brand: string | null
          card_expiry_month: number | null
          card_expiry_year: number | null
          stripe_payment_method_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          is_default?: boolean
          card_last_four?: string | null
          card_brand?: string | null
          card_expiry_month?: number | null
          card_expiry_year?: number | null
          stripe_payment_method_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          is_default?: boolean
          card_last_four?: string | null
          card_brand?: string | null
          card_expiry_month?: number | null
          card_expiry_year?: number | null
          stripe_payment_method_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          trip_id: string | null
          charging_session_id: string | null
          payment_method_id: string | null
          type: string
          amount: number
          currency: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_charge_id: string | null
          failure_reason: string | null
          processed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          trip_id?: string | null
          charging_session_id?: string | null
          payment_method_id?: string | null
          type: string
          amount: number
          currency?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_charge_id?: string | null
          failure_reason?: string | null
          processed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          trip_id?: string | null
          charging_session_id?: string | null
          payment_method_id?: string | null
          type?: string
          amount?: number
          currency?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_charge_id?: string | null
          failure_reason?: string | null
          processed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_charging_session_id_fkey"
            columns: ["charging_session_id"]
            isOneToOne: false
            referencedRelation: "charging_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          trip_id: string | null
          charging_session_id: string | null
          is_read: boolean
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          trip_id?: string | null
          charging_session_id?: string | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          trip_id?: string | null
          charging_session_id?: string | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_charging_session_id_fkey"
            columns: ["charging_session_id"]
            isOneToOne: false
            referencedRelation: "charging_sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      zones: {
        Row: {
          id: string
          name: string
          description: string | null
          center_latitude: number
          center_longitude: number
          radius_meters: number
          polygon_coordinates: Json | null
          max_scooters: number
          is_active: boolean
          priority: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          center_latitude: number
          center_longitude: number
          radius_meters?: number
          polygon_coordinates?: Json | null
          max_scooters?: number
          is_active?: boolean
          priority?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          center_latitude?: number
          center_longitude?: number
          radius_meters?: number
          polygon_coordinates?: Json | null
          max_scooters?: number
          is_active?: boolean
          priority?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'regular' | 'charger' | 'admin'
      scooter_status: 'available' | 'in_use' | 'maintenance' | 'charging' | 'offline'
      trip_status: 'active' | 'completed' | 'cancelled'
      charging_status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}