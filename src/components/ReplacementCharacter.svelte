<script>
  import { replaceableElement } from '@/js/use.js';
  import { createEventDispatcher } from 'svelte';

  export let replacement = ['', null].slice(2);
  export let disabled = false;
  export let ogchar = '';
  export let disableUnderline = false;
  export let tag = 'div';

  const dispatch = createEventDispatcher();
</script>

<svelte:element
  this={tag}
  class="decrypted-letter"
  class:empty={replacement === ''}
  class:non-alphabetic={replacement === null}
  class:enable-underline={!disableUnderline}
>
  <input
    maxlength={1}
    value={replacement}
    {disabled}
    use:replaceableElement={{ ogchar, disabled, dispatch }}
  />
</svelte:element>

<style>
  .decrypted-letter {
    width: 1rem;
    height: 1.2rem;
  }

  .decrypted-letter {
    position: relative;
  }

  input {
    border: none;
    border-radius: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    text-align: center;
    caret-color: transparent;
    font-family: monospace;
  }

  input:hover {
    cursor: pointer;
    background-color: var(--hovered-letter-color);
  }

  input:focus {
    background-color: var(--selected-letter-color);
    outline: none;
  }

  .non-alphabetic {
    display: none !important;
  }

  .enable-underline.empty::before {
    content: '-';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--grey);
    pointer-events: none;
  }

  .enable-underline.empty:focus-within::before {
    color: white;
  }

  ::selection {
    background-color: transparent;
  }
</style>
