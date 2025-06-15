
-- Enable REPLICA IDENTITY FULL for time_slots to capture complete changes
ALTER TABLE public.time_slots REPLICA IDENTITY FULL;

-- Add time_slots table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.time_slots;
