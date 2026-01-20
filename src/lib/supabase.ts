// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// PROD
// const supabaseUrl = process.env.NEXT_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY;
// DEV
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DEV_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
