import { supabase } from "$lib/util/supabaseClient";
import { error as Error, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { Orders } from "$lib/types";

export const PATCH: RequestHandler = async ({ params, url }) => {
  // getting info of what order to change and what values to change
  const isDone = url.searchParams.get("isDone");
  const delivered = url.searchParams.get("delivered");
  const { id } = params;

  // checking if the order exists
  const info = await supabase.from("Orders").select("*").eq("id", +id);
  const data = info.data as Orders[] | null;
  if (data === null || data.length === 0) {
    return new Response(`Order ${id} does not exist`, { status: 404 });
  }

  // Grabbing the orders info
  const order = data[0];

  // What to do when the order
  if (isDone === "true") {
    const doneUpdate = await supabase
      .from("Orders")
      .update({ isDone: true })
      .eq("id", +id)
      .select();

    // something wrong happend
    if (doneUpdate.data === null || doneUpdate.data.length === 0)
      Error(500, {
        message: `Was not able to update isDone for order ${id}`,
      });
  } else if (delivered === "true") {
    // we only deliver orders that are done
    if (order.isDone) {
      const deliverUpdate = await supabase
        .from("Orders")
        .update({ delivered: true })
        .eq("id", +id)
        .select("*");

      // something wrong happend
      if (deliverUpdate.data === null || deliverUpdate.data.length === 0) {
        Error(500, {
          message: `Was not able to update isDone for order ${id}`,
        });
      }
    } else {
      // tell them we only deliver done items
      Error(406, { message: `Order-${id} is not done` });
    }
  }

  return new Response(`Order-${id} was updated`);
};

export const DELETE: RequestHandler = async ({ params }) => {
  const { id } = params;

  const deleteReposne = await supabase.from("Orders").delete().eq("id", +id);
  if (deleteReposne.error !== null) {
    Error(400, { message: "Error in deleting the order" });
  }
  return text(`Order ${id} was deleted`);
};
