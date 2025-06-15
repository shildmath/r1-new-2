
-- Add a foreign key between user_roles.user_id and profiles.id to allow relational joins and remove Supabase warning

-- First, check/detach any existing foreign key (if present)
-- But by your schema, there is currently only a foreign key to auth.users, not profiles—so we can just add the new one.

ALTER TABLE public.user_roles
ADD CONSTRAINT user_roles_user_id_fkey_profiles
FOREIGN KEY (user_id) REFERENCES public.profiles(id)
ON DELETE CASCADE;
