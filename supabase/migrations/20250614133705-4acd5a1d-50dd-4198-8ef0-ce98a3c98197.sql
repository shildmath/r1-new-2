
-- Add a foreign key from bookings.client_id → profiles.id
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_client_id_fkey
FOREIGN KEY (client_id) REFERENCES public.profiles(id);
