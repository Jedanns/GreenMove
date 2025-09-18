'use client'

import { motion } from 'framer-motion'
import { Scale, Building, FileText, Shield, Mail, Phone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem 
} from '@/lib/motion-variants'

const legalSections = [
  {
    icon: Building,
    title: 'Informations sur la société',
    content: [
      'Dénomination sociale : Zypp SAS',
      'Siège social : 45, rue de la République, 34000 Montpellier',
      'Statut juridique : Société par Actions Simplifiée (SAS)',
      'Capital social : 50 000 €',
      'Numéro RCS : Montpellier B 921 456 789',
      'Numéro SIREN : 921 456 789',
      'Numéro SIRET : 921 456 789 00015',
      'Code APE/NAF : 4939B – Autres transports routiers de voyageurs n.c.a.',
      'Numéro de TVA intracommunautaire : FR 12 921456789'
    ]
  },
  {
    icon: FileText,
    title: 'Directeur de la publication',
    content: [
      'Le directeur de la publication du site www.zypp.fr est la direction générale de Zypp SAS.',
      'Pour toute question relative au contenu du site, vous pouvez nous contacter à l\'adresse : contact@zypp.fr'
    ]
  },
  {
    icon: Shield,
    title: 'Hébergement',
    content: [
      'Ce site est hébergé par :',
      'Vercel Inc.',
      '340 S Lemon Ave #4133',
      'Walnut, CA 91789',
      'États-Unis'
    ]
  }
]

export default function LegalPage() {
  return (
    <div className="relative">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-background via-background to-accent/5">
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
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Informations légales</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Mentions légales
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Retrouvez toutes les informations légales et réglementaires concernant Zypp 
              et l'utilisation de notre service de mobilité électrique.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Legal Information Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            
            {/* Legal Cards */}
            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              {legalSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={staggerItem}
                  custom={index}
                >
                  <Card hover={true} className="p-8">
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <section.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-foreground leading-relaxed">
                            {item}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RGPD Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Shield className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-2xl">Protection des données personnelles (RGPD)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Responsable du traitement</h3>
                  <p className="text-foreground leading-relaxed">
                    Zypp SAS, domiciliée au 45, rue de la République, 34000 Montpellier, 
                    est responsable du traitement de vos données personnelles.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Finalités du traitement</h3>
                  <p className="text-foreground leading-relaxed mb-3">
                    Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                    <li>Gestion de votre compte utilisateur</li>
                    <li>Traitement de vos locations de trottinettes</li>
                    <li>Facturation et paiement</li>
                    <li>Support client et assistance</li>
                    <li>Amélioration de nos services</li>
                    <li>Communication sur nos actualités (avec votre consentement)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Vos droits</h3>
                  <p className="text-foreground leading-relaxed mb-3">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification de vos données</li>
                    <li>Droit d'effacement de vos données</li>
                    <li>Droit à la portabilité de vos données</li>
                    <li>Droit d'opposition au traitement</li>
                    <li>Droit à la limitation du traitement</li>
                  </ul>
                  <p className="text-foreground leading-relaxed mt-3">
                    Pour exercer ces droits, contactez-nous à l'adresse : privacy@zypp.fr
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Conservation des données</h3>
                  <p className="text-foreground leading-relaxed">
                    Vos données sont conservées pendant la durée nécessaire aux finalités 
                    pour lesquelles elles ont été collectées, conformément à nos obligations légales 
                    et réglementaires.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Une question sur nos mentions légales ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe juridique est à votre disposition pour répondre à toutes vos questions 
              concernant l'utilisation de nos services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:legal@zypp.fr"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
                legal@zypp.fr
              </motion.a>
              <motion.a
                href="tel:+33467321456"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5" />
                04 67 32 14 56
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}