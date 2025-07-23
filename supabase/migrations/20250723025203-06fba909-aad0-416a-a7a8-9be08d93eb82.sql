
-- Create home_page_config table for storing home page settings
CREATE TABLE public.home_page_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title TEXT NOT NULL DEFAULT 'AI-Powered Marketing Solutions',
  hero_subtitle TEXT NOT NULL DEFAULT 'Transform Your Business with Advanced AI Technology',
  hero_description TEXT NOT NULL DEFAULT 'Drive exceptional growth with our cutting-edge AI marketing platform. Increase conversions, optimize campaigns, and maximize ROI with intelligent automation.',
  hero_cta_text TEXT NOT NULL DEFAULT 'Get Started Today',
  hero_cta_secondary_text TEXT NOT NULL DEFAULT 'Learn More',
  hero_background_image TEXT DEFAULT '/hero-bg.jpg',
  hero_video_url TEXT DEFAULT '',
  hero_rotating_images JSONB DEFAULT '[]'::jsonb,
  stats_title TEXT NOT NULL DEFAULT 'Numbers That Speak Volumes',
  stats_subtitle TEXT NOT NULL DEFAULT 'Our commitment to excellence is reflected in our outstanding results',
  stats_is_visible BOOLEAN NOT NULL DEFAULT true,
  stats_data JSONB NOT NULL DEFAULT '[{"value": "500+", "label": "Happy Clients", "icon": "👥"}, {"value": "95%", "label": "Success Rate", "icon": "📈"}, {"value": "15", "label": "Awards Won", "icon": "🏆"}, {"value": "300%", "label": "Growth Rate", "icon": "🚀"}]'::jsonb,
  services_title TEXT NOT NULL DEFAULT 'Our Premium Services',
  services_subtitle TEXT NOT NULL DEFAULT 'Comprehensive AI-powered solutions for your business growth',
  services_is_visible BOOLEAN NOT NULL DEFAULT true,
  services_display_limit INTEGER NOT NULL DEFAULT 6,
  services_selected_ids JSONB DEFAULT '[]'::jsonb,
  testimonials_title TEXT NOT NULL DEFAULT 'What Our Clients Say',
  testimonials_subtitle TEXT NOT NULL DEFAULT 'Real results from real businesses',
  testimonials_is_visible BOOLEAN NOT NULL DEFAULT true,
  testimonials_display_limit INTEGER NOT NULL DEFAULT 3,
  testimonials_selected_ids JSONB DEFAULT '[]'::jsonb,
  testimonials_selected_industry TEXT DEFAULT 'All Industries',
  features_title TEXT NOT NULL DEFAULT 'Why Choose AIAdMaxify',
  features_is_visible BOOLEAN NOT NULL DEFAULT true,
  features_data JSONB NOT NULL DEFAULT '[{"id": 1, "title": "AI-Powered Analytics", "description": "Advanced machine learning algorithms analyze your data to provide actionable insights", "icon": "🧠", "isActive": true}, {"id": 2, "title": "Real-Time Optimization", "description": "Continuous campaign optimization based on performance data and market trends", "icon": "⚡", "isActive": true}, {"id": 3, "title": "24/7 Monitoring", "description": "Round-the-clock monitoring ensures your campaigns perform at their peak", "icon": "👁️", "isActive": true}]'::jsonb,
  cta_title TEXT NOT NULL DEFAULT 'Ready to Transform Your Business?',
  cta_subtitle TEXT NOT NULL DEFAULT 'Join thousands of successful businesses using our AI platform',
  cta_primary_text TEXT NOT NULL DEFAULT 'Start Free Trial',
  cta_secondary_text TEXT NOT NULL DEFAULT 'Schedule Demo',
  cta_is_visible BOOLEAN NOT NULL DEFAULT true,
  cta_background_image TEXT DEFAULT '/cta-bg.jpg',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.home_page_config ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to manage home_page_config" 
  ON public.home_page_config 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to home_page_config" 
  ON public.home_page_config 
  FOR SELECT 
  USING (true);

-- Insert default configuration
INSERT INTO public.home_page_config (id) VALUES (gen_random_uuid());

-- Create trigger for updated_at
CREATE TRIGGER update_home_page_config_updated_at
  BEFORE UPDATE ON public.home_page_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
