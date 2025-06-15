
-- Create table for storing contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL, -- e.g. 'home' or 'contact'
  status TEXT NOT NULL DEFAULT 'new', -- e.g. new/contacted/closed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow admins to select
CREATE POLICY "Admin can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to insert
CREATE POLICY "Admin can insert contact submissions"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to update
CREATE POLICY "Admin can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to delete
CREATE POLICY "Admin can delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow unauthenticated INSERT (for contact form), but prevent them from seeing/updating/deleting data.
CREATE POLICY "Anonymous users can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

