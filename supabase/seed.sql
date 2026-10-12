-- ==========================================
-- KRIST DATABASE SEED SCRIPT
-- Unique pictures for each product & category
-- Includes initial user, categories, subcategories, products
-- ==========================================

-- 1. Create Initial VIP User in Supabase Auth (if not already existing)
-- Credentials:
-- Email: customer@krist.com
-- Password: Password123!
DO $$
DECLARE
  v_user_id uuid := '00000000-0000-0000-0000-000000000001'::uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'customer@krist.com') THEN
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
      confirmation_token
    ) VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000'::uuid,
      'customer@krist.com',
      crypt('Password123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"name":"Krist VIP Client"}'::jsonb,
      now(),
      now(),
      'authenticated',
      'authenticated',
      ''
    );

    INSERT INTO public.profiles (id, name, address, avatar_url, updated_at)
    VALUES (
      v_user_id,
      'Krist VIP Client',
      '740 Park Avenue, Penthouse B, New York, NY 10021',
      '/images/hero.webp',
      now()
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- 2. Clean & Seed Categories (Unique picture for each category)
DELETE FROM public.products;
DELETE FROM public.subcategories;
DELETE FROM public.categories;

INSERT INTO public.categories (id, name, poster_url) VALUES
(1, 'Jewelry', '/images/categories/jewelry.jpg'),
(2, 'Accessories', '/images/categories/accessories.jpg'),
(3, 'Handbags', '/images/categories/handbags.jpg');

-- 3. Seed Subcategories (Unique picture for each subcategory)
INSERT INTO public.subcategories (id, name, category, poster_url) VALUES
(101, 'Necklaces', 1, '/images/products/gold-necklace.jpg'),
(102, 'Rings', 1, '/images/products/diamond-ring.jpg'),
(201, 'Scarves', 2, '/images/products/cashmere-stole.jpg'),
(202, 'Eyewear', 2, '/images/products/sunglasses.jpg'),
(301, 'Totes', 3, '/images/products/leather-tote.jpg'),
(302, 'Clutches', 3, '/images/products/satin-clutch.jpg');

-- 4. Seed Products (Unique picture for each product)
INSERT INTO public.products (
  id,
  name,
  brand,
  category,
  price,
  rating,
  colors,
  size,
  images,
  description
) VALUES
(
  1,
  'Aura Silk Satin Clutch',
  'Krist Atelier',
  302,
  185.00,
  4.9,
  ARRAY['#000000', '#d4af37'],
  ARRAY['M'::public.sizes],
  ARRAY['/images/products/satin-clutch.jpg'],
  'Crafted from lustrous Italian silk satin with champagne gold hardware and an optional delicate chain strap. The quintessential evening companion.'
),
(
  2,
  'Sculptural Gold Pendant Necklace',
  'Élégance',
  101,
  240.00,
  4.8,
  ARRAY['#d4af37', '#e2e8f0'],
  ARRAY['L'::public.sizes],
  ARRAY['/images/products/gold-necklace.jpg'],
  'Hand-finished 18k solid gold vermeil pendant on an adjustable Venetian link chain. Bold sculptural geometric lines inspired by mid-century Parisian haute joaillerie.'
),
(
  3,
  'Monochrome Cashmere Stole',
  'Krist Atelier',
  201,
  195.00,
  5.0,
  ARRAY['#18181b', '#71717a'],
  ARRAY['XL'::public.sizes],
  ARRAY['/images/products/cashmere-stole.jpg'],
  'Ultra-fine Grade-A Mongolian cashmere with delicate eyelash fringe edges. Featherweight warmth and exquisite drape for timeless sartorial layering.'
),
(
  4,
  'Minimalist Italian Leather Tote',
  'Sartorial',
  301,
  360.00,
  4.9,
  ARRAY['#3f2e21', '#18181b'],
  ARRAY['L'::public.sizes],
  ARRAY['/images/products/leather-tote.jpg'],
  'Full-grain Tuscan calfskin leather with suede lining and detachable organizer pouch. Precision edge-painted seams and understated brass accents.'
),
(
  5,
  'Diamond Pavé Signet Ring',
  'Élégance',
  102,
  290.00,
  4.7,
  ARRAY['#e2e8f0', '#d4af37'],
  ARRAY['M'::public.sizes, 'S'::public.sizes],
  ARRAY['/images/products/diamond-ring.jpg'],
  'Modern architectural silhouette pavé set with ethically sourced VS1 lab diamonds in 14k solid white gold. An heirloom statement of subtle prestige.'
),
(
  6,
  'Architectural Acetate Sunglasses',
  'Krist Eyewear',
  202,
  175.00,
  4.8,
  ARRAY['#18181b', '#854d0e'],
  ARRAY['M'::public.sizes],
  ARRAY['/images/products/sunglasses.jpg'],
  'Handcrafted Japanese acetate frames with 100% UVA/UVB Carl Zeiss polarized lenses. Custom internal core wire with engraved signature Krist atelier accents.'
);

-- Reset sequence IDs
SELECT setval('public.categories_id_seq', (SELECT MAX(id) FROM public.categories));
SELECT setval('public.subcategories_id_seq', (SELECT MAX(id) FROM public.subcategories));
SELECT setval('public.products_id_seq', (SELECT MAX(id) FROM public.products));
