import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Ensure dotenv is loaded immediately when this module is evaluated
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

const supabaseUrl = process.env.SUPABASE_URL || 'https://svbznhvhllzruuhocmkm.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = (supabaseUrl && supabaseKey && supabaseKey !== 'YOUR_SUPABASE_SERVICE_ROLE_KEY')
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    })
  : null;

if (supabase) {
  console.log('✅ [Supabase] Connected to PostgreSQL at:', supabaseUrl);
} else {
  console.warn('[Supabase] Warning: SUPABASE_SERVICE_ROLE_KEY is unconfigured. Operating with in-memory database fallback mode.');
}
