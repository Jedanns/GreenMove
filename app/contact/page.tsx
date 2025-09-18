'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Zap } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  scaleIn 
} from '@/lib/motion-variants'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Nous vous répondons en moins de 24h',
    value: 'contact@zypp.fr',
    action: 'mailto:contact@zypp.fr'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    description: 'Du lundi au vendredi de 9h à 18h',
    value: '04 67 32 14 56',
    action: 'tel:+33467321456'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    description: 'Notre siège social à Montpellier',
    value: '45, rue de la République\n34000 Montpellier',
    action: 'https://maps.google.com/?q=45+rue+de+la+République+34000+Montpellier'
  }
]

const faqItems = [
  {
    icon: Zap,
    question: 'Comment fonctionne Zypp ?',
    answer: 'Téléchargez l\'app, localisez une trottinette près de vous, déverrouillez-la en scannant le QR code et c\'est parti ! 1€ de déverrouillage puis 15 centimes par minute. Simple et écologique.'
  },
  {
    icon: MessageSquare,
    question: 'Où puis-je utiliser les trottinettes Zypp ?',
    answer: 'Nos 1000 trottinettes sont disponibles 24h/24 dans toute la ville de Montpellier. L\'app vous indique les zones de stationnement autorisées pour un usage responsable.'
  },
  {
    icon: HelpCircle,
    question: 'Comment devenir rechargeur Zypp ?',
    answer: 'Rejoignez notre communauté de rechargeurs ! Récupérez des trottinettes le soir, rechargez-les chez vous et gagnez de l\'argent tout en contribuant à une mobilité durable.'
  }
]

export default function ContactPage() {
  return (
    <div className="relative">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-background via-background to-accent/5">
        
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
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Nous sommes là pour vous aider</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Contactez-nous
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Une question sur notre service de trottinettes électriques ? Besoin d'aide pour votre première location ? 
              Notre équipe vous accompagne dans votre transition vers une mobilité plus durable et responsable.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            
            {/* Contact Cards Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  variants={scaleIn}
                  custom={index}
                >
                  <Card hover={true} gradient={true} className="h-full p-6 text-center">
                    <CardHeader className="pb-4">
                      <motion.div
                        className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <contact.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{contact.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {contact.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {contact.action ? (
                        <motion.a
                          href={contact.action}
                          target={contact.action.startsWith('http') ? '_blank' : undefined}
                          rel={contact.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors whitespace-pre-line"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {contact.value}
                        </motion.a>
                      ) : (
                        <span className="text-lg font-semibold text-foreground whitespace-pre-line">
                          {contact.value}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            
            {/* Section Header */}
            <motion.div
              variants={staggerItem}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Envoyez-nous un message
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement. 
                Ensemble, construisons un futur urbain plus fluide, plus vert et plus responsable.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={staggerItem}
              className="bg-background rounded-2xl p-8 shadow-lg border border-border/50"
            >
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            
            {/* Section Header */}
            <motion.div
              variants={staggerItem}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Trouvez rapidement les réponses à vos questions les plus courantes
              </p>
            </motion.div>

            {/* FAQ Items */}
            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.question}
                  variants={staggerItem}
                  custom={index}
                >
                  <Card hover={true} className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.question}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nos horaires de support
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe de support client est disponible pour répondre à toutes vos questions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <Card className="p-4">
                <CardContent className="text-center">
                  <h3 className="font-semibold mb-2">Lundi - Vendredi</h3>
                  <p className="text-primary font-medium">9h00 - 18h00</p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="text-center">
                  <h3 className="font-semibold mb-2">Weekend</h3>
                  <p className="text-primary font-medium">10h00 - 16h00</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Prêt à essayer Zypp ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Téléchargez l'application et découvrez une nouvelle façon de vous déplacer à Montpellier
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              Télécharger l'app
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}