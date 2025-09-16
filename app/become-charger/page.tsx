'use client'

import { motion } from 'framer-motion'
import { Battery, Euro, Clock, Home, CheckCircle, ArrowRight } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion-variants'

const benefits = [
  {
    icon: Euro,
    title: 'Revenus complémentaires',
    description: 'Gagnez jusqu\'à 150€ par mois en rechargeant des trottinettes chez vous.'
  },
  {
    icon: Clock,
    title: 'Horaires flexibles',
    description: 'Travaillez quand vous voulez entre 21h et 6h du matin selon votre emploi du temps.'
  },
  {
    icon: Home,
    title: 'Depuis chez vous',
    description: 'Pas besoin de vous déplacer, nous récupérons et livrons les trottinettes.'
  },
  {
    icon: Battery,
    title: 'Matériel fourni',
    description: 'Nous fournissons tous les chargeurs et équipements nécessaires gratuitement.'
  }
]

const steps = [
  {
    step: '01',
    title: 'Candidature',
    description: 'Remplissez le formulaire en ligne et joignez vos documents.'
  },
  {
    step: '02',
    title: 'Validation',
    description: 'Notre équipe vérifie votre profil et votre domicile sous 48h.'
  },
  {
    step: '03',
    title: 'Formation',
    description: 'Formation rapide de 30 minutes sur la procédure de recharge.'
  },
  {
    step: '04',
    title: 'Lancement',
    description: 'Commencez à recharger et recevez vos premières trottinettes.'
  }
]

export default function BecomeChargerPage() {
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
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8"
            >
              <Battery className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Programme Rechargeur Zypp</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-6xl font-bold mb-6 leading-tight"
            >
              Devenez{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                rechargeur
              </span>
              <br />
              Zypp
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Gagnez de l'argent en rechargeant nos trottinettes électriques chez vous. 
              Flexible, simple et rémunérateur.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="text-lg px-8 py-4">
                Postuler maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                En savoir plus
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            
            <motion.div
              variants={staggerItem}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Pourquoi devenir rechargeur Zypp ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez tous les avantages de rejoindre notre réseau de rechargeurs partenaires.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={scaleIn}
                  custom={index}
                >
                  <Card hover={true} className="h-full p-6">
                    <CardHeader className="pb-4">
                      <motion.div
                        className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            
            <motion.div
              variants={staggerItem}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Comment devenir rechargeur ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Un processus simple en 4 étapes pour rejoindre notre équipe.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={staggerItem}
                  custom={index}
                  className="relative"
                >
                  <Card className="h-full p-6 text-center">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <CardHeader className="pt-8 pb-4">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  {/* Connector line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
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
                Conditions requises
              </h2>
              <p className="text-lg text-muted-foreground">
                Voici ce dont vous avez besoin pour rejoindre notre programme rechargeur.
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Prérequis personnels
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Être âgé de 18 ans minimum
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Résider à Montpellier ou environs proches
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Disponible entre 21h et 6h
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Casier judiciaire vierge
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Équipement nécessaire
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Logement avec accès électrique sécurisé
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Espace de stockage (garage, balcon, etc.)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Smartphone avec application Zypp
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        Connexion internet stable
                      </li>
                    </ul>
                  </div>
                </div>
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
              Prêt à rejoindre l'équipe ?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Devenez rechargeur Zypp dès aujourd'hui et commencez à gagner de l'argent 
              en contribuant à la mobilité électrique de Montpellier.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Postuler maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Télécharger la brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}