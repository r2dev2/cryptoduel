<script>
  import { id as id_ } from '@/js/store.js';
  import { getJoinLink } from '@/js/cryptoduelutils.js';

  export let id = id_;

  let clicked = false;

  const onClick = () => {
    navigator.clipboard.writeText(joinLink);
    clicked = true;
  };

  $: joinLink = getJoinLink($id);
</script>

<div class="join-links">
  {#if $id !== ''}
    <button class="join-link" on:click={onClick}>
      {clicked ? 'Join Link (copied)' : 'Copy Join Link'}
    </button>
    <a href={joinLink}>{joinLink}</a>
  {:else}
    <p class="waiting">Acquiring join link...</p>
  {/if}
</div>

<style>
  .join-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .join-link {
    margin: 0;
  }

  .join-link:hover {
    cursor: pointer;
  }
</style>
