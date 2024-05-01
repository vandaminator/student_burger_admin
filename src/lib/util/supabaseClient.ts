import { createClient } from "@supabase/supabase-js";
import { SUPABASEKEY, SUPABASEURL } from "$env/static/private";
import type { Database } from "$lib/types/supabase";

export const supabase = createClient<Database>(SUPABASEURL, SUPABASEKEY);
