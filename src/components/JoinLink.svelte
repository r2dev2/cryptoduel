<script>
  import { id as id_ } from '@/js/store.js';
  import { getJoinLink } from '@/js/cryptoduelutils.js';

  export let id = id_;

  let clicked = false;
  // whether we can use the navigator.share api
  let shareLink = 'share' in navigator;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joinLink);
    clicked = true;
  };

  const share = () => {
    navigator.share({
      title: 'Cryptoduel',
      text: 'Join my cryptoduel game!',
      url: joinLink,
    });
    clicked = true;
  };

  $: joinLink = getJoinLink($id);
</script>

<div class="join-links">
  {#if $id !== ''}
    {#if shareLink}
      <button class="join-link" on:click={share}> Share Link </button>
    {:else}
      <button class="join-link" on:click={copyToClipboard}>
        {clicked ? 'Join Link (copied)' : 'Copy Join Link'}
      </button>
    {/if}
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
