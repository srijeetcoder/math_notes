import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder keys to prevent createClient from throwing an error on startup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase environment variables are missing. Using guest mode fallback.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
