'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

const footerLinks = {
  company: [
    { name: 'Comment ça marche', href: '/how-it-works' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Devenir rechargeur', href: '/become-charger' },
    { name: 'À propos', href: '/about' }
  ],
  service: [
    { name: 'Zones de service', href: '/zones' },
    { name: 'Télécharger l\'app', href: '/download' },
    { name: 'Guide d\'utilisation', href: '/guide' },
    { name: 'Sécurité', href: '/safety' }
  ],
  support: [
    { name: 'Centre d\'aide', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'Signaler un problème', href: '/report' },
    { name: 'Newsletter', href: '/newsletter' }
  ]
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Email', href: 'mailto:contact@zypp.fr', icon: Mail }
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <motion.div
          className="py-16 border-b border-border/50"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              className="text-3xl font-bold mb-4"
              variants={staggerItem}
            >
              Restez informé
            </motion.h3>
            <motion.p
              className="text-muted-foreground mb-8 text-lg"
              variants={staggerItem}
            >
              Recevez les dernières actualités et mises à jour de Zypp directement dans votre boîte mail.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              variants={staggerItem}
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="lg" className="sm:px-8">
                S'abonner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerItem}
          >
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                className="h-10 w-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <span className="text-primary-foreground font-bold">Z</span>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Zypp
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Révolutionnez vos déplacements à Montpellier avec nos trottinettes électriques. 
              Une mobilité durable, accessible et disponible 24h/24.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg hover:bg-accent transition-colors group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold mb-4">Service</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm">
            © 2025 Zypp. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              href="/legal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              CGU
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}