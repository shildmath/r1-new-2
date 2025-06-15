
-- Allow admins to select ALL slots
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- POLICY for admin can select all time_slots
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all slots"
  ON public.time_slots
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin')
    OR (auth.uid() = closer_id)
    OR (is_available = TRUE) -- keep public slots visible for clients
  );

-- POLICY for admin can select all bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all bookings"
  ON public.bookings
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.time_slots
      WHERE public.time_slots.id = slot_id AND public.time_slots.closer_id = auth.uid()
    )
  );
