# Système d'Authentification Zypp

Ce projet implémente un système d'authentification complet avec Supabase, incluant la connexion, l'inscription et la newsletter.

## 🚀 Fonctionnalités

### Authentification
- ✅ Connexion utilisateur
- ✅ Inscription avec validation
- ✅ Gestion des sessions
- ✅ Protection des routes
- ✅ Menu utilisateur dynamique
- ✅ Déconnexion

### Newsletter
- ✅ Inscription à la newsletter
- ✅ Validation email
- ✅ Gestion des doublons
- ✅ Interface compacte et complète

### Interface
- ✅ Design cohérent avec le site
- ✅ Animations Framer Motion
- ✅ Responsive design
- ✅ Messages d'erreur clairs
- ✅ États de chargement

## 🛠️ Configuration

### 1. Base de données Supabase

Exécutez le script SQL suivant dans votre tableau de bord Supabase :

```sql
-- Le contenu du fichier supabase/init.sql
```

### 2. Variables d'environnement

Vos variables sont déjà configurées dans `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://lkuhltwsgcbuyubneqpc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Structure des fichiers

```
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx         # Formulaire de connexion
│   │   ├── RegisterForm.tsx      # Formulaire d'inscription
│   │   ├── NewsletterForm.tsx    # Formulaire newsletter
│   │   ├── ProtectedRoute.tsx    # Protection des routes
│   │   └── index.ts
│   ├── ui/
│   │   ├── Input.tsx             # Composants d'input avec validation
│   │   └── ...
│   └── sections/
│       └── NewsletterSection.tsx # Section newsletter pour pages
├── hooks/
│   ├── useAuth.tsx               # Hook d'authentification
│   ├── useNewsletter.tsx         # Hook newsletter
│   └── index.ts
├── types/
│   ├── auth.ts                   # Types d'authentification
│   ├── database.ts               # Types de base de données
│   └── index.ts
├── lib/
│   └── supabase.ts               # Client Supabase
├── app/
│   ├── login/page.tsx            # Page de connexion
│   ├── register/page.tsx         # Page d'inscription
│   ├── newsletter/page.tsx       # Page newsletter
│   ├── account/page.tsx          # Page compte (protégée)
│   └── layout.tsx                # Layout avec AuthProvider
└── supabase/
    └── init.sql                  # Script d'initialisation DB
```

## 🎯 Utilisation

### Hook d'authentification

```tsx
import { useAuth } from '@/hooks'

function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth()
  
  if (loading) return <div>Chargement...</div>
  if (!user) return <div>Non connecté</div>
  
  return (
    <div>
      <p>Bonjour {user.profile?.full_name}</p>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  )
}
```

### Protection de route

```tsx
import { ProtectedRoute } from '@/components/auth'

function PrivatePage() {
  return (
    <ProtectedRoute>
      <div>Contenu protégé</div>
    </ProtectedRoute>
  )
}
```

### Newsletter

```tsx
import { NewsletterForm } from '@/components/auth'

// Version complète
<NewsletterForm />

// Version compacte
<NewsletterForm compact />

// Section pour pages
import { NewsletterSection } from '@/components/sections'
<NewsletterSection />
```

## 🔒 Sécurité

- **RLS (Row Level Security)** : Activé sur toutes les tables
- **Politiques Supabase** : Utilisateurs peuvent seulement voir/modifier leurs propres données
- **Validation côté client** : Validation des formulaires en temps réel
- **Protection CSRF** : Gérée automatiquement par Supabase
- **Sessions sécurisées** : Tokens JWT automatiquement gérés

## 🎨 Personnalisation

### Styles
Tous les composants utilisent les classes Tailwind CSS de votre design system existant.

### Animations
Les animations Framer Motion sont cohérentes avec votre `motion-variants.ts`.

### Validation
La validation des formulaires est personnalisable dans chaque composant.

## 🚦 Pages disponibles

- `/login` - Connexion
- `/register` - Inscription  
- `/newsletter` - Newsletter
- `/account` - Profil utilisateur (protégé)

## 🔧 Développement

Pour tester le système :

1. Démarrez le serveur : `npm run dev`
2. Allez sur `/register` pour créer un compte
3. Connectez-vous via `/login`
4. Accédez à `/account` pour voir votre profil
5. Testez la newsletter sur `/newsletter`

## 📊 Base de données

### Tables créées :
- `profiles` : Profils utilisateurs
- `newsletter_subscriptions` : Abonnements newsletter

### Triggers automatiques :
- Création de profil lors de l'inscription
- Mise à jour des timestamps
- Validation des emails

Le système est maintenant prêt à l'emploi ! 🎉