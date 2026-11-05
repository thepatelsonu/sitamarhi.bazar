import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.80.0/+esm";

export const supabase = createClient(
  "https://pjphobragavzgfrfdwjn.supabase.co",
  "sb_publishable_PtjPir_aKX_ae7RUlTg_MYqdK0NC",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
