import { createClient } from '@supabase/supabase-js';

// Your Supabase configuration
const supabaseUrl = 'https://kikrfgzjkzkbngtppdgm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpa3JmZ3pqa3prYm5ndHBwZGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTkxMTgsImV4cCI6MjA4NjQ5NTExOH0.5cM4_wVJfoJKU3EbI98AYxur3ge1NmUI6eqW1qrvzjo'; // Replace with the long anon key from Supabase Dashboard → Settings → API

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

