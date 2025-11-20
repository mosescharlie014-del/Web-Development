import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  // Avoid throwing at import-time in environments where env isn't set yet.
  // The client will still be created with empty values; the README instructs to set env vars.
}

export const supabase = createClient(supabaseUrl, supabaseKey);