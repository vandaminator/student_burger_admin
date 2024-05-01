<script lang="ts">
  import type { PageData } from "./$types";
  import Icon from "@iconify/svelte";

  export let data: PageData;
  let product = data.products;
</script>

<main class="flex flex-col gap-4">
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold underline">Products</h1>
    <a class="btn variant-ghost-primary" href="/dashboard/product/new">
      <span><Icon icon="lucide:plus" /></span>
      <span>Add New</span>
    </a>
  </div>
  {#each product as p}
    <div class="card p-3 flex flex-col gap-3 md:flex-row">
      <img class="mx-auto rounded" src={p.img[0]} alt={p.name} width="300" />
      <div class="w-full flex flex-col justify-between gap-3">
        <div>
          <p class="text-4xl mb-3 underline">{p.name}</p>
          <div class="">
            <p class="text-2xl">Price: R {p.price}</p>
            <p class="text-2xl">Qty: {p.qty}</p>
          </div>
        </div>
        <a
          href={`/dashboard/product/${p.id}`}
          class="btn bg-gradient-to-br variant-gradient-primary-tertiary w-full"
          >View Product</a
        >
      </div>
    </div>
    {:else}
    <h1>No Products</h1>
  {/each}
</main>
