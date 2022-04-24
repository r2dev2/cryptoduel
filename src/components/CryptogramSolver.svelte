<script>
  import { createEventDispatcher } from 'svelte';
  import { alphabet, splitQuote } from '@/js/quotes.js';
  import { log } from '@/js/utils.js';

  import Word from './Word.svelte';
  import ReplacementTable from './ReplacementTable.svelte';

  /** @typedef {import('@/js/quotes.js').EncryptedQuote} EncryptedQuote */

  /** @type {EncryptedQuote | null} */
  export let problem = null;

  const dispatch = createEventDispatcher();

  let replacement = Array(26).fill('');

  /** @type {(replacement: { from: string, to: string }) => void} */
  const replace = ({ from, to }) => {
    if ((to.length !== 1 || !/[a-zA-Z]/.test(to)) && to !== 'BACKSPACE') return;
    const newReplacement = [...replacement];
    newReplacement[alphabet.indexOf(from)] = to === 'BACKSPACE' ? '' : to;
    replacement = newReplacement;
  };

  /** @type {(replacement: string[], problem: EncryptedQuote | null) => boolean} */
  const isCorrect = (replacement, problem) => {
    if (!problem) return false;
    return [...problem.ciphertext].every(
      (ch, i) =>
        !alphabet.includes(ch) ||
        problem.plaintext[i] === replacement[alphabet.indexOf(ch)]
    );
  };

  /** @type {(replacement: string[], ciphertext: string) => boolean[]} */
  const getProgress = (replacement, ciphertext) =>
    [...ciphertext].map(
      (ch) => alphabet.includes(ch) && replacement[alphabet.indexOf(ch)] !== ''
    );

  /** @type {(e: CustomEvent<any>) => void} */
  const handleReplace = (e) => replace(e.detail);

  $: problem, (replacement = Array(26).fill(''));

  $: words = splitQuote(problem?.ciphertext ?? '');
  $: solved = isCorrect(replacement, problem);
  $: if (solved) {
    dispatch('solved');
  }
  $: dispatch('progress', {
    progress: getProgress(replacement, problem?.ciphertext ?? ''),
  });

  $: log('problem:', problem, 'replacement', replacement);
</script>

{#if problem}
  <p>Solve this quote by {problem.author}</p>
  <div class="cryptogram" class:solved>
    {#each words as word}
      <Word
        {word}
        {replacement}
        disabled={solved}
        on:replace={handleReplace}
        on:error
      />
    {/each}
  </div>
  <ReplacementTable
    {replacement}
    quote={problem.ciphertext}
    on:replace={handleReplace}
    on:error
  />
{/if}

<style>
  p {
    margin: 0 0 0.5rem 0;
  }

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
