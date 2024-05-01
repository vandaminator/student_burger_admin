<script lang="ts">
  import "../app.pcss";
  import {
    AppShell,
    initializeStores,
    Drawer,
    getDrawerStore,
    LightSwitch,
    Modal,
  } from "@skeletonlabs/skeleton";
  import Navbar from "$lib/components/navbar.svelte";
  import { page } from "$app/stores";
  import { redirect } from "@sveltejs/kit";
  import type { LayoutData } from "./$types";
  import { goto } from "$app/navigation";

  initializeStores();
  const drawerStore = getDrawerStore();

  export let data: LayoutData;
  const notAuthedOnPage = data.user === null && $page.url.pathname !== "/"

  if (notAuthedOnPage) {
    redirect(307, "/")
  }
</script>

<Modal />

<AppShell>
  <svelte:fragment slot="header">
    <Navbar path={$page.url.pathname}/>
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <div
    class="mx-auto p-3 sm:w-[630px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]"
  >
    <slot />
  </div>
  <!-- ---- / ---- -->
  <!-- (pageFooter) -->
  <!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>

<Drawer>
  {#if $drawerStore.id === "nav"}
    <div class="p-4">
      <LightSwitch />
    </div>
  {:else if $drawerStore.id === "example-2"}
    <div></div>
  {:else}
    <div></div>
  {/if}
</Drawer>
