
-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  profile_photo TEXT,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_stats table for stats section
CREATE TABLE public.about_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  happy_clients TEXT NOT NULL DEFAULT '500+',
  success_rate TEXT NOT NULL DEFAULT '95%',
  awards_won TEXT NOT NULL DEFAULT '15',
  growth_rate TEXT NOT NULL DEFAULT '300%',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create awards table
CREATE TABLE public.awards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  color TEXT NOT NULL DEFAULT 'from-yellow-400 to-orange-500',
  sequence_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journey_milestones table
CREATE TABLE public.journey_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'zap',
  color TEXT NOT NULL DEFAULT 'bg-gradient-to-br from-blue-500 to-blue-600',
  metrics TEXT NOT NULL,
  highlight TEXT NOT NULL,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default stats
INSERT INTO public.about_stats (happy_clients, success_rate, awards_won, growth_rate) 
VALUES ('500+', '95%', '15', '300%');

-- Insert sample team members
INSERT INTO public.team_members (name, role, bio, profile_photo, sequence_order) VALUES
('Alex Johnson', 'CEO & Founder', '10+ years in digital marketing and AI strategy', '/lovable-uploads/f28d1397-f087-49e3-b66b-6f8a17346fdc.png', 1),
('Sarah Chen', 'Head of AI Marketing', 'Former Google AI researcher with 8 years experience', '/lovable-uploads/80bafa31-117d-4d13-ac9f-23a08b241713.png', 2),
('Mike Rodriguez', 'Creative Director', 'Award-winning designer with 12 years in digital', '/lovable-uploads/80380992-ea0d-49be-9c56-569a7baa5096.png', 3);

-- Insert sample awards
INSERT INTO public.awards (year, title, organization, icon, color, sequence_order) VALUES
('2024', 'Best AI Marketing Agency', 'Digital Marketing Institute', 'trophy', 'from-yellow-400 to-orange-500', 1),
('2023', 'Innovation Excellence Award', 'Tech Innovation Council', 'lightbulb', 'from-blue-400 to-purple-500', 2),
('2023', 'Top Marketing Agency', 'Business Excellence Awards', 'star', 'from-green-400 to-blue-500', 3),
('2022', 'Global Marketing Leader', 'International Marketing Federation', 'globe', 'from-pink-400 to-red-500', 4);

-- Insert sample journey milestones
INSERT INTO public.journey_milestones (year, title, description, icon, color, metrics, highlight, sequence_order) VALUES
('2017', 'The Vision Begins', 'Founded AIAdMaxify with a revolutionary vision to transform digital marketing through cutting-edge AI technology', 'zap', 'bg-gradient-to-br from-blue-500 to-blue-600', 'Initial Investment: $50K', 'Founding Moment', 1),
('2018', 'AI Breakthrough', 'Developed proprietary machine learning algorithms for intelligent customer targeting and campaign optimization', 'target', 'bg-gradient-to-br from-purple-500 to-purple-600', 'First 10 Clients', 'Technical Innovation', 2),
('2019', 'Market Validation', 'Achieved remarkable milestone of 100+ clients with an unprecedented 300% average ROI across all campaigns', 'users-2', 'bg-gradient-to-br from-pink-500 to-pink-600', '100+ Clients, 300% ROI', 'Growth Milestone', 3);

-- Add triggers for updated_at
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_stats_updated_at
  BEFORE UPDATE ON public.about_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_awards_updated_at
  BEFORE UPDATE ON public.awards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journey_milestones_updated_at
  BEFORE UPDATE ON public.journey_milestones
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_milestones ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Allow public read access to team_members" 
  ON public.team_members FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to about_stats" 
  ON public.about_stats FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to awards" 
  ON public.awards FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to journey_milestones" 
  ON public.journey_milestones FOR SELECT 
  USING (true);

-- Create admin policies
CREATE POLICY "Allow authenticated users to manage team_members" 
  ON public.team_members FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage about_stats" 
  ON public.about_stats FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage awards" 
  ON public.awards FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage journey_milestones" 
  ON public.journey_milestones FOR ALL 
  USING (auth.role() = 'authenticated');
