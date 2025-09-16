'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Battery, MapPin } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  scaleIn, 
  textReveal 
} from '@/lib/motion-variants'

const features = [
  {
    icon: Battery,
    title: 'Autonomie Longue Durée',
    description: 'Nos trottinettes électriques offrent jusqu\'à 25km d\'autonomie pour tous vos trajets urbains.'
  },
  {
    icon: MapPin,
    title: 'Géolocalisation Précise',
    description: 'Trouvez et déposez facilement votre trottinette grâce à notre système de géolocalisation avancé.'
  },
  {
    icon: Smartphone,
    title: 'Application Intuitive',
    description: 'Une app simple et moderne pour déverrouiller, localiser et payer vos trajets en quelques clics.'
  }
]

export default function HomePage() {
  return (
    <div className="relative">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
        
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            
            {/* Badge */}
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8"
            >
              <Battery className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Nouveau : Disponible à Montpellier dès janvier 2025</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={textReveal}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              La mobilité{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                électrique
              </span>
              <br />
              en liberté
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Découvrez Montpellier autrement avec nos trottinettes électriques en libre-service. 
              Déverrouillez, roulez, déposez. Simple, rapide et écologique.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button size="lg" className="text-lg px-8 py-4">
                Télécharger l'app
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Voir comment ça marche
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000</div>
                <div className="text-sm text-muted-foreground">Trottinettes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1€</div>
                <div className="text-sm text-muted-foreground">Déverrouillage</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-primary mb-2">15¢/min</div>
                <div className="text-sm text-muted-foreground">Tarif</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            
            {/* Section Header */}
            <motion.div
              variants={staggerItem}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Pourquoi choisir Zypp ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une nouvelle façon de se déplacer à Montpellier. Écologique, pratique et disponible 24h/24.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  custom={index}
                >
                  <Card hover={true} gradient={true} className="h-full p-8">
                    <CardHeader className="pb-4">
                      <motion.div
                        className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: App Download */}
              <motion.div variants={staggerItem}>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Votre liberté de mouvement dans votre poche
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  L'application Zypp vous permet de localiser, déverrouiller et payer vos trajets en quelques secondes. 
                  Disponible sur iOS et Android.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span>Géolocalisation en temps réel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span>Paiement sécurisé intégré</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span>Historique de vos trajets</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg">
                    <Smartphone className="mr-2 h-5 w-5" />
                    App Store
                  </Button>
                  <Button variant="outline" size="lg">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Google Play
                  </Button>
                </div>
              </motion.div>

              {/* Right: Charger Program */}
              <motion.div variants={staggerItem}>
                <Card gradient={true} className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader className="pb-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Battery className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">Devenez rechargeur Zypp</CardTitle>
                    <CardDescription className="text-base">
                      Gagnez de l'argent en rechargeant nos trottinettes à votre domicile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Horaires flexibles (21h - 6h)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Rémunération attractive</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Tarifs préférentiels sur vos locations</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Postuler maintenant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Prêt à découvrir Montpellier autrement ?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Téléchargez l'application Zypp et profitez dès janvier 2025 de nos trottinettes électriques 
              en libre-service dans toute la ville.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Télécharger l'app
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Créer mon compte
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}