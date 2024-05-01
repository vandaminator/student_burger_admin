<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    let users = data.users 
</script>

<main class="space-y-3">
    {#each users as u}
        <div class="card p-4 gap-3 flex flex-col">
            <p>{u.firstName} {u.lastName}</p>
            <p>Phonenumber: {u.phoneNumber}</p>
            <a class="btn variant-filled" href={`/dashboard/user/${u.id}`}>View user</a>
        </div>
    {/each}
</main>