
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsxkpurwjwzxxwifykcm.supabase.co';
const supabaseAnonKey = 'sb_publishable_lPqJqnj3bMS6PPSwv4NPpg_5i8ZqsbR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
