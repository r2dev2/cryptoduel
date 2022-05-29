<script>
  import { subscribeToKeyboard } from '@/js/actions.js';
  import { replaceableElement } from '@/js/use.js';
  import { createEventDispatcher, onMount } from 'svelte';

  export let replacement = ['', null].slice(2);
  export let disabled = false;
  export let ogchar = '';
  export let disableUnderline = false;
  export let tag = 'div';

  let focussed = false;

  $: replacement_ = replacement;
  $: if (replacement_ !== replacement) {
    replacement_ = replacement;
  }

  const dispatch = createEventDispatcher();

  onMount(() =>
    subscribeToKeyboard((char) => {
      if (!focussed) return;
      if (ogchar === char && ogchar !== '') {
        dispatch('error', {
          id: Errors.NO_SELF_DECODE,
          msg: 'Letters cannot decode to themselves',
        });
        return;
      }

      dispatch('replace', {
        from: ogchar,
        to: char,
      });
    })
  );
</script>

<svelte:element
  this={tag}
  class="decrypted-letter"
  class:empty={replacement === ''}
  class:non-alphabetic={replacement === null}
  class:enable-underline={!disableUnderline}
>
  {#if 1}
    <div
      class="decrypted-letter-input"
      tabindex={disabled ? -1 : 0}
      on:focus={() => (focussed = true)}
      on:blur={() => (focussed = false)}
    >
      {replacement_}
    </div>
  {:else}
    <input
      class="decrypted-letter-input"
      type="text"
      maxlength={1}
      bind:value={replacement_}
      on:focus={() => (focussed = true)}
      on:blur={() => (focussed = false)}
      {disabled}
      use:replaceableElement={{ ogchar, disabled, dispatch }}
    />
  {/if}
</svelte:element>

<style>
  .decrypted-letter {
    width: 1rem;
    height: 1.2rem;
  }

  .decrypted-letter {
    position: relative;
  }

  div.decrypted-letter-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .decrypted-letter-input {
    border: none;
    border-radius: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    text-align: center;
    caret-color: transparent;
    font-family: monospace;
  }

  .decrypted-letter-input:hover {
    cursor: pointer;
    background-color: var(--hovered-letter-color);
  }

  .decrypted-letter-input:focus {
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
