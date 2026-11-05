# Supabase setup

This directory is being prepared for the Sitamarhi Bazar Supabase project.

## Merchant listing request schema

- `drafts/merchant_listing_requests.sql` is a review draft, **not an applied migration**.
- It creates `public.merchant_listing_requests` with a database-generated UUID and timestamp.
- New requests default to `pending`.
- The public `anon` role can insert only the merchant-supplied fields. It cannot read, update, delete, or choose the approval status.
- RLS is enabled. Admin review and approval must be implemented through a trusted server-side/admin path, never by exposing a service-role key in the browser.

## Before production

1. Confirm the Sitamarhi Bazar Supabase project is accessible to the connected Supabase integration.
2. Initialize the Supabase CLI in the repository and generate a timestamped migration with:
   `supabase migration new create_merchant_listing_requests`
3. Move the reviewed SQL from `drafts/merchant_listing_requests.sql` into that generated migration file.
4. Test locally, including anonymous insert allowed and anonymous select/update/delete denied.
5. Configure the Supabase GitHub integration working directory as `.` because the `supabase/` folder is at the repository root.
6. Keep production deployment disabled until the migration has passed review and tests.

Do not put a Supabase secret/service-role key in this repository or frontend code.
