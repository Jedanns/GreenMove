import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et offres de Zypp.',
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md">
        <NewsletterForm 
          title="Newsletter Zypp"
          description="Soyez les premiers informés de nos actualités, nouvelles zones de service et offres spéciales."
        />
      </div>
    </div>
  )
}