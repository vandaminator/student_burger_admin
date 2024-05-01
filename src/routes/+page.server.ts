import { supabase } from "$lib/util/supabaseClient";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  return {
    user: locals.user,
  };
}) satisfies PageServerLoad;

export const actions = {
  login: async ({ cookies, request }) => {
    const formData = await request.formData();
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    if (emailValue === null) error(400, "No email value");
    if (passwordValue === null) error(400, "No password value");

    const email = emailValue.toString();
    const password = passwordValue.toString();

    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const sessionId = data.session?.access_token;
    const session = data.session

    if (sessionId === undefined) error(500);

    cookies.set("sessionid", sessionId, { path: "/" });
    return { success: true };
  },

  logout: async (event) => {
    event.cookies.delete("sessionid", { path: "/" });
    event.locals.user = null;
  },
} satisfies Actions;
