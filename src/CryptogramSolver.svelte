<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { alphabet, splitQuote } from './quotes.js';
  import Word from './Word.svelte';

  /** @typedef {import('./quotes.js').EncryptedQuote} EncryptedQuote */

  /** @type {EncryptedQuote | null} */
  export let problem = null;

  let replacement = Array(26).fill('');

  const replace = ({ from, to }) => {
    if ((to.length != 1 || !/[a-zA-Z]/.test(to)) && to !== 'BACKSPACE') return;
    const newReplacement = [...replacement];
    newReplacement[alphabet.indexOf(from)] = to == 'BACKSPACE' ? '' : to;
    replacement = newReplacement;
  };

  onMount(() => {
    replacement = Array(26).fill('');
  });

  $: words = splitQuote(problem.ciphertext);

  $: console.log('problem:', problem, 'replacement', replacement);
</script>


<div class="cryptogram">
  {#each words as word}
    <Word
      {word}
      {replacement}
      on:replace={(e) => replace(e.detail)}
    />
  {/each}
</div>

<style>
  .cryptogram {
    display: flex;
    flex: row wrap;
    gap: 2rem;
  }
</style>
