<script lang="ts">
  import { goto } from "$app/navigation";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

  export let data;
  const { info, userInfo } = data;
  const products = info.products;
  const modal: ModalSettings = {
    type: "confirm",
  };
  const modalStore = getModalStore();
  $: loading = false;

  const openDeleteModal = () => {
    modal.body = "Do you want to delete this order";
    modal.title = "Delete order";
    modal.response = (confirm: boolean) => {
    if (confirm) {
      const apiDelete = async () => {
        loading = true;
        const response = await fetch(`/api/order/${info.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          loading = false;
          goto("/dashboard");
        }
      };

      apiDelete();
    }
  };;

    modalStore.trigger(modal);
  };

  const openDoneModal = () => {
    modal.body = "Do you want to confirm this order is done";
    modal.title = "Done order";
    modal.response = (confirm: boolean) => {
    if (confirm) {
      const apiDelete = async () => {
        loading = true;
        const response = await fetch(`/api/order/${info.id}?isDone=true`, {
          method: "PATCH",
        });

        if (response.ok) {
          loading = false;
          goto("/dashboard");
        }
      };

      apiDelete();
    }
  };;

    modalStore.trigger(modal);
  }

  const openDeliveredModal = () => {
    modal.body = "Do you want to confirm this order is deliverd";
    modal.title = "Deliver order";
    modal.response = (confirm: boolean) => {
    if (confirm) {
      const apiDelete = async () => {
        loading = true;
        const response = await fetch(`/api/order/${info.id}?delivered=true`, {
          method: "PATCH",
        });

        if (response.ok) {
          loading = false;
          goto("/dashboard");
        }
      };

      apiDelete();
    }
  };;

    modalStore.trigger(modal);
  }
</script>

<main>
  <div class="flex flex-col gap-3">
    <p class="font-bold text-xl">
      From User: {userInfo.firstName}
      {userInfo.lastName}
    </p>

    <h1 class="text-xl underline">Products</h1>
    <div class="flex flex-col gap-3">
      {#each products as p}
        <div
          class="bg-secondary-500/10 card p-4 flex flex-col gap-3 items-center"
        >
          <img class="" src={p.image} alt={p.title} height="200" width="200" />
          <div class="flex justify-between w-full">
            <p>Price: R {p.price}</p>
            <p>Qty: {p.quantity}</p>
            <p>Total: R {p.price * p.quantity}</p>
          </div>
        </div>
      {/each}
    </div>

    <h2 class="mt-5 text-xl font-semibold">
      Total: R {info.price}
    </h2>

    <div class="flex gap-3">
      <button
        type="button"
        class="btn variant-filled-error flex-grow"
        on:click={openDeleteModal}
        disabled={loading}>Delete Order</button
      >
      {#if info.isDone}
        <button
          type="button"
          class="btn variant-filled-success flex-grow"
          on:click={openDeliveredModal}
          disabled={loading}>Confirm Order delivered</button
        >
      {:else}
        <button
          type="button"
          class="btn variant-filled-success flex-grow"
          on:click={openDoneModal}
          disabled={loading}>Confirm Order done</button
        >
      {/if}
    </div>
  </div>
</main>
