<script>
  import { writable } from 'svelte/store';
  import { createEventDispatcher, onMount } from 'svelte';
  import { alphabet, splitQuote } from './quotes.js';
  import Word from './Word.svelte';

  /** @typedef {import('./quotes.js').EncryptedQuote} EncryptedQuote */

  /** @type {EncryptedQuote | null} */
  export let problem = null;

  const dispatch = createEventDispatcher();

  let replacement = Array(26).fill('');

  const replace = ({ from, to }) => {
    if ((to.length != 1 || !/[a-zA-Z]/.test(to)) && to !== 'BACKSPACE') return;
    const newReplacement = [...replacement];
    newReplacement[alphabet.indexOf(from)] = to == 'BACKSPACE' ? '' : to;
    replacement = newReplacement;
  };

  const isCorrect = (replacement, problem) => {
    if (!problem) return false;
    return [...problem.ciphertext].every((ch, i) => (
      !alphabet.includes(ch) ||
      problem.plaintext[i] === replacement[alphabet.indexOf(ch)]
    ));
  };

  const getProgress = (replacement, ciphertext) => [...ciphertext].map(
    ch => alphabet.includes(ch) && replacement[alphabet.indexOf(ch)] !== ''
  );

  onMount(() => {
    replacement = Array(26).fill('');
  });

  $: words = splitQuote(problem.ciphertext);
  $: solved = isCorrect(replacement, problem);
  $: if (solved) {
    dispatch('solved');
  }
  $: dispatch('progress', { progress: getProgress(replacement, problem.ciphertext) });

  $: console.log('problem:', problem, 'replacement', replacement);
</script>


<div class="cryptogram" class:solved>
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
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .solved {
    color: var(--solved-text-color);
  }
</style>
