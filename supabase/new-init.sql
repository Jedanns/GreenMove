-- =============================================================================
-- ZYPP - Nouvelle Base de Données Complète
-- Système de location de trottinettes électriques
-- =============================================================================

-- Suppression des tables existantes (attention : données perdues)
DROP TABLE IF EXISTS public.newsletter_subscriptions CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.scooters CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.charging_sessions CASCADE;
DROP TABLE IF EXISTS public.payment_methods CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.zones CASCADE;

-- Supprimer les fonctions existantes
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS calculate_trip_details() CASCADE;

-- Supprimer les types existants
DROP TYPE IF EXISTS user_type CASCADE;
DROP TYPE IF EXISTS scooter_status CASCADE;
DROP TYPE IF EXISTS trip_status CASCADE;
DROP TYPE IF EXISTS charging_status CASCADE;

-- =============================================================================
-- ENUMS ET TYPES
-- =============================================================================

-- Type d'utilisateur
CREATE TYPE user_type AS ENUM ('regular', 'charger', 'admin');

-- Statut de trottinette
CREATE TYPE scooter_status AS ENUM ('available', 'in_use', 'maintenance', 'charging', 'offline');

-- Statut de location
CREATE TYPE trip_status AS ENUM ('active', 'completed', 'cancelled');

-- Statut de recharge
CREATE TYPE charging_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- =============================================================================
-- TABLES PRINCIPALES
-- =============================================================================

-- 1. TABLE USERS (Profils utilisateurs étendus)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    user_type user_type DEFAULT 'regular' NOT NULL,
    
    -- Informations personnelles
    date_of_birth DATE,
    address_street TEXT,
    address_city TEXT,
    address_postal_code TEXT,
    address_country TEXT DEFAULT 'France',
    
    -- Statut rechargeur
    is_charger_approved BOOLEAN DEFAULT FALSE,
    charger_application_date TIMESTAMP WITH TIME ZONE,
    charger_approval_date TIMESTAMP WITH TIME ZONE,
    charger_hourly_rate DECIMAL(5,2), -- €/heure pour les rechargeurs
    charger_rating DECIMAL(3,2) DEFAULT 0.00,
    charger_total_earnings DECIMAL(10,2) DEFAULT 0.00,
    
    -- Préférences et paramètres
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    preferred_language TEXT DEFAULT 'fr',
    
    -- Métadonnées
    last_active_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLE SCOOTERS (Trottinettes)
CREATE TABLE public.scooters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE, -- Code QR/identifiant unique
    model TEXT NOT NULL DEFAULT 'Zypp Standard',
    battery_level INTEGER DEFAULT 100 CHECK (battery_level >= 0 AND battery_level <= 100),
    status scooter_status DEFAULT 'available' NOT NULL,
    
    -- Localisation
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name TEXT,
    location_zone TEXT, -- Zone de dépose autorisée
    
    -- Informations techniques
    total_distance_km DECIMAL(10,2) DEFAULT 0.00,
    total_trips INTEGER DEFAULT 0,
    last_maintenance_date TIMESTAMP WITH TIME ZONE,
    next_maintenance_km DECIMAL(10,2),
    
    -- Assignation rechargeur
    assigned_charger_id UUID REFERENCES public.users(id),
    assignment_date TIMESTAMP WITH TIME ZONE,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLE TRIPS (Locations/Trajets)
