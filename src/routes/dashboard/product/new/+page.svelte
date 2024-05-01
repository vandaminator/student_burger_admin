<script lang="ts">
  import { PUBLIC_SUPABASEURLUPLOAD } from "$env/static/public";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let firstFormGood = form?.success;
</script>

<form
  action="?/createInfo"
  method="POST"
  class={`flex flex-col gap-3 ${firstFormGood ? "hidden" : ""}`}
>
  {#if form?.errorMsg}
    <p class="bg-warning-500 text-white rounded">{form.errorMsg}</p>
  {/if}
  <label class="label">
    <span>Name</span>
    <input
      class="input"
      type="text"
      placeholder="Enter name"
      name="name"
      required
      value={form?.name ?? ""}
    />
  </label>

  <label class="label">
    <span>Price</span>
    <input
      class="input"
      type="number"
      placeholder="Enter price"
      name="price"
      required
      value={form?.price ?? ""}
    />
  </label>

  <label class="label">
    <span>Stock</span>
    <input
      class="input"
      type="number"
      placeholder="Enter number of stock"
      name="stock"
      required
      value={form?.qty ?? ""}
    />
  </label>

  <label class="label">
    <span>Images</span>
    <input
      class="input"
      type="text"
      placeholder="Enter urls of Images"
      name="images"
      required
      value={form?.images ?? ""}
    />
    <p>
      Upload your images on the <a
        class="text-primary-500"
        href={PUBLIC_SUPABASEURLUPLOAD}
        target="_blank">supabase website</a
      > and press your products image to get the link for the image by pressing the
      "Get Url" button and paste here. To upload many just separate them with a comma(,)
    </p>
  </label>

  <button
    class="btn bg-gradient-to-br variant-gradient-secondary-tertiary w-full"
    type="submit">Create Product</button
  >
</form>

{#if firstFormGood}
<div class="flex items-center flex-col gap-9">
  <h1 class="text-4xl">Product was created</h1>
  <a class="btn bg-gradient-to-br variant-gradient-tertiary-secondary mx-auto text-3xl" href="/dashboard">Go to dashboard</a>
</div>
{/if}