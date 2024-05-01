import { supabase } from "$lib/util/supabaseClient";
import { text, error as Error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const { data, error } = await supabase.storage
  .from("images")
  .upload("/", file);

  if (error) Error(500, { message: "Something went wrong" });
  return text("Done");
};
