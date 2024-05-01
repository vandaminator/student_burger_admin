import { supabase } from "$lib/util/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  let response = await supabase.from("Products").select();
  const Products = response.data
  return {
    products: Products ?? [],
  };
}) satisfies PageServerLoad;
