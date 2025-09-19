import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth'
import { Logo } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Inscription - Zypp',
  description: 'Créez votre compte Zypp et rejoignez la révolution de la mobilité électrique à Montpellier.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <RegisterForm />
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
          <h3 className="font-semibold text-sm mb-2">Pourquoi Zypp ?</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-accent rounded-full" />
              <span>Zéro émission CO₂</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-accent rounded-full" />
              <span>Économique et rapide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charger Program Info */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-background/60 backdrop-blur-sm border border-border rounded-xl p-4 max-w-xs">
          <h3 className="font-semibold text-sm mb-2 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Programme Chargeurs
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            Gagnez de l'argent en rechargeant nos trottinettes.
          </p>
          <div className="text-xs text-primary font-medium">
            Jusqu'à 5€ par trottinette
          </div>
        </div>
      </div>
    </div>
  )
}