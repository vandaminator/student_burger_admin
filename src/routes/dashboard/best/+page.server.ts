import { supabase } from "$lib/util/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  let { data: Best, error } = await supabase.from("Best").select("id, Products(id, img, name)");
  console.log("🚀 ~ load ~ Best:", Best)

  return {
    best: Best ?? []
  };
}) satisfies PageServerLoad;
