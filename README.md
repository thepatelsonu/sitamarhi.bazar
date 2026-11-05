# Sitamarhi Bazar

A responsive, mobile-first local marketplace website for Sitamarhi Bazar, initially focused on Sitamarhi Town and Dumra.

## Included

- Responsive Sitamarhi Bazar homepage
- Search, category and area filters
- Sample businesses clearly marked **DEMO PREVIEW**
- Merchant listing request form connected to the dedicated Sitamarhi Bazar Supabase project
- Merchant requests are submitted for review and are not published automatically

## Merchant registration and Supabase

The browser uses the Supabase publishable key in `supabase-config.js`. A publishable key is designed for frontend use. **Never put a Supabase secret key or service-role key in browser code or this repository.**

The form inserts these fields into `public.merchant_listing_requests`:

- `business_name`
- `owner_name`
- `phone`
- `category`
- `area`

The database must set `status = 'pending'` itself. The public anonymous role should be able to submit only those five fields and must not be able to read, update, delete, or approve submissions.

### Database setup still required

The SQL in `supabase/drafts/merchant_listing_requests.sql` is a **review draft**, not an applied migration. Before production:

1. Confirm the connected Supabase project is `pjphobragavzgfrfdwjn` (Sitamarhi Bazar), not another project.
2. Install/use the Supabase CLI and initialize the repository if needed.
3. Generate a migration using `supabase migration new create_merchant_listing_requests`.
4. Review and move the SQL draft into the generated file under `supabase/migrations/`.
5. Test the migration and RLS behavior in a development environment.
6. In Supabase GitHub integration, set the working directory to the repository root (`.`). Keep production deploy disabled until review and tests pass.

The Supabase integration for the new project has not yet been verified from this connected session. Do not enable automatic production deployment until project access and the migration are confirmed.

## Before publishing

1. Replace demo businesses in `script.js` with real listings only after obtaining permission from each business.
2. Replace social profile `href="#" ` links in `index.html` with real URLs.
3. Add real contact details and appropriate privacy/legal information.
4. Add server-side/admin-only merchant review and approval before showing any submitted merchant publicly.
5. Consider CAPTCHA or another abuse-control measure before accepting public submissions at scale.
6. Test the form on mobile and verify both successful submission and failure handling.
7. Do not advertise online ordering, payment, inventory or delivery as live until those features are operational.

## Run locally

Open `index.html` in a browser. No build step is required. The Supabase client is loaded from a pinned CDN version.

## Deploy

Static hosting (Cloudflare Pages or Netlify), with no build command and the repository root as the output directory.

This is an early marketplace frontend. It does not yet include merchant login, admin approval interface, payment processing, live inventory or order management.
