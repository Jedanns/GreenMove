import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte Zypp pour accéder à vos trajets et paramètres.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}