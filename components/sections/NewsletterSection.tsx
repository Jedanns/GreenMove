'use client'

import { motion } from 'framer-motion'
import { NewsletterForm } from '@/components/auth'
import { fadeInUp } from '@/lib/motion-variants'

interface NewsletterSectionProps {
  title?: string
  description?: string
  className?: string
}

export function NewsletterSection({ 
  title = "Restez connecté",
  description = "Recevez les dernières actualités et offres exclusives de Zypp directement dans votre boîte mail.",
  className = ""
}: NewsletterSectionProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>
          
          <div className="max-w-md mx-auto">
            <NewsletterForm 
              compact
              className="w-full"
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Pas de spam, promis ! Vous pouvez vous désabonner à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}