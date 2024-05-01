import { supabase } from "$lib/util/supabaseClient";
import type { PageServerLoad } from "../$types";

export const load = (async () => {
  // Getting order info
  let orderRequest = await supabase.from("Orders").select("*")
  const order = orderRequest.data;
  const orders = order ?? [];

  return { orders };
}) satisfies PageServerLoad;
