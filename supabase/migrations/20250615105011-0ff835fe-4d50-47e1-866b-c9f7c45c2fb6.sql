
-- Add a foreign key from time_slots.closer_id → profiles.id
ALTER TABLE public.time_slots
ADD CONSTRAINT time_slots_closer_id_fkey
FOREIGN KEY (closer_id) REFERENCES public.profiles(id)
ON DELETE CASCADE;
