
-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  key_features TEXT[] NOT NULL DEFAULT '{}',
  expected_benefits TEXT[] NOT NULL DEFAULT '{}',
  sequence_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (public read, admin write)
CREATE POLICY "Anyone can view active services" 
  ON public.services 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage services" 
  ON public.services 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp  
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for services table
CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON public.services 
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data to match current services
INSERT INTO public.services (title, description, icon, key_features, expected_benefits, sequence_order) VALUES
('AI-Powered Social Media Marketing', 'Intelligent content creation, audience targeting, and automated posting using cutting-edge AI algorithms.', 'Brain', 
 ARRAY['AI Content Generation', 'Smart Audience Targeting', 'Automated Posting Schedule', 'Performance Analytics', 'Competitor Analysis', 'Brand Voice Optimization'], 
 ARRAY['Increased ROI and business growth', 'Enhanced online presence and visibility', 'Improved customer engagement and conversion', 'Data-driven insights and optimization', '24/7 monitoring and support'], 1),

('SEO & Content Strategy', 'Data-driven SEO strategies that boost your organic visibility and traffic.', 'Search',
 ARRAY['Advanced Keyword Research & Analysis', 'Technical SEO Optimization', 'Content Strategy & Creation', 'Link Building & Outreach', 'Local SEO Optimization'],
 ARRAY['Increased ROI and business growth', 'Enhanced online presence and visibility', 'Improved customer engagement and conversion', 'Data-driven insights and optimization', '24/7 monitoring and support'], 2),

('Data-Driven PPC Advertising', 'Maximize ROI with precision-targeted advertising campaigns across all platforms.', 'Target',
 ARRAY['Google Ads & Microsoft Ads Management', 'Facebook & Instagram Advertising', 'AI-Powered Bid Optimization', 'Advanced Conversion Tracking', 'A/B Testing & Performance Analysis'],
 ARRAY['Increased ROI and business growth', 'Enhanced online presence and visibility', 'Improved customer engagement and conversion', 'Data-driven insights and optimization', '24/7 monitoring and support'], 3);
