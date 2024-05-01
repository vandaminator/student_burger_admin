<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PageData } from "./$types";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let data: PageData;
  const { id } = $page.params;
  const { info } = data;
  const images = info.img;
  const modalStore = getModalStore();

  $: index = 0;
  $: loading = false;

  const changeIndex = (dir: "left" | "right") => {
    const lastIndex = images.length - 1;
    const isLast = index === lastIndex;
    const isFirst = index === 0;
    if (dir === "left") {
      if (isFirst) index = lastIndex;
      else index -= 1;
    } else if (dir === "right") {
      if (isLast) index = 0;
      else index += 1;
    }
  };

  const modal: ModalSettings = {
    type: "confirm",
    title: "Delete Product",
    body: "Do you want to delete product",
    response(r) {
      if (r) {
        const apiDelete = async () => {
          loading = true;
          const response = await fetch(`/api/product/${info.id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            loading = false;
            goto("/dashboard/order");
          }
        };

        apiDelete();
      }
    },
  };

  const openDeleteModal = () => modalStore.trigger(modal);
</script>

<main class="space-y-3">
  <h1 class="text-5xl underline font-bold">{info.name}</h1>

  <img
    class="mx-auto rounded"
    src={images[index]}
    alt={images[index]}
    width="300"
  />

  <div class="flex justify-between">
    <button
      class="btn-icon bg-gradient-to-br variant-gradient-secondary-tertiary"
      on:click={() => changeIndex("left")}
    >
      <Icon icon="material-symbols:arrow-left-alt-rounded" />
    </button>
    <button
      class="btn-icon bg-gradient-to-br variant-gradient-secondary-tertiary"
      on:click={() => changeIndex("right")}
      ><Icon icon="material-symbols:arrow-right-alt-rounded" /></button
    >
  </div>

  <div>
    <p class="text-3xl">Price: R {info.price}</p>
    <p class="text-3xl">Qty: {info.qty}</p>
  </div>

  <a
    href={`/dashboard/product/${id}/edit`}
    class="btn variant-filled-primary w-full">Edit</a
  >
  <button
    type="button"
    class="btn variant-filled-error w-full"
    on:click={openDeleteModal}
    disabled={loading}>Delete Product</button
  >
</main>
