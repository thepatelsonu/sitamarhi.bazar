// This is a browser-safe Supabase publishable key. Never place a secret/service_role key here.
const SUPABASE_URL = "https://pjphobragavzgfrfdwjn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_PtjPir_aKX_ae7RUl5elTg_MYqdK0NC";
if (window.supabase?.createClient) {
  window.sitamarhiBazarSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}
