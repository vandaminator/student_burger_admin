<script lang="ts">
  import {
    Table,
    tableMapperValues,
    type TableSource,
  } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  const orders = data.orders;

  const table: TableSource = {
    // A list of heading labels.
    head: ["ID", "User", "Price (R)", "Delivered"],
    // The data visibly shown in your table body UI.
    body: tableMapperValues(orders, ["id", "user", "price", "delivered"]),
    // Optional: The data returned when interactive is enabled and a row is clicked.
    meta: tableMapperValues(orders, ["id"]),
  };

  const SelectHandler = (event: CustomEvent<string[]>) => {
    const id = event.detail[0];
    goto(`/dashboard/order/${id}`);
  };
</script>

<main>
  {#if orders.length !== 0}
    <h1 class="text-xl font-semibold underline mb-3">Current Orders</h1>
    <Table source={table} interactive={true} on:selected={SelectHandler} />
  {:else}
    <h1>There are no orders</h1>
  {/if}
</main>
