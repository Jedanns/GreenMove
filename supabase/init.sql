-- Script SQL pour configurer la base de données Supabase
-- À exécuter dans l'éditeur SQL de votre tableau de bord Supabase

-- 1. Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des abonnements newsletter
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- 3. Activer RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- 4. Politiques de sécurité pour les profils
-- Les utilisateurs peuvent voir et modifier leur propre profil
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Politiques pour la newsletter (publique en insertion, privée en lecture)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view newsletter" ON public.newsletter_subscriptions
    FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Fonction pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 8. Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data ->> 'full_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Trigger pour créer automatiquement le profil
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 10. Indexes pour optimiser les performances
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS newsletter_email_idx ON public.newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS newsletter_active_idx ON public.newsletter_subscriptions(is_active);

-- 11. Commentaires pour la documentation
COMMENT ON TABLE public.profiles IS 'Profils des utilisateurs Zypp';
COMMENT ON TABLE public.newsletter_subscriptions IS 'Abonnements à la newsletter Zypp';

COMMENT ON COLUMN public.profiles.id IS 'UUID de l''utilisateur (référence auth.users)';
COMMENT ON COLUMN public.profiles.email IS 'Adresse email de l''utilisateur';
COMMENT ON COLUMN public.profiles.full_name IS 'Nom complet de l''utilisateur';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL de l''avatar de l''utilisateur';
COMMENT ON COLUMN public.profiles.phone IS 'Numéro de téléphone de l''utilisateur';

COMMENT ON COLUMN public.newsletter_subscriptions.email IS 'Adresse email de l''abonné';
COMMENT ON COLUMN public.newsletter_subscriptions.subscribed_at IS 'Date d''inscription à la newsletter';
COMMENT ON COLUMN public.newsletter_subscriptions.is_active IS 'Statut actif de l''abonnement';

-- Confirmation
SELECT 'Configuration de la base de données Zypp terminée avec succès!' as status;