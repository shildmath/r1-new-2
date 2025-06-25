
-- Create testimonial_industries table
CREATE TABLE public.testimonial_industries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add trigger for updated_at
CREATE TRIGGER update_testimonial_industries_updated_at
  BEFORE UPDATE ON public.testimonial_industries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.testimonial_industries ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to testimonial_industries" 
  ON public.testimonial_industries FOR SELECT 
  USING (true);

-- Create admin policy
CREATE POLICY "Allow authenticated users to manage testimonial_industries" 
  ON public.testimonial_industries FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert default industries
INSERT INTO public.testimonial_industries (name, sequence_order) VALUES
('Technology', 1),
('Healthcare', 2),
('Finance', 3),
('E-commerce', 4),
('Real Estate', 5),
('Education', 6),
('Manufacturing', 7),
('Retail', 8),
('Consulting', 9),
('Marketing', 10);
