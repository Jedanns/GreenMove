import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { AuthProvider } from '@/hooks'

// Configuration des polices
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Zypp - Trottinettes électriques en libre-service à Montpellier',
    template: '%s | Zypp'
  },
  description: 'Découvrez Montpellier avec les trottinettes électriques Zypp. 1000 trottinettes disponibles 24h/24 dès janvier 2025. 1€ de déverrouillage + 15¢/min.',
  keywords: ['trottinette électrique', 'Montpellier', 'mobilité', 'transport', 'écologique', 'libre-service'],
  authors: [{ name: 'Zypp Team' }],
  creator: 'Zypp',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://zypp-montpellier.com',
    title: 'Zypp - Trottinettes électriques en libre-service à Montpellier',
    description: 'Découvrez Montpellier avec les trottinettes électriques Zypp. 1000 trottinettes disponibles 24h/24 dès janvier 2025.',
    siteName: 'Zypp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zypp - Trottinettes électriques à Montpellier',
    description: 'Découvrez Montpellier avec les trottinettes électriques Zypp. 1000 trottinettes disponibles 24h/24 dès janvier 2025.',
    creator: '@zypp_montpellier'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          {/* Header fixe */}
          <Header />
          
          {/* Contenu principal avec padding-top pour compenser le header fixe */}
          <main className="pt-16 md:pt-20">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </AuthProvider>
        
        {/* Curseur personnalisé (optionnel) */}
        <div id="cursor" className="hidden lg:block fixed w-4 h-4 pointer-events-none z-[9999] mix-blend-difference">
          <div className="w-full h-full bg-white rounded-full transform transition-transform duration-150 ease-out" />
        </div>
      </body>
    </html>
  )
}