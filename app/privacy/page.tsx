'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

const sections = [
  {
    icon: Database,
    title: "Données collectées",
    content: [
      "Informations d'identification : nom, prénom, adresse email, numéro de téléphone",
      "Données de localisation : position GPS pour localiser les trottinettes et calculer les trajets",
      "Informations de paiement : données de carte bancaire (traitées de manière sécurisée par notre partenaire Stripe)",
      "Données d'utilisation : historique des trajets, durée, distance, fréquence d'utilisation",
      "Données techniques : type d'appareil, système d'exploitation, version de l'application"
    ]
  },
  {
    icon: UserCheck,
    title: "Utilisation des données",
    content: [
      "Fournir et améliorer nos services de mobilité électrique",
      "Traiter vos réservations et paiements",
      "Assurer la sécurité et la maintenance de notre flotte",
      "Optimiser la répartition des trottinettes sur le territoire",
      "Vous envoyer des notifications importantes concernant votre compte",
      "Analyser l'utilisation pour améliorer l'expérience utilisateur"
    ]
  },
  {
    icon: Lock,
    title: "Sécurité des données",
    content: [
      "Chiffrement SSL/TLS pour toutes les communications",
      "Stockage sécurisé dans des centres de données certifiés en France",
      "Accès limité aux données selon le principe du besoin de savoir",
      "Audits de sécurité réguliers",
      "Conformité aux standards de sécurité bancaire pour les paiements"
    ]
  },
  {
    icon: Globe,
    title: "Partage des données",
    content: [
      "Nous ne vendons jamais vos données personnelles",
      "Partage limité avec nos partenaires techniques (paiement, géolocalisation)",
      "Transmission possible aux autorités si requis par la loi",
      "Données anonymisées pour les statistiques municipales de mobilité",
      "Partenaires contractuellement liés au respect de cette politique"
    ]
  },
  {
    icon: Eye,
    title: "Vos droits",
    content: [
      "Droit d'accès : consulter les données que nous détenons sur vous",
      "Droit de rectification : corriger des informations inexactes",
      "Droit à l'effacement : supprimer votre compte et vos données",
      "Droit à la portabilité : récupérer vos données dans un format lisible",
      "Droit d'opposition : refuser certains traitements de données",
      "Droit de limitation : restreindre l'utilisation de vos données"
    ]
  }
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Politique de Confidentialité
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chez Zypp, nous nous engageons à protéger votre vie privée et vos données personnelles. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
            
            <div className="mt-8 text-sm text-muted-foreground">
              Dernière mise à jour : 19 septembre 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-12"
          >
            
            {/* Introduction */}
            <motion.div variants={staggerItem}>
              <Card className="p-8">
                <CardContent>
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Zypp SAS, société par actions simplifiée au capital de 100.000 euros, 
                    immatriculée au RCS de Montpellier sous le numéro 123 456 789, 
                    dont le siège social est situé au 123 Avenue de la Liberté, 34000 Montpellier, 
                    est responsable du traitement de vos données personnelles.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    En utilisant notre application et nos services, vous acceptez les pratiques 
                    décrites dans cette politique de confidentialité. Nous vous encourageons à 
                    lire attentivement ce document.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sections */}
            {sections.map((section, index) => (
              <motion.div key={section.title} variants={staggerItem}>
                <Card className="p-8">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Contact */}
            <motion.div variants={staggerItem}>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent>
                  <h2 className="text-2xl font-bold mb-4">Contact et exercice de vos droits</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Pour toute question concernant cette politique de confidentialité ou pour 
                    exercer vos droits, vous pouvez nous contacter :
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Par email</h3>
                      <p className="text-primary">privacy@zypp.fr</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Par courrier</h3>
                      <div className="text-muted-foreground text-sm">
                        <p>Zypp SAS - Service DPO</p>
                        <p>123 Avenue de la Liberté</p>
                        <p>34000 Montpellier, France</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Important :</strong> Si vous n'êtes pas satisfait de notre réponse, 
                      vous avez le droit de déposer une plainte auprès de la CNIL 
                      (Commission Nationale de l'Informatique et des Libertés).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Modifications */}
            <motion.div variants={staggerItem}>
              <Card className="p-8">
                <CardContent>
                  <h2 className="text-2xl font-bold mb-4">Modifications de cette politique</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous nous réservons le droit de modifier cette politique de confidentialité 
                    à tout moment. Les modifications importantes vous seront notifiées par email 
                    ou via l'application. La version la plus récente sera toujours disponible 
                    sur notre site web et dans l'application.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}