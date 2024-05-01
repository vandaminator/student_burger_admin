import { text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { supabase } from "$lib/util/supabaseClient";
import { error as Error } from "@sveltejs/kit";

export const PATCH: RequestHandler = async () => {
  return new Response();
};

export const DELETE: RequestHandler = async ({ params }) => {
  const { id } = params;

  const { error } = await supabase.from("Products").delete().eq("id", +id);
  if (error !== null) {
    Error(500, {message: `Product ${id} was not able to be deleted`})
  }

  return text(`Product ${id} was deleted`);
};
