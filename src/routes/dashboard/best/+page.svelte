<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  {#each data.best as b}
    <div class="card p-4">
      <img
        class="rounded mx-auto"
        width="300"
        src={b.Products?.img[0]}
        alt={b.Products?.name}
      />
      <p>{b.Products?.name}</p>

      <a href={`/dashboard/product/${b.Products?.id}`}>Go to product</a>
    </div>
  {:else}
    <p>No products</p>
  {/each}
</main>
