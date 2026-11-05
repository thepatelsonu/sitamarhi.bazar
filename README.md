# Sitamarhi Bazar

A responsive static marketplace website for Sitamarhi Town and Dumra, Bihar, with Supabase-powered merchant registration and login.

## Included

- Responsive marketplace homepage and business discovery filters
- Supabase email/password merchant registration
- Email confirmation flow (when enabled in Supabase Auth)
- Merchant login and authenticated dashboard
- Merchant registration stored in Supabase with `pending` status
- Row Level Security (RLS) policies for merchant profile ownership and approved public listings
- Demo businesses clearly marked as previews

## Supabase configuration

The browser client is configured in `supabase-client.js` with the project's public publishable key. A publishable key is intended for browser use; never put a Supabase service-role or secret key in this repository.

Project:
- Supabase URL: `https://pjphobragavzgfrfdwjn.supabase.co`
- Project ref: `pjphobragavzgfrfdwjn`

Database migration:
- `create_merchant_auth_profiles`
- Creates `public.merchant_profiles`, an Auth user trigger, indexes, and RLS policies.
- New accounts are always assigned `pending`; a browser user cannot change their own approval status.

### Required dashboard settings before production testing

In Supabase Dashboard, open **Authentication → URL Configuration**:
1. Set **Site URL** to the exact production origin where this site is hosted.
2. Add the exact production dashboard URL to **Redirect URLs**, for example `https://YOUR-DOMAIN/merchant-dashboard.html`.
3. If you use a preview domain, add its exact dashboard URL separately.
4. Under **Authentication → Providers → Email**, decide whether email confirmation should remain enabled. It is recommended for production.

The signup confirmation link redirects to `/merchant-dashboard.html`. If the production URL is not allowlisted, confirmation redirects may fail.

## Merchant flow

1. A merchant submits the business form on the homepage with business details, email, and password.
2. Supabase Auth creates the user. A database trigger creates the merchant profile with status `pending`.
3. If email confirmation is enabled, the merchant confirms their email before signing in.
4. The merchant signs in at `login.html`.
5. `merchant-dashboard.html` checks the signed-in user with Supabase Auth and loads only that user's merchant profile.
6. The listing remains private until an administrator approves it.

### Approving a merchant

There is currently no public admin panel. Review the merchant first, then approve it from the Supabase SQL Editor using the merchant's Auth user UUID:

```sql
update public.merchant_profiles
set status = 'approved', updated_at = now()
where id = 'AUTH_USER_UUID'
  and status = 'pending';
```

Do not expose an admin approval action in browser code or let merchants set their own status. A separate admin interface should be added only after a trusted admin account and role-provisioning process are defined.

## Static hosting

Open `index.html` locally or deploy the repository root to Cloudflare Pages / another static host with no build command. The app uses a pinned Supabase JS CDN module.

## Important security note

This project is a static frontend. The dashboard performs an Auth check and redirects signed-out visitors, but static HTML files are not server-side protected. The actual data protection is enforced by Supabase RLS. Do not place sensitive data or privileged admin operations in frontend files.
