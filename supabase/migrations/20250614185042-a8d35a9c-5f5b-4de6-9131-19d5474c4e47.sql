
-- 1. Add a time_zone field to the time_slots table
ALTER TABLE public.time_slots
ADD COLUMN time_zone TEXT NOT NULL DEFAULT 'UTC';

-- 2. Optionally, backfill existing slots to use a best-guess or default time zone (here, 'UTC')
UPDATE public.time_slots SET time_zone = 'UTC' WHERE time_zone IS NULL;
