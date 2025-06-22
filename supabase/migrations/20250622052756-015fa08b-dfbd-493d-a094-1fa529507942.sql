
-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  profile_photo TEXT,
  company_name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  description TEXT NOT NULL,
  industry TEXT NOT NULL,
  results TEXT,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stats table for the top metrics
CREATE TABLE public.testimonial_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  happy_clients TEXT NOT NULL DEFAULT '500+',
  average_roi TEXT NOT NULL DEFAULT '342%',
  success_rate TEXT NOT NULL DEFAULT '97%',
  client_rating TEXT NOT NULL DEFAULT '4.9/5',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default stats
INSERT INTO public.testimonial_stats (happy_clients, average_roi, success_rate, client_rating) 
VALUES ('500+', '342%', '97%', '4.9/5');

-- Add trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonial_stats_updated_at
  BEFORE UPDATE ON public.testimonial_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS (optional - you can make it public if needed)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonial_stats ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to testimonials" 
  ON public.testimonials FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to testimonial_stats" 
  ON public.testimonial_stats FOR SELECT 
  USING (true);

-- Create policies for authenticated users to manage testimonials (admin only)
CREATE POLICY "Allow authenticated users to insert testimonials" 
  ON public.testimonials FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update testimonials" 
  ON public.testimonials FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete testimonials" 
  ON public.testimonials FOR DELETE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update stats" 
  ON public.testimonial_stats FOR UPDATE 
  USING (auth.role() = 'authenticated');
