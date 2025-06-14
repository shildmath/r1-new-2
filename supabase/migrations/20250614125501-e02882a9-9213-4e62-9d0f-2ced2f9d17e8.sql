
-- Add detailed booking fields for strategy call management and follow-up.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS call_status text DEFAULT 'Not Started Yet',
  ADD COLUMN IF NOT EXISTS deal_status text DEFAULT 'Not Started Yet',
  ADD COLUMN IF NOT EXISTS closed_date date,
  ADD COLUMN IF NOT EXISTS invoice_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS invoice_sent_date date,
  ADD COLUMN IF NOT EXISTS invoice_link text,
  ADD COLUMN IF NOT EXISTS contract_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS contract_sent_date date,
  ADD COLUMN IF NOT EXISTS contract_link text,
  ADD COLUMN IF NOT EXISTS offer_made text,
  ADD COLUMN IF NOT EXISTS ad_spend text,
  ADD COLUMN IF NOT EXISTS country_area text,
  ADD COLUMN IF NOT EXISTS zip_code text,
  ADD COLUMN IF NOT EXISTS recording_link text,
  ADD COLUMN IF NOT EXISTS follow_up_call_date date,
  ADD COLUMN IF NOT EXISTS reschedule_date date;

-- Add an index for faster filtering if needed
CREATE INDEX IF NOT EXISTS idx_bookings_call_status ON public.bookings (call_status);
CREATE INDEX IF NOT EXISTS idx_bookings_deal_status ON public.bookings (deal_status);

