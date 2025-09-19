'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  LogOut,
  Edit3,
  Battery,
  MapPin,
  Euro,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/hooks'
import { Button, Card, Input } from '@/components/ui'
import { ProtectedRoute } from '@/components/auth'
import { supabase } from '@/lib/supabase'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

export default function AccountPage() {
  const { user, signOut, updateProfile, loading: authLoading } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalSpent: 0,
    totalEarnings: 0
  })
  
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    address_street: '',
    address_city: '',
    address_postal_code: '',
    newsletter_subscribed: false,
  })

  useEffect(() => {
    if (user?.profile) {
      setProfileForm({
        full_name: user.profile.full_name || '',
        phone: user.profile.phone || '',
        address_street: user.profile.address_street || '',
        address_city: user.profile.address_city || '',
        address_postal_code: user.profile.address_postal_code || '',
        newsletter_subscribed: user.profile.newsletter_subscribed || false,
      })
      loadStats()
    }
  }, [user])

  const loadStats = async () => {
    if (!user?.id) return

    try {
      // Charger les statistiques de base
      const { data: trips } = await supabase
        .from('trips')
        .select('total_cost')
        .eq('user_id', user.id)
        .eq('status', 'completed')

      if (trips) {
        const totalTrips = trips.length
        const totalSpent = trips.reduce((sum, trip) => sum + (trip.total_cost || 0), 0)
        setStats(prev => ({ ...prev, totalTrips, totalSpent }))
      }

      // Si rechargeur, charger les gains
      if (user.profile?.is_charger_approved) {
        const { data: sessions } = await supabase
          .from('charging_sessions')
          .select('total_earnings')
          .eq('charger_id', user.id)
          .eq('status', 'completed')

        if (sessions) {
          const totalEarnings = sessions.reduce((sum, session) => sum + (session.total_earnings || 0), 0)
          setStats(prev => ({ ...prev, totalEarnings }))
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await updateProfile(profileForm)
      
      if (error) {
        console.error('Erreur lors de la mise à jour:', error)
      } else {
        setEditMode(false)
      }
    } catch (error) {
      console.error('Erreur inattendue:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header avec profil */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Card className="p-8 mb-8 border-0 shadow-xl bg-background/95 backdrop-blur-sm">
              <motion.div variants={staggerItem} className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {user?.profile?.full_name || 'Utilisateur'}
                    </h1>
                    <p className="text-muted-foreground text-lg">{user?.email}</p>
                    {user?.profile?.is_charger_approved && (
                      <div className="flex items-center mt-2">
                        <Battery className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm font-medium text-primary">Rechargeur certifié</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </motion.div>
            </Card>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div variants={staggerItem}>
                <Card className="p-6 text-center border-0 shadow-lg bg-background/95 backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{stats.totalTrips}</div>
                  <div className="text-muted-foreground">Trajets effectués</div>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="p-6 text-center border-0 shadow-lg bg-background/95 backdrop-blur-sm">
                  <Euro className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{formatCurrency(stats.totalSpent)}</div>
                  <div className="text-muted-foreground">Total dépensé</div>
                </Card>
              </motion.div>

              {user?.profile?.is_charger_approved && (
                <motion.div variants={staggerItem}>
                  <Card className="p-6 text-center border-0 shadow-lg bg-background/95 backdrop-blur-sm">
                    <Battery className="w-8 h-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(stats.totalEarnings)}</div>
                    <div className="text-muted-foreground">Gains totaux</div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Informations personnelles */}
            <motion.div variants={staggerItem}>
              <Card className="p-8 border-0 shadow-xl bg-background/95 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Informations personnelles</h2>
                  <Button
                    onClick={() => setEditMode(!editMode)}
                    variant="outline"
                    disabled={loading}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {editMode ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>

                {editMode ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nom complet
                        </label>
                        <Input
                          value={profileForm.full_name}
                          onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                          required
                          disabled={loading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Téléphone
                        </label>
                        <Input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          disabled={loading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Adresse
                        </label>
                        <Input
                          value={profileForm.address_street}
                          onChange={(e) => setProfileForm({ ...profileForm, address_street: e.target.value })}
                          placeholder="123 Rue de la République"
                          disabled={loading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ville
                        </label>
                        <Input
                          value={profileForm.address_city}
                          onChange={(e) => setProfileForm({ ...profileForm, address_city: e.target.value })}
                          placeholder="Montpellier"
                          disabled={loading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Code postal
                        </label>
                        <Input
                          value={profileForm.address_postal_code}
                          onChange={(e) => setProfileForm({ ...profileForm, address_postal_code: e.target.value })}
                          placeholder="34000"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        type="checkbox"
                        checked={profileForm.newsletter_subscribed}
                        onChange={(e) => setProfileForm({ ...profileForm, newsletter_subscribed: e.target.checked })}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                        disabled={loading}
                      />
                      <label htmlFor="newsletter" className="ml-3 text-sm">
                        Recevoir la newsletter
                      </label>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sauvegarde...
                          </>
                        ) : (
                          'Sauvegarder'
                        )}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setEditMode(false)}
                        disabled={loading}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                      <p className="text-lg">{user?.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Téléphone</label>
                      <p className="text-lg">{user?.profile?.phone || 'Non renseigné'}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Adresse</label>
                      <p className="text-lg">
                        {user?.profile?.address_street ? 
                          `${user.profile.address_street}, ${user.profile.address_city} ${user.profile.address_postal_code}` :
                          'Non renseignée'
                        }
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Type de compte</label>
                      <p className="text-lg">
                        {user?.profile?.is_charger_approved ? 'Rechargeur certifié' : 'Utilisateur standard'}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}