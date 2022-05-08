<script>
  import { createEventDispatcher } from 'svelte';
  import {
    alphabet,
    cryptogramCharacterLabel,
    occurencesCharacterLabel,
    replacementCharacterLabel,
  } from '@/js/constants.js';
  import { replaceableElement } from '@/js/use.js';
  import { getCounts } from '@/js/utils.js';

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
      <td
        role="textbox"
        aria-labelledby={replacementId}
        aria-disabled={!isInQuote}
        class="replacement-letter"
        use:replaceableElement={{
          ogchar: ch,
          disabled: disabled || !isInQuote,
          dispatch,
        }}
      >
        {replacement[i]}
      </td>
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

  td {
    border-right: var(--border);
    border-bottom: var(--border);
    padding: 0.25rem;
  }

  td:first-child {
    border-top: var(--border);
  }

  tr:first-child {
    border-left: var(--border);
  }

  .header {
    width: 1.25rem;
    text-align: center;
  }

  .replacement-letter,
  .to-label {
    height: 1.15rem;
  }

  :not(.disabled) .replacement-letter:hover {
    cursor: text;
    background-color: var(--hovered-letter-color);
  }

  :not(.disabled) .replacement-letter:focus {
    background-color: var(--selected-letter-color);
  }

  .no-occurence {
    background-color: var(--no-occurence-color);
    color: var(--no-occurence-bg-color);
  }

  .no-occurence .replacement-letter {
    pointer-events: none;
  }
</style>
