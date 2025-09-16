'use client'

import { motion } from 'framer-motion'
import { User, Clock, MapPin, CreditCard, Smartphone, History } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

// Données d'exemple pour l'historique
const recentRides = [
  {
    id: 1,
    date: '2024-12-15',
    time: '14:30',
    from: 'Place de la Comédie',
    to: 'Antigone',
    duration: '12 min',
    distance: '2.1 km',
    cost: '2.80€',
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-12-14',
    time: '09:15',
    from: 'Gare Saint-Roch',
    to: 'Faculté de Médecine',
    duration: '18 min',
    distance: '3.2 km',
    cost: '3.70€',
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-12-13',
    time: '16:45',
    from: 'Port Marianne',
    to: 'Centre Commercial Odysseum',
    duration: '8 min',
    distance: '1.4 km',
    cost: '2.20€',
    status: 'completed'
  }
]

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Mon compte Zypp
            </h1>
            <p className="text-lg text-muted-foreground">
              Gérez votre profil et consultez l'historique de vos trajets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-6xl mx-auto"
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Section */}
              <motion.div variants={staggerItem} className="lg:col-span-1">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <User className="h-6 w-6 text-primary" />
                      Profil utilisateur
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nom complet</label>
                      <p className="text-lg font-medium">Alexandre Dubois</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-lg">alex.dubois@email.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                      <p className="text-lg">+33 6 12 34 56 78</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Membre depuis</label>
                      <p className="text-lg">Décembre 2024</p>
                    </div>
                    <Button className="w-full mt-6">
                      Modifier le profil
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="p-6 mt-6">
                  <CardHeader className="pb-4">
                    <CardTitle>Mes statistiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">28</div>
                        <div className="text-sm text-muted-foreground">Trajets</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">45km</div>
                        <div className="text-sm text-muted-foreground">Distance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">67€</div>
                        <div className="text-sm text-muted-foreground">Dépensé</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">15kg</div>
                        <div className="text-sm text-muted-foreground">CO2 évité</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main Content */}
              <motion.div variants={staggerItem} className="lg:col-span-2">
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Scanner QR Code</h3>
                        <p className="text-sm text-muted-foreground">Déverrouillez une trottinette</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Trouver une trottinette</h3>
                        <p className="text-sm text-muted-foreground">Voir la carte</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Moyens de paiement</h3>
                        <p className="text-sm text-muted-foreground">Gérer mes cartes</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Ride History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <History className="h-6 w-6 text-primary" />
                      Historique des trajets
                    </CardTitle>
                    <CardDescription>
                      Consultez vos derniers trajets en trottinette électrique
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRides.map((ride, index) => (
                        <motion.div
                          key={ride.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{ride.from}</span>
                              <span className="text-muted-foreground">→</span>
                              <span className="font-medium">{ride.to}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {ride.date} • {ride.time}
                              </span>
                              <span>{ride.duration}</span>
                              <span>{ride.distance}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-primary">{ride.cost}</div>
                            <div className="text-sm text-green-600 capitalize">{ride.status}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        Voir tous les trajets
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}