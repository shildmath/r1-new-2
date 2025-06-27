
-- Create sales_representatives table for Calendly integration
CREATE TABLE public.sales_representatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Sales Representative',
  bio TEXT,
  calendly_link TEXT NOT NULL,
  profile_photo TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add trigger for updated_at
CREATE TRIGGER update_sales_representatives_updated_at
  BEFORE UPDATE ON public.sales_representatives
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.sales_representatives ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to sales_representatives" 
  ON public.sales_representatives FOR SELECT 
  USING (is_active = true);

-- Create admin policy
CREATE POLICY "Allow authenticated users to manage sales_representatives" 
  ON public.sales_representatives FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.sales_representatives (name, title, bio, calendly_link, sequence_order) VALUES
('John Smith', 'Senior Sales Representative', 'Expert in digital marketing solutions with 5+ years experience', 'https://calendly.com/johnsmith', 1),
('Sarah Johnson', 'Sales Manager', 'Specializes in AI-powered marketing strategies', 'https://calendly.com/sarahjohnson', 2),
('Mike Wilson', 'Business Development Rep', 'Helps businesses scale with custom marketing solutions', 'https://calendly.com/mikewilson', 3);
