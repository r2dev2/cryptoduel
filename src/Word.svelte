<script>
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';
  import { alphabet } from './quotes.js';

  export let word = '';
  export let replacement = Array(26).fill('');

  const dispatch = createEventDispatcher();

  /** @type {(i: number) => (e: KeyEvent) => void} */
  const keyDown = i => e => {
    dispatch('replace', {
      from: word[i],
      to: e.key.toUpperCase(),
    });
  };

  const replaceChars = (word, replacement) => [...word].map(ch => {
    const alphabetIdx = alphabet.indexOf(ch);
    if (alphabetIdx === -1) return null;
    return replacement[alphabetIdx];
  });

  // null if char is not alphabetic, '' if no replacement, char if replacement
  $: replacedChars = replaceChars(word, replacement);
</script>

<div class="word">
  {#each word as ch, i}
    {@const replacement = replacedChars[i]}
    <div class="plain-encrypt-pair">
      <div class="cipher-letter">{ch}</div>
      <div
        class="decrypted-letter"
        class:non-alphabetic={replacement === null}
        tabindex="0"
        on:keydown={keyDown(i)}
      >
        <pre>{replacement}</pre>
      </div>
    </div>
  {/each}
</div>

<style>
  .word {
    display: flex;
    flex-direction: row;
    gap: 0;
  }

  .plain-encrypt-pair {
    display: flex;
    flex-direction: column;
    max-width: 1.5rem;
    width: 1rem;
    gap: 0.25rem;
  }

  .plain-encrypt-pair div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
  }

  .decrypted-letter:hover {
    cursor: pointer;
    background-color: var(--hovered-letter-color);
  }

  .decrypted-letter:focus {
    background-color: var(--selected-letter-color);
    outline: none;
  }

  .non-alphabetic {
    display: none !important;
  }
</style>