CREATE TABLE public.trips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    scooter_id UUID REFERENCES public.scooters(id) NOT NULL,
    
    -- Détails du trajet
    status trip_status DEFAULT 'active' NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER, -- Calculé automatiquement
    
    -- Localisation
    start_latitude DECIMAL(10, 8) NOT NULL,
    start_longitude DECIMAL(11, 8) NOT NULL,
    start_location_name TEXT,
    end_latitude DECIMAL(10, 8),
    end_longitude DECIMAL(11, 8),
    end_location_name TEXT,
    
    -- Détails techniques
    distance_km DECIMAL(8,2),
    max_speed_kmh DECIMAL(5,2),
    avg_speed_kmh DECIMAL(5,2),
    
    -- Tarification
    base_cost DECIMAL(5,2) DEFAULT 1.00, -- 1€ de base
    per_minute_cost DECIMAL(4,3) DEFAULT 0.150, -- 15 centimes/minute
    total_cost DECIMAL(8,2),
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLE CHARGING_SESSIONS (Sessions de recharge)
CREATE TABLE public.charging_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    scooter_id UUID REFERENCES public.scooters(id) NOT NULL,
    charger_id UUID REFERENCES public.users(id) NOT NULL,
    
    -- Détails de la session
    status charging_status DEFAULT 'pending' NOT NULL,
    pickup_time TIMESTAMP WITH TIME ZONE,
    return_time TIMESTAMP WITH TIME ZONE,
    duration_hours DECIMAL(4,2), -- Durée en heures
    
    -- Localisation
    pickup_latitude DECIMAL(10, 8),
    pickup_longitude DECIMAL(11, 8),
    pickup_location_name TEXT,
    return_latitude DECIMAL(10, 8),
    return_longitude DECIMAL(11, 8),
    return_location_name TEXT,
    
    -- Batterie
    battery_level_start INTEGER,
    battery_level_end INTEGER,
    battery_gained INTEGER, -- Calculé automatiquement
    
    -- Rémunération
    hourly_rate DECIMAL(5,2), -- Taux horaire appliqué
    total_earnings DECIMAL(8,2), -- Gains totaux
    payment_status TEXT DEFAULT 'pending', -- pending, paid, cancelled
    
    -- Évaluation
    charger_rating INTEGER CHECK (charger_rating >= 1 AND charger_rating <= 5),
    charger_comment TEXT,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLE PAYMENT_METHODS (Méthodes de paiement)
CREATE TABLE public.payment_methods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Détails de la méthode
    type TEXT NOT NULL, -- 'card', 'paypal', 'apple_pay', 'google_pay'
    is_default BOOLEAN DEFAULT FALSE,
    
    -- Informations carte (cryptées en production)
    card_last_four TEXT,
    card_brand TEXT, -- 'visa', 'mastercard', etc.
    card_expiry_month INTEGER,
    card_expiry_year INTEGER,
    
    -- Métadonnées
    stripe_payment_method_id TEXT, -- ID Stripe
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABLE TRANSACTIONS (Historique des paiements)
CREATE TABLE public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    trip_id UUID REFERENCES public.trips(id),
    charging_session_id UUID REFERENCES public.charging_sessions(id),
    payment_method_id UUID REFERENCES public.payment_methods(id),
    
    -- Détails de la transaction
    type TEXT NOT NULL, -- 'trip_payment', 'charger_payout', 'refund'
    amount DECIMAL(8,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
    
    -- Informations externes
    stripe_payment_intent_id TEXT,
    stripe_charge_id TEXT,
    failure_reason TEXT,
    
    -- Métadonnées
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABLE NOTIFICATIONS (Notifications utilisateur)
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Contenu
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- 'info', 'success', 'warning', 'error', 'trip', 'charging'
    
    -- Références
    trip_id UUID REFERENCES public.trips(id),
    charging_session_id UUID REFERENCES public.charging_sessions(id),
    
    -- Statut
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TABLE ZONES (Zones de dépose autorisées)
CREATE TABLE public.zones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    
    -- Géolocalisation (polygone)
    center_latitude DECIMAL(10, 8) NOT NULL,
    center_longitude DECIMAL(11, 8) NOT NULL,
    radius_meters INTEGER DEFAULT 500,
    polygon_coordinates JSONB, -- Coordonnées du polygone si forme complexe
    
    -- Paramètres
    max_scooters INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT TRUE,
    priority INTEGER DEFAULT 1, -- Pour l'ordre d'affichage
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- CONTRAINTES ET INDEX
-- =============================================================================

-- Contraintes uniques
ALTER TABLE public.users ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE public.scooters ADD CONSTRAINT unique_scooter_code UNIQUE (code);

-- Index pour les performances
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_type ON public.users(user_type);
CREATE INDEX idx_users_charger ON public.users(is_charger_approved) WHERE is_charger_approved = TRUE;

CREATE INDEX idx_scooters_status ON public.scooters(status);
CREATE INDEX idx_scooters_location ON public.scooters(latitude, longitude);
CREATE INDEX idx_scooters_battery ON public.scooters(battery_level);
CREATE INDEX idx_scooters_code ON public.scooters(code);

CREATE INDEX idx_trips_user ON public.trips(user_id);
CREATE INDEX idx_trips_scooter ON public.trips(scooter_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_trips_start_time ON public.trips(start_time);

CREATE INDEX idx_charging_sessions_charger ON public.charging_sessions(charger_id);
CREATE INDEX idx_charging_sessions_scooter ON public.charging_sessions(scooter_id);
CREATE INDEX idx_charging_sessions_status ON public.charging_sessions(status);

CREATE INDEX idx_payment_methods_user ON public.payment_methods(user_id);
CREATE INDEX idx_payment_methods_default ON public.payment_methods(user_id, is_default) WHERE is_default = TRUE;

CREATE INDEX idx_transactions_user ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(type);
CREATE INDEX idx_transactions_status ON public.transactions(status);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = FALSE;

-- =============================================================================
-- FONCTIONS ET TRIGGERS
-- =============================================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_scooters_updated_at BEFORE UPDATE ON public.scooters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_charging_sessions_updated_at BEFORE UPDATE ON public.charging_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_payment_methods_updated_at BEFORE UPDATE ON public.payment_methods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_zones_updated_at BEFORE UPDATE ON public.zones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement un profil utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, newsletter_subscribed)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Utilisateur'),
        COALESCE((NEW.raw_user_meta_data ->> 'newsletter_subscribed')::boolean, false)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement le profil
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour calculer la durée et le coût d'un trajet
CREATE OR REPLACE FUNCTION calculate_trip_details()
RETURNS TRIGGER AS $$
BEGIN
    -- Si le trajet se termine
    IF NEW.end_time IS NOT NULL AND OLD.end_time IS NULL THEN
        -- Calculer la durée en minutes
        NEW.duration_minutes := EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time)) / 60;
        
        -- Calculer le coût total
        NEW.total_cost := NEW.base_cost + (NEW.duration_minutes * NEW.per_minute_cost);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour calculer automatiquement les détails du trajet
