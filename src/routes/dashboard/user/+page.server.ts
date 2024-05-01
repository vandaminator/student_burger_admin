import { supabase } from "$lib/util/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  let { data: Users, error } = await supabase.from("Users").select("*");

  return {
    users: Users ?? []
  };
}) satisfies PageServerLoad;
