<script>
  import { onMount } from 'svelte';
  import { keyboardSubscriptions, needsKeyboardEntry } from '@/js/store.js';

  const firstRow = 'QWERTYUIOP';
  const secondRow = 'ASDFGHJKL';
  const thirdRow = 'ZXCVBNM';

  const rows = [firstRow, secondRow, thirdRow];

  /** @type {Map<string, boolean>} */
  let active = new Map();

  let mounted = false;

  const onTouch =
    (/** @type {string} */ char) => (/** @type {TouchEvent} */ e) => {
      e.preventDefault();
      keyboardSubscriptions.forEach((cb) => cb(char));
      active.set(char, true);
      // eslint-disable-next-line no-self-assign
      active = active;
    };

  const onTouchEnd = (/** @type {string} */ char) => () => {
    active.set(char, false);
    // eslint-disable-next-line no-self-assign
    active = active;
  };

  const scrollAmount = 10.6 * 16; // 10.6rem

  $: if ($needsKeyboardEntry) {
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  } else {
    if (mounted) {
      window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }
  }

  onMount(() => {
    mounted = true;
  });
</script>

<!-- 10.6rem tall custom keyboard -->
<div class="custom-keyboard" class:show={$needsKeyboardEntry}>
  {#each rows as row}
    <div class="keyboard-row">
      {#each row as char}
        <div
          class="key"
          class:active={active.get(char)}
          on:touchstart={onTouch(char)}
          on:touchend={onTouchEnd(char)}
        >
          {char}
        </div>
      {/each}
    </div>
  {/each}
  <div class="keyboard-row">
    <div
      class="key"
      class:active={active.get('BACKSPACE')}
      on:touchstart={onTouch('BACKSPACE')}
      on:touchend={onTouchEnd('BACKSPACE')}
    >
      DELETE
    </div>
  </div>
</div>

<style>
  .custom-keyboard {
    display: flex;
    flex-direction: column;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    padding-top: 0.25rem;
    width: 100%;

    background-color: var(--grey);
    opacity: 0;
    pointer-events: none;
    transform: translateY(100%);
    transition: 300ms ease-out;
  }

  .custom-keyboard.show {
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }

  .keyboard-row {
    display: flex;
    flex-direction: row;
  }

  .key {
    flex-grow: 1;
    text-align: center;
    padding: 0.75rem 0;
    transition: 200ms ease-out;
  }

  .key.active {
    background-color: var(--primary-color);
    transition: none;
  }
</style>
