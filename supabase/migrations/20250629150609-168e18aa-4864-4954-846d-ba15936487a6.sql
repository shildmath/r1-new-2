
-- Create navbar_config table for navbar management
CREATE TABLE public.navbar_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL DEFAULT 'AIAdMaxify',
  nav_items JSONB NOT NULL DEFAULT '[
    {"name": "Home", "path": "/"},
    {"name": "Services", "path": "/services"},
    {"name": "About", "path": "/about"},
    {"name": "Testimonials", "path": "/testimonials"},
    {"name": "Contact", "path": "/contact"}
  ]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add trigger for updated_at
CREATE TRIGGER update_navbar_config_updated_at
  BEFORE UPDATE ON public.navbar_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.navbar_config ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to navbar_config" 
  ON public.navbar_config FOR SELECT 
  USING (true);

-- Create admin policy
CREATE POLICY "Allow authenticated users to manage navbar_config" 
  ON public.navbar_config FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert initial data
INSERT INTO public.navbar_config (brand, nav_items) VALUES
('AIAdMaxify', '[
  {"name": "Home", "path": "/"},
  {"name": "Services", "path": "/services"},
  {"name": "About", "path": "/about"},
  {"name": "Testimonials", "path": "/testimonials"},
  {"name": "Contact", "path": "/contact"}
]'::jsonb);

-- Update footer_config table to ensure it has proper structure
ALTER TABLE public.footer_config ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();
ALTER TABLE public.footer_config ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Ensure contact_page_config has proper structure
ALTER TABLE public.contact_page_config ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Insert default data if tables are empty
INSERT INTO public.footer_config (company_name, company_description, contact_email, contact_phone, contact_address, copyright_text, newsletter_title, newsletter_placeholder, privacy_policy_link, terms_of_service_link, facebook_url, instagram_url, linkedin_url, twitter_url, youtube_url, quick_links, services_list)
SELECT 'AIAdMaxify', 'Transforming businesses with AI-powered marketing solutions.', 'hello@aiadmaxify.com', '+1 (555) 123-4567', '123 Innovation Drive, Tech City', '© 2024 AIAdMaxify. All rights reserved.', 'Newsletter', 'Your email', '/privacy', '/terms', 'https://facebook.com', 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://youtube.com', '[{"href": "/", "name": "Home"}, {"href": "/services", "name": "Services"}, {"href": "/testimonials", "name": "Results"}, {"href": "/about", "name": "About Us"}, {"href": "/contact", "name": "Contact"}]'::jsonb, '["AI-Powered Social Media", "SEO & Content Strategy", "PPC Advertising", "Email Marketing", "Conversion Optimization"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.footer_config);

INSERT INTO public.contact_page_config (email_us_title, email_us_value, email_us_description, call_us_title, call_us_value, call_us_description, visit_office_title, visit_office_value, visit_office_description, business_hours_title, business_hours_value, business_hours_description, whatsapp_title, whatsapp_value, whatsapp_description, contact_directly_title, contact_directly_description)
SELECT 'Email Us', 'info@aiadmaxify.com', 'Send us an email anytime', 'Call Us', '+1 (555) 123-4567', 'Available 24/7 for support', 'Visit Office', '123 Innovation Drive, Tech City', 'Come visit our headquarters', 'Business Hours', 'Mon-Fri: 9AM-6PM EST', 'We are here to help', 'WhatsApp Message', '+1 (555) 123-4567', 'Quick chat via WhatsApp', 'Prefer to contact us directly?', 'Choose your preferred method'
WHERE NOT EXISTS (SELECT 1 FROM public.contact_page_config);
