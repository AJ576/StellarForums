import { createClient } from '@supabase/supabase-js'

const supURL = "https://sqffgvinvnvmsuphhclf.supabase.co";
const KEY = import.meta.env.VITE_APP_ACCESS_KEY;

export const supabase = createClient(supURL,KEY);