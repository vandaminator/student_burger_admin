import { supabase } from "$lib/util/supabaseClient";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const user = await supabase.auth.getUser();
  event.locals.user = user.data.user;

  const url = event.url.pathname;
  const isApiUrl = /^\/api\/.*$/.test(url);
  const NotLoggedIn = user.data.user === null;

  if (isApiUrl && NotLoggedIn) {
    return new Response("Not autherized", { status: 401 });
  }
  // else if (NotLoggedIn) {
  //   redirect(307, "/")
  // }

  return resolve(event);
};
