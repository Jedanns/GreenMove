import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth'
import { Logo } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Connexion - Zypp',
  description: 'Connectez-vous à votre compte Zypp pour découvrir la mobilité électrique à Montpellier.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 hidden lg:block">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Logo size="sm" />
          <span className="text-lg font-semibold">Zypp</span>
        </div>
      </div>

      {/* Info Bottom */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="bg-background/60 backdrop-blur-sm border border-border rounded-xl p-4 max-w-xs">
          <h3 className="font-semibold text-sm mb-2">Mobilité électrique</h3>
          <p className="text-xs text-muted-foreground">
            Découvrez Montpellier autrement avec nos trottinettes électriques.
          </p>
        </div>
      </div>
    </div>
  )
}