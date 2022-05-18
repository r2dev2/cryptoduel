<script>
  import { createEventDispatcher } from 'svelte';
  import {
    alphabet,
    cryptogramCharacterLabel,
    occurencesCharacterLabel,
    replacementCharacterLabel,
  } from '@/js/constants.js';
  import { getCounts } from '@/js/utils.js';
  import ReplacementCharacter from './ReplacementCharacter.svelte';

  export let replacement = Array(26).fill(' ');
  export let quote = '';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  $: frequencies = getCounts(quote);
</script>

<table class="replacement-table" class:disabled>
  <tr class="header">
    <td title={cryptogramCharacterLabel} class="from-label">-</td>
    <td title={occurencesCharacterLabel} class="occurences-label">#</td>
    <td title={replacementCharacterLabel} class="to-label">🠗</td>
  </tr>
  {#each alphabet as ch, i}
    {@const replacementId = `replacement-${i}`}
    {@const isInQuote = frequencies.has(ch)}
    <tr class:no-occurence={!isInQuote}>
      <td id={replacementId}>{ch}</td>
      <td>{isInQuote ? frequencies.get(ch) : 0}</td>
      <ReplacementCharacter
        tag="td"
        replacement={replacement[i]}
        disabled={disabled || !isInQuote}
        ogchar={ch}
        disableUnderline
        on:error
        on:replace
      />
    </tr>
  {/each}
</table>

<style>
  .replacement-table {
    --border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  tr {
    display: flex;
    flex-direction: column;
    width: 2rem;
  }

  .replacement-table :global(td) {
    border-right: var(--border);
    border-bottom: var(--border);
    padding: 0.25rem;
  }

  .replacement-table :global(td:first-child) {
    border-top: var(--border);
  }

  tr:first-child {
    border-left: var(--border);
  }

  .header {
    width: 1.25rem;
    text-align: center;
  }

  .to-label {
    height: 1.15rem;
  }

  .replacement-table :global(.decrypted-letter) {
    padding: 0rem;
    width: calc(2rem - 1px);
    height: 1.65rem;
  }

  .replacement-table :global(.decrypted-letter input) {
    padding: 0.25rem;
    text-align: left;
  }

  .no-occurence {
    background-color: var(--no-occurence-color);
    color: var(--no-occurence-bg-color);
    pointer-events: none;
  }
</style>
