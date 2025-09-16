'use client'

import { motion } from 'framer-motion'
import { Euro, Clock, Zap, Star, CheckCircle, ArrowRight } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion-variants'

const pricingPlans = [
  {
    name: 'À la demande',
    description: 'Parfait pour une utilisation occasionnelle',
    icon: Zap,
    price: {
      unlock: 1.00,
      perMinute: 0.15
    },
    features: [
      'Déverrouillage : 1€',
      '0.15€ par minute',
      'Paiement par trajet',
      'Aucun engagement',
      'Accès à toutes les trottinettes'
    ],
    recommended: false,
    examples: [
      { duration: '5 min', price: '1.75€' },
      { duration: '15 min', price: '3.25€' },
      { duration: '30 min', price: '5.50€' }
    ]
  },
  {
    name: 'Pass Mensuel',
    description: 'Idéal pour les utilisateurs réguliers',
    icon: Star,
    price: {
      monthly: 9.99,
      perMinute: 0.12
    },
    features: [
      'Abonnement : 9.99€/mois',
      '0.12€ par minute',
      'Déverrouillage gratuit',
      'Priorité de réservation',
      'Support prioritaire'
    ],
    recommended: true,
    examples: [
      { duration: '5 min', price: '0.60€' },
      { duration: '15 min', price: '1.80€' },
      { duration: '30 min', price: '3.60€' }
    ]
  },
  {
    name: 'Pass Étudiant',
    description: 'Tarif préférentiel pour les étudiants',
    icon: CheckCircle,
    price: {
      monthly: 6.99,
      perMinute: 0.10
    },
    features: [
      'Abonnement : 6.99€/mois',
      '0.10€ par minute',
      'Déverrouillage gratuit',
      'Carte étudiant requise',
      'Accès aux universités'
    ],
    recommended: false,
    examples: [
      { duration: '5 min', price: '0.50€' },
      { duration: '15 min', price: '1.50€' },
      { duration: '30 min', price: '3.00€' }
    ]
  }
]

const comparisonExamples = [
  {
    scenario: 'Trajet occasionnel',
    description: '2-3 trajets par mois',
    usage: '30 min total',
    payAsYouGo: '8.50€',
    monthly: '13.59€',
    student: '9.99€'
  },
  {
    scenario: 'Utilisateur régulier',
    description: '2-3 trajets par semaine',
    usage: '2h par mois',
    payAsYouGo: '19.00€',
    monthly: '24.39€',
    student: '19.19€'
  },
  {
    scenario: 'Utilisateur intensif',
    description: '1 trajet par jour',
    usage: '4h par mois',
    payAsYouGo: '37.00€',
    monthly: '38.79€',
    student: '30.99€'
  }
]

export default function PricingPage() {
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
              Tarifs{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                transparents
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Choisissez la formule qui correspond le mieux à vos habitudes de déplacement à Montpellier.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            
            <motion.div
              variants={staggerItem}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Nos formules
              </h2>
              <p className="text-lg text-muted-foreground">
                Trois options adaptées à tous les profils d'utilisateurs.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={scaleIn}
                  custom={index}
                  className="relative"
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Recommandé
                      </div>
                    </div>
                  )}
                  
                  <Card 
                    className={`h-full p-6 ${plan.recommended ? 'border-primary shadow-lg' : ''}`}
                    gradient={plan.recommended}
                  >
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <plan.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-base">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Pricing */}
                      <div className="text-center py-4">
                        {plan.price.monthly ? (
                          <div>
                            <div className="text-3xl font-bold text-primary">{plan.price.monthly}€</div>
                            <div className="text-sm text-muted-foreground">par mois</div>
                            <div className="text-sm text-muted-foreground mt-1">+ {plan.price.perMinute}€/min</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-3xl font-bold text-primary">{plan.price.unlock}€</div>
                            <div className="text-sm text-muted-foreground">déverrouillage</div>
                            <div className="text-sm text-muted-foreground mt-1">+ {plan.price.perMinute}€/min</div>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Examples */}
                      <div>
                        <h4 className="font-medium mb-3">Exemples de coûts :</h4>
                        <div className="space-y-2">
                          {plan.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="flex justify-between text-sm bg-accent/30 rounded px-3 py-2">
                              <span>{example.duration}</span>
                              <span className="font-medium text-primary">{example.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        variant={plan.recommended ? 'primary' : 'outline'}
                      >
                        {plan.name === 'À la demande' ? 'Télécharger l\'app' : 'Choisir ce plan'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
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
                Quelle formule vous convient ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Comparez les coûts selon votre profil d'utilisation.
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-accent/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Profil d'usage</th>
                        <th className="text-center p-4 font-semibold">À la demande</th>
                        <th className="text-center p-4 font-semibold">Pass Mensuel</th>
                        <th className="text-center p-4 font-semibold">Pass Étudiant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonExamples.map((example, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="border-t border-border"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{example.scenario}</div>
                              <div className="text-sm text-muted-foreground">{example.description}</div>
                              <div className="text-sm text-muted-foreground">{example.usage}</div>
                            </div>
                          </td>
                          <td className="text-center p-4">
                            <span className="font-semibold text-lg">{example.payAsYouGo}</span>
                          </td>
                          <td className="text-center p-4">
                            <span className="font-semibold text-lg text-primary">{example.monthly}</span>
                          </td>
                          <td className="text-center p-4">
                            <span className="font-semibold text-lg text-primary">{example.student}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
                Questions fréquentes
              </h2>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-6">
              {[
                {
                  question: "Comment fonctionne la facturation ?",
                  answer: "La facturation démarre dès le déverrouillage et s'arrête quand vous verrouillez la trottinette. Le paiement s'effectue automatiquement via votre carte bancaire enregistrée."
                },
                {
                  question: "Puis-je changer de formule à tout moment ?",
                  answer: "Oui, vous pouvez passer d'une formule à l'autre à tout moment depuis votre compte. Les changements prennent effet immédiatement."
                },
                {
                  question: "Y a-t-il des frais supplémentaires ?",
                  answer: "Non, nos tarifs sont transparents. Seuls des frais peuvent s'appliquer en cas de stationnement hors zone autorisée ou de dégradation."
                },
                {
                  question: "Comment bénéficier du tarif étudiant ?",
                  answer: "Il suffit de présenter votre carte d'étudiant valide lors de l'inscription. La vérification se fait en quelques heures."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
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
              Prêt à commencer ?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Téléchargez l'application Zypp et découvrez la mobilité électrique à Montpellier 
              dès janvier 2025.
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              Télécharger l'application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}