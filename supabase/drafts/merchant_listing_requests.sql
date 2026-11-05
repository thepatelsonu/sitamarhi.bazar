-- Draft only: review and promote through `supabase migration new create_merchant_listing_requests`.
-- This file is intentionally outside supabase/migrations so GitHub integration
-- cannot apply it to production before the project access and migration workflow
-- have been verified.

create table if not exists public.merchant_listing_requests (
  id uuid primary key default gen_random_uuid(),
  business_name text not null check (char_length(trim(business_name)) between 2 and 120),
  owner_name text not null check (char_length(trim(owner_name)) between 2 and 100),
  phone text not null check (phone ~ '^[0-9+() -]{10,18}$'),
  category text not null check (category in ('Fashion', 'Food', 'Electronics', 'Jewellery', 'Home', 'Services', 'Other')),
  area text not null check (area in ('Sitamarhi Town', 'Dumra', 'Other')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists merchant_listing_requests_status_created_at_idx
  on public.merchant_listing_requests (status, created_at desc);

alter table public.merchant_listing_requests enable row level security;

-- Remove any broad/default table grants. The public form may submit only the
-- five merchant-supplied fields. It cannot read, update, delete, or set status.
revoke all on table public.merchant_listing_requests from anon, authenticated;
grant insert (business_name, owner_name, phone, category, area)
  on table public.merchant_listing_requests to anon;

drop policy if exists "Anyone can submit a pending merchant listing request"
  on public.merchant_listing_requests;

create policy "Anyone can submit a pending merchant listing request"
  on public.merchant_listing_requests
  for insert
  to anon
  with check (status = 'pending');

comment on table public.merchant_listing_requests is
  'Private merchant onboarding requests. Public visitors can submit pending requests only; review and approval are restricted to trusted server-side/admin access.';
