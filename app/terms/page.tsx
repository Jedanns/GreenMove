'use client'

import { motion } from 'framer-motion'
import { FileText, Scale, AlertTriangle, CreditCard, Shield, Users } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

const sections = [
  {
    icon: Users,
    title: "Objet et acceptation",
    content: [
      "Ces conditions générales régissent l'utilisation du service de trottinettes électriques en libre-service Zypp",
      "L'utilisation du service implique l'acceptation pleine et entière de ces conditions",
      "Le service est réservé aux personnes âgées de 18 ans et plus",
      "Une pièce d'identité valide et un moyen de paiement sont requis pour l'inscription",
      "L'utilisateur certifie avoir la capacité juridique pour contracter"
    ]
  },
  {
    icon: FileText,
    title: "Description du service",
    content: [
      "Zypp propose un service de location de trottinettes électriques en libre-service",
      "Les trottinettes sont disponibles 24h/24, 7j/7 dans les zones autorisées de Montpellier",
      "La réservation et le déverrouillage s'effectuent via l'application mobile",
      "Le service comprend l'assurance responsabilité civile pendant la durée de location",
      "Les trottinettes doivent être stationnées dans les zones désignées"
    ]
  },
  {
    icon: CreditCard,
    title: "Tarification et paiement",
    content: [
      "Déverrouillage : 1€ par trajet",
      "Utilisation : 0,15€ par minute",
      "Les tarifs sont indiqués TTC et peuvent évoluer avec un préavis de 30 jours",
      "Le paiement s'effectue par carte bancaire via l'application",
      "Facturation automatique à la fin de chaque trajet",
      "En cas d'incident technique, seul le temps d'utilisation réel est facturé"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Obligations de l'utilisateur",
    content: [
      "Respecter le Code de la route et les règles de circulation",
      "Porter un casque (fortement recommandé)",
      "Vérifier l'état de la trottinette avant utilisation",
      "Signaler tout dysfonctionnement via l'application",
      "Stationner uniquement dans les zones autorisées",
      "Ne pas transporter de passager (usage strictement personnel)",
      "Ne pas utiliser sous l'emprise d'alcool ou de stupéfiants",
      "Être titulaire d'une assurance responsabilité civile personnelle"
    ]
  },
  {
    icon: Shield,
    title: "Responsabilité et assurance",
    content: [
      "L'utilisateur est responsable de la trottinette pendant toute la durée de location",
      "Zypp fournit une assurance responsabilité civile pour les dommages causés aux tiers",
      "L'utilisateur reste responsable des dommages corporels qu'il pourrait subir",
      "En cas de vol ou de dégradation, l'utilisateur peut être tenu responsable financièrement",
      "Vol déclaré : 350€ | Dégradations légères : 50-150€ | Dégradations importantes : 200-300€",
      "L'utilisateur doit déclarer tout incident dans les 24 heures"
    ]
  },
  {
    icon: Scale,
    title: "Sanctions et résiliation",
    content: [
      "Stationnement non conforme : rappel puis suspension temporaire",
      "Conduite dangereuse : suspension immédiate du compte",
      "Dégradations volontaires : résiliation définitive et poursuites",
      "Retard de paiement : suspension du service jusqu'à régularisation",
      "Suspension pour 3 infractions dans un délai de 30 jours",
      "Droit de résiliation sans préavis en cas de manquement grave"
    ]
  }
]

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Conditions Générales d'Utilisation
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ces conditions définissent les règles d'utilisation du service de trottinettes 
              électriques Zypp à Montpellier. Merci de les lire attentivement.
            </p>
            
            <div className="mt-8 text-sm text-muted-foreground">
              Version en vigueur depuis le 19 septembre 2025
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
                  <h2 className="text-2xl font-bold mb-4">Informations légales</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong>Zypp SAS</strong><br />
                      Société par actions simplifiée au capital de 100.000 euros<br />
                      RCS Montpellier : 123 456 789<br />
                      Siège social : 123 Avenue de la Liberté, 34000 Montpellier<br />
                      Email : contact@zypp.fr<br />
                      Téléphone : 04 67 00 00 00
                    </p>
                    <p>
                      <strong>Directeur de la publication :</strong> Jean Dupont, Président<br />
                      <strong>Hébergement :</strong> OVH SAS - 2 rue Kellermann, 59100 Roubaix
                    </p>
                  </div>
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

            {/* Règles spécifiques */}
            <motion.div variants={staggerItem}>
              <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle className="text-2xl">Règles de circulation importantes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-green-700 dark:text-green-400">✓ Autorisé</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Pistes cyclables et voies vertes</li>
                        <li>• Zones 30 (avec prudence)</li>
                        <li>• Zones piétonnes autorisées</li>
                        <li>• Parcs et espaces verts désignés</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-red-700 dark:text-red-400">✗ Interdit</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Trottoirs (sauf autorisation)</li>
                        <li>• Routes à plus de 50 km/h</li>
                        <li>• Transport en commun</li>
                        <li>• Centres commerciaux</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Données personnelles */}
            <motion.div variants={staggerItem}>
              <Card className="p-8">
                <CardContent>
                  <h2 className="text-2xl font-bold mb-4">Protection des données personnelles</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Zypp s'engage à protéger vos données personnelles conformément au RGPD. 
                    Les données collectées sont utilisées uniquement pour fournir le service 
                    et améliorer votre expérience.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Pour plus d'informations, consultez notre 
                    <a href="/privacy" className="text-primary hover:underline ml-1">
                      Politique de Confidentialité
                    </a>.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Modifications et contact */}
            <motion.div variants={staggerItem}>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent>
                  <h2 className="text-2xl font-bold mb-4">Modifications et contact</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Évolution des conditions</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Zypp se réserve le droit de modifier ces conditions à tout moment. 
                        Les utilisateurs seront informés par email et via l'application 
                        au moins 30 jours avant l'entrée en vigueur.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Service client</h3>
                      <div className="text-muted-foreground text-sm space-y-1">
                        <p>📧 Email : support@zypp.fr</p>
                        <p>📞 Téléphone : 04 67 00 00 00 (du lundi au vendredi, 9h-18h)</p>
                        <p>💬 Chat en ligne via l'application</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Droit applicable</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Ces conditions sont régies par le droit français. 
                        En cas de litige, les tribunaux de Montpellier seront compétents.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}