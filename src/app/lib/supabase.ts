import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPA_URL || '';
const supabaseKey = process.env.SUPA_PUBLIC_KEY || '';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
