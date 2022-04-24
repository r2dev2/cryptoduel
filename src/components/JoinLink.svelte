<script>
  import { id as id_ } from '@/js/store.js';

  export let id = id_;

  let clicked = false;

  const onClick = () => {
    navigator.clipboard.writeText(joinLink);
    clicked = true;
  };

  $: joinLink = `${location.href}?game=${encodeURIComponent($id)}`;
</script>

<div class="join-links">
  <button class="join-link" on:click={onClick}>
    {clicked ? 'Join Link (copied)' : 'Copy Join Link'}
  </button>
  <a href={joinLink}>{joinLink}</a>
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

  .join-link:focus {
    border: 1px solid #ccc;
  }
</style>
