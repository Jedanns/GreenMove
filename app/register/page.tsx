import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Rejoignez la communauté Zypp et profitez de nos trottinettes électriques à Montpellier.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}