'use client'

import { motion } from 'framer-motion'
import { Smartphone, MapPin, Unlock, Navigation, CreditCard, MapIcon } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion-variants'

const steps = [
  {
    icon: Smartphone,
    step: '1',
    title: 'Téléchargez l\'app',
    description: 'Téléchargez l\'application Zypp gratuite sur iOS ou Android et créez votre compte en quelques secondes.',
    details: ['Inscription rapide', 'Validation de votre carte bancaire', 'Tutoriel intégré']
  },
  {
    icon: MapPin,
    step: '2',
    title: 'Trouvez une trottinette',
    description: 'Utilisez la carte intégrée pour localiser la trottinette électrique la plus proche de votre position.',
    details: ['Géolocalisation en temps réel', '1000 trottinettes disponibles', 'Niveau de batterie affiché']
  },
  {
    icon: Unlock,
    step: '3',
    title: 'Déverrouillez et roulez',
    description: 'Scannez le QR code sur la trottinette pour la déverrouiller automatiquement et commencer votre trajet.',
    details: ['Déverrouillage instantané', 'Vérification de sécurité', 'Instructions de conduite']
  },
  {
    icon: Navigation,
    step: '4',
    title: 'Profitez du trajet',
    description: 'Roulez en toute liberté dans Montpellier. L\'app vous guide vers les zones de dépose autorisées.',
    details: ['Navigation GPS intégrée', 'Zones de stationnement indiquées', 'Support 24/7']
  },
  {
    icon: CreditCard,
    step: '5',
    title: 'Terminez et payez',
    description: 'Verrouillez la trottinette dans une zone autorisée. Le paiement s\'effectue automatiquement.',
    details: ['Verrouillage sécurisé', 'Facturation automatique', 'Reçu par email']
  }
]

const pricing = {
  unlock: 1.00,
  perMinute: 0.15,
  examples: [
    { duration: '5 min', distance: '800m', price: '1.75€' },
    { duration: '15 min', distance: '2.1km', price: '3.25€' },
    { duration: '30 min', distance: '4.5km', price: '5.50€' }
  ]
}

const zones = [
  'Centre-ville historique',
  'Antigone',
  'Port Marianne',
  'Près d\'Arènes',
  'Beaux-Arts',
  'Gare Saint-Roch',
  'Universités',
  'Odysseum'
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-6xl font-bold mb-6 leading-tight"
            >
              Comment ça{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                marche
              </span>
              ?
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Découvrez à quel point il est simple d'utiliser nos trottinettes électriques 
              pour vous déplacer à Montpellier.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            
            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={staggerItem}
                  custom={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  
                  {/* Content */}
                  <motion.div 
                    className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                        {step.step}
                      </div>
                      <h2 className="text-3xl font-bold">{step.title}</h2>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Visual */}
                  <motion.div 
                    className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}
                    variants={scaleIn}
                    custom={index}
                  >
                    <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                      <motion.div
                        className="h-24 w-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <step.icon className="h-12 w-12 text-primary" />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Étape {step.step}</h3>
                        <p className="text-muted-foreground">{step.title}</p>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            
            <motion.div
              variants={staggerItem}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Tarification simple et transparente
              </h2>
              <p className="text-lg text-muted-foreground">
                Payez seulement ce que vous utilisez, sans abonnement ni frais cachés.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="mb-12">
              <Card className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{pricing.unlock}€</div>
                    <div className="text-muted-foreground">Déverrouillage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{pricing.perMinute}€</div>
                    <div className="text-muted-foreground">Par minute</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Exemples de trajets</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {pricing.examples.map((example, index) => (
                      <div key={index} className="p-4 bg-accent/50 rounded-lg">
                        <div className="font-semibold text-primary text-lg">{example.price}</div>
                        <div className="text-sm text-muted-foreground">{example.duration} • {example.distance}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Zone */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            
            <motion.div
              variants={staggerItem}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Zone de couverture
              </h2>
              <p className="text-lg text-muted-foreground">
                Nos trottinettes sont disponibles dans tous les quartiers principaux de Montpellier.
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                    <MapIcon className="h-8 w-8 text-primary" />
                    Quartiers desservis
                  </CardTitle>
                  <CardDescription>
                    Retrouvez nos trottinettes dans ces zones de Montpellier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {zones.map((zone, index) => (
                      <motion.div
                        key={zone}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg"
                      >
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{zone}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
              C'est parti !
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Vous savez maintenant comment utiliser Zypp. Téléchargez l'application 
              et faites votre premier trajet dès janvier 2025.
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              Télécharger l'application
              <Smartphone className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}