import { supabase } from "$lib/util/supabaseClient";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
  // Getting order info
  const id = params.id;
  let orderRequest = await supabase.from("Orders").select("*").eq("id", +id);
  const order = orderRequest.data;
  if (order == null || order.length == 0)
    error(404, { message: `Order ${id} does not exist` });
  const info = order[0];

  // getting user info
  let userRequest = await supabase
    .from("Users")
    .select("firstName,lastName,phoneNumber")
    .eq("phoneNumber", info.user);
  const user = userRequest.data;
  if (user == null || user.length == 0)
    error(404, { message: `user ${info.user} does not exist` });
  const userInfo = user[0];

  return { info, userInfo };
})
