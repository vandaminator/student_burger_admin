<script lang="ts">
  import { AppBar, LightSwitch, getDrawerStore } from "@skeletonlabs/skeleton";
  import type { DrawerSettings } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  export let path: string;

  const drawerStore = getDrawerStore();

  const handleOpen = () => {
    const drawerSettings: DrawerSettings = {
      id: "nav",
    };
    drawerStore.open(drawerSettings);
  };
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
  class="mb-4"
>
  <svelte:fragment slot="lead">
    <a
      class="text-2xl font-bold text-primary-400-500-token max-sm:hidden"
      href="/dashboard">RomanScoops Admin</a
    >
    <button
      type="button"
      class="btn-icon variant-filled-surface sm:hidden"
      on:click={handleOpen}
    >
      <Icon icon="mingcute:menu-fill" />
    </button>
  </svelte:fragment>

  <!-- middle -->
  <a class="text-xl font-bold text-secondary-400-500-token sm:hidden" href="/"
    >Roman Admin</a
  >

  <svelte:fragment slot="trail">
    <LightSwitch class="max-sm:hidden" />
  </svelte:fragment>
  <!-- <svelte:fragment slot="headline">
    <div class="flex items-center gap-1 text-secondary-500">
      <button class="btn-icon variant-soft-surface"
        ><Icon icon="entypo:home" /></button
      >
      {#each path.split("/").slice(1) as p}
        /<a href={p}>{p}</a>
      {/each}
    </div>
  </svelte:fragment> -->
</AppBar>
