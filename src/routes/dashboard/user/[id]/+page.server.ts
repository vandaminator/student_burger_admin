import { supabase } from "$lib/util/supabaseClient";
import type { PageServerLoad } from "./$types";
import { error as Error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
  let { data: Users, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", params.id);
  const users = Users ?? [];
  const user = users[0];

  if (!user) {
    Error(500, { message: "The user does not exist" });
  }

  return {
    customer: user,
  };
}) satisfies PageServerLoad;
