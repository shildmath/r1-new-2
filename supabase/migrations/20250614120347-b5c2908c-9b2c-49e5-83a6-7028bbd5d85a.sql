
-- Table for time slots (each slot is unique to a closer, date, and time)
CREATE TABLE public.time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  closer_id UUID NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS: Closers can manage their own slots
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Closer can view their own slots"
  ON public.time_slots
  FOR SELECT
  USING (auth.uid() = closer_id);

CREATE POLICY "Closer can create slots"
  ON public.time_slots
  FOR INSERT
  WITH CHECK (auth.uid() = closer_id);

CREATE POLICY "Closer can update their own slots"
  ON public.time_slots
  FOR UPDATE
  USING (auth.uid() = closer_id);

CREATE POLICY "Closer can delete their own slots"
  ON public.time_slots
  FOR DELETE
  USING (auth.uid() = closer_id);

-- Public policy for SELECT (so clients can see available slots only)
CREATE POLICY "Clients see only available slots"
  ON public.time_slots
  FOR SELECT
  USING (is_available = TRUE);

-- Table for bookings (one booking per slot)
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  slot_id UUID NOT NULL REFERENCES public.time_slots(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Only allow one booking per slot (enforces rule that a slot can only be booked once)
CREATE UNIQUE INDEX only_one_booking_per_slot ON public.bookings(slot_id);

-- RLS: Allow anyone to INSERT a booking (public-facing), but only on available slots
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book available slot"
  ON public.bookings
  FOR INSERT
  WITH CHECK (
    (SELECT is_available FROM public.time_slots WHERE id = slot_id) = TRUE
  );

-- Closers see their own bookings via their slots
CREATE POLICY "Closer can view their slot bookings"
  ON public.bookings
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.time_slots
    WHERE public.time_slots.id = slot_id AND public.time_slots.closer_id = auth.uid()
  ));

-- Optional: Bookings can be updated only by the closer who owns the slot (for follow-up notes, etc.)
CREATE POLICY "Closer can update bookings for their slots"
  ON public.bookings
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.time_slots
    WHERE public.time_slots.id = slot_id AND public.time_slots.closer_id = auth.uid()
  ));

-- Trigger to mark slot as unavailable after booking
CREATE OR REPLACE FUNCTION public.mark_slot_unavailable()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.time_slots SET is_available = FALSE WHERE id = NEW.slot_id;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER mark_slot_unavailable_after_booking
AFTER INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.mark_slot_unavailable();
