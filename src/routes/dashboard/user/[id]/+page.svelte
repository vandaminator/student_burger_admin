<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let { customer } = data;
</script>

<main>
    <h1>{customer.firstName} {customer.lastName}</h1>
    <p>Phone number: {customer.phoneNumber}</p>
</main>
