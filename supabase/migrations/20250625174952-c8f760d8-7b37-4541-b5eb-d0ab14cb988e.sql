
-- Create footer_config table
CREATE TABLE public.footer_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'AIAdMaxify',
  company_description TEXT NOT NULL DEFAULT 'Transforming businesses with AI-powered marketing solutions.',
  contact_email TEXT NOT NULL DEFAULT 'hello@aiadmaxify.com',
  contact_phone TEXT NOT NULL DEFAULT '+1 (555) 123-4567',
  contact_address TEXT NOT NULL DEFAULT '123 Innovation Drive, Tech City',
  copyright_text TEXT NOT NULL DEFAULT '© 2024 AIAdMaxify. All rights reserved.',
  newsletter_title TEXT NOT NULL DEFAULT 'Newsletter',
  newsletter_placeholder TEXT NOT NULL DEFAULT 'Your email',
  privacy_policy_link TEXT NOT NULL DEFAULT '/privacy',
  terms_of_service_link TEXT NOT NULL DEFAULT '/terms',
  facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com',
  linkedin_url TEXT NOT NULL DEFAULT 'https://linkedin.com',
  twitter_url TEXT NOT NULL DEFAULT 'https://twitter.com',
  youtube_url TEXT NOT NULL DEFAULT 'https://youtube.com',
  quick_links JSONB NOT NULL DEFAULT '[{"name": "Home", "href": "/"}, {"name": "Services", "href": "/services"}, {"name": "Results", "href": "/testimonials"}, {"name": "About Us", "href": "/about"}, {"name": "Contact", "href": "/contact"}]',
  services_list JSONB NOT NULL DEFAULT '["AI-Powered Social Media", "SEO & Content Strategy", "PPC Advertising", "Email Marketing", "Conversion Optimization"]',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_page_config table
CREATE TABLE public.contact_page_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_us_title TEXT NOT NULL DEFAULT 'Email Us',
  email_us_value TEXT NOT NULL DEFAULT 'info@aiadmaxify.com',
  email_us_description TEXT NOT NULL DEFAULT 'Send us an email anytime',
  call_us_title TEXT NOT NULL DEFAULT 'Call Us',
  call_us_value TEXT NOT NULL DEFAULT '+1 (555) 123-4567',
  call_us_description TEXT NOT NULL DEFAULT 'Available 24/7 for support',
  visit_office_title TEXT NOT NULL DEFAULT 'Visit Office',
  visit_office_value TEXT NOT NULL DEFAULT '123 Innovation Drive, Tech City',
  visit_office_description TEXT NOT NULL DEFAULT 'Come visit our headquarters',
  business_hours_title TEXT NOT NULL DEFAULT 'Business Hours',
  business_hours_value TEXT NOT NULL DEFAULT 'Mon-Fri: 9AM-6PM EST',
  business_hours_description TEXT NOT NULL DEFAULT 'We are here to help',
  whatsapp_title TEXT NOT NULL DEFAULT 'WhatsApp Message',
  whatsapp_value TEXT NOT NULL DEFAULT '+1 (555) 123-4567',
  whatsapp_description TEXT NOT NULL DEFAULT 'Quick chat via WhatsApp',
  contact_directly_title TEXT NOT NULL DEFAULT 'Prefer to contact us directly?',
  contact_directly_description TEXT NOT NULL DEFAULT 'Choose your preferred method',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add triggers for updated_at
CREATE TRIGGER update_footer_config_updated_at
  BEFORE UPDATE ON public.footer_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_page_config_updated_at
  BEFORE UPDATE ON public.contact_page_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.footer_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_page_config ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Allow public read access to footer_config" 
  ON public.footer_config FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to contact_page_config" 
  ON public.contact_page_config FOR SELECT 
  USING (true);

-- Create admin policies
CREATE POLICY "Allow authenticated users to manage footer_config" 
  ON public.footer_config FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage contact_page_config" 
  ON public.contact_page_config FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert default data
INSERT INTO public.footer_config DEFAULT VALUES;
INSERT INTO public.contact_page_config DEFAULT VALUES;