CREATE TRIGGER trigger_calculate_trip_details
    BEFORE UPDATE ON public.trips
    FOR EACH ROW
    EXECUTE FUNCTION calculate_trip_details();

-- =============================================================================
-- POLITIQUES DE SÉCURITÉ (RLS)
-- =============================================================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scooters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charging_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Politiques pour scooters (lecture publique pour l'app, écriture pour admin)
CREATE POLICY "Anyone can view available scooters" ON public.scooters FOR SELECT USING (status = 'available');
CREATE POLICY "Authenticated users can view all scooters" ON public.scooters FOR SELECT USING (auth.role() = 'authenticated');

-- Politiques pour trips
CREATE POLICY "Users can view own trips" ON public.trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own trips" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own active trips" ON public.trips FOR UPDATE USING (auth.uid() = user_id AND status = 'active');

-- Politiques pour charging_sessions
CREATE POLICY "Chargers can view own sessions" ON public.charging_sessions FOR SELECT USING (auth.uid() = charger_id);
CREATE POLICY "Chargers can create sessions" ON public.charging_sessions FOR INSERT WITH CHECK (auth.uid() = charger_id);
CREATE POLICY "Chargers can update own sessions" ON public.charging_sessions FOR UPDATE USING (auth.uid() = charger_id);

-- Politiques pour payment_methods
CREATE POLICY "Users can manage own payment methods" ON public.payment_methods FOR ALL USING (auth.uid() = user_id);

-- Politiques pour transactions
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);

-- Politiques pour notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Politiques pour zones (lecture publique)
CREATE POLICY "Anyone can view zones" ON public.zones FOR SELECT USING (is_active = TRUE);

-- =============================================================================
-- DONNÉES INITIALES
-- =============================================================================

-- Zones de Montpellier
INSERT INTO public.zones (name, description, center_latitude, center_longitude, radius_meters, max_scooters) VALUES
('Centre-ville', 'Place de la Comédie et alentours', 43.6077, 3.8790, 800, 100),
('Antigone', 'Quartier Antigone', 43.6045, 3.8950, 600, 75),
('Gare Saint-Roch', 'Autour de la gare', 43.6037, 3.8808, 500, 80),
('Université', 'Campus universitaire', 43.6315, 3.8620, 1000, 60),
('Port Marianne', 'Nouveau quartier', 43.5940, 3.8990, 700, 50),
('Hôtel de Ville', 'Mairie et environs', 43.5995, 3.8808, 400, 40);

-- Confirmation
SELECT 'Nouvelle base de données Zypp créée avec succès!' as status;