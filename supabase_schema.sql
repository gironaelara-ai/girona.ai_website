-- Blogs table
CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Contacts table
CREATE TABLE public.contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Waitlist table
CREATE TABLE public.waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Site settings table
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Optional: Insert default site settings
INSERT INTO public.site_settings (key, value)
VALUES 
  ('siteTitle', 'Girona.ai Portfolio'),
  ('heroImage', 'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop');

-- RLS (Row Level Security) - basic permissive policies for this demo
-- In a real production app, apply stricter auth checks
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (assuming client-side env is secure or you only want to limit in edge functions)
CREATE POLICY "Allow all public insert" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all public insert" ON public.contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all public insert" ON public.waitlist FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all public insert" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

-- Create a storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up permissive policies for the blog-images bucket
CREATE POLICY "Public Access" 
  ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
  
CREATE POLICY "Allow public uploads" 
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
  
CREATE POLICY "Allow public updates" 
  ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
  
CREATE POLICY "Allow public deletion" 
  ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');

-- Create a storage bucket for site media (videos, general assets)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up permissive policies for the site-media bucket
CREATE POLICY "Public Access Site Media" 
  ON storage.objects FOR SELECT USING (bucket_id = 'site-media');
  
CREATE POLICY "Allow public uploads Site Media" 
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-media');
  
CREATE POLICY "Allow public updates Site Media" 
  ON storage.objects FOR UPDATE USING (bucket_id = 'site-media');
  
CREATE POLICY "Allow public deletion Site Media" 
  ON storage.objects FOR DELETE USING (bucket_id = 'site-media');

-------------------------------------------------------------------
-- ADMIN ACCOUNT CREATION (Option 2 Setup)
-------------------------------------------------------------------

-- The following script creates an admin user via SQL. 
-- You MUST run this in the Supabase SQL editor to create your login.

-- 1. Create the user in the auth.users table 
-- Change the email and password below if desired!
INSERT INTO auth.users (
  instance_id, 
  id, 
  aud, 
  role, 
  email, 
  encrypted_password, 
  email_confirmed_at, 
  raw_app_meta_data, 
  raw_user_meta_data, 
  created_at, 
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000', 
  gen_random_uuid(), 
  'authenticated', 
  'authenticated', 
  'admin@girona.ai', 
  crypt('1608@Girona', gen_salt('bf')), 
  now(), 
  '{"provider":"email","providers":["email"]}', 
  '{}', 
  now(), 
  now()
);

-- 2. Create the required identity record for the user to be able to sign in
INSERT INTO auth.identities (id, user_id, identity_data, provider, created_at, updated_at)
SELECT 
  gen_random_uuid(), 
  id, 
  format('{"sub":"%s","email":"%s"}', id, email)::jsonb, 
  'email', 
  now(), 
  now()
FROM auth.users 
WHERE email = 'admin@girona.ai';
