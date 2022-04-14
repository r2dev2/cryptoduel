<script>
  import { users as users_ } from '@/js/store.js';
  import UserBubble from './UserBubble.svelte';

  export let users = users_;
</script>

<div class="lobby">
  <span>Lobby:</span>
  {#each $users as user}
    <UserBubble name={user.name} />
  {:else}
    <span>waiting for some cool cryptographers</span>
  {/each}
</div>

<style>
  .lobby {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
  }
</style>
