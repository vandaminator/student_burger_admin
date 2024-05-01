import { supabase } from "$lib/util/supabaseClient";
import { fail, error as Error } from "@sveltejs/kit";
import type { Action, PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  let { data } = await supabase
    .from("Products")
    .select("*")
    .eq("id", +params.id);
  return { info: data ?? [] };
}) satisfies PageServerLoad;

export const actions = {
  editInfo: async ({ request, params }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const qty = formData.get("stock")?.toString();
    const images = formData.get("images")?.toString();
    const formItems = { name, price, qty, images };

    if (!name) {
      return fail(400, {
        name,
        price,
        qty,
        images,
        errorMsg: "Name value missing",
      });
    }
    if (!price || isNaN(+price) || +price < 0) {
      return fail(400, {
        name,
        price,
        qty,
        images,
        errorMsg: "price value should be filled and a positive number",
      });
    }
    if (!qty || isNaN(+qty) || +qty < 0) {
      return fail(400, {
        name,
        price,
        qty,
        images,
        errorMsg: "qty value should be filled and a positive number",
      });
    }
    if (!images) {
      return fail(400, {
        name,
        price,
        qty,
        images,
        errorMsg: "images value missing",
      });
    } else {
      const listImages = images.split(",");
      const urlRegex =
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

      for (let img of listImages) {
        if (!urlRegex.test(img.trim())) {
          return fail(400, {
            name,
            price,
            qty,
            images,
            errorMsg: "The images should be all URLs",
          });
        }
      }
    }
    const listImages = images.split(",");

    const { data, error } = await supabase
      .from("Products")
      .update({ name, price: +price, qty: +qty, img: listImages })
      .eq("id", +params.id)
      .select();

    if (error || !data) {
      console.log(error);
      Error(500, { message: "Something went wrong" });
    }

    return { success: true, data };
  },
  upload: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("files");
    return { uploadsuccess: true };
  },
};
