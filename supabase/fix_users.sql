-- =====================================================================
-- FIX USERS, AUTH IDENTITIES & PROFILES SETUP
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/eqzhxlsoptcmlohjlbpc/sql/new
-- =====================================================================

-- 1. Create or replace automatic profile creation trigger for new sign-ups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, address, avatar_url, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'Krist Client'),
    COALESCE(new.raw_user_meta_data->>'address', ''),
    '/images/hero.webp',
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    name = COALESCE(EXCLUDED.name, public.profiles.name),
    address = COALESCE(EXCLUDED.address, public.profiles.address),
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Clean up any partial or broken record for customer@krist.com
DELETE FROM auth.identities WHERE provider_id = 'customer@krist.com' OR identity_data->>'email' = 'customer@krist.com';
DELETE FROM auth.users WHERE email = 'customer@krist.com';
DELETE FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000001'::uuid;

-- 3. Properly create VIP user in auth.users AND auth.identities
DO $$
DECLARE
  v_user_id uuid := '00000000-0000-0000-0000-000000000001'::uuid;
BEGIN
  -- Insert user into auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    aud,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    is_super_admin
  ) VALUES (
    v_user_id,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'customer@krist.com',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"Krist VIP Client","address":"740 Park Avenue, Penthouse B, New York, NY 10021"}'::jsonb,
    now(),
    now(),
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    '',
    false
  );

  -- Insert identity into auth.identities (Required by Supabase GoTrue Auth)
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    v_user_id,
    format('{"sub":"%s","email":"%s"}', v_user_id::text, 'customer@krist.com')::jsonb,
    'email',
    v_user_id::text,
    now(),
    now(),
    now()
  );

  -- Insert profile into public.profiles
  INSERT INTO public.profiles (id, name, address, avatar_url, updated_at)
  VALUES (
    v_user_id,
    'Krist VIP Client',
    '740 Park Avenue, Penthouse B, New York, NY 10021',
    '/images/hero.webp',
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = now();
END $$;

-- 4. Create public.users view so it is visible in the Supabase Table Editor
CREATE OR REPLACE VIEW public.users AS
SELECT
  u.id,
  u.email,
  p.name,
  p.address,
  p.avatar_url,
  u.created_at,
  p.updated_at
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id;

-- 5. Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.users TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
